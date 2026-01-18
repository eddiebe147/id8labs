'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from '@/components/motion'
import { useAnnotationContext } from './AnnotationProvider'
import type { Highlight, HighlightColor } from '@/lib/courses/types'

interface HighlightedTextProps {
  highlight: Highlight
  showActions?: boolean
}

const COLOR_CLASSES: Record<HighlightColor, string> = {
  yellow: 'bg-yellow-300/50 hover:bg-yellow-300/70',
  green: 'bg-green-300/50 hover:bg-green-300/70',
  blue: 'bg-blue-300/50 hover:bg-blue-300/70',
  pink: 'bg-pink-300/50 hover:bg-pink-300/70',
}

const COLOR_BORDERS: Record<HighlightColor, string> = {
  yellow: 'border-yellow-400',
  green: 'border-green-400',
  blue: 'border-blue-400',
  pink: 'border-pink-400',
}

export function HighlightedText({ highlight, showActions = true }: HighlightedTextProps) {
  const { updateHighlight, deleteHighlight, setSelectedHighlight } = useAnnotationContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedNote, setEditedNote] = useState(highlight.note || '')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const handleSaveNote = async () => {
    await updateHighlight(highlight.id, { note: editedNote || undefined })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteHighlight(highlight.id)
    setIsDeleting(false)
    setShowConfirmDelete(false)
  }

  const handleColorChange = async (color: HighlightColor) => {
    await updateHighlight(highlight.id, { color })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`group relative p-3 rounded-lg border-l-4 ${COLOR_BORDERS[highlight.color]} bg-[var(--bg-secondary)]`}
    >
      {/* Highlighted text preview */}
      <div
        className={`text-sm leading-relaxed ${COLOR_CLASSES[highlight.color]} px-2 py-1 rounded cursor-pointer`}
        onClick={() => setSelectedHighlight(highlight)}
      >
        "{highlight.highlighted_text}"
      </div>

      {/* Note (if exists) */}
      {highlight.note && !isEditing && (
        <p className="mt-2 text-sm text-[var(--text-secondary)] italic">
          {highlight.note}
        </p>
      )}

      {/* Edit note form */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 overflow-hidden"
          >
            <textarea
              value={editedNote}
              onChange={(e) => setEditedNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full h-20 px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-id8-orange/50"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditedNote(highlight.note || '')
                }}
                className="px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-3 py-1.5 text-xs bg-id8-orange text-white rounded-lg hover:bg-id8-orange/90"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions (shown on hover or when editing) */}
      {showActions && (
        <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Color picker */}
          <div className="flex items-center gap-1">
            {(['yellow', 'green', 'blue', 'pink'] as HighlightColor[]).map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`w-5 h-5 rounded-full ${COLOR_CLASSES[color]} border ${
                  highlight.color === color ? 'ring-2 ring-offset-1 ring-[var(--border)]' : ''
                }`}
                title={`Change to ${color}`}
              />
            ))}
          </div>

          {/* Edit/Delete actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>

            {!showConfirmDelete ? (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="text-xs text-[var(--text-tertiary)] hover:text-red-500"
              >
                Delete
              </button>
            ) : (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-xs text-red-500 hover:text-red-600 disabled:opacity-50"
              >
                {isDeleting ? '...' : 'Confirm'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Timestamp */}
      <div className="mt-2 text-xs text-[var(--text-tertiary)]">
        {new Date(highlight.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
    </motion.div>
  )
}
