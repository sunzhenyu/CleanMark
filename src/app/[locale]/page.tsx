import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Footer from '@/components/Footer';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { generateMetadata as genMeta } from '@/lib/metadata';
import Header from '@/components/Header';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return genMeta({
    title: 'Gemini Watermark Remover & Cleaner — Free | CleanMark',
    description: 'Remove Gemini watermarks and Nano Banana watermarks free online. Instant Gemini Watermark Cleaner — no registration, 100% private. Chrome extension available.',
    path: '',
    locale,
    keywords: 'Gemini Watermark Remover, Gemini Watermark Cleaner, remove Gemini watermark, Nano Banana watermark remover, Google AI Studio watermark remover, free watermark remover',
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
    { icon: '📐', key: 'resize' },
  ] as const;

  const useCases = [
    { icon: '✍️', key: 'creators' },
    { icon: '🎨', key: 'designers' },
    { icon: '🔬', key: 'researchers' },
    { icon: '📚', key: 'educators' },
  ] as const;

  return (
    <main className="min-h-screen bg-white">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CleanMark',
              alternateName: ['Gemini Watermark Remover', 'Gemini Watermark Cleaner'],
              url: 'https://cleanmark.org',
              logo: 'https://cleanmark.org/logo.svg',
              description: 'Free Gemini Watermark Remover and Cleaner. Remove Gemini AI watermarks and Nano Banana watermarks from images instantly in your browser.',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Gemini Watermark Remover',
              alternateName: 'Gemini Watermark Cleaner',
              url: 'https://cleanmark.org/gemini-watermark-remover',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              description: 'Remove Gemini watermarks and Nano Banana watermarks from images free online. No registration required.',
            },
          ]),
        }}
      />

      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-600 mb-3 leading-tight">
            {t('hero.title')}
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t('hero.titleSub')}
          </h2>
          <p className="text-lg text-gray-500 font-medium mb-6">
            {t('hero.titleDesc')}
          </p>
          <p className="text-base text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Install CleanMark Chrome Extension — Auto Gemini Watermark Remover"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl transition shadow-md w-full sm:w-64 justify-center"
            >
              <ChromeIcon />
              <div className="text-left">
                <div className="font-bold text-sm leading-tight">{t('hero.ctaExtension')}</div>
                <div className="text-xs text-blue-200 leading-tight">{t('hero.ctaExtensionDesc')}</div>
              </div>
            </a>
            <a
              href={locale === 'zh' ? '/zh/gemini-watermark-remover' : '/gemini-watermark-remover'}
              title="Gemini Watermark Remover — Free Online Tool"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl transition shadow-md w-full sm:w-64 justify-center"
            >
              <span className="text-2xl">🌐</span>
              <div className="text-left">
                <div className="font-bold text-sm leading-tight">{t('hero.ctaOnline')}</div>
                <div className="text-xs text-orange-200 leading-tight">{t('hero.ctaOnlineDesc')}</div>
              </div>
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400">{t('hero.badge')}</p>

          {/* Auxiliary links */}
          <div className="mt-8 inline-flex items-center gap-4 border border-gray-200 rounded-xl px-6 py-3 text-sm bg-white shadow-sm">
            <a href={locale === 'zh' ? '/zh/how-to-use' : '/how-to-use'} title="How to Remove Gemini Watermarks — Step by Step Guide" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition">
              <span>📖</span> {locale === 'zh' ? '如何去除 Gemini 水印' : 'How to Remove Gemini Watermark'} <span>›</span>
            </a>
            <span className="text-gray-300">|</span>
            <a href={locale === 'zh' ? '/zh/ai-studio-guide' : '/ai-studio-guide'} title="Google AI Studio Watermark Remover Guide" className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition">
              <span>🎯</span> {locale === 'zh' ? 'AI Studio 水印去除' : 'AI Studio Watermark Remover'} <span>›</span>
            </a>
          </div>
        </div>
      </section>

      {/* Watermark-Free Results */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-blue-600 border border-blue-200 rounded-full px-3 py-1 uppercase tracking-wide">{t('results.badge')}</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-3">{t('results.title')}</h2>
            <p className="text-gray-600 max-w-xl mx-auto">{t('results.desc')}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden">
              <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full z-10">{t('results.before')}</span>
              <img src="/images/Before.png" alt="Gemini image with watermark" className="w-full h-auto" />
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">{t('results.after')}</span>
              <img src="/images/After.png" alt="Gemini image with watermark removed" className="w-full h-auto" />
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">{t('results.caption')}</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
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
        <div className="max-w-6xl mx-auto">
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
        <div className="max-w-5xl mx-auto">
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

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('howItWorks.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {([
              { num: '1', key: 'step1' },
              { num: '2', key: 'step2' },
              { num: '3', key: 'step3' },
              { num: '4', key: 'step4' },
            ] as const).map(({ num, key }) => (
              <div key={key} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {num}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
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
            <a
              href={locale === 'zh' ? '/zh/gemini-watermark-remover' : '/gemini-watermark-remover'}
              title="Gemini Watermark Remover — Free Online Tool"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-6 py-3.5 rounded-xl transition font-medium w-full sm:w-auto justify-center"
            >
              {t('hero.ctaOnline')} →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
