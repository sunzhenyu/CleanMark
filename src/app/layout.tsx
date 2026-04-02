import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';

export const metadata = {
  title: 'Gemini Watermark Remover - Free & Privacy-First | CleanMark',
  description: 'Remove Gemini AI watermarks from generated images instantly. 100% free, privacy-first, client-side processing. No registration required.',
  keywords: 'Gemini watermark remover, remove Gemini watermark, AI watermark remover, Gemini AI, watermark removal tool, free watermark remover',
  authors: [{ name: 'CleanMark' }],
  openGraph: {
    title: 'Gemini Watermark Remover - Free & Privacy-First',
    description: 'Remove Gemini AI watermarks from generated images instantly. 100% free, no registration required.',
    url: 'https://cleanmark.org',
    siteName: 'CleanMark',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemini Watermark Remover - Free & Privacy-First',
    description: 'Remove Gemini AI watermarks from generated images instantly.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://cleanmark.org" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
