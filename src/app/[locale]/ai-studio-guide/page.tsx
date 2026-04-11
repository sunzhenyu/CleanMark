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
    title: 'Google AI Studio Watermark Remover — Remove Nano Banana Watermark | CleanMark',
    description: 'Remove Nano Banana watermarks from Google AI Studio images free. Get a clean result instantly — no registration, 100% private. Supports all AI Studio images.',
    path: '/ai-studio-guide',
    locale,
    keywords: 'Google AI Studio watermark remover, Nano Banana watermark remover, aistudio.google.com watermark, remove Gemini watermark AI Studio',
  });
}

const CHROME_EXTENSION_URL = 'https://chromewebstore.google.com/detail/cleanmark-watermark-remov/omfabachjmfmikmdnnlpfchejphmaiim';

export default async function AIStudioGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const steps = [
    {
      num: 1,
      title: isZh ? '在 AI Studio 生成并下载图片' : 'Generate and download your image from AI Studio',
      desc: isZh
        ? '正常使用 aistudio.google.com。下载生成的图片 — 图片中会嵌入 Nano Banana 水印。'
        : 'Use aistudio.google.com as you normally would. Download the generated image — it will have the Nano Banana watermark embedded.',
    },
    {
      num: 2,
      title: isZh ? '打开 CleanMark 在线工具' : 'Open the CleanMark online tool',
      desc: isZh
        ? '访问 cleanmark.org/gemini-watermark-remover。无需账号，无需登录 — 工具立即可用。'
        : 'Go to cleanmark.org/gemini-watermark-remover. No account, no sign-in — the tool is ready immediately.',
    },
    {
      num: 3,
      title: isZh ? '上传你的 AI Studio 图片' : 'Upload your AI Studio image',
      desc: isZh
        ? '将图片拖入上传区域，或点击"浏览文件"。支持任意分辨率的 JPG、PNG 和 WebP。'
        : 'Drag the image onto the upload area or click "Browse files". Supports JPG, PNG, and WebP at any resolution.',
    },
    {
      num: 4,
      title: isZh ? '获取干净的图片' : 'Get your clean image',
      desc: isZh
        ? 'Nano Banana 水印在不到一秒内去除完毕。点击下载保存结果 — 分辨率相同、质量相同、零瑕疵。'
        : 'The Nano Banana watermark is removed in under a second. Click Download to save the result — same resolution, same quality, zero artifacts.',
    },
  ];

  const features = [
    {
      icon: '🎯',
      title: isZh ? '数学精确' : 'Mathematically Exact',
      desc: isZh
        ? '我们逆向还原 Google 使用的精确 Alpha 合成操作 — 不是 AI 猜测，不是近似。每个受影响的像素都恢复到原始值。'
        : 'We reverse the exact alpha compositing operation Google uses — not an AI guess, not an approximation. Every affected pixel is restored to its original value.',
    },
    {
      icon: '🖼️',
      title: isZh ? '零质量损失' : 'Zero Quality Loss',
      desc: isZh
        ? '无重新编码，无压缩。输出图片与原始 AI Studio 输出具有相同的分辨率、色彩配置和清晰度。'
        : 'No re-encoding, no compression. The output image has the same resolution, color profile, and sharpness as the original AI Studio output.',
    },
    {
      icon: '🔒',
      title: isZh ? '100% 隐私保护' : '100% Private',
      desc: isZh
        ? '所有处理均在浏览器内的 WebAssembly 中运行。你的图片永远不会离开你的设备 — 即使是我们的服务器也不会收到。'
        : 'All processing runs in WebAssembly inside your browser. Your images never leave your device — not even to our servers.',
    },
    {
      icon: '⚡',
      title: isZh ? '不到 1 秒' : 'Under 1 Second',
      desc: isZh
        ? '无需运行 AI 模型，无需服务器往返。WebAssembly 中的纯数学运算在毫秒内完成，与图片大小无关。'
        : 'No AI model to run, no server round-trip. Pure math in WebAssembly completes in milliseconds regardless of image size.',
    },
  ];

  const faqs = [
    {
      q: isZh ? 'Chrome 扩展是否自动支持 AI Studio？' : 'Does the Chrome extension work on AI Studio automatically?',
      a: isZh
        ? 'Chrome 扩展目前支持在 gemini.google.com 上自动去除水印。对于 AI Studio 图片，请使用在线工具：从 AI Studio 下载图片后，上传至 cleanmark.org/gemini-watermark-remover。自动支持 AI Studio 的功能计划在未来版本中推出。'
        : 'The Chrome extension currently supports automatic watermark removal on gemini.google.com. For AI Studio images, use the online tool: download the image from AI Studio, then upload it to cleanmark.org/gemini-watermark-remover. Automatic AI Studio support is planned for a future release.',
    },
    {
      q: isZh ? 'Nano Banana 水印和 Gemini 水印是同一种吗？' : 'Is the Nano Banana watermark the same as the Gemini watermark?',
      a: isZh
        ? '它们使用相同的底层技术 — Alpha 合成 — 但应用于不同的平台。CleanMark 使用相同的反向 Alpha 混合算法处理两者。'
        : 'They use the same underlying technique — alpha compositing — but are applied on different platforms. CleanMark handles both using the same reverse alpha blending algorithm.',
    },
    {
      q: isZh ? '我的 AI Studio 图片数据安全吗？' : 'Is my AI Studio image data safe?',
      a: isZh
        ? '是的。所有处理均在浏览器本地进行。你的图片永远不会上传到任何服务器。'
        : 'Yes. All processing happens locally in your browser. Your images are never uploaded to any server.',
    },
    {
      q: isZh ? '支持所有 AI Studio 图片类型吗？' : 'Does it work on all AI Studio image types?',
      a: isZh
        ? '是的 — 支持任意分辨率的 JPG、PNG 和 WebP。去除基于水印图案，与图片内容无关。'
        : 'Yes — JPG, PNG, and WebP are all supported, at any resolution. The removal is based on the watermark pattern, not the image content.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-blue-600 border border-blue-200 rounded-full px-3 py-1 uppercase tracking-wide">Google AI Studio</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
            {isZh ? 'Google AI Studio 水印去除工具' : 'Google AI Studio Watermark Remover'}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {isZh ? (
              <>免费、即时去除 Google AI Studio 图片的 <strong>Nano Banana 水印</strong>，100% 隐私保护。无需注册。</>
            ) : (
              <>Remove <strong>Nano Banana watermarks</strong> from Google AI Studio images — free, instant, and 100% private. No registration required.</>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/gemini-watermark-remover"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition font-semibold shadow-md"
            >
              {isZh ? '打开在线工具 →' : 'Open Online Tool →'}
            </Link>
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition font-medium"
            >
              {isZh ? 'Chrome 扩展' : 'Chrome Extension'}
            </a>
          </div>
        </div>
      </section>

      {/* What is Nano Banana */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-2">
              {isZh ? '什么是 Nano Banana 水印？' : 'What is the Nano Banana watermark?'}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isZh ? (
                <>Google AI Studio（aistudio.google.com）会在所有 AI 生成图片上添加名为"Nano Banana"的水印。与标准 Gemini 水印一样，它使用 <strong>Alpha 合成</strong>技术应用 — 这是一种确定性的数学操作。CleanMark 精确逆向还原此操作，无任何质量损失地恢复原始像素值。</>
              ) : (
                <>Google AI Studio (aistudio.google.com) applies a watermark called "Nano Banana" to all AI-generated images. Like the standard Gemini watermark, it is applied using <strong>alpha compositing</strong> — a deterministic mathematical operation. CleanMark reverses this operation exactly, recovering the original pixel values without any quality loss.</>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* How to remove */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {isZh ? '如何去除 Google AI Studio 水印' : 'How to Remove Google AI Studio Watermarks'}
          </h2>

          <div className="space-y-6 mb-10">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm mt-0.5">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/gemini-watermark-remover"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl transition font-semibold shadow-md"
          >
            {isZh ? '立即去除 AI Studio 水印 →' : 'Remove AI Studio Watermark Now →'}
          </Link>
        </div>
      </section>

      {/* Why results are good */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isZh ? '为什么 CleanMark 对 AI Studio 图片效果这么好' : 'Why CleanMark Works So Well on AI Studio Images'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 flex gap-4 shadow-sm">
                <div className="text-2xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-blue-600">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            {isZh ? '立即去除 AI Studio 水印 →' : 'Remove Your AI Studio Watermark Now'}
          </h2>
          <p className="text-blue-200 mb-6 text-sm">
            {isZh ? '免费、即时、无需注册。上传图片，几秒内获得干净结果。' : 'Free, instant, no registration. Upload your image and get a clean result in seconds.'}
          </p>
          <Link
            href="/gemini-watermark-remover"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-blue-600 px-8 py-3.5 rounded-xl transition font-semibold"
          >
            {isZh ? '打开在线工具 →' : 'Open Online Tool →'}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
