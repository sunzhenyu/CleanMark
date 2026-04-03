'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname === '/en' || pathname === '/zh';
    return pathname.includes(path);
  };

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
      <Link
        href="/gemini-watermark-remover"
        className={`px-4 py-2 rounded-md transition ${
          isActive('gemini')
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {t('gemini')}
      </Link>
      <Link
        href="/doubao-watermark-remover"
        className={`px-4 py-2 rounded-md transition ${
          isActive('doubao')
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {t('doubao')}
      </Link>
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
