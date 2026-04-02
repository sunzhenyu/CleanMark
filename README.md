# CleanMark - Free Watermark Remover

A free, privacy-first tool to remove Gemini watermarks from AI-generated images.

## Features

- 🔒 **Privacy First** - All processing happens in your browser
- 💯 **100% Free** - No registration, no limits
- ⚡ **Lightning Fast** - Instant watermark removal
- 🌍 **International** - Supports English and Chinese

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **next-intl** - Internationalization
- **gemini-watermark-remover** - Core watermark removal engine

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

## Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── layout.tsx     # Locale-specific layout
│   │   │   └── page.tsx       # Home page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── LanguageSwitcher.tsx
│   │   └── WatermarkRemover.tsx
│   ├── i18n/
│   │   ├── request.ts         # i18n configuration
│   │   └── routing.ts         # Routing configuration
│   └── middleware.ts          # i18n middleware
├── messages/
│   ├── en.json                # English translations
│   └── zh.json                # Chinese translations
└── public/                    # Static assets
```

## License

MIT

## Credits

Built with [gemini-watermark-remover](https://github.com/GargantuaX/gemini-watermark-remover)
