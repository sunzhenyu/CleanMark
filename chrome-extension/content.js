// Import watermark removal engine
import { removeWatermarkFromImage } from './lib/sdk/browser.js';

// Flag: fetch-path already handled this download cycle, skip background blob path
let _fetchPathHandled = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'removeWatermark') {
    processImage(request.imageUrl);
  } else if (request.action === 'processImages') {
    processAllImages().then(count => {
      sendResponse({ success: true, count });
    });
    return true;
  } else if (request.action === 'processDownloadUrl') {
    // Skip if fetch-path already handled this download
    if (_fetchPathHandled) {
      console.log('[CleanMark] Skipping processDownloadUrl — fetch path already handled');
      _fetchPathHandled = false;
      return;
    }
    // 来自 background 的下载拦截：直接处理这个 blob URL（全尺寸图片）
    console.log('[CleanMark] Processing intercepted download URL:', request.url.substring(0, 80));
    processAndDownloadImage(null, request.url, true);
  }
});

// 拦截 Gemini 页面的下载
// content-main.js (MAIN world) overrides HTMLAnchorElement.prototype.click and dispatches
// '__cleanmark_download__' — this ISOLATED world script listens for it.
function setupDownloadListener() {
  console.log('[CleanMark] Download listener initialized');

  // 监听来自 content-main.js (MAIN world) 的 fetch 拦截事件（/gg-dl/ 和 /rd-gg-dl/ URL）
  window.addEventListener('__cleanmark_fetch_image__', (e) => {
    const { dataUrl, url } = e.detail;
    console.log('[CleanMark] Intercepted Gemini fetch image:', url.substring(0, 80));
    _fetchPathHandled = true; // signal to skip background blob path
    processAndDownloadFromDataUrl(dataUrl);
  });

  // 监听来自 content-main.js (MAIN world) 的 blob 下载事件
  window.addEventListener('__cleanmark_download__', (e) => {
    const { url } = e.detail;
    console.log('[CleanMark] Intercepted anchor.click() download:', url.substring(0, 80));
    processAndDownloadImage(null, url, true);
  });

  // 捕获阶段拦截用户直接点击 <a download> 的情况（跳过已处理的链接）
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[download]');
    if (anchor && anchor.href && anchor.href.startsWith('blob:') && !anchor.__cleanmark_processed) {
      e.preventDefault();
      e.stopPropagation();
      console.log('[CleanMark] Intercepted click on <a download>:', anchor.href.substring(0, 80));
      processAndDownloadImage(null, anchor.href, true);
    }
  }, true);
}

// 直接从 dataUrl 处理并下载（用于 fetch 拦截路径）
async function processAndDownloadFromDataUrl(dataUrl) {
  try {
    showProcessingToast();

    // Convert dataUrl back to blob, then use createImageBitmap (avoids cross-origin img restrictions)
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob);

    console.log('[CleanMark] Fetch-intercepted image loaded via bitmap:', bitmap.width, 'x', bitmap.height);

    // Draw onto a canvas so removeWatermarkFromImage can work with it
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    bitmap.close();

    const newImg = new Image();
    newImg.src = canvas.toDataURL();
    await new Promise((resolve, reject) => {
      newImg.onload = resolve;
      newImg.onerror = reject;
    });

    console.log('[CleanMark] Starting watermark removal (fetch path)...');
    const result = await removeWatermarkFromImage(newImg, { multiPass: true });

    let outBlob;
    if (result.canvas instanceof HTMLCanvasElement) {
      outBlob = await new Promise(resolve => result.canvas.toBlob(resolve, 'image/png', 1.0));
    } else {
      outBlob = await result.canvas.convertToBlob({ type: 'image/png', quality: 1.0 });
    }

    // Convert to data URL and send to background for download (avoids user-gesture requirement)
    const reader = new FileReader();
    const dataUrlOut = await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(outBlob);
    });

    await chrome.runtime.sendMessage({
      action: 'downloadDataUrl',
      dataUrl: dataUrlOut,
      filename: `cleanmark-${Date.now()}.png`
    });

    hideProcessingToast();
    console.log('[CleanMark] Download complete (fetch path)!');
  } catch (error) {
    console.error('[CleanMark] Failed to process fetch-intercepted image:', error);
    hideProcessingToast();
    alert('Failed to remove watermark: ' + error.message);
  }
}

