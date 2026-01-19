'use client'

import { useAnnotationContext } from './AnnotationProvider'

export function QuickNoteButton() {
  const { toggleSidebar, highlightCount, noteCount, isAuthenticated } = useAnnotationContext()

  const totalAnnotations = highlightCount + noteCount

  return (
    <button
      onClick={toggleSidebar}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full shadow-lg hover:shadow-xl hover:border-id8-orange/50 transition-all group"
      aria-label="Open notes sidebar"
    >
      <NotebookIcon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-id8-orange transition-colors" />
      <span className="text-sm font-medium text-[var(--text-primary)]">
        My Notes
      </span>
      {isAuthenticated && totalAnnotations > 0 && (
        <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold bg-id8-orange text-white rounded-full">
          {totalAnnotations}
        </span>
      )}
    </button>
  )
}

// Also export a minimal version for mobile/compact layouts
export function QuickNoteButtonMinimal() {
  const { toggleSidebar, highlightCount, noteCount, isAuthenticated } = useAnnotationContext()

  const totalAnnotations = highlightCount + noteCount

  return (
    <button
      onClick={toggleSidebar}
      className="relative p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full shadow-lg hover:shadow-xl hover:border-id8-orange/50 transition-all"
      aria-label="Open notes sidebar"
    >
      <NotebookIcon className="w-5 h-5 text-[var(--text-secondary)]" />
      {isAuthenticated && totalAnnotations > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold bg-id8-orange text-white rounded-full">
          {totalAnnotations > 99 ? '99+' : totalAnnotations}
        </span>
      )}
    </button>
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
