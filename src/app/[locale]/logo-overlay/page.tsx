import { useTranslations } from 'next-intl';
import LogoOverlay from '@/components/LogoOverlay';
import Navigation from '@/components/Navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export const metadata = {
  title: 'Logo Overlay - Cover Watermarks | CleanMark',
  description: 'Cover watermarks with your own logo. Upload your image and logos, position them to hide unwanted watermarks.',
};

export default async function LogoOverlayPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = useTranslations('overlay');

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

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        <LogoOverlay />

        <section className="mt-16 prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('howTo')}</h2>
          <p className="text-gray-700 mb-4">{t('howToDesc')}</p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('whyUse')}</h3>
          <ul className="text-gray-700 space-y-2">
            <li><strong>{t('whyFree')}</strong> {t('whyFreeDesc')}</li>
            <li><strong>{t('whyPrivacy')}</strong> {t('whyPrivacyDesc')}</li>
            <li><strong>{t('whyNoReg')}</strong> {t('whyNoRegDesc')}</li>
            <li><strong>{t('whyMultiple')}</strong> {t('whyMultipleDesc')}</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('features')}</h3>
          <p className="text-gray-700">{t('featuresDesc')}</p>
        </section>
      </section>

      <Footer />
    </main>
  );
}
