'use client';

import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <header className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Gemini Watermark Remover" className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-900">Gemini Watermark Remover</span>
        </Link>
        <div className="flex items-center gap-3">
          <Navigation />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
