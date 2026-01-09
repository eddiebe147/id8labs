import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getIssueBySlug, getAllIssues } from '@/lib/newsletter/issues'
import { NewsletterSubscribe } from '@/components/newsletter'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const issue = getIssueBySlug(slug)

  if (!issue) {
    return {
      title: 'Issue Not Found | The Innovation Brief',
    }
  }

  // Strip HTML tags for meta description
  const cleanDescription = issue.bigIdea.content.substring(0, 155).replace(/<[^>]*>/g, '')

  return {
    title: `${issue.subject} | The Innovation Brief`,
    description: cleanDescription,
    openGraph: {
      title: issue.subject,
      description: cleanDescription,
    },
  }
}

export async function generateStaticParams() {
  const issues = getAllIssues()
  return issues.map((issue) => ({
    slug: issue.slug,
  }))
}

/**
 * Parse content with simple formatting (bold tags only)
 * Content comes from our own templates - not user input
 */
function renderContent(content: string): React.ReactNode[] {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim())

  return paragraphs.map((para, idx) => {
    // Handle <strong> tags by splitting and reconstructing
    const parts = para.split(/(<strong>.*?<\/strong>)/g)
    const rendered = parts.map((part, partIdx) => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        const text = part.replace(/<\/?strong>/g, '')
        return <strong key={partIdx}>{text}</strong>
      }
      return part
    })

    return (
      <p key={idx} className="mb-4">
        {rendered}
      </p>
    )
  })
}

/**
 * Render list items with bold text support
 */
function renderListItem(html: string): React.ReactNode {
  const parts = html.split(/(<strong>.*?<\/strong>)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
      const text = part.replace(/<\/?strong>/g, '')
      return <strong key={idx}>{text}</strong>
    }
    return part
  })
}

export default async function NewsletterIssuePage({ params }: PageProps) {
  const { slug } = await params
  const issue = getIssueBySlug(slug)

  if (!issue) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Archive
          </Link>
        </div>
      </header>

      {/* Issue Content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Issue Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-[var(--id8-orange)]">
              Issue #{issue.issueNumber}
            </span>
            <span className="text-sm text-[var(--text-tertiary)]">
              {issue.date}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {issue.subject}
          </h1>
        </header>

        {/* The Big Idea */}
        <section className="mb-12">
          <span className="text-xs font-semibold text-[var(--id8-orange)] uppercase tracking-wide">
            The Big Idea
          </span>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-2 mb-4">
            {issue.bigIdea.title}
          </h2>
          <div className="text-[var(--text-secondary)] leading-relaxed">
            {renderContent(issue.bigIdea.content)}
          </div>
        </section>

        <hr className="border-[var(--border)] my-10" />

        {/* Framework */}
        <section className="mb-12">
          <span className="text-xs font-semibold text-[var(--id8-orange)] uppercase tracking-wide">
            Framework
          </span>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-2 mb-4">
            {issue.framework.name}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            {issue.framework.description}
          </p>
          {issue.framework.steps && (
            <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]">
              {issue.framework.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {renderListItem(step)}
                </li>
              ))}
            </ol>
          )}
        </section>

        <hr className="border-[var(--border)] my-10" />

        {/* Case Study */}
        <section className="mb-12">
          <span className="text-xs font-semibold text-[var(--id8-orange)] uppercase tracking-wide">
            Case Study
          </span>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-2 mb-4">
            {issue.caseStudy.title}
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)]">
            <p>
              <strong className="text-[var(--text-primary)]">The problem:</strong>{' '}
              {issue.caseStudy.problem}
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">What worked:</strong>{' '}
              {issue.caseStudy.solution}
            </p>
            <p className="text-[var(--id8-orange)] font-medium">
              <strong>Result:</strong> {issue.caseStudy.result}
            </p>
          </div>
        </section>

        {/* MILO Tip (Academy Only Preview) */}
        {issue.miloTip && (
          <>
            <hr className="border-[var(--border)] my-10" />
            <section className="mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-[var(--id8-orange)] uppercase tracking-wide">
                  Academy Exclusive
                </span>
                <span className="px-2 py-0.5 text-xs bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded">
                  MILO Tip
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                {issue.miloTip.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                {issue.miloTip.explanation}
              </p>
              <div className="p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)] font-mono text-sm text-[var(--text-secondary)]">
                &ldquo;{issue.miloTip.prompt}&rdquo;
              </div>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 mt-4 text-sm text-[var(--id8-orange)] hover:underline"
              >
                Join the Academy to unlock all tips
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </section>
          </>
        )}

        {/* Closing Note */}
        <section className="mt-12 pt-8 border-t border-[var(--border)]">
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            {issue.closingNote}
          </p>
          <p className="text-[var(--text-primary)]">
            See you next month,<br />
            <strong>Eddie</strong>
          </p>
        </section>
      </article>

      {/* Subscribe CTA */}
      <section className="py-16 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Want more insights like this?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Subscribe to The Innovation Brief and get weekly frameworks, case studies, and actionable insights.
          </p>
          <NewsletterSubscribe
            variant="inline"
            source={`newsletter-issue-${issue.issueNumber}`}
            title=""
            description=""
            buttonText="Subscribe"
          />
        </div>
      </section>
    </div>
  )
}
