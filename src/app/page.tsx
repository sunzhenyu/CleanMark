import { useTranslations } from 'next-intl';
import WatermarkRemover from '@/components/WatermarkRemover';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">CleanMark</h1>
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
