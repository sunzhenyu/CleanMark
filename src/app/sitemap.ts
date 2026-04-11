import { MetadataRoute } from 'next'

const BASE_URL = 'https://cleanmark.org';

// Pages that should be indexed with their priority and change frequency
const pages = [
  // Core money pages — highest priority
  { path: '',                         priority: 1.0, freq: 'daily'   as const },
  { path: '/gemini-watermark-remover', priority: 1.0, freq: 'weekly'  as const },
  { path: '/ai-studio-guide',          priority: 0.9, freq: 'weekly'  as const },
  { path: '/how-to-use',               priority: 0.9, freq: 'weekly'  as const },
  { path: '/examples',                 priority: 0.8, freq: 'weekly'  as const },
  { path: '/technology',               priority: 0.8, freq: 'monthly' as const },
  { path: '/features',                 priority: 0.8, freq: 'monthly' as const },
  { path: '/faq',                      priority: 0.8, freq: 'weekly'  as const },
  // Supporting pages
  { path: '/download',                 priority: 0.7, freq: 'weekly'  as const },
  { path: '/blog',                     priority: 0.7, freq: 'weekly'  as const },
  { path: '/about',                    priority: 0.6, freq: 'monthly' as const },
  { path: '/contact',                  priority: 0.5, freq: 'monthly' as const },
  { path: '/changelog',                priority: 0.5, freq: 'weekly'  as const },
  // Legal — low priority, rarely changes
  { path: '/privacy',                  priority: 0.3, freq: 'yearly'  as const },
  { path: '/terms',                    priority: 0.3, freq: 'yearly'  as const },
];

const blogSlugs = [
  'what-is-gemini-watermark',
  'nano-banana-watermark-explained',
  'chrome-extension-vs-online-tool',
];

const lastMod = new Date('2026-04-11');

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Main pages — both locales
  for (const { path, priority, freq } of pages) {
    const enUrl = `${BASE_URL}${path || '/'}`;
    const zhUrl = `${BASE_URL}/zh${path}`;

    entries.push({
      url: enUrl,
      lastModified: lastMod,
      changeFrequency: freq,
      priority,
      alternates: { languages: { en: enUrl, zh: zhUrl } },
    });

    entries.push({
      url: zhUrl,
      lastModified: lastMod,
      changeFrequency: freq,
      priority: priority * 0.95, // zh slightly lower to signal en as canonical
      alternates: { languages: { en: enUrl, zh: zhUrl } },
    });
  }

  // Blog post detail pages
  for (const slug of blogSlugs) {
    const enUrl = `${BASE_URL}/blog/${slug}`;
    const zhUrl = `${BASE_URL}/zh/blog/${slug}`;

    entries.push({
      url: enUrl,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: { en: enUrl, zh: zhUrl } },
    });

    entries.push({
      url: zhUrl,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.65,
      alternates: { languages: { en: enUrl, zh: zhUrl } },
    });
  }

  return entries;
}
