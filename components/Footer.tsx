import Link from 'next/link'
import BrandName from './BrandName'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24 relative overflow-hidden bg-gradient-to-b from-transparent via-black/50 to-black/80">
      {/* Subtle tropical texture in footer - reduced opacity to not compete with LED background */}
      <div className="absolute inset-0 texture-tropical-dots opacity-20" />
      <div className="container py-12 relative z-10">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: ID8Labs */}
          <div>
            <p className="text-sm font-bold mb-2">
              <BrandName /> © 2025
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-1">
              Built in Miami by Eddie Belaval
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-3">
              Ideation tools for professionals.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-bold mb-3">Navigation</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                Home
              </Link>
              <Link href="/lab" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
                Lab Story
              </Link>
              <a 
                href="https://id8composer.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
              >
                ID8Composer
              </a>
            </nav>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="text-sm font-bold mb-3">Connect</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:eb@id8labs.tech"
                className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
              >
                eb@id8labs.tech
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[var(--border)]">
          <p className="text-center text-sm text-[var(--text-secondary)] italic">
            Products get personality. The lab stays focused.
          </p>
        </div>
      </div>
    </footer>
  )
}
