import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow any future doubao/sora/third-party tool routes that are
        // not part of the core Gemini watermark removal product — prevents
        // diluting the site's topical authority.
        disallow: [
          '/doubao-watermark-remover',
          '/zh/doubao-watermark-remover',
          '/sora-watermark-remover',
          '/zh/sora-watermark-remover',
          '/chatgpt-watermark-remover',
          '/zh/chatgpt-watermark-remover',
        ],
      },
    ],
    sitemap: 'https://cleanmark.org/sitemap.xml',
  }
}
