import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/gemini-watermark-remover',
    '/doubao-watermark-remover',
    '/sora-watermark-remover',
    '/chatgpt-watermark-remover',
    '/manual-eraser',
    '/logo-overlay',
    '/privacy',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    // English version
    sitemap.push({
      url: `https://cleanmark.org${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.9,
      alternates: {
        languages: {
          en: `https://cleanmark.org${route}`,
          zh: `https://cleanmark.org/zh${route}`,
        },
      },
    });

    // Chinese version
    sitemap.push({
      url: `https://cleanmark.org/zh${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.9,
      alternates: {
        languages: {
          en: `https://cleanmark.org${route}`,
          zh: `https://cleanmark.org/zh${route}`,
        },
      },
    });
  });

  return sitemap;
}
