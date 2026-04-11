# CleanMark Chrome Extension

Remove Gemini watermarks from images instantly with this Chrome extension.

## Features

- 🖱️ **Right-click menu** - Right-click any image and select "Remove Watermark"
- 🔄 **Batch processing** - Process all images on the current page
- 🔒 **Privacy-first** - All processing happens locally in your browser
- ⚡ **Fast** - Instant watermark removal

## Installation

### From Source

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `chrome-extension` folder

## Usage

### Method 1: Right-click Menu
1. Right-click on any image with a Gemini watermark
2. Select "Remove Watermark"
3. The processed image will be downloaded automatically

### Method 2: Process All Images
1. Click the CleanMark extension icon
2. Click "Process Current Page"
3. All images on the page will be processed

## Technical Details

- Uses the same watermark removal engine as cleanmark.org
- Pure JavaScript implementation
- No external API calls
- Works offline

## License

MIT