// 找到要下载的图片
function findImageToDownload(button) {
  console.log('[CleanMark] Starting image search...');

  // 方法1: 从按钮向上查找包含图片的容器（扩大搜索范围）
  let parent = button.parentElement;
  for (let i = 0; i < 10; i++) {
    if (!parent) break;

    // 查找所有图片（不限制域名）
    const allImgs = parent.querySelectorAll('img[src]');
    console.log(`[CleanMark] Level ${i}: Found ${allImgs.length} images in container`);

    if (allImgs.length > 0) {
      // 过滤出可能是 Gemini 图片的图片（大于 200x200）
      const validImgs = Array.from(allImgs).filter(img =>
        img.naturalWidth > 200 && img.naturalHeight > 200
      );

      console.log(`[CleanMark] Level ${i}: ${validImgs.length} valid images (>200x200)`);

      if (validImgs.length > 0) {
        // 返回最大的图片
        const sortedImgs = validImgs.sort((a, b) =>
          (b.naturalWidth * b.naturalHeight) - (a.naturalWidth * a.naturalHeight)
        );

        const selectedImg = sortedImgs[0];

        // 输出图片的所有属性，帮助调试
        console.log('[CleanMark] Selected image attributes:');
        Array.from(selectedImg.attributes).forEach(attr => {
          console.log(`  ${attr.name}: ${attr.value}`);
        });
        console.log('[CleanMark] Selected image dataset:');
        for (const key in selectedImg.dataset) {
          console.log(`  data-${key}: ${selectedImg.dataset[key]}`);
        }
        console.log('[CleanMark] Parent element:', selectedImg.parentElement?.tagName);
        if (selectedImg.parentElement) {
          console.log('[CleanMark] Parent attributes:');
          Array.from(selectedImg.parentElement.attributes).forEach(attr => {
            console.log(`  ${attr.name}: ${attr.value.substring(0, 300)}`);
          });
        }

        // 尝试从父元素的 style 或其他属性中提取完整 URL
        let fullSizeUrl = null;
        const parentStyle = selectedImg.parentElement?.style?.backgroundImage;
        if (parentStyle && parentStyle.includes('url(')) {
          const match = parentStyle.match(/url\(['"]?([^'"]+)['"]?\)/);
          if (match && match[1]) {
            console.log('[CleanMark] Found URL in parent background-image:', match[1].substring(0, 100));
            fullSizeUrl = match[1];
          }
        }

        // 检查 picture 元素中的 source
        const picture = selectedImg.closest('picture');
        if (picture) {
          const sources = picture.querySelectorAll('source[srcset]');
          if (sources.length > 0) {
            // 获取最后一个 source（通常是最高分辨率）
            const lastSource = sources[sources.length - 1];
            const srcset = lastSource.getAttribute('srcset');
            if (srcset) {
              // srcset 格式: "url 1x, url 2x" 或 "url 100w, url 200w"
              const urls = srcset.split(',').map(s => s.trim().split(' ')[0]);
              if (urls.length > 0) {
                fullSizeUrl = urls[urls.length - 1];
                console.log('[CleanMark] Found URL in picture source:', fullSizeUrl.substring(0, 100));
              }
            }
          }
        }

        // 将完整 URL 附加到图片对象上
        if (fullSizeUrl) {
          selectedImg.__fullSizeUrl = fullSizeUrl;
        }

        return selectedImg;
      }
    }

    parent = parent.parentElement;
  }

  // 方法2: 查找整个文档中最近添加的大图片
  console.log('[CleanMark] Trying fallback: searching all images in document');
  const allDocImgs = Array.from(document.querySelectorAll('img[src]'));
  const validDocImgs = allDocImgs.filter(img =>
    img.naturalWidth > 200 && img.naturalHeight > 200
  );

  if (validDocImgs.length > 0) {
    // 返回最大的图片
    const sortedImgs = validDocImgs.sort((a, b) =>
      (b.naturalWidth * b.naturalHeight) - (a.naturalWidth * a.naturalHeight)
    );

    const selectedImg = sortedImgs[0];
    console.log('[CleanMark] Fallback: Selected largest image in document:', {
      src: selectedImg.src.substring(0, 100),
      size: `${selectedImg.naturalWidth}x${selectedImg.naturalHeight}`
    });
    return selectedImg;
  }

  console.log('[CleanMark] No valid image found');
  return null;
}

