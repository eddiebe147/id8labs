'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Search,
  ChevronUp,
  ChevronDown,
  FileText,
  Calendar,
  DollarSign,
  Home,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import type { ContractVersion, KeyTerms } from '@/lib/types/workspace'
import { getVersionBadgeColor } from '@/lib/types/workspace'

interface ContractReaderModalProps {
  isOpen: boolean
  onClose: () => void
  version: ContractVersion | null
  keyTerms?: KeyTerms
}

interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

/**
 * ContractReaderModal - Full-screen reader for contract documents
 *
 * Features:
 * - Two-column layout: contract text + table of contents
 * - In-document search with highlighting
 * - Scroll position indicator
 * - Key terms sidebar
 * - ARIA accessible
 */
export function ContractReaderModal({
  isOpen,
  onClose,
  version,
  keyTerms,
}: ContractReaderModalProps) {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<number[]>([])
  const [currentResultIndex, setCurrentResultIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [toc, setToc] = useState<TableOfContentsItem[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  // Client-side mount for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Generate table of contents from content
  useEffect(() => {
    if (!version?.content) {
      setToc([])
      return
    }

    // Parse headers from content (simplified - assumes markdown-like headers)
    const lines = version.content.split('\n')
    const tocItems: TableOfContentsItem[] = []

    lines.forEach((line, index) => {
      // Match headers like "## Section Title" or "ARTICLE 1:"
      const headerMatch = line.match(/^(#{1,3})\s+(.+)/) ||
        line.match(/^(ARTICLE|SECTION|PARAGRAPH)\s*(\d+)/i)

      if (headerMatch) {
        tocItems.push({
          id: `section-${index}`,
          title: headerMatch[2] || line.trim().slice(0, 50),
          level: headerMatch[1]?.length || 1,
        })
      }
    })

    setToc(tocItems)
  }, [version?.content])

  // Handle scroll progress
  const handleScroll = useCallback(() => {
    if (!contentRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
    setScrollProgress(Math.min(100, Math.max(0, progress)))
  }, [])

  // Search functionality
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (!query || !version?.content) {
      setSearchResults([])
      setCurrentResultIndex(0)
      return
    }

    const regex = new RegExp(query, 'gi')
    const matches: number[] = []
    let match

    while ((match = regex.exec(version.content)) !== null) {
      matches.push(match.index)
    }

    setSearchResults(matches)
    setCurrentResultIndex(0)
  }, [version?.content])

  // Navigate search results
  const navigateResults = (direction: 'prev' | 'next') => {
    if (searchResults.length === 0) return

    if (direction === 'next') {
      setCurrentResultIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      )
    } else {
      setCurrentResultIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      )
    }
  }

  // Highlight search terms in content
  const highlightContent = (content: string): string => {
    if (!searchQuery) return content

    const regex = new RegExp(`(${searchQuery})`, 'gi')
    return content.replace(
      regex,
      '<mark class="bg-amber-300/50 text-[var(--text-primary)] px-0.5 rounded">$1</mark>'
    )
  }

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (!mounted) return null

  const colors = version ? getVersionBadgeColor(version.versionType) : null

  const modalContent = (
    <AnimatePresence>
      {isOpen && version && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ isolation: 'isolate' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contract-reader-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative bg-[var(--bg-primary)] flex flex-col overflow-hidden ${
              isFullscreen
                ? 'fixed inset-0 rounded-none'
                : 'rounded-2xl shadow-2xl w-[95vw] h-[90vh] max-w-7xl'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] flex-shrink-0">
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-[var(--text-secondary)]" />
                <div>
                  <h2
                    id="contract-reader-title"
                    className="text-lg font-semibold text-[var(--text-primary)]"
                  >
                    Purchase Agreement
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    {colors && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
                      >
                        v{version.version}
                      </span>
                    )}
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {new Date(version.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                  <input
                    type="text"
                    placeholder="Search document..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-64 pl-9 pr-20 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <span className="text-xs text-[var(--text-tertiary)]">
                        {currentResultIndex + 1}/{searchResults.length}
                      </span>
                      <button
                        onClick={() => navigateResults('prev')}
                        className="p-1 hover:bg-[var(--bg-tertiary)] rounded"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => navigateResults('next')}
                        className="p-1 hover:bg-[var(--bg-tertiary)] rounded"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Fullscreen toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-[var(--text-secondary)]" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-[var(--text-secondary)]" />
                  )}
                </button>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-[var(--bg-secondary)]">
              <motion.div
                className="h-full bg-[var(--accent)]"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Content area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Main content */}
              <div
                ref={contentRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-8"
              >
                <div
                  className="prose prose-sm max-w-none text-[var(--text-primary)]"
                  dangerouslySetInnerHTML={{
                    __html: highlightContent(version.content || 'No content available'),
                  }}
                />
              </div>

              {/* Sidebar */}
              <div className="w-80 border-l border-[var(--border)] overflow-y-auto flex-shrink-0">
                {/* Key Terms */}
                {keyTerms && (
                  <div className="p-4 border-b border-[var(--border)]">
                    <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
                      Key Terms
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <div>
                          <p className="text-xs text-[var(--text-tertiary)]">
                            Purchase Price
                          </p>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {formatCurrency(keyTerms.purchasePrice)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-[var(--text-tertiary)]">
                            Closing Date
                          </p>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {new Date(keyTerms.closingDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Home className="w-4 h-4 text-purple-500" />
                        <div>
                          <p className="text-xs text-[var(--text-tertiary)]">
                            Property
                          </p>
                          <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2">
                            {keyTerms.propertyAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Table of Contents */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
                    Table of Contents
                  </h3>
                  {toc.length > 0 ? (
                    <nav className="space-y-1">
                      {toc.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            // Scroll to section (simplified)
                            const element = document.getElementById(item.id)
                            element?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className={`block w-full text-left text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] px-2 py-1.5 rounded transition-colors ${
                            item.level === 1 ? 'font-medium' : 'pl-4'
                          }`}
                          style={{ paddingLeft: `${item.level * 8 + 8}px` }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  ) : (
                    <p className="text-sm text-[var(--text-tertiary)]">
                      No sections detected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

export default ContractReaderModal
