import { Metadata } from 'next'
import Link from 'next/link'
import { getAllIssues, getIssueCount } from '@/lib/newsletter/issues'
import { NewsletterSubscribe } from '@/components/newsletter'

export const metadata: Metadata = {
  title: 'signal:noise | ID8Labs Newsletter',
  description: 'Cutting through the noise to deliver what matters. AI, automation, and building the future.',
  openGraph: {
    title: 'signal:noise | ID8Labs Newsletter',
    description: 'Cutting through the noise to deliver what matters.',
  },
}

export default function NewsletterArchivePage() {
  const issues = getAllIssues()
  const issueCount = getIssueCount()

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--id8-orange)]/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full mb-4">
              Newsletter
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
              signal:noise
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Cutting through the noise to deliver what matters.
              AI, automation, and building the future.
            </p>

            {/* Subscribe Form */}
            <div className="max-w-md mx-auto">
              <NewsletterSubscribe
                variant="inline"
                source="newsletter-archive"
                title=""
                description=""
                buttonText="Subscribe"
                showPrivacyNote={true}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 text-center">
            <div>
              <p className="text-3xl font-bold text-[var(--text-primary)]">{issueCount}</p>
              <p className="text-sm text-[var(--text-secondary)]">Issues Published</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--text-primary)]">1,000+</p>
              <p className="text-sm text-[var(--text-secondary)]">Subscribers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--text-primary)]">Weekly</p>
              <p className="text-sm text-[var(--text-secondary)]">Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
            Past Issues
          </h2>

          {issues.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[var(--border)] rounded-xl">
              <p className="text-[var(--text-secondary)]">
                First issue coming soon. Subscribe to be the first to know!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {issues.map((issue) => (
                <Link
                  key={issue.slug}
                  href={`/newsletter/${issue.slug}`}
                  className="block group"
                >
                  <article className="p-6 border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)] hover:border-[var(--id8-orange)]/50 transition-all duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-[var(--id8-orange)]">
                            Issue #{issue.issueNumber}
                          </span>
                          <span className="text-sm text-[var(--text-tertiary)]">
                            {issue.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--id8-orange)] transition-colors mb-2">
                          {issue.title}
                        </h3>
                        <p className="text-[var(--text-secondary)] text-sm line-clamp-2">
                          {issue.excerpt}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--id8-orange)] group-hover:border-[var(--id8-orange)] transition-colors">
                        <svg
                          className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-white transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Don't miss the next issue
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Join 1,000+ builders getting weekly signal on AI, automation, and building the future.
          </p>
          <NewsletterSubscribe
            variant="inline"
            source="newsletter-bottom-cta"
            title=""
            description=""
            buttonText="Subscribe Now"
          />
        </div>
      </section>
    </div>
  )
}
