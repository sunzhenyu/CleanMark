# CleanMark - Free AI Watermark Remover

<div align="center">

![CleanMark Logo](public/logo.svg)

**Remove AI watermarks from your images instantly**

[🌐 Live Demo](https://cleanmark.org) | [📖 Documentation](#getting-started) | [🐛 Report Bug](https://github.com/sunzhenyu/CleanMark/issues)

</div>

---

## 🎯 About

CleanMark is a free, open-source tool that removes watermarks from AI-generated images. All processing happens directly in your browser - no uploads, no tracking, complete privacy.

### All Tools

- ✅ **Gemini Watermark Remover** - Automatically remove Google Gemini AI watermarks
- ✅ **Doubao Watermark Remover** - Remove Doubao (豆包) AI watermarks instantly
- ✅ **Manual Eraser** - Precision brush tool for custom watermark removal
- ✅ **Logo Overlay** - Cover watermarks with your own logo or branding

## ✨ Features

- 🔒 **Privacy First** - 100% client-side processing, your images never leave your device
- 💯 **Completely Free** - No registration, no limits, no hidden costs
- ⚡ **Lightning Fast** - Instant watermark removal with advanced algorithms
- 🌍 **Multilingual** - Full support for English and Chinese
- 📱 **Responsive** - Works perfectly on desktop and mobile devices
- 🎨 **High Quality** - Preserves image quality while removing watermarks

## 📖 How to Use

### Simple 3-Step Process

1. **Upload Image** - Select or drag your image to the tool
2. **Process** - Automatic or manual watermark removal
3. **Download** - Get your clean image instantly

### Tool-Specific Instructions

#### Gemini & Doubao Watermark Remover
- Upload your AI-generated image
- The tool automatically detects and removes the watermark
- Download the cleaned image

#### Manual Eraser
- Upload any image with watermarks
- Adjust brush size for precision
- Paint over watermarks to remove them
- Download the result

#### Logo Overlay
- Upload your base image
- Add your logo(s) to the library
- Position and resize logos to cover watermarks
- Download the final image

## 🚀 Quick Start

### For Users

Visit [cleanmark.org](https://cleanmark.org) and start removing watermarks immediately - no installation required!

### For Developers

```bash
# Clone the repository
git clone https://github.com/sunzhenyu/CleanMark.git
cd CleanMark/website

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern styling
- **next-intl** - Internationalization
- **Canvas API** - Client-side image processing

## 📦 Deploy

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sunzhenyu/CleanMark)

1. Click the button above or push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

CleanMark can be deployed to any platform that supports Next.js:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Self-hosted with Node.js

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📁 Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── [locale]/                        # Localized routes
│   │   │   ├── gemini-watermark-remover/    # Gemini tool page
│   │   │   ├── doubao-watermark-remover/    # Doubao tool page
│   │   │   ├── manual-eraser/               # Manual eraser page
│   │   │   ├── logo-overlay/                # Logo overlay page
│   │   │   ├── privacy/                     # Privacy policy
│   │   │   ├── layout.tsx                   # Locale layout
│   │   │   └── page.tsx                     # Homepage
│   │   ├── layout.tsx                       # Root layout
│   │   └── sitemap.ts                       # SEO sitemap
│   ├── components/
│   │   ├── WatermarkRemover.tsx             # Gemini remover
│   │   ├── DoubaoWatermarkRemover.tsx       # Doubao remover
│   │   ├── ManualEraser.tsx                 # Manual eraser tool
│   │   ├── LogoOverlay.tsx                  # Logo overlay tool
│   │   ├── Navigation.tsx                   # Navigation bar
│   │   ├── Footer.tsx                       # Footer component
│   │   └── LanguageSwitcher.tsx             # Language switcher
│   ├── i18n/
│   │   └── routing.ts                       # i18n routing config
│   ├── lib/
│   │   ├── watermark-remover/               # Gemini removal logic
│   │   ├── doubao-watermark-remover/        # Doubao removal logic
│   │   └── metadata.ts                      # SEO metadata helper
│   └── middleware.ts                        # i18n middleware
├── messages/
│   ├── en.json                              # English translations
│   └── zh.json                              # Chinese translations
└── public/                                  # Static assets
```

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Credits

- [gemini-watermark-remover](https://github.com/GargantuaX/gemini-watermark-remover) - Gemini watermark removal algorithm
- [doubao-watermark-remover](https://github.com/ihmily/doubao-watermark-remover) - Doubao watermark removal algorithm

---

<div align="center">

Made with ❤️ by the CleanMark team

[⭐ Star us on GitHub](https://github.com/sunzhenyu/CleanMark) | [🐛 Report Issues](https://github.com/sunzhenyu/CleanMark/issues)

</div>
