import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { Link } from '@/i18n/routing';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const slugs = [
    'what-is-gemini-watermark',
    'nano-banana-watermark-explained',
  ];
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

const posts: Record<string, {
  en: { title: string; date: string; tag: string; content: React.ReactNode };
  zh: { title: string; date: string; tag: string; content: React.ReactNode };
}> = {
  'what-is-gemini-watermark': {
    en: {
      title: 'What Is the Gemini Watermark and How to Remove It',
      date: '2026-04-01',
      tag: 'Guide',
      content: null,
    },
    zh: {
      title: 'Gemini 水印是什么？如何去除？',
      date: '2026-04-01',
      tag: '指南',
      content: null,
    },
  },
  'nano-banana-watermark-explained': {
    en: {
      title: 'Nano Banana Watermark: What It Is and How to Remove It',
      date: '2026-03-15',
      tag: 'Guide',
      content: null,
    },
    zh: {
      title: 'Nano Banana 水印详解：是什么以及如何免费去除',
      date: '2026-03-15',
      tag: '指南',
      content: null,
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  const p = locale === 'zh' ? post.zh : post.en;
  return genMeta({
    title: `${p.title} | CleanMark`,
    description: p.title,
    path: `/blog/${slug}`,
    locale,
  });
}

function PostContent({ slug, isZh }: { slug: string; isZh: boolean }) {
  if (slug === 'what-is-gemini-watermark') {
    return isZh ? (
      <div className="prose prose-gray max-w-none">
        <p>Google Gemini 是 Google 最先进的 AI 图像生成工具之一。当你使用 Gemini 生成图片并下载时，图片中会嵌入一个不可见的水印。这个水印被称为 <strong>Gemini 水印</strong>，有时也叫 <strong>Nano Banana 水印</strong>（尤其是在 Google AI Studio 中）。</p>

        <h2>Gemini 水印是什么？</h2>
        <p>Gemini 水印是 Google 通过 <strong>Alpha 合成</strong>技术嵌入图片的标识。Alpha 合成是一种将水印图层与原始图片混合的数学操作。水印本身对人眼几乎不可见，但它确实改变了图片中每个受影响像素的颜色值。</p>
        <p>Google 添加这个水印的目的是标识图片由 AI 生成，符合 AI 内容透明度的行业规范。</p>

        <h2>为什么要去除 Gemini 水印？</h2>
        <p>对于内容创作者、设计师和研究人员来说，水印可能会影响图片在专业场景中的使用。常见原因包括：</p>
        <ul>
          <li>用于商业设计或客户项目</li>
          <li>发布到社交媒体或博客</li>
          <li>用于学术论文或报告中的插图</li>
          <li>制作演示文稿或教学材料</li>
        </ul>

        <h2>CleanMark 如何去除 Gemini 水印？</h2>
        <p>CleanMark 使用<strong>反向 Alpha 混合</strong>算法。由于 Google 使用确定性的数学公式添加水印，我们可以精确地逆向这个操作，还原每个像素的原始值。</p>
        <p>这与 AI 修复工具完全不同——AI 修复是"猜测"水印下面是什么，而 CleanMark 是数学精确地还原原始像素，<strong>零质量损失</strong>。</p>
        <p>整个过程在你的浏览器内通过 WebAssembly 完成，<strong>图片不会上传到任何服务器</strong>，100% 隐私安全。</p>

        <h2>两种使用方式</h2>
        <p><strong>Chrome 扩展</strong>：安装后，每次从 gemini.google.com 下载图片时自动去除水印，无需任何手动操作。</p>
        <p><strong>在线工具</strong>：无需安装，直接上传图片即可处理。同样支持 Google AI Studio 下载的图片。</p>
      </div>
    ) : (
      <div className="prose prose-gray max-w-none">
        <p>Google Gemini is one of Google's most advanced AI image generation tools. When you generate and download images from Gemini, a watermark is embedded in the image. This watermark is known as the <strong>Gemini watermark</strong> — sometimes called the <strong>Nano Banana watermark</strong> in Google AI Studio.</p>

        <h2>What Is the Gemini Watermark?</h2>
        <p>The Gemini watermark is applied using <strong>alpha compositing</strong> — a mathematical operation that blends a watermark layer with the original image. The watermark is nearly invisible to the human eye, but it does alter the color values of every affected pixel in the image.</p>
        <p>Google adds this watermark to identify images as AI-generated, in line with industry standards for AI content transparency.</p>

        <h2>Why Remove the Gemini Watermark?</h2>
        <p>For content creators, designers, and researchers, the watermark can interfere with professional use. Common reasons include:</p>
        <ul>
          <li>Commercial design work or client projects</li>
          <li>Publishing to social media or blogs</li>
          <li>Illustrations for academic papers or reports</li>
          <li>Presentations and teaching materials</li>
        </ul>

        <h2>How CleanMark Removes the Gemini Watermark</h2>
        <p>CleanMark uses <strong>reverse alpha blending</strong>. Because Google applies the watermark using a deterministic mathematical formula, we can precisely reverse that operation to recover the original pixel values.</p>
        <p>This is fundamentally different from AI inpainting tools that <em>guess</em> what was under the watermark. CleanMark mathematically restores the original pixels — <strong>zero quality loss, zero artifacts</strong>.</p>
        <p>Everything runs in your browser via WebAssembly. <strong>Your images are never uploaded to any server</strong> — 100% private.</p>

        <h2>Two Ways to Use CleanMark</h2>
        <p><strong>Chrome Extension</strong>: Install once, and every image you download from gemini.google.com is automatically cleaned — no manual steps.</p>
        <p><strong>Online Tool</strong>: No installation needed. Upload any Gemini or AI Studio image and get a clean result instantly.</p>
      </div>
    );
  }

  if (slug === 'nano-banana-watermark-explained') {
    return isZh ? (
      <div className="prose prose-gray max-w-none">
        <p><strong>Nano Banana</strong> 是 Google AI Studio（aistudio.google.com）在 AI 生成图片上应用的水印名称。如果你曾经从 AI Studio 下载图片，你的图片中就包含了这个水印。</p>

        <h2>Nano Banana 水印是什么？</h2>
        <p>Nano Banana 是 Google 内部对 AI Studio 水印的命名。与 gemini.google.com 上的标准 Gemini 水印一样，它通过 <strong>Alpha 合成</strong>技术嵌入图片——将水印图层与原始图片进行数学混合。</p>
        <p>两者使用相同的底层技术，但应用于不同的平台：</p>
        <ul>
          <li><strong>gemini.google.com</strong>：标准 Gemini 水印</li>
          <li><strong>aistudio.google.com</strong>：Nano Banana 水印</li>
        </ul>

        <h2>如何免费去除 Nano Banana 水印？</h2>
        <p>CleanMark 的在线工具支持去除 Nano Banana 水印。步骤如下：</p>
        <ol>
          <li>从 Google AI Studio 下载图片</li>
          <li>打开 cleanmark.org/gemini-watermark-remover</li>
          <li>上传图片</li>
          <li>下载干净的结果</li>
        </ol>
        <p>处理在浏览器内完成，不到一秒，图片不会上传到任何服务器。</p>

        <h2>Chrome 扩展支持 AI Studio 吗？</h2>
        <p>Chrome 扩展目前支持在 gemini.google.com 上自动去除水印。对于 AI Studio 图片，请使用在线工具。AI Studio 的自动支持计划在未来版本中推出。</p>
      </div>
    ) : (
      <div className="prose prose-gray max-w-none">
        <p><strong>Nano Banana</strong> is the name Google uses for the watermark applied to AI-generated images in Google AI Studio (aistudio.google.com). If you've ever downloaded an image from AI Studio, it contains this watermark.</p>

        <h2>What Is the Nano Banana Watermark?</h2>
        <p>Nano Banana is Google's internal name for the AI Studio watermark. Like the standard Gemini watermark on gemini.google.com, it is applied using <strong>alpha compositing</strong> — mathematically blending a watermark layer with the original image.</p>
        <p>Both use the same underlying technique, but are applied on different platforms:</p>
        <ul>
          <li><strong>gemini.google.com</strong>: Standard Gemini watermark</li>
          <li><strong>aistudio.google.com</strong>: Nano Banana watermark</li>
        </ul>

        <h2>How to Remove the Nano Banana Watermark for Free</h2>
        <p>CleanMark's online tool supports Nano Banana watermark removal. Here's how:</p>
        <ol>
          <li>Download your image from Google AI Studio</li>
          <li>Go to cleanmark.org/gemini-watermark-remover</li>
          <li>Upload the image</li>
          <li>Download the clean result</li>
        </ol>
        <p>Processing happens in your browser in under a second. Your image is never uploaded to any server.</p>

        <h2>Does the Chrome Extension Support AI Studio?</h2>
        <p>The Chrome extension currently supports automatic removal on gemini.google.com. For AI Studio images, use the online tool. Automatic AI Studio support is planned for a future release.</p>
      </div>
    );
  }

  if (slug === 'chrome-extension-vs-online-tool') {
    return isZh ? (
      <div className="prose prose-gray max-w-none">
        <p>CleanMark 提供两种去除 Gemini 水印的方式：<strong>Chrome 扩展</strong>和<strong>免费在线工具</strong>。两者都免费、都在浏览器本地处理图片，但适用场景不同。</p>

        <h2>Chrome 扩展：适合经常使用 Gemini 的用户</h2>
        <p>Chrome 扩展是最无缝的体验。安装后，每次从 gemini.google.com 下载图片时，水印会在保存前自动去除——无需任何额外操作。</p>
        <p><strong>适合以下情况：</strong></p>
        <ul>
          <li>你经常使用 Gemini 生成图片</li>
          <li>你希望下载流程完全自动化</li>
          <li>你使用 Chrome、Edge、Brave 或 Arc 浏览器</li>
        </ul>
        <p><strong>限制：</strong>目前仅支持 gemini.google.com 的自动去除，不支持 AI Studio 自动处理。</p>

        <h2>在线工具：适合偶尔使用或 AI Studio 图片</h2>
        <p>在线工具无需安装，直接在浏览器中上传图片即可处理。支持 Gemini 和 Google AI Studio 的图片。</p>
        <p><strong>适合以下情况：</strong></p>
        <ul>
          <li>你偶尔需要处理几张图片</li>
          <li>你使用 Google AI Studio（aistudio.google.com）</li>
          <li>你不想安装浏览器扩展</li>
          <li>你使用非 Chromium 浏览器（如 Firefox、Safari）</li>
        </ul>

        <h2>总结</h2>
        <p>如果你是 Gemini 的重度用户，安装 Chrome 扩展是最佳选择。如果你主要使用 AI Studio，或者只是偶尔需要处理图片，在线工具更方便。两者都完全免费，都不会上传你的图片到服务器。</p>
      </div>
    ) : (
      <div className="prose prose-gray max-w-none">
        <p>CleanMark offers two ways to remove Gemini watermarks: the <strong>Chrome extension</strong> and the <strong>free online tool</strong>. Both are free, both process images locally in your browser — but they suit different workflows.</p>

        <h2>Chrome Extension: Best for Regular Gemini Users</h2>
        <p>The Chrome extension is the most seamless experience. Once installed, every image you download from gemini.google.com has its watermark removed before it's saved — no extra steps, no manual uploads.</p>
        <p><strong>Use it when:</strong></p>
        <ul>
          <li>You generate images in Gemini frequently</li>
          <li>You want a fully automated download workflow</li>
          <li>You use Chrome, Edge, Brave, or Arc</li>
        </ul>
        <p><strong>Limitation:</strong> Currently supports automatic removal on gemini.google.com only — not AI Studio.</p>

        <h2>Online Tool: Best for Occasional Use or AI Studio Images</h2>
        <p>The online tool requires no installation. Upload any image directly in your browser and get a clean result. Supports both Gemini and Google AI Studio images.</p>
        <p><strong>Use it when:</strong></p>
        <ul>
          <li>You only need to clean a few images occasionally</li>
          <li>You use Google AI Studio (aistudio.google.com)</li>
          <li>You prefer not to install a browser extension</li>
          <li>You use a non-Chromium browser (Firefox, Safari)</li>
        </ul>

        <h2>Summary</h2>
        <p>If you're a heavy Gemini user, the Chrome extension is the best choice. If you primarily use AI Studio or only need to clean images occasionally, the online tool is more convenient. Both are completely free and never upload your images to a server.</p>
      </div>
    );
  }

  return null;
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = posts[slug];
  if (!post) notFound();

  const isZh = locale === 'zh';
  const p = isZh ? post.zh : post.en;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/blog" locale={locale as any} className="text-sm text-blue-600 hover:underline">
            ← {isZh ? '返回博客' : 'Back to Blog'}
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{p.tag}</span>
          <span className="text-sm text-gray-400">{p.date}</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">{p.title}</h1>

        <div className="text-gray-700 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:mb-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:mb-1.5">
          <PostContent slug={slug} isZh={isZh} />
        </div>

        <div className="mt-16 p-6 bg-blue-50 rounded-2xl">
          <h2 className="font-bold text-gray-900 mb-2">{isZh ? '立即免费体验 CleanMark' : 'Try CleanMark for Free'}</h2>
          <p className="text-gray-600 text-sm mb-4">{isZh ? '去除 Gemini 和 AI Studio 图片的水印 — 免费、即时、100% 隐私。' : 'Remove watermarks from Gemini and AI Studio images — free, instant, 100% private.'}</p>
          <Link href="/gemini-watermark-remover"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-semibold">
            {isZh ? '打开在线工具 →' : 'Open Online Tool →'}
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
