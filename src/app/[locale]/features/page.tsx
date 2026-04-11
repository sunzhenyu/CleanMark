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
    title: 'Features — Gemini Watermark Remover | CleanMark',
    description: 'Explore CleanMark features: smart detection, reverse alpha blending, WebAssembly performance, privacy-first processing, and Chrome extension integration.',
    path: '/features',
    locale,
    keywords: 'Gemini Watermark Remover features, CleanMark features, watermark removal technology',
  });
}

export default async function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const features = [
    {
      icon: '🔍',
      title: isZh ? '智能检测' : 'Smart Detection',
      desc: isZh
        ? '通过实时 URL 监控和智能模式识别，自动检测来自 Gemini 和 Google AI Studio 的图片下载请求。零误报。'
        : 'Automatically detects image download requests from Gemini and Google AI Studio using real-time URL monitoring and intelligent pattern recognition. Zero false positives.',
      details: isZh
        ? ['实时 URL 监控', '完整覆盖 aistudio.google.com', '智能模式识别', '零误报']
        : ['Real-time URL monitoring', 'Full aistudio.google.com coverage', 'Intelligent pattern recognition', 'Zero false positives'],
    },
    {
      icon: '⚡',
      title: isZh ? '反向 Alpha 混合' : 'Reverse Alpha Blending',
      desc: isZh
        ? '通过数学逆向水印合成操作，实现革命性的毫秒级处理。无需 AI 推理——只需精确、即时的计算。'
        : 'Revolutionary millisecond processing using mathematical reversal of the watermark compositing operation. No AI inference — just precise, instant computation.',
      details: isZh
        ? ['毫秒级处理速度', '数学精确结果', '无需 AI 模型', '预计算 Alpha 图']
        : ['Millisecond processing speed', 'Mathematically exact results', 'No AI model required', 'Precomputed alpha maps'],
    },
    {
      icon: '🔒',
      title: isZh ? '隐私优先' : 'Privacy First',
      desc: isZh
        ? '所有处理均在您的浏览器本地完成。不上传图片、不收集数据、不追踪行为。您的文件永远不会离开您的设备。'
        : 'All processing happens locally in your browser. No images are uploaded, no data is collected, no tracking. Your files never leave your device.',
      details: isZh
        ? ['100% 本地处理', '零数据传输', '无需账号', '不分析图片']
        : ['100% local processing', 'Zero data transmission', 'No account required', 'No analytics on images'],
    },
    {
      icon: '🌐',
      title: isZh ? '透明体验' : 'Transparent Experience',
      desc: isZh
        ? '零配置、零摩擦。扩展无缝融入您正常的 Gemini 工作流——像往常一样下载图片即可。'
        : 'Zero configuration, zero friction. The extension integrates seamlessly into your normal Gemini workflow — just download images as usual.',
      details: isZh
        ? ['不打断工作流', '自动激活', '正常下载体验', '无需手动操作']
        : ['No workflow interruption', 'Automatic activation', 'Normal download experience', 'No manual steps'],
    },
    {
      icon: '🚀',
      title: isZh ? 'WebAssembly 性能' : 'WebAssembly Performance',
      desc: isZh
        ? '图片处理在 WebAssembly 中运行，接近原生 CPU 性能。扩展仅约 2MB，内存占用极低。'
        : 'Image processing runs in WebAssembly for near-native CPU performance. The extension is only ~2MB and uses minimal memory.',
      details: isZh
        ? ['接近原生速度', '~2MB 扩展体积', '低内存占用', '无需 GPU']
        : ['Near-native speed', '~2MB extension size', 'Low memory footprint', 'No GPU required'],
    },
    {
      icon: '🖼️',
      title: isZh ? '在线工具' : 'Online Tool',
      desc: isZh
        ? '没有扩展？没问题。将任意 Gemini 图片上传至 cleanmark.org，即可在浏览器中即时去除水印。'
        : 'No extension? No problem. Upload any Gemini image to cleanmark.org and remove the watermark instantly in your browser.',
      details: isZh
        ? ['无需安装', '支持任意浏览器', '支持拖拽上传', '即时下载']
        : ['No installation needed', 'Works in any browser', 'Drag and drop support', 'Instant download'],
    },
  ];

  const useCases = [
    {
      icon: '✍️',
      title: isZh ? '内容创作者' : 'Content Creators',
      desc: isZh
        ? '为社交媒体、博客、新闻通讯和营销材料提供干净的图片。'
        : 'Clean images for social media, blogs, newsletters, and marketing materials.',
    },
    {
      icon: '🔬',
      title: isZh ? '研究学者' : 'Research Scholars',
      desc: isZh
        ? '将 Gemini 生成的图表干净地导出，用于学术出版物和演示文稿。'
        : 'Export Gemini-generated diagrams cleanly for academic publications and presentations.',
    },
    {
      icon: '🎨',
      title: isZh ? '设计师' : 'Designers',
      desc: isZh
        ? '使用专业的无水印素材构建参考库和情绪板。'
        : 'Build reference libraries and mood boards with professional, watermark-free assets.',
    },
    {
      icon: '📚',
      title: isZh ? '教育工作者' : 'Educators',
      desc: isZh
        ? '在课程材料、演示文稿和教学辅助工具中使用 AI 生成的视觉内容。'
        : 'Use AI-generated visuals in course materials, presentations, and teaching aids.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isZh
              ? '强大功能，轻松去除 Gemini 水印'
              : 'Powerful Features for Effortless Gemini Watermark Removal'}
          </h1>
          <p className="text-xl text-gray-600">
            {isZh
              ? '去除 Gemini 和 Nano Banana 水印所需的一切——免费、快速、私密。'
              : 'Everything you need to remove Gemini and Nano Banana watermarks — free, fast, and private.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            {isZh ? '核心功能' : 'Core Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{f.desc}</p>
                <ul className="space-y-1">
                  {f.details.map((d) => (
                    <li key={d} className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="text-blue-500">✓</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            {isZh ? '适用人群' : 'Perfect For'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((u) => (
              <div key={u.title} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl flex-shrink-0">{u.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{u.title}</h3>
                  <p className="text-gray-600 text-sm">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
