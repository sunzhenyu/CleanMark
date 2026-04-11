# Build Instructions

## Generate Icons

Since Chrome extensions require PNG icons, you need to convert the SVG icon to PNG format.

### Using ImageMagick (recommended)

```bash
# Install ImageMagick
brew install imagemagick  # macOS
# or
sudo apt-get install imagemagick  # Linux

# Generate icons
convert icons/icon.svg -resize 16x16 icons/icon16.png
convert icons/icon.svg -resize 48x48 icons/icon48.png
convert icons/icon.svg -resize 128x128 icons/icon128.png
```

### Using Online Tools

1. Go to https://cloudconvert.com/svg-to-png
2. Upload `icons/icon.svg`
3. Convert to PNG at 128x128
4. Resize to create 16x16 and 48x48 versions

### Temporary Solution

For testing, you can use any PNG images as placeholders in the `icons/` folder:
- icon16.png (16x16)
- icon48.png (48x48)
- icon128.png (128x128)

## Load Extension

1. Open Chrome: `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `chrome-extension` folder
