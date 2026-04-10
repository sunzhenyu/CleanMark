import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { generateMetadata as genMeta } from '@/lib/metadata';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return genMeta({
    title: 'CleanMark - AI Watermark Remover Tools',
    description: 'Remove AI watermarks instantly. Free tools for Gemini, Doubao watermarks, manual eraser, and logo overlay. 100% privacy, no registration required.',
    path: '',
    locale,
  });
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
    {
      title: t('features.gemini.title'),
      description: t('features.gemini.description'),
      useCase: t('features.gemini.useCase'),
      href: '/gemini-watermark-remover',
      button: t('features.gemini.button'),
    },
    {
      title: t('features.doubao.title'),
      description: t('features.doubao.description'),
      useCase: t('features.doubao.useCase'),
      href: '/doubao-watermark-remover',
      button: t('features.doubao.button'),
    },
    {
      title: t('features.manual.title'),
      description: t('features.manual.description'),
      useCase: t('features.manual.useCase'),
      href: '/manual-eraser',
      button: t('features.manual.button'),
    },
    {
      title: t('features.overlay.title'),
      description: t('features.overlay.description'),
      useCase: t('features.overlay.useCase'),
      href: '/logo-overlay',
      button: t('features.overlay.button'),
    },
  ];

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

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600 mb-4">{t('subtitle')}</p>
          <p className="text-sm text-blue-600 bg-blue-50 inline-block px-4 py-2 rounded-full">{t('badge')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.href}
              className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
              <p className="text-sm text-blue-600 mb-6">{feature.useCase}</p>
              <Link
                href={feature.href}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {feature.button}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('howItWorks.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('howItWorks.step1.title')}</h3>
              <p className="text-gray-600">{t('howItWorks.step1.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('howItWorks.step2.title')}</h3>
              <p className="text-gray-600">{t('howItWorks.step2.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('howItWorks.step3.title')}</h3>
              <p className="text-gray-600">{t('howItWorks.step3.description')}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">{t('solutions.title')}</h2>
          <p className="text-center text-gray-600 mb-8">{t('solutions.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🤖</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('solutions.gemini.title')}</h3>
                  <p className="text-gray-600 text-sm">{t('solutions.gemini.description')}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🤖</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('solutions.doubao.title')}</h3>
                  <p className="text-gray-600 text-sm">{t('solutions.doubao.description')}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎬</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('solutions.sora.title')}</h3>
                  <p className="text-gray-600 text-sm">{t('solutions.sora.description')}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✏️</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('solutions.custom.title')}</h3>
                  <p className="text-gray-600 text-sm">{t('solutions.custom.description')}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎨</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('solutions.branding.title')}</h3>
                  <p className="text-gray-600 text-sm">{t('solutions.branding.description')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-gray-700 text-sm">{t('solutions.tip')}</p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('whyChoose.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <p className="text-gray-700 font-medium">{t('whyChoose.privacy')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💯</div>
              <p className="text-gray-700 font-medium">{t('whyChoose.free')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <p className="text-gray-700 font-medium">{t('whyChoose.fast')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-gray-700 font-medium">{t('whyChoose.quality')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
