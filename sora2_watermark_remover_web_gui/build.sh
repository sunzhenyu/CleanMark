#!/bin/bash

# Build script for Sora Watermark Remover
# This script builds the application for the current platform

set -e

echo "🚀 Building Sora Watermark Remover..."

# Check if PyInstaller is installed
if ! command -v pyinstaller &> /dev/null; then
    echo "❌ PyInstaller not found. Installing..."
    pip install pyinstaller
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf build dist

# Build the application
echo "🔨 Building application..."
pyinstaller build.spec

# Detect platform and provide next steps
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "✅ Build complete! macOS app created at: dist/SoraWatermarkRemover.app"
    echo ""
    echo "📦 To create a DMG:"
    echo "   brew install create-dmg"
    echo "   create-dmg --volname 'Sora Watermark Remover' \\"
    echo "     --window-pos 200 120 --window-size 800 400 \\"
    echo "     --icon-size 100 --app-drop-link 600 185 \\"
    echo "     SoraWatermarkRemover-v1.7.2.dmg dist/SoraWatermarkRemover.app"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    echo "✅ Build complete! Windows executable created at: dist/SoraWatermarkRemover/"
    echo ""
    echo "📦 To create an installer, use Inno Setup with inno_setup.iss"
else
    echo "✅ Build complete! Linux executable created at: dist/SoraWatermarkRemover/"
    echo ""
    echo "📦 To create an AppImage, follow the instructions in BUILD.md"
fi

echo ""
echo "🎉 Done! Upload the files to GitHub Releases."
