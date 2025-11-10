import Link from 'next/link'
import BrandName from './BrandName'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-[var(--text-secondary)]">
            © 2025 <BrandName />. Professional tools for the AI era.
          </p>

          {/* Links */}
          <nav className="flex flex-wrap gap-6 text-sm">
            <Link href="/products" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
              Products
            </Link>
            <Link href="/lab" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
              Lab Story
            </Link>
            <Link href="/lab#contact" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[var(--text-secondary)] hover:text-id8-orange transition-colors">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
