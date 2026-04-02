# CleanMark - Free AI Watermark Remover

<div align="center">

![CleanMark Logo](public/logo.svg)

**Remove AI watermarks from your images instantly**

[🌐 Live Demo](https://cleanmark.org) | [📖 Documentation](#getting-started) | [🐛 Report Bug](https://github.com/sunzhenyu/CleanMark/issues)

</div>

---

## 🎯 About

CleanMark is a free, open-source tool that removes watermarks from AI-generated images. All processing happens directly in your browser - no uploads, no tracking, complete privacy.

### Supported AI Tools

- ✅ **Google Gemini** - Remove "Made with Google AI" watermarks
- ✅ **Doubao (豆包)** - Remove "豆包AI生成" watermarks

## ✨ Features

- 🔒 **Privacy First** - 100% client-side processing, your images never leave your device
- 💯 **Completely Free** - No registration, no limits, no hidden costs
- ⚡ **Lightning Fast** - Instant watermark removal with advanced algorithms
- 🌍 **Multilingual** - Full support for English and Chinese
- 📱 **Responsive** - Works perfectly on desktop and mobile devices
- 🎨 **High Quality** - Preserves image quality while removing watermarks

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
│   │   ├── gemini-watermark-remover/    # Gemini tool page
│   │   ├── doubao-watermark-remover/    # Doubao tool page
│   │   ├── layout.tsx                   # Root layout
│   │   └── sitemap.ts                   # SEO sitemap
│   ├── components/
│   │   ├── WatermarkRemover.tsx         # Gemini remover component
│   │   ├── DoubaoWatermarkRemover.tsx   # Doubao remover component
│   │   ├── Navigation.tsx               # Tool navigation
│   │   └── LanguageSwitcher.tsx         # Language switcher
│   ├── lib/
│   │   └── doubao-watermark-remover/    # Doubao removal logic
│   └── middleware.ts                    # i18n middleware
├── messages/
│   ├── en.json                          # English translations
│   └── zh.json                          # Chinese translations
└── public/                              # Static assets
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
