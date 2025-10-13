import Link from 'next/link'

/**
 * Footer Component
 *
 * Global footer with:
 * - Logo and tagline
 * - Navigation links
 * - Copyright
 * - Responsive layout (horizontal → vertical)
 * - Clean, minimal design
 */
export function Footer() {
  return (
    <footer className="border-t border-text-secondary/10 py-12 px-8 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Left: Logo + Tagline */}
          <div className="text-center md:text-left">
            <div className="font-mono text-xl font-bold tracking-wider mb-2">
              <span className="text-accent">ID8</span>
              <span className="text-text-primary">LABS</span>
            </div>
            <p className="text-sm text-text-secondary max-w-xs">
              Professional Tools for the AI Era
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav className="flex gap-6 flex-wrap justify-center">
            <Link
              href="/products"
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary rounded"
            >
              Products
            </Link>
            <Link
              href="/lab"
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary rounded"
            >
              Lab Story
            </Link>
            <a
              href="https://twitter.com/id8labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary rounded"
            >
              Twitter/X
            </a>
          </nav>

          {/* Right: Copyright */}
          <div className="text-sm text-text-secondary">
            © 2025 ID8Labs
          </div>
        </div>
      </div>
    </footer>
  )
}
