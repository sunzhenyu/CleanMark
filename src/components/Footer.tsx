'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');

  const columns = [
    {
      title: t('col1'),
      links: [
        { href: '/', label: t('home'), title: 'Gemini Watermark Remover — CleanMark Home' },
        { href: '/gemini-watermark-remover', label: 'Gemini Watermark Remover', title: 'Free Online Gemini Watermark Remover Tool' },
        { href: '/examples', label: t('examples'), title: 'Gemini Watermark Remover Examples' },
        { href: '/about', label: t('about'), title: 'About CleanMark Gemini Watermark Remover' },
        { href: '/download', label: t('download'), title: 'Download Gemini Watermark Remover Chrome Extension' },
      ],
    },
    {
      title: t('col2'),
      links: [
        { href: '/technology', label: t('technology'), title: 'Gemini Watermark Remover Technology' },
        { href: '/faq', label: t('faq'), title: 'Gemini Watermark Remover FAQ' },
        { href: '/features', label: t('features'), title: 'CleanMark Features' },
        { href: '/changelog', label: t('changelog'), title: 'CleanMark Changelog' },
        { href: '/blog', label: t('blog'), title: 'Gemini Watermark Remover Blog' },
      ],
    },
    {
      title: t('col3'),
      links: [
        { href: '/how-to-use', label: t('howToUse'), title: 'How to Remove Gemini Watermarks' },
        { href: '/ai-studio-guide', label: t('aiStudio'), title: 'Google AI Studio Watermark Removal Guide' },
        { href: '/contact', label: t('contact'), title: 'Contact CleanMark' },
        { href: '/privacy', label: t('privacy'), title: 'CleanMark Privacy Policy' },
        { href: '/terms', label: t('terms'), title: 'CleanMark Terms of Service' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.svg" alt="CleanMark" className="w-7 h-7" />
              <span className="text-white font-bold">Gemini Watermark Remover</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{t('tagline')}</p>
            <div className="flex gap-3">
              <a href="https://github.com/sunzhenyu/CleanMark" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-sm">{t('github')}</a>
              <a href="https://x.com/DanDan344479" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-sm">{t('twitter')}</a>
              <a href="mailto:support@cleanmark.org" className="text-gray-400 hover:text-white transition text-sm">{t('email')}</a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-semibold mb-4 text-sm">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href as any} className="text-sm text-gray-400 hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
