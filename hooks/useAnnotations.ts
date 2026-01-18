'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import type {
  Highlight,
  Note,
  HighlightColor,
  CreateHighlightInput,
  UpdateHighlightInput,
  CreateNoteInput,
  UpdateNoteInput,
  AnnotationStats,
} from '@/lib/courses/types'

interface UseAnnotationsOptions {
  courseSlug?: string
  moduleSlug?: string
}

interface UseAnnotationsReturn {
  // Data
  highlights: Highlight[]
  notes: Note[]
  stats: AnnotationStats | null
  loading: boolean
  error: string | null

  // Highlight operations
  createHighlight: (input: CreateHighlightInput) => Promise<Highlight | null>
  updateHighlight: (id: string, input: UpdateHighlightInput) => Promise<boolean>
  deleteHighlight: (id: string) => Promise<boolean>
  getHighlightsForModule: (courseSlug: string, moduleSlug: string) => Highlight[]

  // Note operations
  createNote: (input: CreateNoteInput) => Promise<Note | null>
  updateNote: (id: string, input: UpdateNoteInput) => Promise<boolean>
  deleteNote: (id: string) => Promise<boolean>
  getNotesForModule: (courseSlug: string, moduleSlug?: string) => Note[]

  // Utilities
  refetch: () => Promise<void>
  isAuthenticated: boolean
}

