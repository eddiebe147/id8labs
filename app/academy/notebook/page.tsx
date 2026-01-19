'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from '@/components/motion'
import { useAnnotations } from '@/hooks/useAnnotations'
import { NotebookCard, AIInsightsPanel } from '@/components/annotations'
import { COURSES } from '@/lib/courses/config'
import type { Highlight, Note } from '@/lib/courses/types'

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

type FilterType = 'all' | 'highlights' | 'notes'
type SortType = 'newest' | 'oldest' | 'course'

export default function NotebookPage() {
  const {
    highlights,
    notes,
    stats,
    loading,
    error,
    isAuthenticated,
    deleteHighlight,
    deleteNote,
  } = useAnnotations()

  const [filterType, setFilterType] = useState<FilterType>('all')
  const [filterCourse, setFilterCourse] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortType>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [aiCourse, setAiCourse] = useState<string>('')

  // Combine and filter items
  const allItems = useMemo(() => {
    let items: Array<{ item: Highlight | Note; type: 'highlight' | 'note' }> = []

    if (filterType === 'all' || filterType === 'highlights') {
      items = [
        ...items,
        ...highlights.map((h) => ({ item: h as Highlight | Note, type: 'highlight' as const })),
      ]
    }

    if (filterType === 'all' || filterType === 'notes') {
      items = [
        ...items,
        ...notes.map((n) => ({ item: n as Highlight | Note, type: 'note' as const })),
      ]
    }

    // Filter by course
    if (filterCourse !== 'all') {
      items = items.filter((i) => i.item.course_slug === filterCourse)
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      items = items.filter((i) => {
        if (i.type === 'highlight') {
          const h = i.item as Highlight
          return (
            h.highlighted_text.toLowerCase().includes(query) ||
            h.note?.toLowerCase().includes(query)
          )
        } else {
          const n = i.item as Note
          return (
            n.content.toLowerCase().includes(query) ||
            n.title?.toLowerCase().includes(query)
          )
        }
      })
    }

    // Sort
    items.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.item.created_at).getTime() - new Date(a.item.created_at).getTime()
      }
      if (sortBy === 'oldest') {
        return new Date(a.item.created_at).getTime() - new Date(b.item.created_at).getTime()
      }
      // Sort by course
      return a.item.course_slug.localeCompare(b.item.course_slug)
    })

    return items
  }, [highlights, notes, filterType, filterCourse, sortBy, searchQuery])

  // Get unique courses from items
  const coursesWithAnnotations = useMemo(() => {
    const courseSet = new Set<string>()
    highlights.forEach((h) => courseSet.add(h.course_slug))
    notes.forEach((n) => courseSet.add(n.course_slug))
    return Array.from(courseSet)
  }, [highlights, notes])

  const handleDelete = async (id: string, type: 'highlight' | 'note') => {
    if (type === 'highlight') {
      await deleteHighlight(id)
    } else {
      await deleteNote(id)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <m.div variants={fadeUp} className="mb-6">
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Academy
              </Link>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              My Notebook
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-lg text-[var(--text-secondary)]"
            >
              Your personal collection of highlights and notes from all courses
            </m.p>

            {/* Stats */}
            {stats && (
              <m.div
                variants={fadeUp}
                className="flex items-center gap-6 mt-6"
              >
                <div className="flex items-center gap-2">
                  <HighlightIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">
                    <strong>{stats.total_highlights}</strong> highlights
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <NoteIcon className="w-5 h-5 text-id8-orange" />
                  <span className="text-sm">
                    <strong>{stats.total_notes}</strong> notes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookIcon className="w-5 h-5 text-[var(--text-tertiary)]" />
                  <span className="text-sm">
                    <strong>{coursesWithAnnotations.length}</strong> courses
                  </span>
                </div>
              </m.div>
            )}

            {/* AI Study Guide Button */}
            {isAuthenticated && stats && stats.total_highlights + stats.total_notes >= 3 && (
              <m.div variants={fadeUp} className="mt-6">
                <button
                  onClick={() => setShowAIPanel(!showAIPanel)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-id8-orange/20 to-id8-orange/5 border border-id8-orange/30 rounded-lg hover:border-id8-orange/50 transition-colors"
                >
                  <SparklesIcon className="w-5 h-5 text-id8-orange" />
                  <span className="text-sm font-medium">Generate Study Guide</span>
                </button>
              </m.div>
            )}
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* AI Panel */}
      <AnimatePresence>
        {showAIPanel && (
          <m.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-[var(--border)]"
          >
            <div className="container py-8">
              <div className="max-w-2xl mx-auto">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-[var(--text-secondary)]">
                      Generate for:
                    </label>
                    <select
                      value={aiCourse}
                      onChange={(e) => setAiCourse(e.target.value)}
                      className="px-3 py-1.5 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-id8-orange/50"
                    >
                      <option value="">Select a course</option>
                      {coursesWithAnnotations.map((slug) => (
                        <option key={slug} value={slug}>
                          {COURSES[slug]?.title || slug}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setShowAIPanel(false)}
                    className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                  >
                    Close
                  </button>
                </div>

                {aiCourse ? (
                  <AIInsightsPanel
                    action="study-guide"
                    courseSlug={aiCourse}
                    title={`Study Guide: ${COURSES[aiCourse]?.title || aiCourse}`}
                  />
                ) : (
                  <div className="p-8 text-center border border-dashed border-[var(--border)] rounded-xl">
                    <SparklesIcon className="w-8 h-8 mx-auto text-[var(--text-tertiary)]" />
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">
                      Select a course to generate a personalized study guide
                    </p>
                  </div>
                )}
              </div>
            </div>
          </m.section>
        )}
      </AnimatePresence>

      {/* Content */}
      <section className="py-12">
        <div className="container">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto text-center py-16">
              <LockIcon className="w-16 h-16 mx-auto text-[var(--text-tertiary)]" />
              <h2 className="mt-4 text-xl font-bold">Sign in to view your notes</h2>
              <p className="mt-2 text-[var(--text-secondary)]">
                Create an account to save highlights and notes while reading courses.
              </p>
              <Link
                href="/auth/login"
                className="inline-block mt-6 px-6 py-3 bg-id8-orange text-white rounded-lg hover:bg-id8-orange/90 transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin w-8 h-8 border-2 border-id8-orange border-t-transparent rounded-full" />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500">Error loading notes: {error}</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your notes..."
                    className="w-full pl-10 pr-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-id8-orange/50"
                  />
                </div>

                {/* Type filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as FilterType)}
                  className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-id8-orange/50"
                >
                  <option value="all">All Types</option>
                  <option value="highlights">Highlights</option>
                  <option value="notes">Notes</option>
                </select>

                {/* Course filter */}
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-id8-orange/50"
                >
                  <option value="all">All Courses</option>
                  {coursesWithAnnotations.map((slug) => (
                    <option key={slug} value={slug}>
                      {COURSES[slug]?.title || slug}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-id8-orange/50"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="course">By Course</option>
                </select>
              </div>

              {/* Results count */}
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Showing {allItems.length} items
              </p>

              {/* Items */}
              {allItems.length === 0 ? (
                <div className="text-center py-16">
                  <NotebookIcon className="w-16 h-16 mx-auto text-[var(--text-tertiary)]" />
                  <h3 className="mt-4 text-lg font-medium">No notes yet</h3>
                  <p className="mt-2 text-[var(--text-secondary)]">
                    Start highlighting text and adding notes in your courses.
                  </p>
                  <Link
                    href="/academy"
                    className="inline-block mt-4 text-id8-orange hover:underline"
                  >
                    Browse courses →
                  </Link>
                </div>
              ) : (
                <m.div
                  initial="initial"
                  animate="animate"
                  variants={stagger}
                  className="space-y-4"
                >
                  {allItems.map(({ item, type }) => (
                    <m.div key={item.id} variants={fadeUp}>
                      <NotebookCard
                        item={item}
                        type={type}
                        onDelete={(id) => handleDelete(id, type)}
                      />
                    </m.div>
                  ))}
                </m.div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// Icons
function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}

function HighlightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

function NoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className || 'w-12 h-12'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function NotebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8M8 11h8M8 15h4" />
    </svg>
  )
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}
