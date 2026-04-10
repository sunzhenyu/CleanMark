'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [isAIDropdownOpen, setIsAIDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname === '/en' || pathname === '/zh';
    return pathname.includes(path);
  };

  const isAIActive = isActive('gemini') || isActive('doubao') || isActive('sora');

  return (
    <nav className="flex gap-2 bg-gray-100 rounded-lg p-1">
      <Link
        href="/"
        className={`px-4 py-2 rounded-md transition ${
          isActive('/')
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {t('home')}
      </Link>

      <div
        className="relative"
        onMouseEnter={() => setIsAIDropdownOpen(true)}
        onMouseLeave={() => setIsAIDropdownOpen(false)}
      >
        <button
          className={`px-4 py-2 rounded-md transition flex items-center gap-1 ${
            isAIActive
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('aiRemover')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isAIDropdownOpen && (
          <div className="absolute top-full left-0 pt-2 -mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[200px] z-50">
            <Link
              href="/gemini-watermark-remover"
              className={`block px-4 py-2 transition ${
                isActive('gemini')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {t('gemini')}
            </Link>
            <Link
              href="/doubao-watermark-remover"
              className={`block px-4 py-2 transition ${
                isActive('doubao')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {t('doubao')}
            </Link>
            <Link
              href="/sora-watermark-remover"
              className={`block px-4 py-2 transition ${
                isActive('sora')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {t('sora')}
            </Link>
          </div>
        )}
      </div>

      <Link
        href="/manual-eraser"
        className={`px-4 py-2 rounded-md transition ${
          isActive('manual')
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {t('manual')}
      </Link>
      <Link
        href="/logo-overlay"
        className={`px-4 py-2 rounded-md transition ${
          isActive('logo-overlay')
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {t('overlay')}
      </Link>
    </nav>
  );
}
