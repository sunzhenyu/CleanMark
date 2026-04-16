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
    title: locale === 'zh'
      ? 'MarkSweep 攻击：2026 年 AI 水印移除技术突破 | CleanMark'
      : 'MarkSweep Attack: 2026 Breakthrough in AI Watermark Removal | CleanMark',
    description: locale === 'zh'
      ? '最新研究推出 MarkSweep，一种通过噪声增强和频率感知去噪实现的无盒 AI 图像水印移除攻击。'
      : 'New research introduces MarkSweep, a novel no-box removal attack on AI-generated image watermarking via noise intensification and frequency-aware denoising.',
    path: '/blog/marksweep-attack-2026-breakthrough',
    locale,
    keywords: 'MarkSweep, AI watermark removal, noise intensification, frequency-aware denoising, 2026 research',
  });
}

const content = {
  en: {
    title: 'MarkSweep Attack: 2026 Breakthrough in AI Watermark Removal',
    date: 'February 20, 2026',
    tag: 'Research',
    sections: [
      {
        heading: 'Introduction',
        content: 'In February 2026, researchers published groundbreaking work on arXiv introducing MarkSweep, a novel watermark removal attack that challenges the security of AI-generated image watermarking systems. This research represents a significant advancement in understanding the vulnerabilities of invisible watermark technologies.',
      },
      {
        heading: 'What is MarkSweep?',
        content: 'MarkSweep is a "no-box" removal attack, meaning it operates without requiring access to the watermarking model or training data. The technique combines two key innovations: noise intensification and frequency-aware denoising. Unlike traditional watermark removal methods that rely on brute-force pixel manipulation, MarkSweep exploits the frequency domain characteristics of embedded watermarks.',
      },
      {
        heading: 'Technical Approach',
        content: 'The attack works by first intensifying noise in specific frequency bands where watermarks are typically embedded. This noise intensification disrupts the watermark signal while preserving the underlying image content. The second phase applies frequency-aware denoising that selectively removes the disrupted watermark signal while maintaining image quality. This two-stage approach achieves remarkably high success rates against modern watermarking systems.',
      },
      {
        heading: 'Implications for AI Content Authentication',
        content: 'The emergence of MarkSweep highlights ongoing challenges in AI content authentication. While watermarking technologies like Google SynthID and Gemini watermarks aim to provide provenance information, attacks like MarkSweep demonstrate that no watermarking system is completely secure. This research underscores the need for multi-layered approaches to AI content verification.',
      },
      {
        heading: 'CleanMark\'s Approach',
        content: 'CleanMark uses advanced algorithms to remove visible watermarks from Gemini and Nano Banana images while preserving image quality. Our browser-based processing ensures complete privacy—no images are uploaded to servers. Unlike research attacks that target invisible watermarks, CleanMark focuses on removing visible branding elements that users want to eliminate for legitimate creative purposes.',
      },
      {
        heading: 'Conclusion',
        content: 'The MarkSweep research represents an important milestone in understanding watermark security. As AI-generated content becomes more prevalent, the balance between content authentication and user freedom will continue to evolve. Tools like CleanMark provide users with control over visible watermarks while respecting the broader ecosystem of AI content verification.',
      },
    ],
    sources: [
      {
        text: 'MarkSweep Research Paper (arXiv)',
        url: 'https://arxiv.org/html/2602.15364',
      },
      {
        text: 'IEEE Spectrum: AI Watermark Remover',
        url: 'https://spectrum.ieee.org/ai-watermark-remover',
      },
    ],
  },
  zh: {
    title: 'MarkSweep 攻击：2026 年 AI 水印移除技术突破',
    date: '2026 年 2 月 20 日',
    tag: '研究',
    sections: [
      {
        heading: '引言',
        content: '2026 年 2 月，研究人员在 arXiv 上发表了突破性研究，推出 MarkSweep——一种挑战 AI 生成图像水印系统安全性的新型水印移除攻击。这项研究代表了理解隐形水印技术漏洞的重大进展。',
      },
      {
        heading: '什么是 MarkSweep？',
        content: 'MarkSweep 是一种"无盒"移除攻击，意味着它无需访问水印模型或训练数据即可运行。该技术结合了两项关键创新：噪声增强和频率感知去噪。与依赖暴力像素操作的传统水印移除方法不同，MarkSweep 利用嵌入水印的频域特征。',
      },
      {
        heading: '技术方法',
        content: '该攻击首先在水印通常嵌入的特定频段中增强噪声。这种噪声增强会破坏水印信号，同时保留底层图像内容。第二阶段应用频率感知去噪，选择性地移除被破坏的水印信号，同时保持图像质量。这种两阶段方法对现代水印系统实现了极高的成功率。',
      },
      {
        heading: '对 AI 内容认证的影响',
        content: 'MarkSweep 的出现凸显了 AI 内容认证面临的持续挑战。虽然 Google SynthID 和 Gemini 水印等水印技术旨在提供来源信息，但 MarkSweep 等攻击表明没有水印系统是完全安全的。这项研究强调了 AI 内容验证需要多层方法。',
      },
      {
        heading: 'CleanMark 的方法',
        content: 'CleanMark 使用先进算法从 Gemini 和 Nano Banana 图像中移除可见水印，同时保持图像质量。我们的浏览器端处理确保完全隐私——不会将图像上传到服务器。与针对隐形水印的研究攻击不同，CleanMark 专注于移除用户出于合法创意目的想要消除的可见品牌元素。',
      },
      {
        heading: '结论',
        content: 'MarkSweep 研究代表了理解水印安全性的重要里程碑。随着 AI 生成内容变得更加普遍，内容认证与用户自由之间的平衡将继续演变。CleanMark 等工具为用户提供对可见水印的控制，同时尊重 AI 内容验证的更广泛生态系统。',
      },
    ],
    sources: [
      {
        text: 'MarkSweep 研究论文 (arXiv)',
        url: 'https://arxiv.org/html/2602.15364',
      },
      {
        text: 'IEEE Spectrum: AI 水印移除器',
        url: 'https://spectrum.ieee.org/ai-watermark-remover',
      },
    ],
  },
};

export default async function BlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';
  const post = isZh ? content.zh : content.en;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <article className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{post.tag}</span>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.sections.map((section, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{isZh ? '参考来源' : 'Sources'}</h3>
              <ul className="space-y-2">
                {post.sources.map((source, idx) => (
                  <li key={idx}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {source.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog" locale={locale as any} className="text-blue-600 hover:underline">
              ← {isZh ? '返回博客' : 'Back to Blog'}
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
