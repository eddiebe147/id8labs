import Link from 'next/link'
import BrandName from './BrandName'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24 relative overflow-hidden bg-gradient-to-b from-transparent via-black/50 to-black/80">
      {/* Subtle tropical texture in footer - reduced opacity to not compete with LED background */}
      <div className="absolute inset-0 texture-tropical-dots opacity-20" />
      <div className="container py-12 relative z-10">
        {/* Four Column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: ID8Labs */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-bold mb-2">
              <BrandName /> © 2025
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-1">
              Miami, FL
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              EST (UTC-5)
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-bold mb-3">Navigation</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                Products
              </Link>
              <Link href="/services" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                Services
              </Link>
              <Link href="/essays" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                Essays
              </Link>
              <Link href="/lab" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                Lab Story
              </Link>
              <div className="flex gap-3 mt-1">
                <Link href="/privacy" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors text-xs">
                  Privacy
                </Link>
                <Link href="/terms" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors text-xs">
                  Terms
                </Link>
              </div>
            </nav>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-sm font-bold mb-3">Products</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <a
                href="https://id8composer.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
              >
                Composer
              </a>
              <a
                href="https://deepstack.trade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
              >
                DeepStack
              </a>
              <Link href="/products/pipeline" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                Pipeline
              </Link>
              <Link href="/products/llc-ops" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                LLC Ops
              </Link>
            </nav>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-sm font-bold mb-3">Connect</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/contact" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                Contact
              </Link>
              <a
                href="https://x.com/eddiebe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
              >
                X @eddiebe
              </a>
              <a
                href="https://github.com/eddiebe147"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/eddiebelaval"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[var(--border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse" />
              <span className="text-[var(--text-secondary)]">Currently taking projects</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Built with Next.js + Vercel + Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
