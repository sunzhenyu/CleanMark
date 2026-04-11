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
    title: locale === 'zh' ? '如何使用 Gemini Watermark Remover | CleanMark' : 'How to Use Gemini Watermark Remover | CleanMark',
    description: locale === 'zh'
      ? '详细教程：如何使用 CleanMark 去除 Gemini 水印 — Chrome 扩展自动去除，或免费在线工具上传处理。无需注册，100% 隐私。'
      : 'Step-by-step guide to remove Gemini watermarks using CleanMark — Chrome extension or free online tool. Works on Gemini and Google AI Studio images. No registration, no uploads.',
    path: '/how-to-use',
    locale,
    keywords: 'how to remove Gemini watermark, Gemini Watermark Remover guide, install CleanMark extension',
  });
}

const CHROME_EXTENSION_URL = 'https://chromewebstore.google.com/detail/cleanmark-watermark-remov/omfabachjmfmikmdnnlpfchejphmaiim';

const content = {
  en: {
    badge: 'Guide',
    h1: 'How to Use Gemini Watermark Remover',
    intro: 'Two ways to remove Gemini watermarks — a Chrome extension that works automatically on download, or a free online tool you can use right now without installing anything.',
    m1badge: 'Method 1',
    m1title: 'Chrome Extension — Automatic',
    m1sub: 'Best for regular Gemini users. Install once, works automatically on every download.',
    m1steps: [
      { title: 'Install CleanMark from the Chrome Web Store', desc: 'Click "Add to Chrome" on the Chrome Web Store listing and confirm the prompt. Installs in seconds — no account or sign-in required.' },
      { title: 'Go to gemini.google.com and generate an image', desc: "Use Gemini as you normally would. The extension is already active — you don't need to configure anything." },
      { title: 'Click the download button on any Gemini image', desc: 'CleanMark intercepts the download automatically. It applies reverse alpha blending to remove the Nano Banana watermark in under 100ms.' },
      { title: 'Your clean image is saved', desc: 'The watermark-free image lands in your Downloads folder — same filename, same resolution, zero quality loss. No extra steps.' },
    ],
    m1hood: 'What happens under the hood',
    m1hoodDesc: 'When you click download, the extension intercepts the request and fetches the full-resolution image. It then applies reverse alpha blending — the mathematical inverse of how Google applies the watermark — to recover the original pixel values exactly. Everything runs in WebAssembly inside your browser. No data leaves your device.',
    m1cta: 'Add CleanMark to Chrome — Free',
    m2badge: 'Method 2',
    m2title: 'Online Tool — No Installation',
    m2sub: 'Works for any Gemini or Google AI Studio image. Upload and clean in seconds.',
    m2steps: [
      { title: 'Save the image from Gemini or AI Studio', desc: 'Download the image as usual from gemini.google.com or aistudio.google.com. It will have the Nano Banana watermark embedded.' },
      { title: 'Open the CleanMark online tool', desc: 'Go to cleanmark.org/gemini-watermark-remover. No sign-in, no account — the tool is ready immediately.' },
      { title: 'Drop or browse to upload your image', desc: 'Drag the image onto the upload area, or click "Browse files" to select it. Supports JPG, PNG, and WebP.' },
      { title: 'Download the clean result', desc: "Processing completes in under a second. Click Download to save the watermark-free image — same resolution, same quality." },
    ],
    m2cta: 'Open Online Tool →',
    faqTitle: 'Common Questions',
    faqs: [
      { q: 'Does the extension work automatically, or do I need to click something?', a: 'Fully automatic. Once installed, just download images from Gemini as you normally would. CleanMark intercepts every download silently — no extra clicks, no popups.' },
      { q: 'Does it work on Google AI Studio images?', a: "Yes. You can remove watermarks from Google AI Studio images using the online tool — download the image from AI Studio, then upload it to cleanmark.org/gemini-watermark-remover. The Chrome extension's automatic interception currently supports gemini.google.com; AI Studio auto-removal is planned for a future release." },
      { q: 'Is my image data safe?', a: 'All processing happens locally in your browser using WebAssembly. Your images are never uploaded to any server — not even ours. Zero bytes leave your device.' },
      { q: 'What browsers are supported?', a: 'The Chrome extension works on Google Chrome (v113+) and Chromium-based browsers (Edge, Brave, Arc). The online tool works in any modern browser.' },
      { q: "What if the watermark isn't fully removed?", a: "CleanMark uses the exact mathematical inverse of Google's watermarking process, so removal is complete and pixel-perfect for all standard Gemini images. If you encounter an issue, try the online tool as an alternative and report it on GitHub." },
    ],
  },
  zh: {
    badge: '使用教程',
    h1: '如何使用 Gemini Watermark Remover',
    intro: '两种方式去除 Gemini 水印 — Chrome 扩展下载时自动处理，或免费在线工具无需安装即可使用。',
    m1badge: '方式一',
    m1title: 'Chrome 扩展 — 自动去除',
    m1sub: '适合经常使用 Gemini 的用户。安装一次，每次下载自动处理。',
    m1steps: [
      { title: '从 Chrome 网上应用店安装 CleanMark', desc: '点击 Chrome 网上应用店页面的"添加至 Chrome"并确认提示。几秒内完成安装 — 无需账号或登录。' },
      { title: '打开 gemini.google.com 并生成图片', desc: '像往常一样使用 Gemini。扩展已自动激活 — 无需任何配置。' },
      { title: '点击任意 Gemini 图片的下载按钮', desc: 'CleanMark 自动拦截下载请求，在 100ms 内通过反向 Alpha 混合算法去除 Nano Banana 水印。' },
      { title: '干净图片自动保存', desc: '无水印图片保存到您的下载文件夹 — 文件名相同、分辨率相同、零质量损失。无需额外操作。' },
    ],
    m1hood: '技术原理',
    m1hoodDesc: '当您点击下载时，扩展拦截请求并获取完整分辨率图片，然后应用反向 Alpha 混合算法 — 即 Google 添加水印操作的数学逆运算 — 精确还原原始像素值。整个过程在浏览器内通过 WebAssembly 运行，数据不会离开您的设备。',
    m1cta: '免费安装 CleanMark Chrome 扩展',
    m2badge: '方式二',
    m2title: '在线工具 — 无需安装',
    m2sub: '支持任意 Gemini 或 Google AI Studio 图片，上传后几秒内完成处理。',
    m2steps: [
      { title: '从 Gemini 或 AI Studio 保存图片', desc: '像往常一样从 gemini.google.com 或 aistudio.google.com 下载图片，图片中会包含 Nano Banana 水印。' },
      { title: '打开 CleanMark 在线工具', desc: '访问 cleanmark.org/gemini-watermark-remover。无需登录、无需账号 — 工具立即可用。' },
      { title: '拖拽或浏览上传图片', desc: '将图片拖到上传区域，或点击"浏览文件"选择。支持 JPG、PNG 和 WebP 格式。' },
      { title: '下载干净结果', desc: '不到一秒完成处理。点击下载保存无水印图片 — 分辨率和质量完全不变。' },
    ],
    m2cta: '打开在线工具 →',
    faqTitle: '常见问题',
    faqs: [
      { q: '扩展是自动工作的吗，还是需要手动操作？', a: '完全自动。安装后，像往常一样从 Gemini 下载图片即可。CleanMark 静默拦截每次下载 — 无需额外点击，无弹窗。' },
      { q: '支持 Google AI Studio 的图片吗？', a: '支持。您可以通过在线工具去除 AI Studio 图片的水印 — 从 AI Studio 下载图片后，上传到 cleanmark.org/gemini-watermark-remover 即可。Chrome 扩展的自动拦截目前支持 gemini.google.com，AI Studio 自动支持即将推出。' },
      { q: '我的图片数据安全吗？', a: '所有处理通过 WebAssembly 在浏览器本地完成。您的图片不会上传到任何服务器 — 包括我们的服务器。零字节离开您的设备。' },
      { q: '支持哪些浏览器？', a: 'Chrome 扩展支持 Google Chrome（v113+）及基于 Chromium 的浏览器（Edge、Brave、Arc）。在线工具支持所有现代浏览器。' },
      { q: '如果水印没有完全去除怎么办？', a: 'CleanMark 使用 Google 水印操作的精确数学逆运算，对所有标准 Gemini 图片的去除效果完整且像素级精确。如遇问题，请尝试在线工具并在 GitHub 上反馈。' },
    ],
  },
};

