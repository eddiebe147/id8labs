import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useAnnotations, useModuleAnnotations } from '@/hooks/useAnnotations'
import type { Highlight, Note, AnnotationStats } from '@/lib/courses/types'

// Mock fetch globally
const mockFetch = vi.fn()

beforeEach(() => {
  global.fetch = mockFetch as any
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useAnnotations', () => {
  const mockHighlight: Highlight = {
    id: 'highlight-1',
    user_id: 'user-123',
    course_slug: 'ai-fundamentals',
    module_slug: 'module-1',
    highlighted_text: 'This is important',
    text_prefix: 'Before text',
    text_suffix: 'After text',
    color: 'yellow',
    note: 'My note',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  }

  const mockNote: Note = {
    id: 'note-1',
    user_id: 'user-123',
    course_slug: 'ai-fundamentals',
    module_slug: 'module-1',
    title: 'Key Insight',
    content: 'This is a note about the module',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  }

  const mockStats: AnnotationStats = {
    total_highlights: 1,
    total_notes: 1,
    by_course: {
      'ai-fundamentals': { highlights: 1, notes: 1 },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial fetch behavior', () => {
    it('should fetch annotations on mount when authenticated', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [mockHighlight],
          notes: [mockNote],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/annotations')
      expect(result.current.highlights).toEqual([mockHighlight])
      expect(result.current.notes).toEqual([mockNote])
      expect(result.current.stats).toEqual(mockStats)
      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.error).toBeNull()
    })

    it('should handle unauthenticated state (401)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.highlights).toEqual([])
      expect(result.current.notes).toEqual([])
      expect(result.current.stats).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('should handle fetch errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe('Failed to fetch annotations')
    })

    it('should fetch with courseSlug filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [mockHighlight],
          notes: [mockNote],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() =>
        useAnnotations({ courseSlug: 'ai-fundamentals' })
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/annotations?courseSlug=ai-fundamentals')
    })

    it('should fetch with both courseSlug and moduleSlug filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [mockHighlight],
          notes: [mockNote],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() =>
        useAnnotations({ courseSlug: 'ai-fundamentals', moduleSlug: 'module-1' })
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/annotations?courseSlug=ai-fundamentals&moduleSlug=module-1'
      )
    })
  })

  describe('createHighlight', () => {
    it('should create a highlight and update state', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [],
          stats: { total_highlights: 0, total_notes: 0, by_course: {} },
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Create highlight
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockHighlight,
      })

      let createdHighlight: Highlight | null = null
      await act(async () => {
        createdHighlight = await result.current.createHighlight({
          course_slug: 'ai-fundamentals',
          module_slug: 'module-1',
          highlighted_text: 'This is important',
          color: 'yellow',
        })
      })

      expect(createdHighlight).toEqual(mockHighlight)
      expect(result.current.highlights).toEqual([mockHighlight])
    })

    it('should update stats when creating a highlight', async () => {
      // Initial fetch with existing stats
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [],
          stats: {
            total_highlights: 0,
            total_notes: 0,
            by_course: {},
          },
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Create highlight
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockHighlight,
      })

      await act(async () => {
        await result.current.createHighlight({
          course_slug: 'ai-fundamentals',
          module_slug: 'module-1',
          highlighted_text: 'This is important',
        })
      })

      expect(result.current.stats?.total_highlights).toBe(1)
      expect(result.current.stats?.by_course['ai-fundamentals']?.highlights).toBe(1)
    })

    it('should handle create highlight errors', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [],
          stats: { total_highlights: 0, total_notes: 0, by_course: {} },
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Create highlight fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      let createdHighlight: Highlight | null = null
      await act(async () => {
        createdHighlight = await result.current.createHighlight({
          course_slug: 'ai-fundamentals',
          module_slug: 'module-1',
          highlighted_text: 'This is important',
        })
      })

      expect(createdHighlight).toBeNull()
      expect(result.current.highlights).toEqual([])
    })
  })

  describe('updateHighlight', () => {
    it('should update a highlight', async () => {
      // Initial fetch with existing highlight
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [mockHighlight],
          notes: [],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Update highlight
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ color: 'green' }),
      })

      let success = false
      await act(async () => {
        success = await result.current.updateHighlight('highlight-1', {
          color: 'green',
        })
      })

      expect(success).toBe(true)
      expect(result.current.highlights[0].color).toBe('green')
    })

    it('should handle update highlight errors', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [mockHighlight],
          notes: [],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Update fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      let success = true
      await act(async () => {
        success = await result.current.updateHighlight('highlight-1', {
          color: 'green',
        })
      })

      expect(success).toBe(false)
    })
  })

  describe('deleteHighlight', () => {
    it('should delete a highlight and update stats', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [mockHighlight],
          notes: [],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Delete highlight
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      })

      let success = false
      await act(async () => {
        success = await result.current.deleteHighlight('highlight-1')
      })

      expect(success).toBe(true)
      expect(result.current.highlights).toEqual([])
      expect(result.current.stats?.total_highlights).toBe(0)
    })

    it('should handle delete highlight errors', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [mockHighlight],
          notes: [],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Delete fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      let success = true
      await act(async () => {
        success = await result.current.deleteHighlight('highlight-1')
      })

      expect(success).toBe(false)
      expect(result.current.highlights).toEqual([mockHighlight])
    })

    it('should return false when deleting non-existent highlight', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [],
          stats: { total_highlights: 0, total_notes: 0, by_course: {} },
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let success = true
      await act(async () => {
        success = await result.current.deleteHighlight('non-existent')
      })

      expect(success).toBe(false)
    })
  })

  describe('createNote', () => {
    it('should create a note and update state', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [],
          stats: { total_highlights: 0, total_notes: 0, by_course: {} },
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Create note
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockNote,
      })

      let createdNote: Note | null = null
      await act(async () => {
        createdNote = await result.current.createNote({
          course_slug: 'ai-fundamentals',
          module_slug: 'module-1',
          title: 'Key Insight',
          content: 'This is a note',
        })
      })

      expect(createdNote).toEqual(mockNote)
      expect(result.current.notes).toEqual([mockNote])
    })

    it('should update stats when creating a note', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [],
          stats: {
            total_highlights: 0,
            total_notes: 0,
            by_course: {},
          },
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Create note
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockNote,
      })

      await act(async () => {
        await result.current.createNote({
          course_slug: 'ai-fundamentals',
          content: 'This is a note',
        })
      })

      expect(result.current.stats?.total_notes).toBe(1)
      expect(result.current.stats?.by_course['ai-fundamentals']?.notes).toBe(1)
    })

    it('should handle create note errors', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [],
          stats: { total_highlights: 0, total_notes: 0, by_course: {} },
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Create note fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      let createdNote: Note | null = null
      await act(async () => {
        createdNote = await result.current.createNote({
          course_slug: 'ai-fundamentals',
          content: 'This is a note',
        })
      })

      expect(createdNote).toBeNull()
      expect(result.current.notes).toEqual([])
    })
  })

  describe('updateNote', () => {
    it('should update a note', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [mockNote],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Update note
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ content: 'Updated content' }),
      })

      let success = false
      await act(async () => {
        success = await result.current.updateNote('note-1', {
          content: 'Updated content',
        })
      })

      expect(success).toBe(true)
      expect(result.current.notes[0].content).toBe('Updated content')
    })

    it('should handle update note errors', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [mockNote],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Update fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      let success = true
      await act(async () => {
        success = await result.current.updateNote('note-1', {
          content: 'Updated content',
        })
      })

      expect(success).toBe(false)
    })
  })

  describe('deleteNote', () => {
    it('should delete a note and update stats', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [mockNote],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Delete note
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      })

      let success = false
      await act(async () => {
        success = await result.current.deleteNote('note-1')
      })

      expect(success).toBe(true)
      expect(result.current.notes).toEqual([])
      expect(result.current.stats?.total_notes).toBe(0)
    })

    it('should return false when deleting non-existent note', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [],
          stats: { total_highlights: 0, total_notes: 0, by_course: {} },
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let success = true
      await act(async () => {
        success = await result.current.deleteNote('non-existent')
      })

      expect(success).toBe(false)
    })
  })

  describe('getHighlightsForModule', () => {
    it('should filter highlights by course and module', async () => {
      const highlight2: Highlight = {
        ...mockHighlight,
        id: 'highlight-2',
        module_slug: 'module-2',
      }

      const highlight3: Highlight = {
        ...mockHighlight,
        id: 'highlight-3',
        course_slug: 'different-course',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [mockHighlight, highlight2, highlight3],
          notes: [],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const filtered = result.current.getHighlightsForModule('ai-fundamentals', 'module-1')
      expect(filtered).toEqual([mockHighlight])
    })
  })

  describe('getNotesForModule', () => {
    it('should filter notes by course and module', async () => {
      const note2: Note = {
        ...mockNote,
        id: 'note-2',
        module_slug: 'module-2',
      }

      const note3: Note = {
        ...mockNote,
        id: 'note-3',
        course_slug: 'different-course',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [mockNote, note2, note3],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const filtered = result.current.getNotesForModule('ai-fundamentals', 'module-1')
      expect(filtered).toEqual([mockNote])
    })

    it('should filter notes by course only when moduleSlug not provided', async () => {
      const note2: Note = {
        ...mockNote,
        id: 'note-2',
        module_slug: 'module-2',
      }

      const note3: Note = {
        ...mockNote,
        id: 'note-3',
        course_slug: 'different-course',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [mockNote, note2, note3],
          stats: mockStats,
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const filtered = result.current.getNotesForModule('ai-fundamentals')
      expect(filtered).toEqual([mockNote, note2])
    })
  })

  describe('refetch', () => {
    it('should refetch annotations', async () => {
      // Initial fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [],
          notes: [],
          stats: { total_highlights: 0, total_notes: 0, by_course: {} },
        }),
      })

      const { result } = renderHook(() => useAnnotations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.highlights).toEqual([])

      // Refetch with new data
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          highlights: [mockHighlight],
          notes: [mockNote],
          stats: mockStats,
        }),
      })

      await act(async () => {
        await result.current.refetch()
      })

      expect(result.current.highlights).toEqual([mockHighlight])
      expect(result.current.notes).toEqual([mockNote])
    })
  })
})

