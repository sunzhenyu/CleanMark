import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'CleanMark - AI Watermark Removal Tools',
  description: 'Professional watermark removal tools for AI-generated images. Remove Gemini, Doubao watermarks, or use manual eraser and logo overlay.',
};

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
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
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

        <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('whyChoose.title')}</h3>
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
