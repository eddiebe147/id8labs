'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import BrandName from './BrandName'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--border)] transition-all duration-200">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Wordmark */}
          <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity">
            <BrandName />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-base hover:opacity-70 transition-opacity">
              Products
            </Link>
            <Link href="/essays" className="text-base hover:opacity-70 transition-opacity">
              Essays
            </Link>
            <Link href="/lab" className="text-base hover:opacity-70 transition-opacity">
              Lab Story
            </Link>
            <Link href="/lab#contact" className="text-base hover:opacity-70 transition-opacity">
              Contact
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
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
          <nav className="md:hidden pb-6 space-y-4 border-t border-[var(--border)] pt-6 mt-2">
            <Link
              href="/products"
              className="block text-lg hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
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
              href="/lab#contact"
              className="block text-lg hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                toggleTheme()
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 text-lg hover:opacity-70 transition-opacity"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
