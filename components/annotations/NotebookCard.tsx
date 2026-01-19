'use client'

import Link from 'next/link'
import { motion } from '@/components/motion'
import type { Highlight, Note, HighlightColor } from '@/lib/courses/types'
import { COURSES } from '@/lib/courses/config'

interface NotebookCardProps {
  item: Highlight | Note
  type: 'highlight' | 'note'
  onDelete?: (id: string) => void
}

const COLOR_CLASSES: Record<HighlightColor, string> = {
  yellow: 'bg-yellow-300/30 border-yellow-400/50',
  green: 'bg-green-300/30 border-green-400/50',
  blue: 'bg-blue-300/30 border-blue-400/50',
  pink: 'bg-pink-300/30 border-pink-400/50',
}

export function NotebookCard({ item, type, onDelete }: NotebookCardProps) {
  const isHighlight = type === 'highlight'
  const highlight = isHighlight ? (item as Highlight) : null
  const note = !isHighlight ? (item as Note) : null

  const courseConfig = COURSES[item.course_slug]
  const courseName = courseConfig?.title || item.course_slug
  const modulePath = item.module_slug
    ? `/${item.course_slug}/${item.module_slug}`
    : `/${item.course_slug}`

  const moduleNumber = item.module_slug?.replace('module-', '') || ''

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`p-4 rounded-lg border transition-shadow hover:shadow-md ${
        highlight ? `${COLOR_CLASSES[highlight.color]} border-l-4` : 'bg-[var(--bg-secondary)] border-[var(--border)]'
      }`}
    >
      {/* Header - Course & Module info */}
      <div className="flex items-center justify-between mb-3">
        <Link
          href={`/academy${modulePath}`}
          className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
        >
          <BookIcon className="w-3.5 h-3.5" />
          <span>{courseName}</span>
          {moduleNumber && (
            <>
              <span className="text-[var(--text-tertiary)]">/</span>
              <span>Module {moduleNumber}</span>
            </>
          )}
        </Link>

        <span className="text-xs text-[var(--text-tertiary)]">
          {formatRelativeTime(new Date(item.created_at))}
        </span>
      </div>

      {/* Content */}
      {highlight ? (
        <>
          <p className="text-sm leading-relaxed text-[var(--text-primary)]">
            "{highlight.highlighted_text}"
          </p>
          {highlight.note && (
            <p className="mt-2 text-sm text-[var(--text-secondary)] italic pl-3 border-l-2 border-[var(--border)]">
              {highlight.note}
            </p>
          )}
        </>
      ) : note ? (
        <>
          {note.title && (
            <h4 className="font-medium text-[var(--text-primary)] mb-2">
              {note.title}
            </h4>
          )}
          <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap line-clamp-4">
            {note.content}
          </p>
        </>
      ) : null}

      {/* Footer actions */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {highlight && (
            <span
              className={`w-3 h-3 rounded-full ${
                highlight.color === 'yellow'
                  ? 'bg-yellow-400'
                  : highlight.color === 'green'
                  ? 'bg-green-400'
                  : highlight.color === 'blue'
                  ? 'bg-blue-400'
                  : 'bg-pink-400'
              }`}
            />
          )}
          <span className="text-xs text-[var(--text-tertiary)]">
            {isHighlight ? 'Highlight' : 'Note'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/academy${modulePath}`}
            className="text-xs text-id8-orange hover:underline"
          >
            Go to module →
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(item.id)}
              className="text-xs text-[var(--text-tertiary)] hover:text-red-500 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Compact version for listing
export function NotebookCardCompact({ item, type }: NotebookCardProps) {
  const isHighlight = type === 'highlight'
  const highlight = isHighlight ? (item as Highlight) : null
  const note = !isHighlight ? (item as Note) : null

  const courseConfig = COURSES[item.course_slug]
  const courseName = courseConfig?.title || item.course_slug

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors cursor-pointer">
      {/* Type indicator */}
      <div
        className={`flex-shrink-0 w-1 h-12 rounded-full ${
          highlight
            ? highlight.color === 'yellow'
              ? 'bg-yellow-400'
              : highlight.color === 'green'
              ? 'bg-green-400'
              : highlight.color === 'blue'
              ? 'bg-blue-400'
              : 'bg-pink-400'
            : 'bg-[var(--border)]'
        }`}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--text-primary)] line-clamp-2">
          {highlight ? highlight.highlighted_text : note?.content}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-[var(--text-tertiary)]">{courseName}</span>
          <span className="text-xs text-[var(--text-tertiary)]">•</span>
          <span className="text-xs text-[var(--text-tertiary)]">
            {formatRelativeTime(new Date(item.created_at))}
          </span>
        </div>
      </div>
    </div>
  )
}

// Helper function for relative time
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
