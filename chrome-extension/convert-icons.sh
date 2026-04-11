#!/bin/bash

# Convert website logo.svg to PNG icons for Chrome extension
# Requires: ImageMagick or rsvg-convert

set -e

echo "🎨 Converting logo.svg to PNG icons..."
echo ""

# Check if conversion tools are available
if command -v convert &> /dev/null; then
    TOOL="imagemagick"
    echo "✓ Using ImageMagick"
elif command -v rsvg-convert &> /dev/null; then
    TOOL="rsvg"
    echo "✓ Using rsvg-convert"
else
    echo "❌ Error: No conversion tool found"
    echo ""
    echo "Please install one of the following:"
    echo "  - ImageMagick: brew install imagemagick"
    echo "  - librsvg: brew install librsvg"
    echo ""
    echo "Or use online tool: https://cloudconvert.com/svg-to-png"
    echo ""
    echo "Manual steps:"
    echo "1. Upload icons/logo.svg to CloudConvert"
    echo "2. Convert to PNG at these sizes: 16x16, 48x48, 128x128"
    echo "3. Download and save as:"
    echo "   - icons/icon16.png"
    echo "   - icons/icon48.png"
    echo "   - icons/icon128.png"
    exit 1
fi

echo ""

# Source and output
SOURCE="../website/public/logo.svg"
OUTPUT_DIR="icons"

# Check if source exists
if [ ! -f "$SOURCE" ]; then
    echo "❌ Error: Source file not found: $SOURCE"
    exit 1
fi

# Create output directory if needed
mkdir -p "$OUTPUT_DIR"

# Convert to different sizes
SIZES=(16 48 128)

for SIZE in "${SIZES[@]}"; do
    OUTPUT="$OUTPUT_DIR/icon${SIZE}.png"
    echo "📐 Converting to ${SIZE}x${SIZE}..."

    if [ "$TOOL" = "imagemagick" ]; then
        convert -background none "$SOURCE" -resize ${SIZE}x${SIZE} "$OUTPUT"
    else
        rsvg-convert -w $SIZE -h $SIZE "$SOURCE" -o "$OUTPUT"
    fi

    if [ -f "$OUTPUT" ]; then
        echo "   ✓ Created: $OUTPUT"
    else
        echo "   ❌ Failed to create: $OUTPUT"
    fi
done

echo ""
echo "✅ Icon conversion complete!"
echo ""
echo "Generated files:"
ls -lh "$OUTPUT_DIR"/*.png 2>/dev/null || echo "No PNG files found"
echo ""
echo "📝 Next steps:"
echo "1. Update manifest.json to use .png icons instead of .svg"
echo "2. Test the extension with new icons"
echo "3. Run ./prepare-release.sh to package for Chrome Web Store"