export default async function HowToUsePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = locale === 'zh' ? content.zh : content.en;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-blue-600 border border-blue-200 rounded-full px-3 py-1 uppercase tracking-wide">{c.badge}</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">{c.h1}</h1>
          <p className="text-lg text-gray-600 mb-8">{c.intro}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition font-semibold shadow-md">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="white"/>
                <circle cx="12" cy="12" r="4" fill="#4285F4"/>
                <path d="M12 8h8.5a10 10 0 0 0-17 0H12z" fill="#EA4335"/>
                <path d="M5.27 16.5L1.02 9A10 10 0 0 0 9.5 21.9L5.27 16.5z" fill="#34A853"/>
                <path d="M18.73 16.5L14.5 21.9A10 10 0 0 0 22.98 9L18.73 16.5z" fill="#FBBC05"/>
              </svg>
              Chrome Extension
            </a>
            <Link href="/gemini-watermark-remover"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition font-semibold">
              {c.m2cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Method 1 */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">{c.m1badge}</span>
            <h2 className="text-2xl font-bold text-gray-900">{c.m1title}</h2>
          </div>
          <p className="text-gray-500 text-sm mb-8">{c.m1sub}</p>
          <div className="space-y-6">
            {c.m1steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm mt-0.5">{i + 1}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">{c.m1hood}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{c.m1hoodDesc}</p>
          </div>
          <div className="mt-6">
            <a href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl transition font-semibold shadow-md">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="white"/>
                <circle cx="12" cy="12" r="4" fill="#4285F4"/>
                <path d="M12 8h8.5a10 10 0 0 0-17 0H12z" fill="#EA4335"/>
                <path d="M5.27 16.5L1.02 9A10 10 0 0 0 9.5 21.9L5.27 16.5z" fill="#34A853"/>
                <path d="M18.73 16.5L14.5 21.9A10 10 0 0 0 22.98 9L18.73 16.5z" fill="#FBBC05"/>
              </svg>
              {c.m1cta}
            </a>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100 max-w-3xl mx-auto" />

      {/* Method 2 */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{c.m2badge}</span>
            <h2 className="text-2xl font-bold text-gray-900">{c.m2title}</h2>
          </div>
          <p className="text-gray-500 text-sm mb-8">{c.m2sub}</p>
          <div className="space-y-6">
            {c.m2steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm mt-0.5">{i + 1}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/gemini-watermark-remover"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl transition font-semibold shadow-md">
              {c.m2cta}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
