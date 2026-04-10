'use client';

import { useTranslations } from 'next-intl';

export default function SoraWatermarkRemover() {
  const t = useTranslations('sora');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <div className="text-5xl mb-4">🎬</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{t('hfSpace.title')}</h3>
      <p className="text-gray-600 mb-6 max-w-lg mx-auto">{t('hfSpace.description')}</p>
      <a
        href="https://huggingface.co/spaces/sunhaoyu/SoraWatermarkCleaner"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors text-base"
      >
        🤗 {t('hfSpace.button')}
      </a>
      <p className="mt-4 text-xs text-gray-400">{t('hfSpace.note')}</p>
    </div>
  );
}
