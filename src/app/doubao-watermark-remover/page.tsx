import { useTranslations } from 'next-intl';
import DoubaoWatermarkRemover from '@/components/DoubaoWatermarkRemover';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Doubao Watermark Remover - Free & Privacy-First | CleanMark',
  description: 'Remove Doubao AI watermarks from generated images instantly. 100% free, privacy-first, client-side processing.',
};

export default function DoubaoPage() {
  const t = useTranslations('doubao');

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

        <DoubaoWatermarkRemover />
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
