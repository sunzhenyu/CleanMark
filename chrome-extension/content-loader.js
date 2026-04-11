// Content script loader - 动态加载 ES 模块
(async function() {
  try {
    console.log('[CleanMark] Loading watermark removal engine...');

    // 动态导入模块
    const { removeWatermarkFromImage } = await import(chrome.runtime.getURL('lib/sdk/browser.js'));

    console.log('[CleanMark] Engine loaded successfully');

    // 监听消息
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

      document.addEventListener('click', async (e) => {
        const target = e.target;
        const button = target.closest('button') || target.closest('[role="button"]') || target;

        console.log('[CleanMark] Click detected:', {
          tagName: button?.tagName,
          ariaLabel: button?.getAttribute('aria-label'),
          title: button?.title,
          className: button?.className
        });

        // 检查是否是下载按钮
        const svg = button?.querySelector?.('svg');
        const isDownloadButton = svg && (
          svg.innerHTML.includes('download') ||
          button.getAttribute('aria-label')?.toLowerCase().includes('download') ||
          button.title?.toLowerCase().includes('download')
        );

        console.log('[CleanMark] Is download button:', isDownloadButton);

        if (isDownloadButton) {
          console.log('[CleanMark] Download button clicked, finding image...');

          const img = findImageToDownload(button);

          if (img && img.src) {
