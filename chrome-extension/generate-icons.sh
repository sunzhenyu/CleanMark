#!/bin/bash

# Generate PNG icons from SVG using ImageMagick
# Install: brew install imagemagick (macOS) or sudo apt-get install imagemagick (Linux)

if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Please install it first."
    echo "macOS: brew install imagemagick"
    echo "Linux: sudo apt-get install imagemagick"
    exit 1
fi

echo "Generating icons..."

convert icons/icon.svg -resize 16x16 -background none -flatten icons/icon16.png
convert icons/icon.svg -resize 48x48 -background none -flatten icons/icon48.png
convert icons/icon.svg -resize 128x128 -background none -flatten icons/icon128.png

echo "✓ Icons generated successfully!"
echo "  - icons/icon16.png"
echo "  - icons/icon48.png"
echo "  - icons/icon128.png"
