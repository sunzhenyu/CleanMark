# Sora Watermark Remover - Release Guide

## Creating Releases

To make the desktop application available for download, create GitHub releases with pre-built binaries.

### Release Assets Needed

1. **macOS**: `.dmg` installer file
2. **Windows**: `.exe` installer or `.zip` package
3. **Linux**: `.AppImage` or `.tar.gz` package

### Version History

Based on the original project by [tomateo1reg](https://github.com/tomateo1reg/sora2-watermark-remover-web-gui):

- **v1.7.2** - Latest stable release
  - macOS DMG available
  - SHA 256: `513671b4f9388d153db2eab70cbb673de242c2b0198733a5619cd201dcc6e1a9`

### How to Create a Release

1. Go to https://github.com/sunzhenyu/CleanMark/releases
2. Click "Draft a new release"
3. Create a new tag (e.g., `sora-v1.7.2`)
4. Set release title: "Sora Watermark Remover v1.7.2"
5. Add release notes
6. Upload binary files:
   - macOS: `SoraWatermarkRemover-v1.7.2.dmg`
   - Windows: `SoraWatermarkRemover-v1.7.2-Setup.exe`
   - Linux: `SoraWatermarkRemover-v1.7.2.AppImage`
7. Publish release

### Building from Source

For users who want to build from source, see the main [README.md](README.md) for installation instructions.

## Credits

This desktop application is based on [sora2-watermark-remover-web-gui](https://github.com/tomateo1reg/sora2-watermark-remover-web-gui) by tomateo1reg and the SORA Video Suite Team.

## License

MIT License - See LICENSE file for details.
