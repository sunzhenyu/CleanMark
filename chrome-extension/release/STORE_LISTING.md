# Chrome Web Store 商店列表信息

## 基本信息

**扩展名称：**
```
CleanMark - Watermark Remover
```

**简短描述（132 字符以内）：**
```
Remove Gemini AI watermarks from images instantly. Privacy-first, free, and works offline.
```

**详细描述：**
```
CleanMark helps you remove Gemini AI watermarks from generated images with one click.

✨ Features:
• One-click watermark removal
• Privacy-first: all processing happens locally
• Supports full-resolution images
• Works on Gemini web interface
• Free and open source

🔒 Privacy:
No images are uploaded to any server. All processing happens in your browser.

📖 How to use:
1. Visit Gemini and generate an image
2. Click the download button on any image
3. CleanMark automatically removes the watermark
4. Download the clean image

🌐 Visit cleanmark.org for more information.

⚠️ Note: This extension is designed for personal use with images you have generated. Please respect copyright and usage terms.
```

**类别：**
- Primary: Productivity
- Secondary: Photos

**语言：**
- English (英语)
- 中文 (简体)

## 权限说明

当审核团队询问权限时的回复：

**webRequest 权限：**
```
This permission is used to intercept image URLs from Gemini's servers (lh3.googleusercontent.com)
to obtain full-resolution images. When users click download, we need to map the preview blob URLs
to their corresponding full-resolution URLs. No data is collected or transmitted.
```

**activeTab 权限：**
```
Required to inject content scripts into the active Gemini tab to detect download button clicks
and process images.
```

**downloads 权限：**
```
Required to save the processed images to the user's download folder.
```

## 图标要求

需要准备以下尺寸的 PNG 图标：
- 16x16 (manifest)
- 48x48 (manifest)
- 128x128 (manifest + store listing)

当前图标是 SVG 格式，需要转换为 PNG。

## 截图要求

至少需要 1 张截图，推荐尺寸：
- 1280x800 (推荐)
- 640x400 (最小)

建议准备 2-3 张截图展示：
1. 在 Gemini 页面点击下载按钮
2. 水印去除前后对比
3. 下载完成的提示

## 宣传图片（可选但推荐）

- 小宣传图：440x280
- 大宣传图：920x680
- 横幅：1400x560

## 隐私政策

需要提供隐私政策 URL，建议在 cleanmark.org 创建页面：

```
CleanMark Privacy Policy

Last updated: [日期]

CleanMark is committed to protecting your privacy.

Data Collection:
CleanMark does not collect, store, or transmit any user data, images, or personal information.

Local Processing:
All image processing happens entirely in your browser. No images are sent to any server.

Permissions:
- webRequest: Used only to intercept image URLs for full-resolution access
- activeTab: Used only to detect download actions on Gemini pages
- downloads: Used only to save processed images to your device

Third-party Services:
CleanMark does not use any third-party analytics, tracking, or advertising services.

Contact:
For questions about this privacy policy, please visit cleanmark.org
```

## 支持 URL

建议设置：
- 支持网站：https://cleanmark.org
- 支持邮箱：support@cleanmark.org (如果有)

## 发布检查清单

- [ ] 构建并测试扩展
- [ ] 创建 ZIP 包
- [ ] 准备 PNG 图标（16, 48, 128）
- [ ] 准备截图（至少 1 张）
- [ ] 准备隐私政策页面
- [ ] 填写商店列表信息
- [ ] 设置支持 URL
- [ ] 提交审核
- [ ] 等待审核结果（1-3 个工作日）
