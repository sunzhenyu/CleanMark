#!/bin/bash

# Chrome Extension Package Script
# 打包 Chrome 扩展为 ZIP 文件

set -e

echo "🔨 Building extension..."
node build.js

echo "📦 Creating package..."

# 创建临时目录
TEMP_DIR="package_temp"
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# 复制必要的文件
echo "📋 Copying files..."
cp manifest.json "$TEMP_DIR/"
cp background.js "$TEMP_DIR/"
cp popup.html "$TEMP_DIR/"
cp popup.js "$TEMP_DIR/"
cp -r icons "$TEMP_DIR/"
cp -r dist "$TEMP_DIR/"

# 创建 ZIP 文件
ZIP_NAME="cleanmark-extension-$(date +%Y%m%d-%H%M%S).zip"
echo "🗜️  Creating $ZIP_NAME..."
cd "$TEMP_DIR"
zip -r "../$ZIP_NAME" .
cd ..

# 清理临时目录
rm -rf "$TEMP_DIR"

echo "✅ Package created: $ZIP_NAME"
echo ""
echo "📤 Next steps:"
echo "1. Go to https://chrome.google.com/webstore/devconsole"
echo "2. Click 'New Item' or update existing item"
echo "3. Upload $ZIP_NAME"
echo "4. Fill in store listing details"
echo "5. Submit for review"
