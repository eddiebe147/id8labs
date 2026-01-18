'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from '@/components/motion'
import { useAnnotationContext } from './AnnotationProvider'
import { HighlightedText } from './HighlightedText'
import { NoteCard } from './NoteCard'

export function NotesSidebar() {
  const {
    isSidebarOpen,
    closeSidebar,
    moduleHighlights,
    moduleNotes,
    highlightCount,
    noteCount,
    isAuthenticated,
    createNote,
    courseSlug,
    moduleSlug,
    loading,
  } = useAnnotationContext()

  const [activeTab, setActiveTab] = useState<'highlights' | 'notes'>('highlights')
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateNote = async () => {
    if (!newNoteContent.trim()) return

    setIsCreating(true)
    await createNote({
      course_slug: courseSlug,
      module_slug: moduleSlug,
      title: newNoteTitle.trim() || undefined,
      content: newNoteContent.trim(),
    })
    setNewNoteTitle('')
    setNewNoteContent('')
    setIsAddingNote(false)
    setIsCreating(false)
  }

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--bg-primary)] border-l border-[var(--border)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <h2 className="text-lg font-bold">My Notes</h2>
              <button
                onClick={closeSidebar}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[var(--border)]">
              <button
                onClick={() => setActiveTab('highlights')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'highlights'
                    ? 'text-id8-orange border-b-2 border-id8-orange'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Highlights ({highlightCount})
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'notes'
                    ? 'text-id8-orange border-b-2 border-id8-orange'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Notes ({noteCount})
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {!isAuthenticated ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <LockIcon />
                  <p className="mt-4 text-[var(--text-secondary)]">
                    Sign in to save your highlights and notes
                  </p>
                  <a
                    href="/auth/login"
                    className="mt-4 px-4 py-2 bg-id8-orange text-white rounded-lg hover:bg-id8-orange/90 transition-colors"
                  >
                    Sign In
                  </a>
                </div>
              ) : loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin w-6 h-6 border-2 border-id8-orange border-t-transparent rounded-full" />
                </div>
              ) : activeTab === 'highlights' ? (
                <HighlightsTab highlights={moduleHighlights} />
              ) : (
                <NotesTab
                  notes={moduleNotes}
                  isAddingNote={isAddingNote}
                  setIsAddingNote={setIsAddingNote}
                  newNoteTitle={newNoteTitle}
                  setNewNoteTitle={setNewNoteTitle}
                  newNoteContent={newNoteContent}
                  setNewNoteContent={setNewNoteContent}
                  onCreateNote={handleCreateNote}
                  isCreating={isCreating}
                />
              )}
            </div>

            {/* Footer - View All Notes */}
            <div className="p-4 border-t border-[var(--border)]">
              <a
                href="/academy/notebook"
                className="block text-center text-sm text-id8-orange hover:underline"
              >
                View all notes in Notebook →
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// Highlights Tab
function HighlightsTab({ highlights }: { highlights: ReturnType<typeof useAnnotationContext>['moduleHighlights'] }) {
  if (highlights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-center">
        <HighlightIcon className="w-8 h-8 text-[var(--text-tertiary)]" />
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          No highlights yet
        </p>
        <p className="text-xs text-[var(--text-tertiary)]">
          Select text in the module to highlight it
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {highlights.map((highlight) => (
        <HighlightedText key={highlight.id} highlight={highlight} />
      ))}
    </div>
  )
}

// Notes Tab
interface NotesTabProps {
  notes: ReturnType<typeof useAnnotationContext>['moduleNotes']
  isAddingNote: boolean
  setIsAddingNote: (value: boolean) => void
  newNoteTitle: string
  setNewNoteTitle: (value: string) => void
  newNoteContent: string
  setNewNoteContent: (value: string) => void
  onCreateNote: () => void
  isCreating: boolean
}

function NotesTab({
  notes,
  isAddingNote,
  setIsAddingNote,
  newNoteTitle,
  setNewNoteTitle,
  newNoteContent,
  setNewNoteContent,
  onCreateNote,
  isCreating,
}: NotesTabProps) {
  return (
    <div className="space-y-4">
      {/* Add note button/form */}
      {!isAddingNote ? (
        <button
          onClick={() => setIsAddingNote(true)}
          className="w-full p-3 text-sm text-[var(--text-secondary)] border border-dashed border-[var(--border)] rounded-lg hover:border-id8-orange hover:text-id8-orange transition-colors"
        >
          + Add a note
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg space-y-3"
        >
          <input
            type="text"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-id8-orange/50"
          />
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Write your note..."
            className="w-full h-24 px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-id8-orange/50"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setIsAddingNote(false)
                setNewNoteTitle('')
                setNewNoteContent('')
              }}
              className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Cancel
            </button>
            <button
              onClick={onCreateNote}
              disabled={!newNoteContent.trim() || isCreating}
              className="px-3 py-1.5 text-sm bg-id8-orange text-white rounded-lg hover:bg-id8-orange/90 transition-colors disabled:opacity-50"
            >
              {isCreating ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Existing notes */}
      {notes.length === 0 && !isAddingNote && (
        <div className="flex flex-col items-center justify-center h-32 text-center">
          <NoteIcon className="w-8 h-8 text-[var(--text-tertiary)]" />
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            No notes yet
          </p>
          <p className="text-xs text-[var(--text-tertiary)]">
            Add notes to remember key insights
          </p>
        </div>
      )}

      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}

// Icons
function CloseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg className="w-12 h-12 text-[var(--text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
