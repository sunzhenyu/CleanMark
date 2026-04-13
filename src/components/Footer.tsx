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

        {/* Featured On — infinite scroll marquee */}
        <div className="border-t border-gray-800 pt-8 mb-6">
          <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-5">Featured On</p>
          <div className="overflow-hidden">
            <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
              {[
                <a key="ph" href="https://www.producthunt.com/products/cleanmark-2/launches/cleanmark-2" target="_blank" rel="noopener noreferrer">
                  <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=cleanmark-2&theme=dark" alt="Featured on Product Hunt" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="dev" href="https://dev.to/dan_dan_26ba75efedd611b1f/how-i-built-a-free-browser-based-watermark-remover-using-canvas-api-1if3" target="_blank" rel="noopener noreferrer">
                  <img src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg" alt="Listed on DEV.to" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="tf" href="https://toolfame.com/item/cleanmark-watermark-remover" target="_blank" rel="noopener noreferrer">
                  <img src="https://toolfame.com/badge-light.svg" alt="Featured on toolfame.com" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="df" href="https://dofollow.tools" target="_blank" rel="noopener noreferrer">
                  <img src="https://dofollow.tools/badge/badge_transparent.svg" alt="Featured on Dofollow.Tools" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="smb" href="https://showmebest.ai" target="_blank" rel="noopener noreferrer">
                  <img src="https://showmebest.ai/badge/feature-badge-white.webp" alt="Featured on ShowMeBestAI" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="t0" href="https://turbo0.com/item/clean-watermark-gemini-watermark-remover" target="_blank" rel="noopener noreferrer">
                  <img src="https://img.turbo0.com/badge-listed-light.svg" alt="Listed on Turbo0" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="sf" href="https://startupfa.me/s/-18?utm_source=cleanmark.org" target="_blank" rel="noopener noreferrer">
                  <img src="https://startupfa.me/badges/featured/default.webp" alt="Featured on Startup Fame" style={{ height: '54px', width: 'auto' }} />
                </a>,
              ].concat([
                <a key="ph2" href="https://www.producthunt.com/products/cleanmark-2/launches/cleanmark-2" target="_blank" rel="noopener noreferrer">
                  <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=cleanmark-2&theme=dark" alt="Featured on Product Hunt" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="dev2" href="https://dev.to/dan_dan_26ba75efedd611b1f/how-i-built-a-free-browser-based-watermark-remover-using-canvas-api-1if3" target="_blank" rel="noopener noreferrer">
                  <img src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg" alt="Listed on DEV.to" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="tf2" href="https://toolfame.com/item/cleanmark-watermark-remover" target="_blank" rel="noopener noreferrer">
                  <img src="https://toolfame.com/badge-light.svg" alt="Featured on toolfame.com" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="df2" href="https://dofollow.tools" target="_blank" rel="noopener noreferrer">
                  <img src="https://dofollow.tools/badge/badge_transparent.svg" alt="Featured on Dofollow.Tools" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="smb2" href="https://showmebest.ai" target="_blank" rel="noopener noreferrer">
                  <img src="https://showmebest.ai/badge/feature-badge-white.webp" alt="Featured on ShowMeBestAI" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="t02" href="https://turbo0.com/item/clean-watermark-gemini-watermark-remover" target="_blank" rel="noopener noreferrer">
                  <img src="https://img.turbo0.com/badge-listed-light.svg" alt="Listed on Turbo0" style={{ height: '54px', width: 'auto' }} />
                </a>,
                <a key="sf2" href="https://startupfa.me/s/-18?utm_source=cleanmark.org" target="_blank" rel="noopener noreferrer">
                  <img src="https://startupfa.me/badges/featured/default.webp" alt="Featured on Startup Fame" style={{ height: '54px', width: 'auto' }} />
                </a>,
              ])}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
