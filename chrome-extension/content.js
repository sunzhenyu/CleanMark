// Import watermark removal engine
import { removeWatermarkFromImage } from './lib/sdk/browser.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'removeWatermark') {
    processImage(request.imageUrl);
  } else if (request.action === 'processImages') {
    processAllImages().then(count => {
      sendResponse({ success: true, count });
    });
    return true;
  }
});

// 监听 Gemini 页面的下载按钮
function setupDownloadListener() {
  console.log('[CleanMark] Download listener initialized');

  // 使用事件委托监听所有点击事件
  document.addEventListener('click', async (e) => {
    const target = e.target;
    const button = target.closest('button') || target.closest('[role="button"]') || target;

    console.log('[CleanMark] Click detected:', {
      tagName: button?.tagName,
      ariaLabel: button?.getAttribute('aria-label'),
      title: button?.title,
      className: button?.className
    });

    // 检查是否是下载按钮（支持中英文）
    const ariaLabel = button?.getAttribute('aria-label') || '';
    const title = button?.title || '';
    const svg = button?.querySelector?.('svg');

    const isDownloadButton = (
      ariaLabel.includes('下载') ||
      ariaLabel.toLowerCase().includes('download') ||
      title.includes('下载') ||
      title.toLowerCase().includes('download') ||
      (svg && svg.innerHTML.includes('download'))
    );

    console.log('[CleanMark] Is download button:', isDownloadButton);

    if (isDownloadButton) {
      console.log('[CleanMark] Download button clicked, finding image...');

      // 找到对应的图片
      const img = findImageToDownload(button);

      if (img && img.src) {
        console.log('[CleanMark] Image found:', img.src.substring(0, 100));
        console.log('[CleanMark] Image size:', img.naturalWidth, 'x', img.naturalHeight);
        e.preventDefault();
        e.stopPropagation();

        // 获取完整尺寸的图片 URL
        let fullSizeUrl = img.src;
        let isBlobUrl = fullSizeUrl.startsWith('blob:');

        // 如果是 blob URL，尝试从图片元素的 data 属性中获取真实 URL
        if (isBlobUrl) {
          // 检查常见的 data 属性
          const realUrl = img.dataset.src ||
                         img.dataset.originalSrc ||
                         img.dataset.fullSrc ||
                         img.getAttribute('data-src') ||
                         img.getAttribute('data-original-src') ||
                         img.getAttribute('data-full-src');

          if (realUrl && realUrl.startsWith('http')) {
            console.log('[CleanMark] Found real URL in data attributes:', realUrl.substring(0, 100));
            fullSizeUrl = realUrl;
            isBlobUrl = false;
          } else {
            console.log('[CleanMark] No real URL found in data attributes, will use blob URL');
          }
        }

        // 如果是 blob URL，尝试从 background 获取最近的完整 URL
        if (isBlobUrl) {
          console.log('[CleanMark] Blob URL detected, trying to find real URL from background...');
          try {
            const response = await chrome.runtime.sendMessage({
              action: 'getRecentImageUrls'
            });

            if (response && response.success && response.urls.length > 0) {
              console.log(`[CleanMark] Found ${response.urls.length} recent URLs from background`);

              // 尝试最近的几个 URL，找到尺寸最大的（完整图片）
              const candidateUrls = response.urls.slice(-5); // 最近的 5 个
              let bestUrl = null;
              let bestSize = 0;

              for (const url of candidateUrls) {
                try {
                  // 快速检查：创建临时 Image 获取尺寸
                  const testImg = new Image();
                  const size = await new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => reject(new Error('timeout')), 2000);
                    testImg.onload = () => {
                      clearTimeout(timeout);
                      resolve(testImg.naturalWidth * testImg.naturalHeight);
                    };
                    testImg.onerror = () => {
                      clearTimeout(timeout);
                      reject(new Error('load failed'));
                    };
                    testImg.src = url;
                  });

                  console.log(`[CleanMark] Candidate URL size: ${size} pixels`);
                  if (size > bestSize) {
                    bestSize = size;
                    bestUrl = url;
                  }
                } catch (error) {
                  console.log(`[CleanMark] Failed to load candidate URL: ${error.message}`);
                }
              }

              if (bestUrl) {
                console.log('[CleanMark] Selected best URL with size:', bestSize, 'pixels');
                fullSizeUrl = bestUrl;
                isBlobUrl = false;
              } else {
                console.log('[CleanMark] No valid candidate URLs found, will use blob URL');
              }
            } else {
              console.log('[CleanMark] No recent URLs found in background');
            }
          } catch (error) {
            console.error('[CleanMark] Failed to get recent URLs:', error);
          }
        }

        if (!isBlobUrl) {
          // 对非 blob URL 进行参数处理
          // Gemini 图片 URL 处理：添加 =s0 参数获取原始尺寸
          // 移除现有的尺寸参数
          fullSizeUrl = fullSizeUrl.replace(/=s\d+(-[^?&]*)?(\?.*)?$/, '');
          fullSizeUrl = fullSizeUrl.replace(/=w\d+-h\d+(-[^?&]*)?(\?.*)?$/, '');
          // 添加 =s0 参数（0表示原始尺寸）
          fullSizeUrl = fullSizeUrl + '=s0';
        }

        console.log('[CleanMark] Original URL:', img.src);
        console.log('[CleanMark] Full size URL:', fullSizeUrl);
        console.log('[CleanMark] Original size:', img.naturalWidth, 'x', img.naturalHeight);
        console.log('[CleanMark] Is blob URL:', isBlobUrl);

        // 处理并下载
        await processAndDownloadImage(img, fullSizeUrl, isBlobUrl);
      } else {
        console.log('[CleanMark] No image found');
      }
    }
  }, true);
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

    // Download the processed image using blob URL
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `cleanmark-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up blob URL after a delay
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

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
