// Runs in MAIN world — can override page-level JS prototypes (bypasses CSP)
(function () {
  // Override 1: HTMLAnchorElement.prototype.click (for blob: downloads)
  const origClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    if (this.download && this.href && this.href.startsWith('blob:') && !this.__cleanmark_processed && !this.dataset.cleanmarkProcessed) {
      window.dispatchEvent(new CustomEvent('__cleanmark_download__', {
        detail: { url: this.href, download: this.download }
      }));
      return; // block original download
    }
    return origClick.apply(this, arguments);
  };

  // Override 2: fetch — intercept Gemini image download URLs (/gg-dl/, /rd-gg-dl/)
  const origFetch = window.fetch;
  let _pendingFetch = false; // deduplicate: only process the first fetch per download action
  window.fetch = async function (...args) {
    const req = args[0];
    const url = typeof req === 'string' ? req : (req instanceof Request ? req.url : null);

    // Only intercept rd-gg-dl from lh3.googleusercontent.com (public CDN, no auth needed)
    // Skip work.fife.usercontent.google.com — requires auth cookies, returns error text
    if (url && url.includes('/rd-gg-dl/') && url.includes('lh3.googleusercontent.com')) {
      console.log('[CleanMark MAIN] Intercepted Gemini image fetch:', url.substring(0, 100));

      if (_pendingFetch) {
        console.log('[CleanMark MAIN] Skipping duplicate fetch');
        return origFetch.apply(this, args);
      }
      _pendingFetch = true;
      setTimeout(() => { _pendingFetch = false; }, 5000);

      // Let the original fetch complete to get the image data
      const response = await origFetch.apply(this, args);
      const clone = response.clone();

      // Read the blob and dispatch to ISOLATED world
      clone.blob().then(blob => {
        console.log('[CleanMark MAIN] Blob type:', blob.type, 'size:', blob.size);
        const reader = new FileReader();
        reader.onloadend = () => {
          window.dispatchEvent(new CustomEvent('__cleanmark_fetch_image__', {
            detail: { dataUrl: reader.result, url, mimeType: blob.type }
          }));
        };
        reader.readAsDataURL(blob);
      }).catch(() => {});

      return response;
    }

    return origFetch.apply(this, args);
  };
})();
