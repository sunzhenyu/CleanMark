#!/bin/bash

# Chrome Extension Release Preparation Script
# 准备 Chrome 扩展发布所需的所有素材

set -e

echo "🚀 Preparing Chrome Extension for Release"
echo "=========================================="
echo ""

# 1. 构建扩展
echo "📦 Step 1: Building extension..."
node build.js
echo "✅ Build complete"
echo ""

# 2. 创建发布目录
RELEASE_DIR="release"
rm -rf "$RELEASE_DIR"
mkdir -p "$RELEASE_DIR/store-assets"
mkdir -p "$RELEASE_DIR/package"

# 3. 准备打包文件
echo "📋 Step 2: Preparing package files..."
cp manifest.json "$RELEASE_DIR/package/"
cp background.js "$RELEASE_DIR/package/"
cp popup.html "$RELEASE_DIR/package/"
cp popup.js "$RELEASE_DIR/package/"
cp -r icons "$RELEASE_DIR/package/"
cp -r dist "$RELEASE_DIR/package/"
echo "✅ Package files ready"
echo ""

# 4. 创建 ZIP 包
echo "🗜️  Step 3: Creating ZIP package..."
VERSION=$(grep '"version"' manifest.json | sed 's/.*"version": "\(.*\)".*/\1/')
ZIP_NAME="cleanmark-extension-v${VERSION}.zip"
cd "$RELEASE_DIR/package"
zip -r "../$ZIP_NAME" .
cd ../..
echo "✅ Created: $RELEASE_DIR/$ZIP_NAME"
echo ""

# 5. 生成 PNG 图标（使用 qlmanage 或其他方法）
echo "🎨 Step 4: Preparing icon assets..."
echo "   Note: SVG icons are in icons/ directory"
echo "   You may need to convert them to PNG manually or use:"
echo "   - Online tool: https://cloudconvert.com/svg-to-png"
echo "   - Or install ImageMagick: brew install imagemagick"
echo ""

# 6. 复制文档
echo "📄 Step 5: Copying documentation..."
cp STORE_LISTING.md "$RELEASE_DIR/"
cp README.md "$RELEASE_DIR/" 2>/dev/null || echo "   (README.md not found, skipping)"
echo "✅ Documentation copied"
echo ""

# 7. 创建发布说明
cat > "$RELEASE_DIR/RELEASE_NOTES.md" << 'EOF'
# CleanMark Extension v1.0.0 Release Notes

## 🎉 Initial Release

### Features
- ✨ One-click watermark removal from Gemini AI images
- 🔒 Privacy-first: all processing happens locally
- 📸 Supports full-resolution images
- 🌐 Works seamlessly on Gemini web interface
- 🆓 Free and open source

### Technical Details
- Automatic detection of Gemini watermark configurations
- Smart URL mapping for blob URLs
- Multi-pass watermark removal algorithm
- Support for various image resolutions (0.5k, 1k, 2k, 4k)

### Installation
1. Download the ZIP file
2. Go to chrome://extensions/
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extracted folder

### Usage
1. Visit Gemini and generate an image
2. Click the download button on any image
3. CleanMark automatically removes the watermark
4. Download the clean image

### Known Issues
- Occasionally may download a different image when multiple images are present (working on improvement)
- Requires page refresh after extension installation to start monitoring

### Privacy
No data collection. All processing happens in your browser.

---
Built with ❤️ for the community
EOF

echo "✅ Release notes created"
echo ""

# 8. 生成检查清单
cat > "$RELEASE_DIR/CHECKLIST.md" << 'EOF'
# Chrome Web Store Submission Checklist

## Pre-submission
- [ ] Test extension in Chrome
- [ ] Test on multiple Gemini images
- [ ] Verify watermark removal works
- [ ] Check all permissions are necessary
- [ ] Review manifest.json

## Assets Needed
- [ ] PNG icons (16x16, 48x48, 128x128)
  - Convert from SVG in icons/ directory
  - Use: https://cloudconvert.com/svg-to-png
- [ ] Screenshots (1280x800 recommended)
  - Screenshot 1: Gemini page with download button
  - Screenshot 2: Before/after comparison
  - Screenshot 3: Download success notification
- [ ] Promotional images (optional)
  - Small: 440x280
  - Large: 920x680
  - Marquee: 1400x560

## Store Listing
- [ ] Extension name: CleanMark - Watermark Remover
- [ ] Short description (see STORE_LISTING.md)
- [ ] Detailed description (see STORE_LISTING.md)
- [ ] Category: Productivity / Photos
- [ ] Language: English, 中文

## Privacy & Support
- [ ] Create privacy policy page at cleanmark.org/privacy
- [ ] Set support URL: https://cleanmark.org
- [ ] Prepare permission justifications (see STORE_LISTING.md)

## Submission
- [ ] Go to https://chrome.google.com/webstore/devconsole
- [ ] Pay $5 registration fee (one-time)
- [ ] Upload ZIP file
- [ ] Fill in all store listing information
- [ ] Upload icons and screenshots
- [ ] Add privacy policy URL
- [ ] Submit for review
- [ ] Wait 1-3 business days

## Post-submission
- [ ] Monitor review status
- [ ] Respond to any reviewer questions
- [ ] Announce release when approved
- [ ] Monitor user feedback
EOF

echo "✅ Checklist created"
echo ""

# 9. 显示摘要
echo "=========================================="
echo "✅ Release preparation complete!"
echo ""
echo "📦 Package location:"
echo "   $RELEASE_DIR/$ZIP_NAME"
echo ""
echo "📁 Release directory structure:"
ls -lh "$RELEASE_DIR"
echo ""
echo "📋 Next steps:"
echo "   1. Review $RELEASE_DIR/CHECKLIST.md"
echo "   2. Convert SVG icons to PNG (see CHECKLIST.md)"
echo "   3. Take screenshots of the extension in action"
echo "   4. Create privacy policy at cleanmark.org/privacy"
echo "   5. Go to https://chrome.google.com/webstore/devconsole"
echo "   6. Upload $ZIP_NAME"
echo ""
echo "📖 Documentation:"
echo "   - Store listing info: $RELEASE_DIR/STORE_LISTING.md"
echo "   - Release notes: $RELEASE_DIR/RELEASE_NOTES.md"
echo "   - Submission checklist: $RELEASE_DIR/CHECKLIST.md"
echo ""
echo "🎉 Good luck with your submission!"
