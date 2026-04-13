'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const isZh = locale === 'zh';
  const href = (path: string) => isZh ? `/zh${path}` : path;

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
        { href: '/ai-studio-guide', label: t('aiStudio'), title: 'Google AI Studio Watermark Remover Guide' },
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
              <a href="https://github.com/sunzhenyu/CleanMark" target="_blank" rel="noopener noreferrer" title="CleanMark on GitHub" className="text-gray-400 hover:text-white transition text-sm">{t('github')}</a>
              <a href="https://x.com/DanDan344479" target="_blank" rel="noopener noreferrer" title="CleanMark on Twitter/X" className="text-gray-400 hover:text-white transition text-sm">{t('twitter')}</a>
              <a href="mailto:support@cleanmark.org" title="Email CleanMark Support" className="text-gray-400 hover:text-white transition text-sm">{t('email')}</a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-semibold mb-4 text-sm">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={href(link.href)} title={link.title} className="text-sm text-gray-400 hover:text-white transition">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured On */}
        <div className="border-t border-gray-800 pt-8 mb-6">
          <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-5">Featured On</p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <a href="https://www.producthunt.com/products/cleanmark-2/launches/cleanmark-2" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 transition text-sm text-gray-300 hover:text-white">
              <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 12H10V9h3.5a1.5 1.5 0 0 1 0 3zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1.5 5H8v10h2v-4h3.5a3.5 3.5 0 0 0 0-7z"/></svg>
              <span>Featured on <strong>Product Hunt</strong></span>
            </a>
            <a href="https://dev.to/dan_dan_26ba75efedd611b1f/how-i-built-a-free-browser-based-watermark-remover-using-canvas-api-1if3" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 transition text-sm text-gray-300 hover:text-white">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/></svg>
              <span>Listed on <strong>DEV.to</strong></span>
            </a>
            <a href="https://techblast.uk" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 transition text-sm text-gray-300 hover:text-white">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>Listed on <strong>TechBlast</strong></span>
            </a>
            <a href="https://toolfame.com/item/cleanmark-watermark-remover" target="_blank" rel="noopener noreferrer">
              <img src="https://toolfame.com/badge-light.svg" alt="Featured on toolfame.com" style={{ height: '54px', width: 'auto' }} />
            </a>
            <a href="https://dofollow.tools" target="_blank" rel="noopener noreferrer">
              <img src="https://dofollow.tools/badge/badge_transparent.svg" alt="Featured on Dofollow.Tools" width={200} height={54} />
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
