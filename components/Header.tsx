'use client'

import Link from 'next/link'
import { useState } from 'react'
import BrandName from './BrandName'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg-primary)]/70 border-b border-white/10 shadow-lg transition-all duration-200">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Wordmark */}
          <Link href="/" className="text-3xl font-bold tracking-tight hover:opacity-70 transition-opacity">
            <BrandName />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-base hover:opacity-70 transition-opacity">
              Products
            </Link>
            <Link href="/services" className="text-base hover:opacity-70 transition-opacity">
              Services
            </Link>
            <Link href="/essays" className="text-base hover:opacity-70 transition-opacity">
              Essays
            </Link>
            <Link href="/lab" className="text-base hover:opacity-70 transition-opacity">
              Lab Story
            </Link>
            <Link href="/contact" className="text-base hover:opacity-70 transition-opacity">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:opacity-70 transition-opacity"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="md:hidden pb-6 space-y-4 border-t border-[var(--border)] pt-6 mt-2"
          >
            <Link
              href="/products"
              className="block text-lg hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/services"
              className="block text-lg hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/essays"
              className="block text-lg hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Essays
            </Link>
            <Link
              href="/lab"
              className="block text-lg hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lab Story
            </Link>
            <Link
              href="/contact"
              className="block text-lg hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
