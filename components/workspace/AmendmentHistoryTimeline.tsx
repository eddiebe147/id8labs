'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  GitBranch,
  ExternalLink,
} from 'lucide-react'
import type { VersionHistoryEntry } from '@/lib/types/workspace'
import { getVersionBadgeColor } from '@/lib/types/workspace'

interface AmendmentHistoryTimelineProps {
  entries: VersionHistoryEntry[]
  onViewDiff?: (versionId: string) => void
  maxVisibleItems?: number
  className?: string
}

/**
 * AmendmentHistoryTimeline - Chronological display of contract version history
 *
 * Shows version badges, change summaries, authors, and relative dates.
 * Supports expansion for long histories.
 */
export function AmendmentHistoryTimeline({
  entries,
  onViewDiff,
  maxVisibleItems = 5,
  className = '',
}: AmendmentHistoryTimelineProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleEntries = isExpanded ? entries : entries.slice(0, maxVisibleItems)
  const hasMore = entries.length > maxVisibleItems

  // Format relative time
  const formatRelativeTime = (dateStr: string): string => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (entries.length === 0) {
    return (
      <div className={`p-4 text-center text-[var(--text-tertiary)] ${className}`}>
        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No version history yet</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="w-4 h-4 text-[var(--text-tertiary)]" />
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          Amendment History
        </h3>
        <span className="text-xs text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded-full">
          {entries.length} version{entries.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[var(--border)]" />

        {/* Entries */}
        <AnimatePresence mode="popLayout">
          {visibleEntries.map((entry, index) => {
            const colors = getVersionBadgeColor(entry.versionType)
            const isFirst = index === 0

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className="relative flex items-start gap-4 pb-4 last:pb-0"
              >
                {/* Timeline dot */}
                <div
                  className={`relative z-10 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                    entry.isCurrentVersion
                      ? 'bg-[var(--accent)] border-[var(--accent)]'
                      : `${colors.bg} ${colors.border}`
                  }`}
                >
                  {entry.isCurrentVersion && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    {/* Left: Version info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Version badge */}
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
                        >
                          v{entry.version}
                        </span>

                        {/* Current indicator */}
                        {entry.isCurrentVersion && (
                          <span className="text-xs text-[var(--accent)] font-medium">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Title/Summary */}
                      <p className="mt-1 text-sm text-[var(--text-primary)] line-clamp-2">
                        {entry.title}
                      </p>

                      {/* Meta: Author & Time */}
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--text-tertiary)]">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {entry.createdByName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatRelativeTime(entry.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    {onViewDiff && !entry.isCurrentVersion && (
                      <button
                        onClick={() => onViewDiff(entry.id)}
                        className="flex items-center gap-1 px-2 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Expand/Collapse button */}
      {hasMore && (
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full mt-2 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show {entries.length - maxVisibleItems} more
            </>
          )}
        </motion.button>
      )}
    </div>
  )
}

export default AmendmentHistoryTimeline
