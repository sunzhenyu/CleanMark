import { useTranslations } from 'next-intl';
import WatermarkRemover from '@/components/WatermarkRemover';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

export const metadata = {
  title: 'Gemini Watermark Remover - Free & Privacy-First | CleanMark',
  description: 'Remove Gemini AI watermarks from generated images instantly. 100% free, privacy-first, client-side processing. No registration required.',
};

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="CleanMark - Gemini Watermark Remover" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-gray-900">CleanMark</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          {t('subtitle')}
        </p>

        {/* Main Component */}
        <WatermarkRemover />
      </section>

      {/* Chrome Extension Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gray-900 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">{t('extension.title')}</h3>
          <p className="text-gray-300 mb-6">{t('extension.description')}</p>
          <a
            href="https://chromewebstore.google.com/detail/cleanmark"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {t('extension.install')}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © 2026 CleanMark. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition">
                {t('footer.privacy')}
              </Link>
              <a
                href="https://github.com/sunzhenyu/CleanMark"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {t('footer.github')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
