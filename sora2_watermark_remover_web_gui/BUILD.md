# Build Instructions for Sora Watermark Remover

This guide explains how to build standalone executables for different platforms.

## Prerequisites

Install PyInstaller:
```bash
pip install pyinstaller
```

## Building for Different Platforms

### Windows

On a Windows machine:

```bash
# Install dependencies
pip install -r requirements.txt
pip install pyinstaller

# Build executable
pyinstaller build.spec

# The executable will be in dist/SoraWatermarkRemover/
# Create installer (optional, requires Inno Setup)
# Use the provided inno_setup.iss script
```

**Create Windows Installer:**
1. Install [Inno Setup](https://jrsoftware.org/isdl.php)
2. Open `inno_setup.iss` in Inno Setup Compiler
3. Click "Compile" to create the installer

### macOS

On a macOS machine:

```bash
# Install dependencies
pip install -r requirements.txt
pip install pyinstaller

# Build app bundle
pyinstaller build.spec

# The app will be in dist/SoraWatermarkRemover.app/

# Create DMG (optional)
# Install create-dmg: brew install create-dmg
create-dmg \
  --volname "Sora Watermark Remover" \
  --window-pos 200 120 \
  --window-size 800 400 \
  --icon-size 100 \
  --icon "SoraWatermarkRemover.app" 200 190 \
  --hide-extension "SoraWatermarkRemover.app" \
  --app-drop-link 600 185 \
  "SoraWatermarkRemover-v1.7.2.dmg" \
  "dist/SoraWatermarkRemover.app"
```

### Linux

On a Linux machine:

```bash
# Install dependencies
pip install -r requirements.txt
pip install pyinstaller

# Build executable
pyinstaller build.spec

# The executable will be in dist/SoraWatermarkRemover/

# Create AppImage (optional, requires appimagetool)
# 1. Create AppDir structure
mkdir -p AppDir/usr/bin
cp -r dist/SoraWatermarkRemover/* AppDir/usr/bin/

# 2. Create desktop file
cat > AppDir/SoraWatermarkRemover.desktop << EOF
[Desktop Entry]
Name=Sora Watermark Remover
Exec=SoraWatermarkRemover
Icon=sora-watermark-remover
Type=Application
Categories=Utility;
EOF

# 3. Download appimagetool and create AppImage
wget https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
chmod +x appimagetool-x86_64.AppImage
./appimagetool-x86_64.AppImage AppDir SoraWatermarkRemover-v1.7.2.AppImage
```

## Simplified Build Script

For quick building, use the provided build script:

```bash
# Make it executable
chmod +x build.sh

# Run build
./build.sh
```

## Output Files

After building, you'll have:

- **Windows**: `dist/SoraWatermarkRemover/` folder or `SoraWatermarkRemover-Setup.exe`
- **macOS**: `dist/SoraWatermarkRemover.app/` or `SoraWatermarkRemover-v1.7.2.dmg`
- **Linux**: `dist/SoraWatermarkRemover/` folder or `SoraWatermarkRemover-v1.7.2.AppImage`

## Upload to GitHub Releases

1. Go to https://github.com/sunzhenyu/CleanMark/releases
2. Click "Draft a new release"
3. Tag: `sora-v1.7.2`
4. Title: "Sora Watermark Remover v1.7.2"
5. Upload the built files
6. Publish release

## Troubleshooting

### Missing Dependencies
If PyInstaller misses some modules, add them to `hiddenimports` in `build.spec`.

### Large File Size
The executable will be large (~2-3GB) due to ML dependencies. This is normal.

### GPU Support
Make sure to build on a machine with CUDA installed if you want GPU support.

## Notes

- Build on the target platform for best compatibility
- macOS builds require macOS, Windows builds require Windows, etc.
- Cross-compilation is not recommended for this project due to ML dependencies
