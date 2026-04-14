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
    title: 'Examples — Gemini Watermark Removal Results | CleanMark',
    description: 'Before & after examples of Gemini watermark removal. Real results from Google Gemini and AI Studio images — perfect pixel-level removal across all image types.',
    path: '/examples',
    locale,
    keywords: 'Gemini watermark removal examples, before after watermark removal, Nano Banana watermark example, remove Gemini logo from image',
  });
}

const examples = {
  en: [
    { before: '/images/Before.png', after: '/images/After.png', title: 'Perfect for Complex Scenes', description: 'Our Gemini Watermark Remover precisely targets the Nano Banana watermark pattern without touching any surrounding pixels — even in detailed, high-contrast images.', tag: 'Nano Banana Watermark' },
    { before: '/images/Before1.png', after: '/images/After1.png', title: 'Works on Solid & Gradient Backgrounds', description: 'CleanMark excels at removing Gemini watermarks from images with solid colors and gradients. The result is mathematically clean — zero artifacts, zero quality loss.', tag: 'Gradient Background' },
    { before: '/images/Before2.png', after: '/images/After2.png', title: 'Handles Busy & Textured Images', description: 'Even on images with rich textures and patterns, our Gemini Watermark Cleaner isolates and removes only the watermark layer — leaving every other detail intact.', tag: 'Textured Image' },
    { before: '/images/Before3.png', after: '/images/After3.png', title: 'Preserves Full Resolution & Quality', description: 'No compression, no re-encoding. The cleaned image is pixel-perfect — same resolution, same color profile, same file quality as the original Gemini output.', tag: 'Full Resolution' },
  ],
  zh: [
    { before: '/images/Before.png', after: '/images/After.png', title: '复杂场景完美处理', description: '我们的 Gemini Watermark Remover 精准定位 Nano Banana 水印图案，不影响任何周围像素 — 即使是细节丰富、高对比度的图片也同样适用。', tag: 'Nano Banana 水印' },
    { before: '/images/Before1.png', after: '/images/After1.png', title: '纯色与渐变背景同样出色', description: 'CleanMark 擅长去除纯色和渐变背景图片中的 Gemini 水印，结果数学精确 — 零瑕疵、零质量损失。', tag: '渐变背景' },
    { before: '/images/Before2.png', after: '/images/After2.png', title: '复杂纹理图片也能处理', description: '即使是纹理丰富的图片，我们的 Gemini Watermark Cleaner 也只去除水印层 — 其他所有细节完整保留。', tag: '纹理图片' },
    { before: '/images/Before3.png', after: '/images/After3.png', title: '完整保留分辨率与质量', description: '无压缩、无重新编码。处理后的图片像素级完美 — 与原始 Gemini 输出相同的分辨率、色彩配置和文件质量。', tag: '完整分辨率' },
  ],
};

