import Link from 'next/link'

const quickLinks = [
  { href: '/services', label: 'Services & Training', description: 'AI implementation and Claude Code courses' },
  { href: '/products', label: 'Products', description: 'Composer, DeepStack, and more' },
  { href: '/lab', label: 'Lab Story', description: 'How ID8Labs started' },
  { href: '/contact', label: 'Contact', description: 'Get in touch' },
]

export default function NotFound() {
  return (
    <div className="container min-h-[70vh] flex items-center justify-center py-20">
      <div className="text-center max-w-2xl">
        <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
          404 Error
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Page not found</h1>
        <p className="text-xl mb-12 text-[var(--text-secondary)]">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12 text-left">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border border-[var(--border)] rounded-lg hover:border-id8-orange hover:bg-[var(--bg-secondary)] transition-all duration-200 group"
            >
              <p className="font-semibold group-hover:text-id8-orange transition-colors">
                {link.label}
              </p>
              <p className="text-sm text-[var(--text-tertiary)]">
                {link.description}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  )
}