describe('useModuleAnnotations', () => {
  const mockHighlight: Highlight = {
    id: 'highlight-1',
    user_id: 'user-123',
    course_slug: 'ai-fundamentals',
    module_slug: 'module-1',
    highlighted_text: 'This is important',
    text_prefix: 'Before text',
    text_suffix: 'After text',
    color: 'yellow',
    note: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  }

  const mockNote: Note = {
    id: 'note-1',
    user_id: 'user-123',
    course_slug: 'ai-fundamentals',
    module_slug: 'module-1',
    title: 'Key Insight',
    content: 'This is a note about the module',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return filtered highlights and notes for specific module', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        highlights: [mockHighlight],
        notes: [mockNote],
        stats: { total_highlights: 1, total_notes: 1, by_course: {} },
      }),
    })

    const { result } = renderHook(() =>
      useModuleAnnotations('ai-fundamentals', 'module-1')
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.moduleHighlights).toEqual([mockHighlight])
    expect(result.current.moduleNotes).toEqual([mockNote])
    expect(result.current.highlightCount).toBe(1)
    expect(result.current.noteCount).toBe(1)
  })

  it('should provide all base useAnnotations functionality', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        highlights: [mockHighlight],
        notes: [mockNote],
        stats: { total_highlights: 1, total_notes: 1, by_course: {} },
      }),
    })

    const { result } = renderHook(() =>
      useModuleAnnotations('ai-fundamentals', 'module-1')
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.highlights).toEqual([mockHighlight])
    expect(result.current.notes).toEqual([mockNote])
    expect(result.current.createHighlight).toBeDefined()
    expect(result.current.createNote).toBeDefined()
    expect(result.current.refetch).toBeDefined()
  })
})
