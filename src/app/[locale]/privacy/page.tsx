import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Privacy Policy - CleanMark',
  description: 'CleanMark privacy policy. We do not collect, store, or transmit any user data.',
};

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <img src="/logo.svg" alt="CleanMark" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-gray-900">CleanMark</h1>
            </Link>
            <Navigation />
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('lastUpdated')}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('overview.title')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('overview.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('dataCollection.title')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('dataCollection.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('localProcessing.title')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('localProcessing.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('extension.title')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('extension.content')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('extension.permissions.webRequest')}</li>
              <li>{t('extension.permissions.activeTab')}</li>
              <li>{t('extension.permissions.downloads')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('thirdParty.title')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('thirdParty.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('contact.title')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('contact.content')}</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← {t('backToHome')}
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