// 处理并下载图片
async function processAndDownloadImage(img, fullSizeUrl, isBlobUrl = false) {
  try {
    // 显示处理提示
    showProcessingToast();

    // 使用完整尺寸的 URL
    const imageUrl = fullSizeUrl || img.src;
    console.log('[CleanMark] Fetching image from:', imageUrl);

    let newImg;

    if (isBlobUrl) {
      // blob URL 只在页面范围内有效，必须在 content script 中直接处理
      console.log('[CleanMark] Processing blob URL in content script');
      try {
        const blobResponse = await fetch(imageUrl);
        const blob = await blobResponse.blob();
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        newImg = new Image();
        await new Promise((resolve, reject) => {
          newImg.onload = () => {
            console.log('[CleanMark] Blob image loaded, size:', newImg.naturalWidth, 'x', newImg.naturalHeight);
            resolve();
          };
          newImg.onerror = reject;
          newImg.src = dataUrl;
        });
      } catch (error) {
        console.error('[CleanMark] Failed to fetch blob URL:', error);
        throw new Error('Failed to load blob image: ' + error.message);
      }
    } else {
      // 通过 background script 获取图片数据（避免 CORS 问题）
      let response;
      try {
        response = await chrome.runtime.sendMessage({
          action: 'fetchImage',
          url: imageUrl
        });
      } catch (error) {
        console.error('[CleanMark] Failed to communicate with background script:', error);
        throw new Error('Extension communication error. Please reload the extension and try again.');
      }

      if (!response || !response.success) {
        throw new Error(response?.error || 'Failed to fetch image');
      }

      console.log('[CleanMark] Image fetched successfully');

      // 创建新的图片元素
      newImg = new Image();
      await new Promise((resolve, reject) => {
        newImg.onload = () => {
          console.log('[CleanMark] Image loaded, size:', newImg.naturalWidth, 'x', newImg.naturalHeight);
          resolve();
        };
        newImg.onerror = reject;
        newImg.src = response.dataUrl;
      });
    }

    console.log('[CleanMark] Starting watermark removal...');
    const result = await removeWatermarkFromImage(newImg, {
      // 让算法自动选择最佳 alphaGain 值（会尝试 1.05 到 2.6 之间的多个值）
      multiPass: true  // 启用多次处理以彻底去除水印
    });

    console.log('[CleanMark] Watermark removed, creating download...');

    // Convert to blob with maximum quality (PNG format, no compression)
    let blob;
    if (result.canvas instanceof HTMLCanvasElement) {
      blob = await new Promise(resolve => result.canvas.toBlob(resolve, 'image/png', 1.0));
    } else {
      blob = await result.canvas.convertToBlob({ type: 'image/png', quality: 1.0 });
    }

    console.log('[CleanMark] Blob created, size:', blob.size, 'bytes');

    // Send to background for download (avoids user-gesture requirement)
    const reader2 = new FileReader();
    const dataUrlOut2 = await new Promise((resolve, reject) => {
      reader2.onloadend = () => resolve(reader2.result);
      reader2.onerror = reject;
      reader2.readAsDataURL(blob);
    });

    await chrome.runtime.sendMessage({
      action: 'downloadDataUrl',
      dataUrl: dataUrlOut2,
      filename: `cleanmark-${Date.now()}.png`
    });

    hideProcessingToast();
    console.log('[CleanMark] Download complete!');
  } catch (error) {
    console.error('[CleanMark] Failed to process image:', error);
    hideProcessingToast();
    alert('Failed to remove watermark: ' + error.message);
  }
}

// 显示处理提示
function showProcessingToast() {
  const toast = document.createElement('div');
  toast.id = 'cleanmark-toast';
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: '#111827',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    zIndex: '999999',
    fontSize: '14px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  });
  toast.textContent = '⏳ Removing watermark...';
  document.body.appendChild(toast);
}

function hideProcessingToast() {
  const toast = document.getElementById('cleanmark-toast');
  if (toast) toast.remove();
}

// 初始化
setupDownloadListener();

async function processImage(imageUrl) {
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const result = await removeWatermarkFromImage(img);

    // Convert to blob with maximum quality
    let blob;
    if (result.canvas instanceof HTMLCanvasElement) {
      blob = await new Promise(resolve => result.canvas.toBlob(resolve, 'image/png'));
    } else {
      blob = await result.canvas.convertToBlob({ type: 'image/png' });
    }

    // Download the processed image using blob URL
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'cleanmark-removed.png';
    link.__cleanmark_processed = true; // prevent re-interception
    link.dataset.cleanmarkProcessed = 'true';
    link.click();

    // Clean up blob URL after a delay
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch (error) {
    console.error('Failed to process image:', error);
    alert('Failed to remove watermark. Please try again.');
  }
}

async function processAllImages() {
  const images = document.querySelectorAll('img');
  let count = 0;

  for (const img of images) {
    if (img.src && img.naturalWidth > 100 && img.naturalHeight > 100) {
      try {
        const result = await removeWatermarkFromImage(img);

        let blob;
        if (result.canvas instanceof HTMLCanvasElement) {
          blob = await new Promise(resolve => result.canvas.toBlob(resolve, 'image/png'));
        } else {
          blob = await result.canvas.convertToBlob({ type: 'image/png' });
        }

        const blobUrl = URL.createObjectURL(blob);
        img.src = blobUrl;
        count++;
      } catch (error) {
        console.error('Failed to process image:', error);
      }
    }
  }

  return count;
}

function blobToDataURL(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
