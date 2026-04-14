'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const isZh = locale === 'zh';
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname.includes(path);
  const isDropdownActive = (items: { href: string }[]) =>
    items.some((item) => pathname.includes(item.href));

  const href = (path: string) => isZh ? `/zh${path}` : path;

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
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        <a
          href={href('/gemini-watermark-remover')}
          title="Gemini Watermark Remover — Free Online Tool"
          className={`px-3 py-2 text-sm rounded-md transition font-medium ${
            isActive('/gemini-watermark-remover')
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isZh ? '免费在线工具' : 'Free Online Tool'}
        </a>

        <a
          href={href('/examples')}
          title="Gemini Watermark Remover Examples"
          className={`px-3 py-2 text-sm rounded-md transition ${
            isActive('/examples')
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isZh ? '效果示例' : 'Examples'}
        </a>

        {(Object.entries(dropdowns) as [keyof typeof dropdowns, { label: string; items: { href: string; label: string; title: string }[] }][]).map(([key, { label, items }]) => (
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
                    <a
                      key={item.href}
                      href={href(item.href)}
                      title={item.title}
                      className={`block px-4 py-2 text-sm transition ${
                        isActive(item.href)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <a
          href={href('/contact')}
          title="Contact CleanMark"
          className={`px-3 py-2 text-sm rounded-md transition ${
            isActive('/contact')
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isZh ? '联系我们' : 'Contact'}
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-50">
          <div className="px-4 py-3 space-y-1">
            <a
              href={href('/gemini-watermark-remover')}
              className={`block px-3 py-2 text-sm rounded-md ${
                isActive('/gemini-watermark-remover')
                  ? 'text-blue-600 bg-blue-50 font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {isZh ? '免费在线工具' : 'Free Online Tool'}
            </a>
            <a
              href={href('/examples')}
              className={`block px-3 py-2 text-sm rounded-md ${
                isActive('/examples')
                  ? 'text-blue-600 bg-blue-50 font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {isZh ? '效果示例' : 'Examples'}
            </a>

            {(Object.entries(dropdowns) as [keyof typeof dropdowns, { label: string; items: { href: string; label: string; title: string }[] }][]).map(([key, { label, items }]) => (
              <div key={key}>
                <div className="px-3 py-2 text-sm font-medium text-gray-900">{label}</div>
                {items.map((item) => (
                  <a
                    key={item.href}
                    href={href(item.href)}
                    className={`block px-6 py-2 text-sm ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}

            <a
              href={href('/contact')}
              className={`block px-3 py-2 text-sm rounded-md ${
                isActive('/contact')
                  ? 'text-blue-600 bg-blue-50 font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {isZh ? '联系我们' : 'Contact'}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
