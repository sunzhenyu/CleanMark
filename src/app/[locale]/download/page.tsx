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
    title: 'Download Gemini Watermark Remover — Chrome Extension | CleanMark',
    description: 'Download CleanMark Gemini Watermark Remover Chrome extension. Free, automatic watermark removal from Gemini and AI Studio images on every download.',
    path: '/download',
    locale,
    keywords: 'download Gemini Watermark Remover, CleanMark Chrome extension download',
  });
}

const CHROME_EXTENSION_URL = 'https://chromewebstore.google.com/detail/cleanmark-watermark-remov/omfabachjmfmikmdnnlpfchejphmaiim';

export default async function DownloadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const extensionFeatures = isZh
    ? [
        '每次下载自动去除水印',
        '支持 gemini.google.com 和 aistudio.google.com',
        '毫秒级处理——无需等待',
        '约 2MB，内存占用极低',
        '无需账号或登录',
      ]
    : [
        'Automatic removal on every download',
        'Works on gemini.google.com and aistudio.google.com',
        'Millisecond processing — no waiting',
        '~2MB, minimal memory usage',
        'No account or login required',
      ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '下载 Gemini Watermark Remover' : 'Download Gemini Watermark Remover'}
          </h1>
          <p className="text-xl text-gray-600">
            {isZh
              ? '免费 Chrome 扩展——每次从 Gemini 下载图片时自动去除水印。'
              : 'Free Chrome extension — automatic watermark removal on every Gemini download.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Chrome Extension */}
          <div className="border-2 border-blue-200 rounded-2xl p-8 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="white"/>
                <circle cx="12" cy="12" r="4" fill="#4285F4"/>
                <path d="M12 8h8.5a10 10 0 0 0-17 0H12z" fill="#EA4335"/>
                <path d="M5.27 16.5L1.02 9A10 10 0 0 0 9.5 21.9L5.27 16.5z" fill="#34A853"/>
                <path d="M18.73 16.5L14.5 21.9A10 10 0 0 0 22.98 9L18.73 16.5z" fill="#FBBC05"/>
              </svg>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isZh ? 'Chrome 扩展' : 'Chrome Extension'}
                </h2>
                <p className="text-sm text-gray-500">
                  {isZh ? '推荐 · Chrome 113+' : 'Recommended · Chrome 113+'}
                </p>
              </div>
              <span className="ml-auto text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                {isZh ? '免费' : 'Free'}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              {isZh
                ? '安装一次，无需操心。每次从 Gemini 或 AI Studio 下载图片时，CleanMark 会自动去除 Gemini 和 Nano Banana 水印——无需任何手动操作。'
                : 'Install once and forget about it. CleanMark automatically removes Gemini and Nano Banana watermarks every time you download an image from Gemini or AI Studio — no manual steps required.'}
            </p>
            <ul className="space-y-2 mb-6">
              {extensionFeatures.map((item) => (
                <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-blue-500">✓</span> {item}
                </li>
              ))}
            </ul>
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-medium"
            >
              {isZh ? '添加到 Chrome——免费' : 'Add to Chrome — Free'}
            </a>
          </div>

          {/* Online Tool */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">🌐</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isZh ? '在线工具' : 'Online Tool'}
                </h2>
                <p className="text-sm text-gray-500">
                  {isZh ? '无需安装 · 任意浏览器' : 'No installation · Any browser'}
                </p>
              </div>
              <span className="ml-auto text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                {isZh ? '免费' : 'Free'}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              {isZh
                ? '不想安装扩展？使用在线工具上传任意 Gemini 图片，即可在浏览器中即时去除水印。'
                : 'Prefer not to install an extension? Use the online tool to upload any Gemini image and remove the watermark instantly in your browser.'}
            </p>
            <Link
              href="/gemini-watermark-remover"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition font-medium"
            >
              {isZh ? '打开在线工具 →' : 'Open Online Tool →'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
