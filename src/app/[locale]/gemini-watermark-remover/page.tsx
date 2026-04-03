import { getTranslations } from 'next-intl/server';
import WatermarkRemover from '@/components/WatermarkRemover';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const metadata = {
  title: 'Gemini Watermark Remover - Free & Privacy-First | CleanMark',
  description: 'Remove Gemini AI watermarks from images instantly. Free online tool with client-side processing. No registration, no uploads. Works with Google Gemini generated images.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function GeminiPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="CleanMark" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-gray-900">CleanMark</h1>
            </div>
            <Navigation />
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        <WatermarkRemover />

        <section className="mt-16 prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('howTo')}</h2>
          <p className="text-gray-700 mb-4">{t('howToDesc')}</p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('whyUse')}</h3>
          <ul className="text-gray-700 space-y-2">
            <li><strong>{t('whyFree')}</strong> {t('whyFreeDesc')}</li>
            <li><strong>{t('whyPrivacy')}</strong> {t('whyPrivacyDesc')}</li>
            <li><strong>{t('whyNoReg')}</strong> {t('whyNoRegDesc')}</li>
            <li><strong>{t('whyFast')}</strong> {t('whyFastDesc')}</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('featuresTitle')}</h3>
          <p className="text-gray-700">{t('featuresDesc')}</p>
        </section>
      </section>

      <Footer />
    </main>
  );
}
