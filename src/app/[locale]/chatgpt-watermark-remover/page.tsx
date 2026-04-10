import { getTranslations } from 'next-intl/server';
import ChatGPTWatermarkRemover from '@/components/ChatGPTWatermarkRemover';
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
    title: 'ChatGPT Watermark Remover - Remove Hidden Characters Free | CleanMark',
    description: 'Remove hidden Unicode characters and invisible watermarks from ChatGPT text. Free, instant, 100% private — runs entirely in your browser.',
    path: '/chatgpt-watermark-remover',
    locale,
    keywords: 'chatgpt watermark remover, remove chatgpt watermark, hidden characters, zero width space, invisible characters, unicode cleaner, chatgpt text cleaner',
  });
}

export default async function ChatGPTPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'chatgpt' });

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
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{t('title')}</h2>
          <p className="text-xl text-gray-600 mb-4">{t('subtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-lg">
              {t('badges.private')}
            </span>
            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-lg">
              {t('badges.instant')}
            </span>
            <span className="px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-lg">
              {t('badges.free')}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <ChatGPTWatermarkRemover />
        </div>

        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t('whatIsIt.title')}</h3>
          <p className="text-gray-700 mb-4">{t('whatIsIt.body')}</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800 font-medium mb-2">{t('whatIsIt.examplesTitle')}</p>
            <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
              <li>{t('whatIsIt.example1')}</li>
              <li>{t('whatIsIt.example2')}</li>
              <li>{t('whatIsIt.example3')}</li>
              <li>{t('whatIsIt.example4')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.title')}</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>{t('features.item1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>{t('features.item2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>{t('features.item3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>{t('features.item4')}</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t('faq.title')}</h3>
          <div className="space-y-4">
            <details className="bg-white rounded-lg border border-gray-200 p-4">
              <summary className="font-medium cursor-pointer">{t('faq.q1')}</summary>
              <p className="mt-2 text-sm text-gray-700">{t('faq.a1')}</p>
            </details>
            <details className="bg-white rounded-lg border border-gray-200 p-4">
              <summary className="font-medium cursor-pointer">{t('faq.q2')}</summary>
              <p className="mt-2 text-sm text-gray-700">{t('faq.a2')}</p>
            </details>
            <details className="bg-white rounded-lg border border-gray-200 p-4">
              <summary className="font-medium cursor-pointer">{t('faq.q3')}</summary>
              <p className="mt-2 text-sm text-gray-700">{t('faq.a3')}</p>
            </details>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
