import { getTranslations } from 'next-intl/server';
import WatermarkRemover from '@/components/WatermarkRemover';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { generateMetadata as genMeta } from '@/lib/metadata';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return genMeta({
    title: 'Gemini Watermark Remover — Free Online Tool | CleanMark',
    description: 'Remove Google Gemini AI watermarks from images instantly. Free online tool, no registration, no upload to server. 100% private browser-based processing.',
    path: '/gemini-watermark-remover',
    locale,
  });
}

const CHROME_EXTENSION_URL = 'https://chromewebstore.google.com/detail/cleanmark-watermark-remov/omfabachjmfmikmdnnlpfchejphmaiim';

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
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="CleanMark" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">CleanMark</span>
          </Link>
          <div className="flex items-center gap-3">
            <Navigation />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('title')}</h1>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <WatermarkRemover />

        <div className="mt-8 flex justify-center">
          <a
            href={CHROME_EXTENSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition shadow-md"
          >
            <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="white"/>
              <circle cx="12" cy="12" r="4" fill="#4285F4"/>
              <path d="M12 8h8.5a10 10 0 0 0-17 0H12z" fill="#EA4335"/>
              <path d="M5.27 16.5L1.02 9A10 10 0 0 0 9.5 21.9L5.27 16.5z" fill="#34A853"/>
              <path d="M18.73 16.5L14.5 21.9A10 10 0 0 0 22.98 9L18.73 16.5z" fill="#FBBC05"/>
            </svg>
            <div className="text-left">
              <div className="font-bold text-sm leading-tight">Chrome Extension</div>
              <div className="text-xs text-blue-200 leading-tight">Ready to install · Auto-remove Gemini watermarks</div>
            </div>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['privacy', 'free', 'fast'] as const).map((key) => (
            <div key={key} className="bg-white rounded-lg p-5 shadow-sm text-center">
              <h3 className="font-semibold text-gray-900 mb-1">{t(`features.${key}.title`)}</h3>
              <p className="text-gray-600 text-sm">{t(`features.${key}.description`)}</p>
            </div>
          ))}
        </div>

        <section className="mt-12 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('howTo')}</h2>
          <p className="text-gray-700 mb-4">{t('howToDesc')}</p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{t('whyUse')}</h3>
          <ul className="text-gray-700 space-y-2">
            <li><strong>{t('whyFree')}</strong> {t('whyFreeDesc')}</li>
            <li><strong>{t('whyPrivacy')}</strong> {t('whyPrivacyDesc')}</li>
            <li><strong>{t('whyNoReg')}</strong> {t('whyNoRegDesc')}</li>
            <li><strong>{t('whyFast')}</strong> {t('whyFastDesc')}</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{t('featuresTitle')}</h3>
          <p className="text-gray-700">{t('featuresDesc')}</p>
        </section>
      </section>

      <Footer />
    </main>
  );
}
