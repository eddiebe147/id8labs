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
            {/* Academy Dropdown */}
            <div className="relative group">
              <Link
                href="/academy"
                className="text-base hover:opacity-70 transition-opacity flex items-center gap-1"
              >
                Academy
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </Link>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg shadow-xl py-2 min-w-[300px]">
                  <Link
                    href="/academy/prompt-engineering-creators"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-green-500 text-white rounded">New</span>
                    <div>
                      <p className="font-medium text-sm">Prompt Engineering for Creators</p>
                      <p className="text-xs text-[var(--text-tertiary)]">9 modules • Free</p>
                    </div>
                  </Link>
                  <Link
                    href="/courses/ai-conversation-fundamentals"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-green-500 text-white rounded">Free</span>
                    <div>
                      <p className="font-medium text-sm">AI Conversation Fundamentals</p>
                      <p className="text-xs text-[var(--text-tertiary)]">Mental models for AI • 45 min</p>
                    </div>
                  </Link>
                  <Link
                    href="/courses/claude-for-knowledge-workers"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-id8-orange text-white rounded">$99</span>
                    <div>
                      <p className="font-medium text-sm">Claude Code for Knowledge Workers</p>
                      <p className="text-xs text-[var(--text-tertiary)]">Full delegation course • 5 hrs</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/essays" className="text-base hover:opacity-70 transition-opacity">
              Essays
            </Link>
            <Link href="/lab" className="text-base hover:opacity-70 transition-opacity">
              Lab Story
            </Link>
            <Link href="/contact" className="text-base hover:opacity-70 transition-opacity">
              Contact
            </Link>
            {/* Claude Corner Easter Egg */}
            <Link
              href="/claude-corner"
              className="font-mono text-[var(--text-tertiary)] hover:text-[var(--id8-orange)] transition-colors flex items-center"
              title="Claude Corner"
            >
              <span className="text-sm">{'>_'}</span>
              <span className="w-[2px] h-4 bg-current ml-0.5 animate-pulse" />
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
            {/* Mobile Academy Section */}
            <div className="space-y-2">
              <Link
                href="/academy"
                className="text-lg font-medium hover:text-id8-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Academy
              </Link>
              <Link
                href="/academy/prompt-engineering-creators"
                className="flex items-center gap-2 pl-4 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-green-500 text-white rounded">New</span>
                Prompt Engineering
              </Link>
              <Link
                href="/courses/ai-conversation-fundamentals"
                className="flex items-center gap-2 pl-4 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-green-500 text-white rounded">Free</span>
                AI Fundamentals
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="flex items-center gap-2 pl-4 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-id8-orange text-white rounded">$99</span>
                Claude Code Course
              </Link>
            </div>
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
            {/* Claude Corner Easter Egg */}
            <Link
              href="/claude-corner"
              className="flex items-center gap-2 font-mono text-[var(--text-tertiary)] hover:text-[var(--id8-orange)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-lg">{'>_'}</span>
              <span className="w-[2px] h-5 bg-current animate-pulse" />
              <span className="text-xs uppercase tracking-wider">Claude Corner</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
