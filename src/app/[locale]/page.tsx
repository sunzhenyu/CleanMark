import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { generateMetadata as genMeta } from '@/lib/metadata';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return genMeta({
    title: 'Gemini Watermark Remover — Free & Private | CleanMark',
    description: 'Remove Gemini AI watermarks instantly. Free Chrome extension and online tool. No registration, no upload, 100% private. Works on Google Gemini and AI Studio images.',
    path: '',
    locale,
  });
}

const CHROME_EXTENSION_URL = 'https://chromewebstore.google.com/detail/cleanmark-watermark-remov/omfabachjmfmikmdnnlpfchejphmaiim';

function ChromeIcon() {
  return (
    <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="white"/>
      <circle cx="12" cy="12" r="4" fill="#4285F4"/>
      <path d="M12 8h8.5a10 10 0 0 0-17 0H12z" fill="#EA4335"/>
      <path d="M5.27 16.5L1.02 9A10 10 0 0 0 9.5 21.9L5.27 16.5z" fill="#34A853"/>
      <path d="M18.73 16.5L14.5 21.9A10 10 0 0 0 22.98 9L18.73 16.5z" fill="#FBBC05"/>
    </svg>
  );
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'homepage' });

  const features = [
    { icon: '🔍', key: 'detection' },
    { icon: '🔒', key: 'privacy' },
    { icon: '💯', key: 'free' },
    { icon: '⚡', key: 'fast' },
    { icon: '🌐', key: 'extension' },
    { icon: '🖼️', key: 'online' },
  ] as const;

  const useCases = [
    { icon: '✍️', key: 'creators' },
    { icon: '🎨', key: 'designers' },
    { icon: '🔬', key: 'researchers' },
    { icon: '📚', key: 'educators' },
  ] as const;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-blue-600 bg-blue-100 inline-block px-4 py-1.5 rounded-full mb-6">
            {t('hero.badge')}
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl transition shadow-md w-full sm:w-auto justify-center"
            >
              <ChromeIcon />
              <div className="text-left">
                <div className="font-bold text-sm leading-tight">{t('hero.ctaExtension')}</div>
                <div className="text-xs text-blue-200 leading-tight">{t('hero.ctaExtensionDesc')}</div>
              </div>
            </a>
            <Link
              href="/gemini-watermark-remover"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-900 px-6 py-3.5 rounded-xl transition shadow-sm font-medium w-full sm:w-auto justify-center"
            >
              {t('hero.ctaOnline')}
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('howItWorks.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '1', key: 'step1' },
              { num: '2', key: 'step2' },
              { num: '3', key: 'step3' },
            ].map(({ num, key }) => (
              <div key={key} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {num}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`howItWorks.${key}.title` as any)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(`howItWorks.${key}.description` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, key }) => (
              <div key={key} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`features.${key}.title` as any)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(`features.${key}.description` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('useCases.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map(({ icon, key }) => (
              <div key={key} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {t(`useCases.${key}.title` as any)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t(`useCases.${key}.description` as any)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('faq.title')}</h2>
          <div className="space-y-6">
            {(['q1', 'q2', 'q3', 'q4', 'q5'] as const).map((q) => {
              const a = q.replace('q', 'a') as 'a1' | 'a2' | 'a3' | 'a4' | 'a5';
              return (
                <div key={q} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{t(`faq.${q}` as any)}</h3>
                  <p className="text-gray-600 text-sm">{t(`faq.${a}` as any)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">{t('cta.title')}</h2>
          <p className="text-blue-200 mb-8">{t('cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-blue-600 px-6 py-3.5 rounded-xl transition shadow-md font-medium w-full sm:w-auto justify-center"
            >
              <ChromeIcon />
              <span>{t('hero.ctaExtension')}</span>
            </a>
            <Link
              href="/gemini-watermark-remover"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3.5 rounded-xl transition font-medium w-full sm:w-auto justify-center"
            >
              {t('hero.ctaOnline')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
