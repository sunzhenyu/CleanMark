import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { generateMetadata as genMeta } from '@/lib/metadata';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return genMeta({
    title: 'Contact — CleanMark Gemini Watermark Remover',
    description: 'Contact the CleanMark team. Report bugs, request features, or ask questions about the Gemini Watermark Remover Chrome extension and online tool.',
    path: '/contact',
    locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const channels = [
    {
      icon: '✉️',
      title: isZh ? '邮件支持' : 'Email Support',
      desc: isZh
        ? '适用于一般问题、反馈，或不适合公开讨论的内容。'
        : 'For general questions, feedback, or anything not suited for a public issue.',
      action: { label: 'support@cleanmark.org', href: 'mailto:support@cleanmark.org' },
    },
    {
      icon: '🐛',
      title: isZh ? 'Bug 报告与功能建议' : 'Bug Reports & Feature Requests',
      desc: isZh
        ? '在 GitHub 上提交 Issue — 这是获得回复和跟踪进度最快的方式。'
        : 'Open an issue on GitHub — this is the fastest way to get a response and track progress.',
      action: { label: isZh ? '提交 GitHub Issue →' : 'Open GitHub Issue →', href: 'https://github.com/sunzhenyu/CleanMark/issues', external: true },
    },
  ];

  const faqs = [
    {
      q: isZh ? '多久能收到回复？' : 'How quickly will I get a response?',
      a: isZh
        ? '邮件通常在 1–2 个工作日内回复。GitHub Issue 通常在 24 小时内得到确认。'
        : 'We typically respond to emails within 1–2 business days. GitHub issues are usually acknowledged within 24 hours.',
    },
    {
      q: isZh ? '水印没有被正确去除 — 该怎么办？' : "The watermark isn't being removed correctly — what should I do?",
      a: isZh
        ? '请发送邮件至 support@cleanmark.org 或在 GitHub 上提交 Issue，并附上问题描述。附上处理前的原始图片有助于我们更快定位问题。'
        : 'Please email support@cleanmark.org or open a GitHub issue with a description of the problem. Attaching the original image (before processing) helps us diagnose the issue faster.',
    },
    {
      q: isZh ? '可以申请支持新的水印类型吗？' : 'Can I request support for a new watermark type?',
      a: isZh
        ? '可以。在 GitHub 上提交 Issue，说明水印详情及其来源平台。我们将根据需求评估并排定优先级。'
        : "Yes. Open a GitHub issue with details about the watermark and the platform it comes from. We'll evaluate and prioritize based on demand.",
    },
    {
      q: isZh ? '我有合作或协作想法。' : 'I have a partnership or collaboration idea.',
      a: isZh
        ? '请发送邮件至 support@cleanmark.org，主题注明"合作"。我们欢迎与我们免费、私密水印去除使命相符的合作。'
        : 'Reach out at support@cleanmark.org with the subject line "Partnership". We\'re open to collaborations that align with our mission of free, private watermark removal.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '联系我们' : 'Contact Us'}
          </h1>
          <p className="text-lg text-gray-600">
            {isZh
              ? '问题反馈、Bug 报告或功能建议 — 欢迎随时联系我们。'
              : "Questions, bug reports, or feature requests — we'd love to hear from you. Pick the channel that works best."}
          </p>
        </div>
      </section>

      {/* Contact channels */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {channels.map((ch) => (
            <div key={ch.title} className="flex gap-5 p-6 bg-gray-50 rounded-xl items-start">
              <div className="text-3xl flex-shrink-0">{ch.icon}</div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-900 mb-1">{ch.title}</h2>
                <p className="text-gray-600 text-sm mb-3">{ch.desc}</p>
                <a
                  href={ch.action.href}
                  {...(ch.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition"
                >
                  {ch.action.label}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Response time note */}
      <section className="py-4 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-6 py-4 text-sm text-gray-600 text-center">
            {isZh ? (
              <>邮件通常在 <strong>1–2 个工作日</strong>内回复。GitHub Issue 每日监控，回复更快。</>
            ) : (
              <>We typically respond to emails within <strong>1–2 business days</strong>. For faster responses, GitHub issues are monitored daily.</>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {isZh ? '常见问题' : 'Common Questions'}
          </h2>
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

      <Footer />
    </main>
  );
}
