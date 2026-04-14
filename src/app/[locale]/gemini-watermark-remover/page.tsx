import { getTranslations } from 'next-intl/server';
import WatermarkRemover from '@/components/WatermarkRemover';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { generateMetadata as genMeta } from '@/lib/metadata';
import Header from '@/components/Header';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return genMeta({
    title: 'Gemini Watermark Remover Online — Free Gemini Watermark Cleaner | CleanMark',
    description: 'Remove Gemini watermarks and Nano Banana watermarks free online. Erase Gemini AI watermarks instantly — no registration, no server upload, 100% private.',
    path: '/gemini-watermark-remover',
    locale,
    keywords: 'Gemini Watermark Remover, Gemini Watermark Cleaner, remove Gemini watermark online, Nano Banana watermark, Google AI Studio watermark remover',
  });
}

export default async function GeminiPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Gemini Watermark Remover',
            alternateName: 'Gemini Watermark Cleaner',
            url: 'https://cleanmark.org/gemini-watermark-remover',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Remove Gemini watermarks and Nano Banana watermarks from images free online. No registration required.',
          }),
        }}
      />

      <Header />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-base text-blue-600 font-medium mb-2">{t('titleSub')}</p>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <WatermarkRemover />


        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {(['privacy', 'free', 'fast', 'resize'] as const).map((key) => (
            <div key={key} className="bg-white rounded-lg p-5 shadow-sm text-center">
              <h3 className="font-semibold text-gray-900 mb-1">{t(`features.${key}.title`)}</h3>
              <p className="text-gray-600 text-sm">{t(`features.${key}.description`)}</p>
            </div>
          ))}
        </div>

        <section className="mt-12 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('howTo')}</h2>
          <p className="text-gray-700 mb-4">{t('howToDesc')}</p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{t('whyUse')}</h3>
          <ul className="text-gray-700 space-y-2">
            <li><strong>{t('whyFree')}</strong> {t('whyFreeDesc')}</li>
            <li><strong>{t('whyPrivacy')}</strong> {t('whyPrivacyDesc')}</li>
            <li><strong>{t('whyNoReg')}</strong> {t('whyNoRegDesc')}</li>
            <li><strong>{t('whyFast')}</strong> {t('whyFastDesc')}</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{t('featuresTitle')}</h3>
          <p className="text-gray-700">{t('featuresDesc')}</p>
        </section>

        {/* More Watermark Removal Products */}
        <section className="mt-16 py-12 bg-gray-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            {locale === 'zh' ? '更多水印去除工具' : 'More Watermark Removal Products'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            {/* ChatGPT Watermark Remover */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {locale === 'zh' ? 'ChatGPT 水印去除工具' : 'ChatGPT Watermark Remover'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {locale === 'zh'
                  ? '去除 ChatGPT 生成文本中嵌入的隐藏 Unicode 水印字符。粘贴文本即可获得干净版本 — 无数据上传，100% 隐私且免费。'
                  : 'Strip hidden Unicode watermark characters embedded in ChatGPT-generated text. Paste your text and get a clean version instantly — no data sent to any server, 100% private and free.'}
              </p>
              <p className="text-xs text-blue-600 mb-4">
                {locale === 'zh' ? '适用于：博客文章、文档、学术写作、内容再利用' : 'Ideal for: Blog posts, documents, academic writing, content repurposing'}
              </p>
              <a
                href="https://tools.cleanmark.org/chatgpt-watermark-remover"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                {locale === 'zh' ? '了解更多' : 'Learn More'}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Sora Watermark Remover */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {locale === 'zh' ? 'Sora 水印去除工具' : 'Sora Watermark Remover'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {locale === 'zh'
                  ? '使用专业工具去除 OpenAI Sora 视频水印。支持 MOV 和 MP4 格式。采用 AI 修复技术干净擦除 Sora 水印，同时保持视频质量。支持在线或本地 CLI 使用。'
                  : 'Remove OpenAI Sora video watermarks with our specialized tool. Supports MOV and MP4 formats. Powered by AI inpainting to cleanly erase the Sora watermark while preserving video quality. Works online or locally via CLI.'}
              </p>
              <p className="text-xs text-blue-600 mb-4">
                {locale === 'zh' ? '适用于：视频内容、社交媒体片段、演示文稿' : 'Ideal for: Video content, social media clips, presentations'}
              </p>
              <a
                href="https://tools.cleanmark.org/sora-watermark-remover"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                {locale === 'zh' ? '了解更多' : 'Learn More'}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Manual Eraser */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {locale === 'zh' ? '手动橡皮擦工具' : 'Manual Eraser'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {locale === 'zh'
                  ? '使用精确画笔工具完全控制。非常适合从图片中去除自定义水印、徽标或任何不需要的元素。可调节画笔大小，适用于细节工作或快速去除大面积区域。支持任何图片类型。'
                  : 'Take full control with our precision brush tool. Perfect for removing custom watermarks, logos, or any unwanted elements from your images. Adjust brush size for detailed work or quick removal of larger areas. Works with any image type.'}
              </p>
              <p className="text-xs text-blue-600 mb-4">
                {locale === 'zh' ? '适用于：自定义水印、文字去除、照片编辑' : 'Ideal for: Custom watermarks, text removal, photo editing'}
              </p>
              <a
                href="https://tools.cleanmark.org/manual-eraser"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                {locale === 'zh' ? '了解更多' : 'Learn More'}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}