export default async function ExamplesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';
  const exList = isZh ? examples.zh : examples.en;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold text-blue-600 border border-blue-200 rounded-full px-3 py-1 uppercase tracking-wide">{isZh ? '真实效果' : 'Real Results'}</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">{isZh ? 'Gemini Watermark Remover 效果展示' : 'Gemini Watermark Removal Examples'}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isZh
              ? <>查看我们免费 <strong>Gemini Watermark Remover</strong> 的真实处理效果 — 覆盖各种图片类型的前后对比。无修图，无润色，只有干净的结果。</>
              : <>See exactly what our free <strong>Gemini Watermark Remover</strong> delivers — before and after, across every image type. No editing, no retouching. Just clean results.</>
            }
          </p>
        </div>
      </section>

      {/* Example pairs */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-24">
          {exList.map((ex, i) => (
            <div key={i}>
              <div className="text-center mb-8">
                <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 rounded-full px-3 py-1 mb-3">{ex.tag}</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{ex.title}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">{ex.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-md">
                  <span className="absolute top-4 left-4 bg-gray-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 tracking-wide">{isZh ? '处理前' : 'BEFORE'}</span>
                  <img src={ex.before} alt={`Gemini image with watermark — ${ex.title}`} className="w-full h-auto block" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-md">
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 tracking-wide">{isZh ? '处理后' : 'AFTER'}</span>
                  <img src={ex.after} alt={`Gemini image with watermark removed — ${ex.title}`} className="w-full h-auto block" />
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                {isZh ? 'Gemini 水印即时去除 — 100% 免费，在浏览器本地处理' : 'Gemini watermark removed instantly — 100% free, processed locally in your browser'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Resize feature showcase */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-blue-600 border border-blue-200 rounded-full px-3 py-1 uppercase tracking-wide">
              {isZh ? '尺寸调整' : 'Resize Feature'}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-3">
              {isZh ? '去除水印的同时调整输出尺寸' : 'Remove Watermark & Resize in One Step'}
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              {isZh
                ? '无需额外工具 — 去除水印后直接设置目标尺寸，填写宽度或高度自动等比缩放，也可同时指定两个值。'
                : 'No extra tools needed — set your target size right after removing the watermark. Fill one dimension to auto-scale, or specify both for exact output.'}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src="/images/resize-example-new.png"
              alt={isZh ? '去除水印后调整图片尺寸示例' : 'Resize image after watermark removal example'}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* Why results are this good */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{isZh ? '为什么我们的 Gemini Watermark Remover 效果这么好' : 'Why Our Gemini Watermark Remover Works This Well'}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
              {isZh
                ? <>大多数水印去除工具使用 AI 修复 — 它们<em>猜测</em>水印下面是什么并填充。CleanMark 的做法根本不同。</>
                : <>Most watermark removers use AI inpainting — they <em>guess</em> what was under the watermark and fill it in. CleanMark does something fundamentally different.</>
              }
            </p>
          </div>
          <div className="bg-white border border-blue-100 rounded-2xl px-8 py-7 mb-6 text-center">
            <p className="text-gray-700 leading-relaxed">
              {isZh
                ? <>Google Gemini 使用 <strong>Alpha 合成</strong>添加水印 — 这是一种确定性的数学运算。我们知道精确的公式、精确的 Alpha 图和精确的水印像素。因此我们只需<strong>逆向运算</strong>即可精确还原原始像素值。</>
                : <>Google Gemini applies its watermark using <strong>alpha compositing</strong> — a deterministic mathematical operation. We know the exact formula, the exact alpha map, and the exact watermark pixels. So instead of guessing, we simply <strong>reverse the math</strong> to recover the original pixel values exactly.</>
              }
            </p>
            <p className="mt-3 text-sm text-gray-500">
              {isZh ? '结果：无模糊、无涂抹、无 AI 瑕疵 — 只有逐像素还原的原始图片。' : 'Result: no blur, no smearing, no AI artifacts — just the original image, restored pixel by pixel.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '🎯', en: ['Mathematically Exact', 'We reverse the exact operation Google uses — not an approximation, not a guess.'], zh: ['数学精确', '我们逆向 Google 使用的精确运算 — 不是近似，不是猜测。'] },
              { icon: '🖼️', en: ['Zero Quality Loss', 'Original resolution, original colors, original sharpness — nothing is re-encoded or compressed.'], zh: ['零质量损失', '原始分辨率、原始色彩、原始清晰度 — 无重新编码，无压缩。'] },
              { icon: '⚡', en: ['Under 100ms', 'Pure math in WebAssembly — no AI model, no server round-trip, no waiting.'], zh: ['100ms 以内', 'WebAssembly 纯数学运算 — 无 AI 模型，无服务器往返，无等待。'] },
            ].map((item) => (
              <div key={item.icon} className="bg-white rounded-xl p-5 text-center shadow-sm">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{isZh ? item.zh[0] : item.en[0]}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{isZh ? item.zh[1] : item.en[1]}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-xs text-gray-400">
            {isZh ? '想了解完整技术细节？' : 'Want the full technical breakdown?'}{' '}
            <Link href="/technology" className="text-blue-600 hover:underline">{isZh ? '查看技术原理 →' : 'Read how it works →'}</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto bg-blue-600 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{isZh ? '立即免费体验' : 'Try It Yourself — Free'}</h2>
          <p className="text-blue-200 mb-6 text-sm">{isZh ? '上传任意 Gemini 或 AI Studio 图片，几秒内获得干净结果。无需注册，不上传到服务器。' : 'Upload any Gemini or AI Studio image and get a clean result in seconds. No registration, no upload to servers.'}</p>
          <Link href="/gemini-watermark-remover" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-blue-600 px-8 py-3.5 rounded-xl transition font-semibold">
            {isZh ? '打开在线工具 →' : 'Open Online Tool →'}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