export function useAnnotations(options: UseAnnotationsOptions = {}): UseAnnotationsReturn {
  const { courseSlug, moduleSlug } = options

  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [stats, setStats] = useState<AnnotationStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Build query params for API calls
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams()
    if (courseSlug) params.set('courseSlug', courseSlug)
    if (moduleSlug) params.set('moduleSlug', moduleSlug)
    return params.toString()
  }, [courseSlug, moduleSlug])

  // Fetch all annotations
  const fetchAnnotations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const queryParams = buildQueryParams()
      const url = `/api/annotations${queryParams ? `?${queryParams}` : ''}`

      const response = await fetch(url)

      if (response.status === 401) {
        // User not logged in - not an error, just no annotations
        setHighlights([])
        setNotes([])
        setStats(null)
        setIsAuthenticated(false)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch annotations')
      }

      const data = await response.json()
      setHighlights(data.highlights || [])
      setNotes(data.notes || [])
      setStats(data.stats || null)
      setIsAuthenticated(true)
    } catch (err) {
      console.error('Error fetching annotations:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [buildQueryParams])

  // Initial fetch
  useEffect(() => {
    fetchAnnotations()
  }, [fetchAnnotations])

  // ═══════════════════════════════════════════════════════════════════════════
  // Highlight Operations
  // ═══════════════════════════════════════════════════════════════════════════

  const createHighlight = useCallback(
    async (input: CreateHighlightInput): Promise<Highlight | null> => {
      try {
        const response = await fetch('/api/annotations/highlights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          throw new Error('Failed to create highlight')
        }

        const highlight = await response.json()
        setHighlights((prev) => [highlight, ...prev])

        // Update stats
        if (stats) {
          const courseStats = stats.by_course[input.course_slug] || { highlights: 0, notes: 0 }
          setStats({
            ...stats,
            total_highlights: stats.total_highlights + 1,
            by_course: {
              ...stats.by_course,
              [input.course_slug]: {
                ...courseStats,
                highlights: courseStats.highlights + 1,
              },
            },
          })
        }

        return highlight
      } catch (err) {
        console.error('Error creating highlight:', err)
        return null
      }
    },
    [stats]
  )

  const updateHighlight = useCallback(
    async (id: string, input: UpdateHighlightInput): Promise<boolean> => {
      try {
        const response = await fetch(`/api/annotations/highlights/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          throw new Error('Failed to update highlight')
        }

        const updated = await response.json()
        setHighlights((prev) =>
          prev.map((h) => (h.id === id ? { ...h, ...updated } : h))
        )
        return true
      } catch (err) {
        console.error('Error updating highlight:', err)
        return false
      }
    },
    []
  )

  const deleteHighlight = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const highlightToDelete = highlights.find((h) => h.id === id)
        if (!highlightToDelete) return false

        const response = await fetch(`/api/annotations/highlights/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete highlight')
        }

        setHighlights((prev) => prev.filter((h) => h.id !== id))

        // Update stats
        if (stats) {
          const courseStats = stats.by_course[highlightToDelete.course_slug]
          if (courseStats) {
            setStats({
              ...stats,
              total_highlights: stats.total_highlights - 1,
              by_course: {
                ...stats.by_course,
                [highlightToDelete.course_slug]: {
                  ...courseStats,
                  highlights: courseStats.highlights - 1,
                },
              },
            })
          }
        }

        return true
      } catch (err) {
        console.error('Error deleting highlight:', err)
        return false
      }
    },
    [highlights, stats]
  )

  const getHighlightsForModule = useCallback(
    (courseSlug: string, moduleSlug: string): Highlight[] => {
      return highlights.filter(
        (h) => h.course_slug === courseSlug && h.module_slug === moduleSlug
      )
    },
    [highlights]
  )

  // ═══════════════════════════════════════════════════════════════════════════
  // Note Operations
  // ═══════════════════════════════════════════════════════════════════════════

  const createNote = useCallback(
    async (input: CreateNoteInput): Promise<Note | null> => {
      try {
        const response = await fetch('/api/annotations/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          throw new Error('Failed to create note')
        }

        const note = await response.json()
        setNotes((prev) => [note, ...prev])

        // Update stats
        if (stats) {
          const courseStats = stats.by_course[input.course_slug] || { highlights: 0, notes: 0 }
          setStats({
            ...stats,
            total_notes: stats.total_notes + 1,
            by_course: {
              ...stats.by_course,
              [input.course_slug]: {
                ...courseStats,
                notes: courseStats.notes + 1,
              },
            },
          })
        }

        return note
      } catch (err) {
        console.error('Error creating note:', err)
        return null
      }
    },
    [stats]
  )

  const updateNote = useCallback(
    async (id: string, input: UpdateNoteInput): Promise<boolean> => {
      try {
        const response = await fetch(`/api/annotations/notes/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          throw new Error('Failed to update note')
        }

        const updated = await response.json()
        setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updated } : n)))
        return true
      } catch (err) {
        console.error('Error updating note:', err)
        return false
      }
    },
    []
  )

  const deleteNote = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const noteToDelete = notes.find((n) => n.id === id)
        if (!noteToDelete) return false

        const response = await fetch(`/api/annotations/notes/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete note')
        }

        setNotes((prev) => prev.filter((n) => n.id !== id))

        // Update stats
        if (stats) {
          const courseStats = stats.by_course[noteToDelete.course_slug]
          if (courseStats) {
            setStats({
              ...stats,
              total_notes: stats.total_notes - 1,
              by_course: {
                ...stats.by_course,
                [noteToDelete.course_slug]: {
                  ...courseStats,
                  notes: courseStats.notes - 1,
                },
              },
            })
          }
        }

        return true
      } catch (err) {
        console.error('Error deleting note:', err)
        return false
      }
    },
    [notes, stats]
  )

  const getNotesForModule = useCallback(
    (courseSlug: string, moduleSlug?: string): Note[] => {
      return notes.filter(
        (n) =>
          n.course_slug === courseSlug &&
          (moduleSlug ? n.module_slug === moduleSlug : true)
      )
    },
    [notes]
  )

  return {
    highlights,
    notes,
    stats,
    loading,
    error,
    createHighlight,
    updateHighlight,
    deleteHighlight,
    getHighlightsForModule,
    createNote,
    updateNote,
    deleteNote,
    getNotesForModule,
    refetch: fetchAnnotations,
    isAuthenticated,
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Module-specific hook for simpler usage in module pages
// ═══════════════════════════════════════════════════════════════════════════

export function useModuleAnnotations(courseSlug: string, moduleSlug: string) {
  const annotations = useAnnotations({ courseSlug, moduleSlug })

  // Memoized filtered lists for this specific module
  const moduleHighlights = useMemo(
    () => annotations.getHighlightsForModule(courseSlug, moduleSlug),
    [annotations, courseSlug, moduleSlug]
  )

  const moduleNotes = useMemo(
    () => annotations.getNotesForModule(courseSlug, moduleSlug),
    [annotations, courseSlug, moduleSlug]
  )

  return {
    ...annotations,
    moduleHighlights,
    moduleNotes,
    highlightCount: moduleHighlights.length,
    noteCount: moduleNotes.length,
  }
}
