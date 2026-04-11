'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Navigation() {
  const t = useTranslations('nav');

  return (
    <Link
      href="/gemini-watermark-remover"
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
    >
      {t('tryNow')}
    </Link>
  );
}
