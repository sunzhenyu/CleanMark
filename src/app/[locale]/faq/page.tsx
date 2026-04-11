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
    title: 'FAQ — Gemini Watermark Remover | CleanMark',
    description: 'Common questions about CleanMark Gemini Watermark Remover — how it works, privacy, browser support, Nano Banana watermarks, and more answers.',
    path: '/faq',
    locale,
    keywords: 'Gemini watermark remover FAQ, Nano Banana watermark questions, CleanMark help',
  });
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const faqs = [
    {
      q: isZh ? 'Gemini 水印是什么？' : 'What is the Gemini watermark?',
      a: isZh
        ? 'Google Gemini 会在 AI 生成的图片上添加一个细微的水印，以表明该图片由 AI 创建。水印通过 Alpha 合成方式叠加，呈现为半透明覆盖层。CleanMark 通过数学方法逆向还原这一过程，恢复原始图像。'
        : 'Google Gemini adds a subtle watermark to AI-generated images to indicate they were created by AI. It is applied using alpha compositing and appears as a semi-transparent overlay. CleanMark reverses this process mathematically to restore the original image.',
    },
    {
      q: isZh ? 'Nano Banana 水印是什么？' : 'What is the Nano Banana watermark?',
      a: isZh
        ? 'Nano Banana 水印是 Google AI Studio（aistudio.google.com）使用的一种变体水印。CleanMark 可自动检测并去除标准 Gemini 水印和 Nano Banana 水印。'
        : 'The Nano Banana watermark is a variant used by Google AI Studio (aistudio.google.com). CleanMark detects and removes both the standard Gemini watermark and the Nano Banana watermark pattern automatically.',
    },
    {
      q: isZh ? '水印去除是如何工作的？' : 'How does the watermark removal work?',
      a: isZh
        ? 'CleanMark 使用反向 Alpha 混合算法。由于 Gemini 水印是通过已知的数学公式叠加的，我们可以精确地逆向还原——在毫秒内恢复原始像素值，无需任何 AI 推理。'
        : 'CleanMark uses a reverse alpha blending algorithm. Since the Gemini watermark is applied with a known mathematical formula, we can reverse it exactly — recovering original pixel values in milliseconds without any AI inference.',
    },
    {
      q: isZh ? 'CleanMark 真的免费吗？' : 'Is CleanMark really free?',
      a: isZh
        ? '是的，完全免费。无需账号、无需订阅、无使用限制。Chrome 扩展和在线工具均永久免费。'
        : 'Yes, completely free. No account, no subscription, no usage limits. The Chrome extension and online tool are both free forever.',
    },
    {
      q: isZh ? '我的图片数据安全吗？' : 'Is my image data safe?',
      a: isZh
        ? '所有处理均在您的浏览器本地完成，使用 JavaScript 和 WebAssembly。您的图片不会上传到任何服务器。图片数据的零字节会离开您的设备。'
        : 'All processing happens locally in your browser using JavaScript and WebAssembly. Your images are never uploaded to any server. Zero bytes of image data leave your device.',
    },
    {
      q: isZh ? '支持哪些浏览器？' : 'What browsers are supported?',
      a: isZh
        ? 'Chrome 扩展支持 Google Chrome 113 及以上版本。在线工具无需安装，可在任何现代浏览器中使用。'
        : 'The Chrome extension supports Google Chrome version 113 and above. The online tool works in any modern browser without installation.',
    },
    {
      q: isZh ? '它支持 Google AI Studio 吗？' : 'Does it work on Google AI Studio?',
      a: isZh
        ? '支持。CleanMark 可自动在 gemini.google.com 和 aistudio.google.com 上运行。'
        : 'Yes. CleanMark works automatically on both gemini.google.com and aistudio.google.com.',
    },
    {
      q: isZh ? '处理后水印仍然存在，为什么？' : 'The watermark still appears after processing. Why?',
      a: isZh
        ? '部分图片可能包含多层水印。CleanMark 去除的是下载时叠加的覆盖层水印。如果水印直接嵌入图片像素中，则需要使用在线工具进行手动处理。'
        : 'Some images may have multiple watermark layers. CleanMark removes the overlay watermark applied during download. If a watermark is embedded directly into the image pixels, it requires the online tool with manual processing.',
    },
    {
      q: isZh ? 'CleanMark 多久更新一次？' : 'How often is CleanMark updated?',
      a: isZh
        ? '我们定期发布更新，以保持与 Gemini 和 AI Studio 变更的兼容性、提升检测精度并添加新功能。更新通过 Chrome 网上应用店自动推送。'
        : 'We release updates regularly to maintain compatibility with Gemini and AI Studio changes, improve detection accuracy, and add new features. Updates are applied automatically via the Chrome Web Store.',
    },
    {
      q: isZh ? '我还有问题，如何获得帮助？' : 'I still have questions. How can I get help?',
      a: isZh
        ? '请访问我们的联系页面或在 GitHub 上提交 Issue。我们通常在 24 小时内回复。'
        : 'Visit our Contact page or open an issue on GitHub. We typically respond within 24 hours.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xl text-gray-600">
            {isZh
              ? '关于 Gemini Watermark Remover 和 Gemini Watermark Cleaner 的一切解答'
              : 'Everything you need to know about Gemini Watermark Remover and Gemini Watermark Cleaner'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 bg-blue-600 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          {isZh ? '准备好去除 Gemini 水印了吗？' : 'Ready to Remove Gemini Watermarks?'}
        </h2>
        <p className="text-blue-200 mb-6">
          {isZh ? '免费、即时、完全私密。' : 'Free, instant, and completely private.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://chromewebstore.google.com/detail/cleanmark-watermark-remov/omfabachjmfmikmdnnlpfchejphmaiim"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition"
          >
            {isZh ? 'Chrome 扩展' : 'Chrome Extension'}
          </a>
          <Link href="/gemini-watermark-remover" className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-xl font-medium transition">
            {isZh ? '在线工具 →' : 'Online Tool →'}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
