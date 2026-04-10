# Sora Watermark Remover - Releases

## Download

### Latest Version: v1.7.2

#### macOS
- **DMG Installer**: [Download for macOS](https://github.com/sunzhenyu/CleanMark/releases/download/sora-v1.7.2/sora-watermark-remover-macos.dmg)
- Double-click to install, drag to Applications folder

#### Windows
- **Installer**: [Download for Windows](https://github.com/sunzhenyu/CleanMark/releases/download/sora-v1.7.2/sora-watermark-remover-windows.exe)
- Run the installer and follow the setup wizard

#### Linux
- **AppImage**: [Download for Linux](https://github.com/sunzhenyu/CleanMark/releases/download/sora-v1.7.2/sora-watermark-remover-linux.AppImage)
- Make executable: `chmod +x sora-watermark-remover-linux.AppImage`
- Run: `./sora-watermark-remover-linux.AppImage`

### Manual Installation (All Platforms)

If you prefer to run from source or the pre-built packages don't work:

```bash
# Clone the repository
git clone https://github.com/sunzhenyu/CleanMark.git
cd CleanMark/website/sora2_watermark_remover_web_gui

# Install dependencies
pip install -r requirements.txt

# Run the application
python main.py
```

The application will automatically open in your browser at `http://127.0.0.1:8081`

## System Requirements

### Minimum
- **CPU**: 4 cores, 2.5GHz+
- **RAM**: 16GB
- **GPU**: NVIDIA GTX 1060 6GB (CUDA support required)
- **Storage**: 10GB free space
- **Python**: 3.10+ (for manual installation)

### Recommended
- **CPU**: 8+ cores, 3.5GHz+
- **RAM**: 32GB+
- **GPU**: NVIDIA RTX 3080+ (12GB VRAM)
- **Storage**: SSD with 50GB+ free

## Credits

This desktop application is based on [sora2-watermark-remover-web-gui](https://github.com/tomateo1reg/sora2-watermark-remover-web-gui) by tomateo1reg and the SORA Video Suite Team.

Original project licensed under MIT License.

## Support

For issues or questions:
- [Report an issue](https://github.com/sunzhenyu/CleanMark/issues)
- [View documentation](../README.md)
