import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { Link } from '@/i18n/routing';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return genMeta({
    title: locale === 'zh' ? '博客 — Gemini Watermark Remover 使用技巧与指南 | CleanMark' : 'Blog — Gemini Watermark Remover Tips & Guides | CleanMark',
    description: locale === 'zh'
      ? 'Gemini 水印去除技巧、指南和更新。学习如何免费去除 Gemini 和 Nano Banana 水印。'
      : 'Tips, guides, and updates about Gemini watermark removal. Learn how to remove Gemini and Nano Banana watermarks from AI-generated images.',
    path: '/blog',
    locale,
    keywords: 'Gemini watermark removal guide, remove Nano Banana watermark, AI image watermark tips',
  });
}

const posts = {
  en: [
    {
      slug: 'what-is-gemini-watermark',
      title: 'What Is the Gemini Watermark and How to Remove It',
      date: '2026-04-01',
      excerpt: "Google Gemini adds a subtle watermark to every AI-generated image. Here's what it is, why it exists, and how CleanMark removes it in milliseconds.",
      tag: 'Guide',
    },
    {
      slug: 'nano-banana-watermark-explained',
      title: 'Nano Banana Watermark: What It Is and How to Remove It',
      date: '2026-03-15',
      excerpt: 'Google AI Studio uses a watermark called "Nano Banana." Learn what makes it different from the standard Gemini watermark and how to remove it for free.',
      tag: 'Guide',
    },
  ],
  zh: [
    {
      slug: 'what-is-gemini-watermark',
      title: 'Gemini 水印是什么？如何去除？',
      date: '2026-04-01',
      excerpt: 'Google Gemini 会在每张 AI 生成的图片上添加细微水印。本文介绍它是什么、为什么存在，以及 CleanMark 如何在毫秒内将其去除。',
      tag: '指南',
    },
    {
      slug: 'nano-banana-watermark-explained',
      title: 'Nano Banana 水印详解：是什么以及如何免费去除',
      date: '2026-03-15',
      excerpt: 'Google AI Studio 使用一种名为"Nano Banana"的水印。了解它与标准 Gemini 水印的区别，以及如何免费去除。',
      tag: '指南',
    },
  ],
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';
  const postList = isZh ? posts.zh : posts.en;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{isZh ? '博客' : 'Blog'}</h1>
          <p className="text-xl text-gray-600">{isZh ? 'Gemini 水印去除指南与技巧' : 'Guides and tips for removing Gemini watermarks'}</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {postList.map((post) => (
            <article key={post.slug} className="border border-gray-200 rounded-xl p-6 hover:border-blue-200 hover:shadow-sm transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{post.tag}</span>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}` as any} locale={locale as any} className="text-sm text-blue-600 font-medium hover:underline">
                {isZh ? '阅读全文 →' : 'Read more →'}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
