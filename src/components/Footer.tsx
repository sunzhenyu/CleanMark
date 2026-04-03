'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2026 CleanMark. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 text-sm justify-center">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              {t('privacy')}
            </Link>
            <a href="https://github.com/sunzhenyu/CleanMark" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
              {t('github')}
            </a>
            <a href="mailto:kuyadan136@gmail.com" className="text-gray-600 hover:text-gray-900">
              {t('email')}
            </a>
            <a href="https://x.com/DanDan344479" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
              {t('twitter')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
