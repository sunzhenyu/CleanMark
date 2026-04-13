// 存储 lh3 URL 到 blob URL 的映射
const imageUrlMap = new Map();

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'removeWatermark',
    title: 'Remove Watermark',
    contexts: ['image']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'removeWatermark') {
    chrome.tabs.sendMessage(tab.id, {
      action: 'removeWatermark',
      imageUrl: info.srcUrl
    });
  }
});

// 监听网络请求，拦截 Gemini 图片 URL（页面加载时）
chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (details.type === 'image' && details.tabId > 0) {
      const url = details.url;
      // 排除 Google 用户头像（路径含 /a/）和小图标
      if (url.includes('lh3.googleusercontent.com/a/')) return;
      if (url.includes('/favicon') || url.includes('/icon')) return;
      // 存储这个 URL，关联到 tabId
      const tabId = details.tabId;
      if (!imageUrlMap.has(tabId)) {
        imageUrlMap.set(tabId, []);
      }
      const urls = imageUrlMap.get(tabId);
      // 只保留最近的 50 个 URL
      if (urls.length >= 50) {
        urls.shift();
      }
      urls.push({
        url: url,
        timestamp: Date.now()
      });
      console.log('[CleanMark BG] Captured image URL:', url.substring(0, 100));
    }
  },
  { urls: ["*://lh3.googleusercontent.com/*", "*://aistudio.google.com/*"] }
);

// 监听下载事件，拦截 Gemini 图片下载并替换为去水印版本
chrome.downloads.onCreated.addListener(async (downloadItem) => {
  const url = downloadItem.url;

  // 只处理来自 Gemini 的 blob 下载
  const isGeminiBlob = (
    url.startsWith('blob:https://gemini.google.com') ||
    url.startsWith('blob:https://aistudio.google.com')
  );

  if (!isGeminiBlob) return;

  console.log('[CleanMark BG] Intercepted Gemini download, tabId:', downloadItem.tabId, 'url:', url.substring(0, 60));

  // 取消原始下载
  chrome.downloads.cancel(downloadItem.id, () => {
    if (chrome.runtime.lastError) {
      console.log('[CleanMark BG] Cancel error:', chrome.runtime.lastError.message);
    }
  });

  // tabId 对 blob 下载可能是 -1，需要查找活跃的 Gemini tab
  let tabId = downloadItem.tabId;
  if (!tabId || tabId < 0) {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const geminiTab = tabs.find(t =>
      t.url?.includes('gemini.google.com') || t.url?.includes('aistudio.google.com')
    );
    if (geminiTab) {
      tabId = geminiTab.id;
    } else {
      const allTabs = await chrome.tabs.query({});
      const anyGeminiTab = allTabs.find(t =>
        t.url?.includes('gemini.google.com') || t.url?.includes('aistudio.google.com')
      );
      if (anyGeminiTab) tabId = anyGeminiTab.id;
    }
  }

  if (tabId && tabId > 0) {
    console.log('[CleanMark BG] Sending processDownloadUrl to tab', tabId);
    chrome.tabs.sendMessage(tabId, { action: 'processDownloadUrl', url });
  } else {
    console.log('[CleanMark BG] Could not find Gemini tab');
  }
});

// 清理过期的映射
chrome.tabs.onRemoved.addListener((tabId) => {
  imageUrlMap.delete(tabId);
});

// 处理来自 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchImage') {
    // Background script 不受 CORS 限制
    fetch(request.url)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          sendResponse({ success: true, dataUrl: reader.result });
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // 保持消息通道开启
  } else if (request.action === 'downloadDataUrl') {
    chrome.downloads.download({
      url: request.dataUrl,
      filename: request.filename,
      saveAs: false
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ success: true, downloadId });
      }
    });
    return true;
  } else if (request.action === 'getRecentImageUrls') {
    const tabId = sender.tab?.id;
    const allUrls = imageUrlMap.get(tabId) || [];
    const now = Date.now();
    const recentUrls = allUrls
      .filter(item => (now - item.timestamp) < 1800000) // 最近 30 分钟
      .map(item => item.url);
    console.log(`[CleanMark BG] Returning ${recentUrls.length} recent URLs (within 30min)`);
    sendResponse({ success: true, urls: recentUrls });
    return true;
  }
});
