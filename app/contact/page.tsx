import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact - ID8Labs',
  description: 'Get in touch with ID8Labs. Custom builds, collaborations, or just saying hi.',
}

const intents = [
  {
    id: 'build',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Build Something',
    description: 'Need a custom agent system, CLI tool, or automation workflow? Let\'s talk scope.',
    cta: 'DM on X',
    href: 'https://x.com/eddiebe',
    color: 'var(--id8-orange)',
  },
  {
    id: 'collaborate',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Collaborate',
    description: 'Partnership ideas, joint ventures, or consulting opportunities. I read every email.',
    cta: 'Send Email',
    href: 'mailto:eddie@id8labs.app?subject=Collaboration%20Inquiry',
    color: '#A855F7',
  },
  {
    id: 'hello',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Just Saying Hi',
    description: 'Following along, have a question, or want to share something interesting? I\'m around.',
    cta: 'Say Hi on X',
    href: 'https://x.com/eddiebe',
    color: '#06B6D4',
  },
]

export default function ContactPage() {
  return (
    <div className="container py-24">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-id8-orange mb-12 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="mb-6">What brings you here?</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Different conversations need different channels. Pick what fits.
          </p>
        </header>

        {/* Intent Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {intents.map((intent) => (
            <a
              key={intent.id}
              href={intent.href}
              target={intent.href.startsWith('http') ? '_blank' : undefined}
              rel={intent.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col p-8 bg-[var(--surface)] border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-all duration-300"
            >
              <div
                className="mb-6 transition-colors duration-300"
                style={{ color: intent.color }}
              >
                {intent.icon}
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-id8-orange transition-colors">
                {intent.title}
              </h2>
              <p className="text-[var(--text-secondary)] mb-6 flex-grow">
                {intent.description}
              </p>
              <div
                className="inline-flex items-center gap-2 font-semibold transition-colors"
                style={{ color: intent.color }}
              >
                {intent.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Response Expectations */}
        <section className="text-center py-12 border-t border-[var(--border)]">
          <h3 className="text-lg font-bold mb-4">Response Times</h3>
          <div className="flex flex-wrap justify-center gap-8 text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full" />
              <span>X DMs: Usually &lt;24h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#A855F7] rounded-full" />
              <span>Email: 1-2 days</span>
            </div>
          </div>
        </section>

        {/* Direct Links */}
        <section className="text-center pt-8">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Or just go direct:
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://x.com/eddiebe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @eddiebe
            </a>
            <a
              href="mailto:eddie@id8labs.app"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              eddie@id8labs.app
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
