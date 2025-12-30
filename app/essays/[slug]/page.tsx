import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { getEssayBySlug, getAllEssays } from '@/lib/essays'

// Revalidate every hour to pick up scheduled posts
export const revalidate = 3600  // 1 hour in seconds

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({
    slug: essay.slug,
  }))
}

export default function EssayPage({ params }: { params: { slug: string } }) {
  const essay = getEssayBySlug(params.slug)

  if (!essay) {
    notFound()
  }

  const categoryLabels = {
    essay: 'Essay',
    research: 'Research',
    release: 'Release Note'
  }

  return (
    <article>
      {/* Header */}
      <section className="section-spacing border-b border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/essays"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-id8-orange mb-8 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Essays
            </Link>

            <div className="mb-6 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <span className="uppercase tracking-wide">
                {categoryLabels[essay.category]}
              </span>
              <span>·</span>
              <time dateTime={essay.date}>
                {new Date(essay.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
              <span>·</span>
              <span>{essay.readTime}</span>
            </div>

            <h1 className="mb-6">{essay.title}</h1>

            {essay.subtitle && (
              <p className="text-xl text-[var(--text-secondary)] italic">
                {essay.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {essay.heroImage && (
        <section className="border-b border-[var(--border)]">
          <div className="container">
            <div className="max-w-4xl mx-auto py-8">
              <div className="relative w-full rounded-lg overflow-hidden border border-[var(--border)]">
                <Image
                  src={essay.heroImage}
                  alt={essay.title}
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose-essay">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h2 className="mb-6 mt-12 first:mt-0">{children}</h2>,
                h2: ({ children }) => <h3 className="mb-4 mt-10">{children}</h3>,
                p: ({ children }) => <p className="mb-6">{children}</p>,
                ul: ({ children }) => <ul className="mb-6 pl-6 space-y-2">{children}</ul>,
                li: ({ children }) => (
                  <li className="relative pl-2">
                    <span className="absolute left-[-1rem] text-[var(--text-secondary)]">-</span>
                    {children}
                  </li>
                ),
                hr: () => <hr className="my-12 border-[var(--border)]" />,
                em: ({ children }) => <em className="italic text-[var(--text-secondary)]">{children}</em>,
              }}
            >
              {essay.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="border-t border-[var(--border)] py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/essays"
              className="inline-flex items-center gap-2 text-sm text-id8-orange hover:opacity-70 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to all essays
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
