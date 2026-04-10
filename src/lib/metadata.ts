import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: string;
  keywords?: string;
}

export function generateMetadata({
  title,
  description,
  path,
  locale,
  image = '/og-image.jpg',
  keywords
}: PageMetadata): Metadata {
  const baseUrl = 'https://cleanmark.org';
  const url = locale === 'en' ? `${baseUrl}${path}` : `${baseUrl}/zh${path}`;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}${path}`,
        zh: `${baseUrl}/zh${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'CleanMark',
      images: [{ url: `${baseUrl}${image}` }],
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${image}`],
    },
  };
}
