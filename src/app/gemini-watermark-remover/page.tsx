import { useTranslations } from 'next-intl';
import WatermarkRemover from '@/components/WatermarkRemover';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Gemini Watermark Remover - Free & Privacy-First | CleanMark',
  description: 'Remove Gemini AI watermarks from images instantly. Free online tool with client-side processing. No registration, no uploads. Works with Google Gemini generated images.',
};

export default function GeminiPage() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="CleanMark" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-gray-900">CleanMark</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Navigation />
        </div>

        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        <WatermarkRemover />

        <section className="mt-16 prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Remove Gemini Watermark</h2>
          <p className="text-gray-700 mb-4">
            Our free Gemini watermark remover tool helps you remove watermarks from Google Gemini AI-generated images quickly and easily. Simply upload your image, and our tool processes it entirely in your browser.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Use Our Gemini Watermark Removal Tool?</h3>
          <ul className="text-gray-700 space-y-2">
            <li><strong>100% Free:</strong> No hidden costs or subscription fees</li>
            <li><strong>Privacy-First:</strong> All processing happens in your browser</li>
            <li><strong>No Registration:</strong> Start removing watermarks immediately</li>
            <li><strong>Fast Processing:</strong> Get results in seconds</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Features of Our Online Watermark Remover</h3>
          <p className="text-gray-700">
            This AI watermark remover is specifically designed for Google Gemini generated images. It works with all image formats and sizes, providing clean results without quality loss.
          </p>
        </section>
      </section>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">© 2026 CleanMark. All rights reserved.</div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700 hover:underline transition">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
