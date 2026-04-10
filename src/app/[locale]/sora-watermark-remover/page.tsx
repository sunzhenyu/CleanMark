import { getTranslations } from 'next-intl/server';
import SoraWatermarkRemover from '@/components/SoraWatermarkRemover';
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
    title: 'Sora Watermark Remover - Remove Sora Video Watermark Free | CleanMark',
    description: 'Remove Sora AI video watermarks instantly with AI-powered processing. Free, fast, and high-quality. Support videos up to 100MB. No registration required.',
    path: '/sora-watermark-remover',
    locale,
    keywords: 'sora watermark remover, remove sora watermark, sora video watermark, ai watermark remover, video watermark removal, sora watermark, remove video watermark, free watermark remover',
  });
}

export default async function SoraPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'sora' });

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

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{t('title')}</h2>
          <p className="text-xl text-gray-600 mb-4">{t('subtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg">
              {t('badges.automatic')}
            </span>
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-lg">
              {t('badges.private')}
            </span>
            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-lg">
              {t('badges.quality')}
            </span>
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-lg">
              {t('badges.audio')}
            </span>
            <span className="px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-lg">
              {t('badges.fast')}
            </span>
          </div>
        </div>

        <SoraWatermarkRemover />

        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
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
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>{t('features.item5')}</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t('localDeploy.title')}</h3>
          <p className="text-gray-600 mb-4">{t('localDeploy.description')}</p>
          <ul className="space-y-1 text-gray-700 mb-4">
            {(['unlimited', 'faster', 'free', 'privacy'] as const).map((key) => (
              <li key={key} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>{t(`localDeploy.features.${key}`)}</span>
              </li>
            ))}
          </ul>
          <div className="bg-gray-900 rounded-md p-3 mb-4 font-mono text-sm text-green-400 overflow-x-auto">
            {t('localDeploy.dockerCmd')}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://huggingface.co/spaces/sunhaoyu/SoraWatermarkCleaner"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg text-sm transition-colors"
            >
              🤗 {t('localDeploy.hfSpace')}
            </a>
            <a
              href="https://github.com/sunzhenyu/CleanMark/tree/main/sora_watermark_cleaner"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              ⭐ {t('localDeploy.github')}
            </a>
          </div>
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
