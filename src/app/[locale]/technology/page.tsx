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
    title: 'Technology Behind Gemini Watermark Remover | CleanMark',
    description: 'How CleanMark removes Gemini watermarks using reverse alpha blending and WebAssembly. Millisecond processing, 100% local, zero data transmission.',
    path: '/technology',
    locale,
    keywords: 'Gemini watermark removal technology, reverse alpha blending, WebAssembly watermark remover',
  });
}

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const steps = [
    {
      title: isZh ? '拦截与识别' : 'Intercept & Identify',
      desc: isZh
        ? 'Chrome 扩展监控来自 Gemini 和 AI Studio 的下载请求，使用零误报的模式识别技术识别带水印的图片。'
        : 'The Chrome extension monitors download requests from Gemini and AI Studio, identifying watermarked images using pattern recognition with zero false positives.',
    },
    {
      title: isZh ? '反向 Alpha 混合' : 'Reverse Alpha Blending',
      desc: isZh
        ? '预计算的 Alpha 图精确定位每个水印像素。反向 Alpha 混合算法从数学上恢复原始像素值 — 无猜测，无近似。'
        : 'Precomputed alpha maps precisely locate every watermark pixel. The reverse alpha blending algorithm mathematically recovers the original pixel values — no guessing, no approximation.',
    },
    {
      title: isZh ? 'WebAssembly 重建' : 'WebAssembly Reconstruction',
      desc: isZh
        ? '像素还原在 WebAssembly 中以接近原生 CPU 速度运行。整个操作在 100ms 内完成，生成与原始图片无法区分的干净图片。'
        : 'Pixel restoration runs in WebAssembly at near-native CPU speed. The entire operation completes in under 100ms, producing a clean image indistinguishable from the original.',
    },
    {
      title: isZh ? '本地交付' : 'Local Delivery',
      desc: isZh
        ? '清理后的图片直接保存到你的设备。零字节离开你的浏览器 — 无服务器、无 API、无需账号。'
        : 'The cleaned image is saved directly to your device. Zero bytes leave your browser — no server, no API, no account required.',
    },
  ];

  const metrics = [
    { label: isZh ? '处理时间' : 'Processing Time', value: '<100ms' },
    { label: isZh ? '检测精度' : 'Detection Accuracy', value: '99.9%' },
    { label: isZh ? '扩展大小' : 'Extension Size', value: '~2MB' },
    { label: isZh ? '数据传输' : 'Data Transmitted', value: '0 bytes' },
  ];

  const advantages = [
    {
      icon: '🎯',
      title: isZh ? '数学精确' : 'Mathematically Exact',
      desc: isZh
        ? '我们逆向还原 Google 用于应用水印的精确 Alpha 合成操作。结果像素完美 — 不是 AI 估算，不是模糊修补。'
        : 'We reverse the exact alpha compositing operation Google uses to apply the watermark. The result is pixel-perfect — not an AI estimate, not a blur patch.',
    },
    {
      icon: '⚡',
      title: isZh ? '毫秒级，而非秒级' : 'Milliseconds, Not Seconds',
      desc: isZh
        ? '无 AI 模型推理，无云端往返。WebAssembly 中的纯数学运算在任何现代设备上均可在 100ms 内完成。'
        : 'No AI model inference, no cloud round-trip. Pure math in WebAssembly runs in under 100ms on any modern device.',
    },
    {
      icon: '🔒',
      title: isZh ? '零数据暴露' : 'Zero Data Exposure',
      desc: isZh
        ? '由于我们使用数学逆向而非云端 AI，你的图片永远不会离开浏览器。无上传、无服务器、无隐私风险。'
        : 'Because we use mathematical reversal instead of cloud AI, your images never leave your browser. No upload, no server, no privacy risk.',
    },
    {
      icon: '🖼️',
      title: isZh ? '无质量损失' : 'No Quality Loss',
      desc: isZh
        ? '清理后的图片保留原始分辨率、色彩配置和文件质量。无重新编码，无压缩瑕疵。'
        : 'The cleaned image retains the original resolution, color profile, and file quality. No re-encoding, no compression artifacts.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold text-blue-600 border border-blue-200 rounded-full px-3 py-1 uppercase tracking-wide">
            {isZh ? '技术原理' : 'Under the Hood'}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
            {isZh ? 'CleanMark 技术原理' : 'Technology Behind CleanMark'}
          </h1>
          <p className="text-lg text-gray-600">
            {isZh ? (
              <>反向 Alpha 混合 + WebAssembly — 数学精确的 <strong>Gemini 水印去除</strong>，完全在浏览器内完成。</>
            ) : (
              <>Reverse alpha blending + WebAssembly — mathematically exact <strong>Gemini watermark removal</strong>, entirely in your browser.</>
            )}
          </p>
        </div>
      </section>

      {/* Why we work better callout */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-10 py-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {isZh ? '为什么我们的 Gemini Watermark Remover 效果更好' : 'Why Our Gemini Watermark Remover Works Better'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isZh ? (
                <>与<em>猜测</em>水印下方内容的 AI 修复工具不同，CleanMark 使用<strong>反向 Alpha 混合</strong> — 即 Google 应用水印方式的数学逆运算。这意味着无模糊、无瑕疵，每次<strong>去除 Gemini 水印</strong>都能获得像素完美的结果。</>
              ) : (
                <>Unlike AI inpainting tools that <em>guess</em> what was under the watermark, CleanMark uses <strong>reverse alpha blending</strong> — the mathematical inverse of how Google applies the watermark. This means no blur, no artifacts, just a pixel-perfect result every time you <strong>remove a Gemini watermark</strong> from any image.</>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="text-center bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">{m.value}</div>
                <div className="text-sm text-gray-500">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages grid */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {isZh ? '核心优势' : 'What Makes the Difference'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {advantages.map((a) => (
              <div key={a.title} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="text-2xl flex-shrink-0">{a.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{a.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works steps */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {isZh ? '工作原理 — 分步说明' : 'How It Works — Step by Step'}
          </h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep dive */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {isZh ? '反向 Alpha 混合的数学原理' : 'The Math Behind Reverse Alpha Blending'}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isZh ? (
                <>Google Gemini 使用标准 Alpha 合成应用水印：<code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">C_out = α × C_watermark + (1 − α) × C_original</code>。由于 Alpha 图和水印颜色是已知常量，我们可以直接求解 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">C_original</code>。无机器学习，无近似 — 只是对每个受影响像素应用代数运算。</>
              ) : (
                <>Google Gemini applies its watermark using standard alpha compositing: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">C_out = α × C_watermark + (1 − α) × C_original</code>. Because the alpha map and watermark color are known constants, we can solve for <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">C_original</code> directly. No machine learning, no approximation — just algebra applied to every affected pixel.</>
              )}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {isZh ? '为什么使用 WebAssembly？' : 'Why WebAssembly?'}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isZh
                ? '对于大图片的逐像素操作，单纯的 JavaScript 速度太慢。WebAssembly 在浏览器内以接近原生 CPU 速度运行，让我们能在 100ms 内处理完整分辨率的 Gemini 图片 — 无需任何服务器、GPU 或外部依赖。'
                : 'JavaScript alone is too slow for per-pixel image operations on large images. WebAssembly runs at near-native CPU speed inside the browser, letting us process a full-resolution Gemini image in under 100ms — without any server, GPU, or external dependency.'}
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-8 text-white">
            <h2 className="text-lg font-bold mb-2">
              {isZh ? '隐私优先设计' : 'Privacy by Design'}
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isZh
                ? '由于 CleanMark 使用数学逆向而非云端 AI，你的图片无需离开你的设备。零字节被传输。无账号、无 API 密钥、无服务器 — 只是本地计算，在文件进入下载文件夹之前就已完成。'
                : 'Because CleanMark uses mathematical reversal rather than cloud AI, your images never need to leave your device. Zero bytes are transmitted. No account, no API key, no server — just local computation that completes before the file even hits your downloads folder.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {isZh ? '立即体验' : 'See It in Action'}
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            {isZh ? '上传任意 Gemini 图片，看水印在毫秒内消失。' : 'Upload any Gemini image and watch the watermark disappear in milliseconds.'}
          </p>
          <Link
            href="/gemini-watermark-remover"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl transition font-semibold"
          >
            {isZh ? '免费在线体验 →' : 'Try Free Online Tool →'}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
