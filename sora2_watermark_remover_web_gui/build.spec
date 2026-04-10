# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(
    ['main.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('core', 'core'),
        ('models', 'models'),
        ('processing', 'processing'),
        ('utils', 'utils'),
    ],
    hiddenimports=[
        'flask',
        'werkzeug',
        'torchvision',
        'tensorflow',
        'onnxruntime',
        'cv2',
        'av',
        'PIL',
        'numpy',
        'transformers',
        'diffusers',
        'core.server',
        'core.utils',
        'core.system_info',
        'processing.sora_process',
        'processing.analyzer',
        'processing.engine',
        'utils.video_io',
        'utils.image_utils',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='SoraWatermarkRemover',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=None,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='SoraWatermarkRemover',
)

# macOS app bundle
app = BUNDLE(
    coll,
    name='SoraWatermarkRemover.app',
    icon=None,
    bundle_identifier='com.cleanmark.sorawatermarkremover',
    info_plist={
        'NSPrincipalClass': 'NSApplication',
        'NSHighResolutionCapable': 'True',
    },
)
