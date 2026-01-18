'use client'

import { createContext, useContext, ReactNode, useState, useCallback } from 'react'
import { useModuleAnnotations } from '@/hooks/useAnnotations'
import type {
  Highlight,
  Note,
  HighlightColor,
  CreateHighlightInput,
  CreateNoteInput,
  UpdateHighlightInput,
  UpdateNoteInput,
  AnnotationStats,
} from '@/lib/courses/types'

interface AnnotationContextValue {
  // Data
  highlights: Highlight[]
  notes: Note[]
  moduleHighlights: Highlight[]
  moduleNotes: Note[]
  stats: AnnotationStats | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean

  // Counts
  highlightCount: number
  noteCount: number

  // Selection state
  selectedHighlight: Highlight | null
  setSelectedHighlight: (highlight: Highlight | null) => void

  // Sidebar state
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void

  // Operations
  createHighlight: (input: CreateHighlightInput) => Promise<Highlight | null>
  updateHighlight: (id: string, input: UpdateHighlightInput) => Promise<boolean>
  deleteHighlight: (id: string) => Promise<boolean>
  createNote: (input: CreateNoteInput) => Promise<Note | null>
  updateNote: (id: string, input: UpdateNoteInput) => Promise<boolean>
  deleteNote: (id: string) => Promise<boolean>
  refetch: () => Promise<void>

  // Course/module context
  courseSlug: string
  moduleSlug: string
}

const AnnotationContext = createContext<AnnotationContextValue | null>(null)

interface AnnotationProviderProps {
  children: ReactNode
  courseSlug: string
  moduleSlug: string
}

export function AnnotationProvider({
  children,
  courseSlug,
  moduleSlug,
}: AnnotationProviderProps) {
  const annotations = useModuleAnnotations(courseSlug, moduleSlug)

  // Local UI state
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = useCallback(() => setIsSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])
  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), [])

  const value: AnnotationContextValue = {
    // Data from hook
    highlights: annotations.highlights,
    notes: annotations.notes,
    moduleHighlights: annotations.moduleHighlights,
    moduleNotes: annotations.moduleNotes,
    stats: annotations.stats,
    loading: annotations.loading,
    error: annotations.error,
    isAuthenticated: annotations.isAuthenticated,

    // Counts
    highlightCount: annotations.highlightCount,
    noteCount: annotations.noteCount,

    // Selection state
    selectedHighlight,
    setSelectedHighlight,

    // Sidebar state
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,

    // Operations
    createHighlight: annotations.createHighlight,
    updateHighlight: annotations.updateHighlight,
    deleteHighlight: annotations.deleteHighlight,
    createNote: annotations.createNote,
    updateNote: annotations.updateNote,
    deleteNote: annotations.deleteNote,
    refetch: annotations.refetch,

    // Course/module context
    courseSlug,
    moduleSlug,
  }

  return (
    <AnnotationContext.Provider value={value}>
      {children}
    </AnnotationContext.Provider>
  )
}

export function useAnnotationContext() {
  const context = useContext(AnnotationContext)
  if (!context) {
    throw new Error('useAnnotationContext must be used within AnnotationProvider')
  }
  return context
}

// Optional hook that returns null if not in provider (for conditional usage)
export function useAnnotationContextSafe() {
  return useContext(AnnotationContext)
}
