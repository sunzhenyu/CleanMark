import { useTranslations } from 'next-intl';
import WatermarkRemover from '@/components/WatermarkRemover';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="CleanMark Logo" className="w-8 h-8" />
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
        <p className="text-xl text-gray-600 mb-2">
          {t('subtitle')}
        </p>
        <p className="text-sm text-gray-500 mb-12">
          {t('description')}
        </p>

        {/* Main Component */}
        <WatermarkRemover />
      </section>

      {/* Example */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-gray-50">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          {t('example.title')}
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-red-50 px-4 py-2 border-b border-red-200">
              <span className="text-red-700 font-medium">{t('example.before')}</span>
            </div>
            <img src="/source_pic.png" alt="Before" className="w-full h-auto" />
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-50 px-4 py-2 border-b border-green-200">
              <span className="text-green-700 font-medium">{t('example.after')}</span>
            </div>
            <img src="/clean_pic.png" alt="After" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* More Tools */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          {t('tools.title')}
        </h3>
        <div className="flex justify-center">
          <Link
            href="/notebooklm"
            className="px-8 py-4 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-900 hover:shadow-lg transition text-center"
          >
            <div className="text-2xl mb-2">📓</div>
            <span className="text-gray-900 font-medium">{t('tools.notebooklm')}</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">
              {t('features.privacy.title')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('features.privacy.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💯</div>
            <h3 className="text-lg font-semibold mb-2">
              {t('features.free.title')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('features.free.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">
              {t('features.fast.title')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('features.fast.description')}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
