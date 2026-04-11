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

// 监听网络请求，拦截 Gemini 图片 URL
chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (details.url.includes('lh3.googleusercontent.com') &&
        details.type === 'image' &&
        details.tabId > 0) {
      // 存储这个 URL，关联到 tabId
      const tabId = details.tabId;
      if (!imageUrlMap.has(tabId)) {
        imageUrlMap.set(tabId, []);
      }
      const urls = imageUrlMap.get(tabId);
      // 只保留最近的 20 个 URL
      if (urls.length >= 20) {
        urls.shift();
      }
      urls.push({
        url: details.url,
        timestamp: Date.now()
      });
      console.log('[CleanMark BG] Captured image URL:', details.url.substring(0, 100));
    }
  },
  { urls: ["*://lh3.googleusercontent.com/*"] }
);

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
  } else if (request.action === 'getRecentImageUrls') {
    // 返回最近 3 秒内的图片 URL 列表
    const tabId = sender.tab?.id;
    const allUrls = imageUrlMap.get(tabId) || [];
    const now = Date.now();
    const recentUrls = allUrls
      .filter(item => (now - item.timestamp) < 3000) // 最近 3 秒
      .map(item => item.url);
    console.log(`[CleanMark BG] Returning ${recentUrls.length} recent URLs (within 3s)`);
    sendResponse({ success: true, urls: recentUrls });
    return true;
  }
});
