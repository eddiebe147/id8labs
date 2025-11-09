import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <h1 className="mb-6">404</h1>
        <p className="text-2xl mb-12 text-[var(--text-secondary)]">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg px-8 py-4 border border-[var(--border)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-200"
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
