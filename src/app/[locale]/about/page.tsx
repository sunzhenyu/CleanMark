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
    title: 'About CleanMark — Gemini Watermark Remover',
    description: 'CleanMark is a free, privacy-first Gemini Watermark Remover. Learn about our mission to make AI image watermark removal effortless and transparent.',
    path: '/about',
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const values = [
    {
      icon: '🔒',
      title: isZh ? '隐私优先' : 'Privacy First',
      desc: isZh
        ? '所有处理均在您的设备本地完成。不上传图片、不收集数据、不追踪行为。您的文件永远不会离开您的浏览器。'
        : 'All processing happens locally on your device. No images are uploaded, no data is collected, no tracking. Your files never leave your browser.',
    },
    {
      icon: '💯',
      title: isZh ? '100% 免费' : 'Completely Free',
      desc: isZh
        ? 'CleanMark 永久免费——无套餐、无限制、无隐藏费用。我们相信帮助创作者的工具应该人人可用。'
        : 'CleanMark is free forever — no plans, no limits, no hidden fees. We believe tools that help creators should be accessible to everyone.',
    },
    {
      icon: '⚡',
      title: isZh ? '创新驱动' : 'Innovation Driven',
      desc: isZh
        ? '我们使用反向 Alpha 混合和 WebAssembly，在毫秒内实现数学精确的水印去除——无需 AI 推理。'
        : 'We use reverse alpha blending and WebAssembly to deliver mathematically exact watermark removal in milliseconds — no AI inference required.',
    },
    {
      icon: '🌍',
      title: isZh ? '易于使用' : 'Accessible',
      desc: isZh
        ? '提供 Chrome 扩展（自动去除）和在线工具（无需安装，任意浏览器可用）两种方式。'
        : 'Available as a Chrome extension for automatic removal and as an online tool that works in any browser without installation.',
    },
  ];

  const metrics = [
    { label: isZh ? '处理时间' : 'Processing Time', value: '<100ms' },
    { label: isZh ? '检测精度' : 'Detection Accuracy', value: '99.9%' },
    { label: isZh ? '上传数据' : 'Data Uploaded', value: '0 bytes' },
    { label: isZh ? '费用' : 'Cost', value: isZh ? '免费' : 'Free' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '关于 CleanMark' : 'About CleanMark'}
          </h1>
          <p className="text-xl text-gray-600">
            {isZh
              ? '我们构建免费、隐私优先的工具，让 AI 图像处理变得轻松自如。'
              : 'We build free, privacy-first tools that make AI image processing effortless.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isZh ? '我们的使命' : 'Our Mission'}
          </h2>
          <p className="text-gray-600 mb-4">
            {isZh
              ? 'CleanMark 的诞生是为了解决一个简单的问题：Google Gemini 会在 AI 生成的图片上添加水印，而此前没有免费、私密的方式来去除它。我们构建了 CleanMark 来改变这一现状。'
              : 'CleanMark was built to solve a simple problem: Google Gemini adds watermarks to AI-generated images, and there was no free, private way to remove them. We built CleanMark to change that.'}
          </p>
          <p className="text-gray-600 mb-12">
            {isZh
              ? '我们热衷于让图像处理变得轻松透明——帮助创作者、研究人员、设计师和教育工作者专注于自己的工作，而非技术摩擦。CleanMark 在后台无感处理水印去除，让您无需为此分心。'
              : 'We are passionate about making image processing effortless and transparent — helping creators, researchers, designers, and educators focus on their work rather than technical friction. CleanMark handles the watermark removal invisibly in the background, so you never have to think about it.'}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {metrics.map((m) => (
              <div key={m.label} className="text-center bg-blue-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">{m.value}</div>
                <div className="text-sm text-gray-600">{m.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {isZh ? '我们的价值观' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-900 rounded-xl p-8 text-white">
            <h2 className="text-xl font-bold mb-3">
              {isZh ? '开源项目' : 'Open Source'}
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              {isZh
                ? 'CleanMark 是开源项目。您可以查看代码、参与贡献或在其基础上进行开发。'
                : 'CleanMark is open source. You can inspect the code, contribute, or build on top of it.'}
            </p>
            <a
              href="https://github.com/sunzhenyu/CleanMark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              {isZh ? '在 GitHub 上查看 →' : 'View on GitHub →'}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
