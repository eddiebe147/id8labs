'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import BrandName from './BrandName'
import { StackShackLogo } from './StackShackLogo'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [academyExpanded, setAcademyExpanded] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

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
                <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg shadow-xl py-3 min-w-[380px]">
                  {/* Foundation */}
                  <div className="px-4 pb-2">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">Start Here</p>
                  </div>
                  <Link
                    href="/courses/ai-conversation-fundamentals"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-id8-orange text-white rounded">Foundation</span>
                    <div>
                      <p className="font-medium text-sm">AI Conversation Fundamentals</p>
                      <p className="text-xs text-[var(--text-tertiary)]">6 modules • 45 min • Free</p>
                    </div>
                  </Link>

                  <div className="my-2 mx-4 h-px bg-[var(--border)]" />

                  {/* Individual Courses */}
                  <div className="px-4 pb-2 pt-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">For Individuals</p>
                  </div>
                  <Link
                    href="/academy/prompt-engineering-creators"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-green-500 text-white rounded">New</span>
                    <div>
                      <p className="font-medium text-sm">Prompt Engineering for Creators</p>
                      <p className="text-xs text-[var(--text-tertiary)]">9 modules • Better prompts & outputs</p>
                    </div>
                  </Link>
                  <Link
                    href="/academy/ai-partner-mastery"
                    className="block px-4 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <p className="font-medium text-sm">AI Partner Mastery</p>
                    <p className="text-xs text-[var(--text-tertiary)]">8 modules • Work with AI daily</p>
                  </Link>
                  <Link
                    href="/courses/claude-for-knowledge-workers"
                    className="block px-4 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <p className="font-medium text-sm">Claude Code for Knowledge Workers</p>
                    <p className="text-xs text-[var(--text-tertiary)]">10 modules • Full delegation course</p>
                  </Link>

                  <div className="my-2 mx-4 h-px bg-[var(--border)]" />

                  {/* Organization Courses */}
                  <div className="px-4 pb-2 pt-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">For Organizations</p>
                  </div>
                  <Link
                    href="/academy/ai-for-leaders"
                    className="block px-4 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <p className="font-medium text-sm">AI for Leaders</p>
                    <p className="text-xs text-[var(--text-tertiary)]">8 modules • Strategic adoption</p>
                  </Link>
                  <Link
                    href="/academy/ai-at-scale"
                    className="block px-4 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <p className="font-medium text-sm">AI at Scale</p>
                    <p className="text-xs text-[var(--text-tertiary)]">8 modules • Team adoption</p>
                  </Link>
                  <Link
                    href="/academy/private-ai"
                    className="block px-4 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <p className="font-medium text-sm">Private AI</p>
                    <p className="text-xs text-[var(--text-tertiary)]">8 modules • Security & compliance</p>
                  </Link>

                  <div className="my-2 mx-4 h-px bg-[var(--border)]" />

                  {/* View All */}
                  <Link
                    href="/academy"
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors text-id8-orange"
                  >
                    <span className="font-medium text-sm">View Full Curriculum</span>
                    <span className="text-xs">7 courses • 57 modules</span>
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
            <Link href="/stackshack" className="hover:opacity-80 transition-opacity" aria-label="Stack Shack">
              <div className="flex items-center">
                <StackShackLogo size="sm" />
              </div>
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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-[var(--bg-primary)] z-40 overflow-y-auto overscroll-contain"
          >
            <div className="pb-6 space-y-4 border-t border-[var(--border)] pt-6 px-4">
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
            {/* Mobile Academy Section - Collapsible */}
            <div className="space-y-3">
              <button
                onClick={() => setAcademyExpanded(!academyExpanded)}
                className="flex items-center justify-between w-full text-lg font-medium hover:text-id8-orange transition-colors"
                aria-expanded={academyExpanded}
              >
                <span>Academy</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${academyExpanded ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {academyExpanded && (
                <div className="space-y-3 pl-2 border-l-2 border-[var(--border)] ml-2">
                  {/* Foundation */}
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] pl-2 pt-2">Start Here</p>
                  <Link
                    href="/courses/ai-conversation-fundamentals"
                    className="flex items-center gap-2 pl-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-id8-orange text-white rounded">Foundation</span>
                    AI Fundamentals
                  </Link>
                  {/* Individuals */}
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] pl-2 pt-2">For Individuals</p>
                  <Link
                    href="/academy/prompt-engineering-creators"
                    className="block pl-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Prompt Engineering
                  </Link>
                  <Link
                    href="/academy/ai-partner-mastery"
                    className="block pl-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AI Partner Mastery
                  </Link>
                  <Link
                    href="/courses/claude-for-knowledge-workers"
                    className="block pl-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Claude Code Course
                  </Link>
                  {/* Organizations */}
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] pl-2 pt-2">For Organizations</p>
                  <Link
                    href="/academy/ai-for-leaders"
                    className="block pl-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AI for Leaders
                  </Link>
                  <Link
                    href="/academy/ai-at-scale"
                    className="block pl-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AI at Scale
                  </Link>
                  <Link
                    href="/academy/private-ai"
                    className="block pl-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Private AI
                  </Link>
                  {/* View All */}
                  <Link
                    href="/academy"
                    className="block pl-2 text-base text-id8-orange hover:text-[var(--id8-orange-hover)] transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View Full Curriculum →
                  </Link>
                </div>
              )}
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
            <Link
              href="/stackshack"
              className="hover:opacity-80 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              <StackShackLogo size="md" />
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
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
