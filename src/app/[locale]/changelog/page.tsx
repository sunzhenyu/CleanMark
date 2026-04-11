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
    title: 'Changelog — CleanMark Gemini Watermark Remover',
    description: 'CleanMark version history. See what\'s new in each release of the Gemini Watermark Remover Chrome extension.',
    path: '/changelog',
    locale,
  });
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const releases = [
    {
      version: 'v1.3.0',
      date: '2026-04-01',
      tag: isZh ? '最新' : 'Latest',
      title: isZh ? 'Gemini Watermark Cleaner——完整站点上线' : 'Gemini Watermark Cleaner — Full Site Launch',
      changes: isZh
        ? [
            '上线 cleanmark.org 在线 Gemini Watermark Remover 工具',
            '新增拖拽上传图片支持',
            '提升 Nano Banana 水印检测精度',
            '新增多语言支持（英文、中文）',
          ]
        : [
            'Launched cleanmark.org with online Gemini Watermark Remover tool',
            'Added support for drag-and-drop image upload',
            'Improved Nano Banana watermark detection accuracy',
            'Added multi-language support (English, Chinese)',
          ],
    },
    {
      version: 'v1.2.0',
      date: '2026-03-01',
      tag: null,
      title: isZh ? 'Google AI Studio 支持' : 'Google AI Studio Support',
      changes: isZh
        ? [
            '完整支持 aistudio.google.com 水印去除',
            '提升 Nano Banana 水印的 Alpha 图精度',
            '扩展体积缩减至约 2MB',
            '通过 WebAssembly 优化提升性能',
          ]
        : [
            'Full support for aistudio.google.com watermark removal',
            'Improved alpha map precision for Nano Banana watermarks',
            'Reduced extension size to ~2MB',
            'Performance improvements via WebAssembly optimization',
          ],
    },
    {
      version: 'v1.1.0',
      date: '2026-02-01',
      tag: null,
      title: isZh ? '反向 Alpha 混合引擎' : 'Reverse Alpha Blending Engine',
      changes: isZh
        ? [
            '以反向 Alpha 混合算法替代 AI 推理',
            '处理时间从秒级缩短至毫秒级',
            '数学精确的水印去除——无近似处理',
            '零数据传输——完全本地处理',
          ]
        : [
            'Replaced AI inference with reverse alpha blending algorithm',
            'Processing time reduced from seconds to milliseconds',
            'Mathematically exact watermark removal — no approximation',
            'Zero data transmission — fully local processing',
          ],
    },
    {
      version: 'v1.0.0',
      date: '2026-01-01',
      tag: null,
      title: isZh ? '正式发布' : 'Official Launch',
      changes: isZh
        ? [
            'CleanMark Chrome 扩展首次发布',
            '智能检测 Gemini 图片下载',
            '隐私优先的本地处理架构',
            '支持 JPG、PNG、WebP 格式',
          ]
        : [
            'Initial release of CleanMark Chrome extension',
            'Smart detection for Gemini image downloads',
            'Privacy-first local processing architecture',
            'Support for JPG, PNG, WebP formats',
          ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '更新日志' : 'Changelog'}
          </h1>
          <p className="text-xl text-gray-600">
            {isZh
              ? 'CleanMark Gemini Watermark Remover 版本历史'
              : 'Version history for CleanMark Gemini Watermark Remover'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {releases.map((r) => (
            <div key={r.version} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-bold text-gray-900">{r.version}</span>
                {r.tag && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{r.tag}</span>
                )}
                <span className="text-sm text-gray-400 ml-auto">{r.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{r.title}</h3>
              <ul className="space-y-1.5">
                {r.changes.map((c) => (
                  <li key={c} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
