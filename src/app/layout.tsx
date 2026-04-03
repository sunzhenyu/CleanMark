import './globals.css';

export const metadata = {
  title: 'CleanMark - AI Watermark Remover Tools',
  description: 'Remove AI watermarks instantly. Free tools for Gemini, Doubao watermarks, manual eraser, and logo overlay. 100% privacy, no registration required.',
  keywords: 'watermark remover, AI watermark removal, Gemini watermark, Doubao watermark, manual eraser, logo overlay',
  authors: [{ name: 'CleanMark' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://cleanmark.org'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QQ6LXDV9FP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QQ6LXDV9FP');
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
