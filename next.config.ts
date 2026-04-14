import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    const oldPages = [
      '/doubao-watermark-remover',
      '/sora-watermark-remover',
      '/chatgpt-watermark-remover',
      '/manual-eraser',
      '/logo-overlay',
      '/download',
      '/how-to-use',
      '/ai-studio-guide',
    ];

    return oldPages.flatMap((path) => [
      {
        source: path,
        destination: '/gemini-watermark-remover',
        permanent: true,
      },
      {
        source: `/zh${path}`,
        destination: '/zh/gemini-watermark-remover',
        permanent: true,
      },
    ]);
  },
};

export default withNextIntl(nextConfig);
