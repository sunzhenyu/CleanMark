document.getElementById('processBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = 'Processing images...';

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: 'processImages' }, (response) => {
    if (response && response.success) {
      statusDiv.textContent = `✓ Processed ${response.count} image(s)`;
    } else {
      statusDiv.textContent = 'No watermarked images found';
    }
  });
});
