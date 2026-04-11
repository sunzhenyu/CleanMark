'use client';

import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const isZh = locale === 'zh';
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (path: string) => pathname.includes(path);
  const isDropdownActive = (items: { href: string; title?: string }[]) =>
    items.some((item) => pathname.includes(item.href));

  const dropdowns = {
    resources: {
      label: isZh ? '资源' : 'Resources',
      items: [
        { href: '/technology', label: isZh ? '技术原理' : 'Technology', title: 'Gemini Watermark Remover Technology' },
        { href: '/faq', label: isZh ? '常见问题' : 'FAQ', title: 'Gemini Watermark Remover FAQ' },
        { href: '/features', label: isZh ? '功能特性' : 'Features', title: 'CleanMark Features' },
        { href: '/changelog', label: isZh ? '更新日志' : 'Changelog', title: 'CleanMark Changelog' },
        { href: '/blog', label: isZh ? '博客' : 'Blog', title: 'Gemini Watermark Remover Blog' },
      ],
    },
    support: {
      label: isZh ? '支持' : 'Support',
      items: [
        { href: '/how-to-use', label: isZh ? '使用教程' : 'How to Use', title: 'How to Remove Gemini Watermarks' },
        { href: '/ai-studio-guide', label: isZh ? 'AI Studio 指南' : 'AI Studio Guide', title: 'Google AI Studio Watermark Removal Guide' },
        { href: '/contact', label: isZh ? '联系我们' : 'Contact', title: 'Contact CleanMark' },
      ],
    },
  };

  return (
    <nav className="flex items-center gap-1">
      <Link
        href="/gemini-watermark-remover"
        className={`px-3 py-2 text-sm rounded-md transition font-medium ${
          isActive('/gemini-watermark-remover')
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {isZh ? '免费在线工具' : 'Online Free Tool'}
      </Link>

      <Link
        href="/examples"
        className={`px-3 py-2 text-sm rounded-md transition ${
          isActive('/examples')
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {isZh ? '效果示例' : 'Examples'}
      </Link>

      <Link
        href="/download"
        className={`px-3 py-2 text-sm rounded-md transition ${
          isActive('/download')
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {isZh ? '下载' : 'Download'}
      </Link>

      {(Object.entries(dropdowns) as [keyof typeof dropdowns, { label: string; items: { href: string; label: string; title?: string }[] }][]).map(([key, { label, items }]) => (
        <div
          key={key}
          className="relative"
          onMouseEnter={() => setOpenMenu(key)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <button
            className={`px-3 py-2 text-sm rounded-md transition flex items-center gap-1 ${
              isDropdownActive(items)
                ? 'text-blue-600 bg-blue-50 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openMenu === key && (
            <div className="absolute top-full left-0 pt-1 z-50">
              <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[180px]">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    aria-label={item.title}
                    className={`block px-4 py-2 text-sm transition ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
