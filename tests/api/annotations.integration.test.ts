import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { NextRequest } from 'next/server'
import { POST as createHighlight } from '@/app/api/annotations/highlights/route'
import { POST as createNote } from '@/app/api/annotations/notes/route'
import { createClient } from '@/lib/supabase/server'
import type { CreateHighlightInput, CreateNoteInput } from '@/lib/courses/types'

// Mock Supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('Annotations API Integration Tests', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/annotations/highlights', () => {
    describe('Authentication', () => {
      it('should return 401 when user not authenticated', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: null },
              error: { message: 'Invalid JWT' },
            }),
          },
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            module_slug: 'module-1',
            highlighted_text: 'Important text',
          }),
        })

        const response = await createHighlight(request)
        const data = await response.json()

        expect(response.status).toBe(401)
        expect(data.error).toBe('Unauthorized')
      })

      it('should return 500 when Supabase client creation fails', async () => {
        ;(createClient as Mock).mockResolvedValue(null)

        const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            module_slug: 'module-1',
            highlighted_text: 'Important text',
          }),
        })

        const response = await createHighlight(request)
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.error).toBe('Server configuration error')
      })
    })

    describe('Validation', () => {
      it('should return 400 when missing course_slug', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
          method: 'POST',
          body: JSON.stringify({
            module_slug: 'module-1',
            highlighted_text: 'Important text',
          }),
        })

        const response = await createHighlight(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toContain('Missing required fields')
      })

      it('should return 400 when missing module_slug', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            highlighted_text: 'Important text',
          }),
        })

        const response = await createHighlight(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toContain('Missing required fields')
      })

      it('should return 400 when missing highlighted_text', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            module_slug: 'module-1',
          }),
        })

        const response = await createHighlight(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toContain('Missing required fields')
      })

      it('should return 400 when color is invalid', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            module_slug: 'module-1',
            highlighted_text: 'Important text',
            color: 'red', // Invalid color
          }),
        })

        const response = await createHighlight(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toContain('Invalid color')
      })
    })

    describe('Success cases', () => {
      it('should create highlight with valid data', async () => {
        const mockHighlight = {
          id: 'highlight-123',
          user_id: 'user-123',
          course_slug: 'ai-fundamentals',
          module_slug: 'module-1',
          highlighted_text: 'Important text',
          text_prefix: null,
          text_suffix: null,
          color: 'yellow',
          note: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
          from: vi.fn(() => ({
            insert: vi.fn().mockReturnThis(),
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: mockHighlight,
              error: null,
            }),
          })),
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            module_slug: 'module-1',
            highlighted_text: 'Important text',
          }),
        })

        const response = await createHighlight(request)
        const data = await response.json()

        expect(response.status).toBe(201)
        expect(data.id).toBe('highlight-123')
        expect(data.highlighted_text).toBe('Important text')
        expect(mockSupabase.from).toHaveBeenCalledWith('course_highlights')
      })

      it('should create highlight with all optional fields', async () => {
        const mockHighlight = {
          id: 'highlight-123',
          user_id: 'user-123',
          course_slug: 'ai-fundamentals',
          module_slug: 'module-1',
          highlighted_text: 'Important text',
          text_prefix: 'Before',
          text_suffix: 'After',
          color: 'green',
          note: 'My note',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
          from: vi.fn(() => ({
            insert: vi.fn().mockReturnThis(),
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: mockHighlight,
              error: null,
            }),
          })),
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            module_slug: 'module-1',
            highlighted_text: 'Important text',
            text_prefix: 'Before',
            text_suffix: 'After',
            color: 'green',
            note: 'My note',
          }),
        })

        const response = await createHighlight(request)
        const data = await response.json()

        expect(response.status).toBe(201)
        expect(data.color).toBe('green')
        expect(data.note).toBe('My note')
        expect(data.text_prefix).toBe('Before')
        expect(data.text_suffix).toBe('After')
      })

      it('should handle database errors gracefully', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
          from: vi.fn(() => ({
            insert: vi.fn().mockReturnThis(),
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' },
            }),
          })),
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            module_slug: 'module-1',
            highlighted_text: 'Important text',
          }),
        })

        const response = await createHighlight(request)
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.error).toBe('Failed to create highlight')
      })
    })
  })

  describe('POST /api/annotations/notes', () => {
    describe('Authentication', () => {
      it('should return 401 when user not authenticated', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: null },
              error: { message: 'Invalid JWT' },
            }),
          },
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/notes', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            content: 'My note',
          }),
        })

        const response = await createNote(request)
        const data = await response.json()

        expect(response.status).toBe(401)
        expect(data.error).toBe('Unauthorized')
      })

      it('should return 500 when Supabase client creation fails', async () => {
        ;(createClient as Mock).mockResolvedValue(null)

        const request = new NextRequest('http://localhost:3000/api/annotations/notes', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            content: 'My note',
          }),
        })

        const response = await createNote(request)
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.error).toBe('Server configuration error')
      })
    })

    describe('Validation', () => {
      it('should return 400 when missing course_slug', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/notes', {
          method: 'POST',
          body: JSON.stringify({
            content: 'My note',
          }),
        })

        const response = await createNote(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toContain('Missing required fields')
      })

      it('should return 400 when missing content', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/notes', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
          }),
        })

        const response = await createNote(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toContain('Missing required fields')
      })
    })

    describe('Success cases', () => {
      it('should create note with minimal required fields', async () => {
        const mockNote = {
          id: 'note-123',
          user_id: 'user-123',
          course_slug: 'ai-fundamentals',
          module_slug: null,
          title: null,
          content: 'My note content',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
          from: vi.fn(() => ({
            insert: vi.fn().mockReturnThis(),
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: mockNote,
              error: null,
            }),
          })),
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/notes', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            content: 'My note content',
          }),
        })

        const response = await createNote(request)
        const data = await response.json()

        expect(response.status).toBe(201)
        expect(data.id).toBe('note-123')
        expect(data.content).toBe('My note content')
        expect(mockSupabase.from).toHaveBeenCalledWith('course_notes')
      })

      it('should create note with all optional fields', async () => {
        const mockNote = {
          id: 'note-123',
          user_id: 'user-123',
          course_slug: 'ai-fundamentals',
          module_slug: 'module-1',
          title: 'Key Insight',
          content: 'My note content',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
          from: vi.fn(() => ({
            insert: vi.fn().mockReturnThis(),
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: mockNote,
              error: null,
            }),
          })),
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/notes', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            module_slug: 'module-1',
            title: 'Key Insight',
            content: 'My note content',
          }),
        })

        const response = await createNote(request)
        const data = await response.json()

        expect(response.status).toBe(201)
        expect(data.title).toBe('Key Insight')
        expect(data.module_slug).toBe('module-1')
        expect(data.content).toBe('My note content')
      })

      it('should handle database errors gracefully', async () => {
        const mockSupabase = {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: mockUser },
              error: null,
            }),
          },
          from: vi.fn(() => ({
            insert: vi.fn().mockReturnThis(),
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' },
            }),
          })),
        }
        ;(createClient as Mock).mockResolvedValue(mockSupabase)

        const request = new NextRequest('http://localhost:3000/api/annotations/notes', {
          method: 'POST',
          body: JSON.stringify({
            course_slug: 'ai-fundamentals',
            content: 'My note',
          }),
        })

        const response = await createNote(request)
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.error).toBe('Failed to create note')
      })
    })
  })

  describe('Error handling', () => {
    it('should handle malformed JSON in highlight request', async () => {
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: mockUser },
            error: null,
          }),
        },
      }
      ;(createClient as Mock).mockResolvedValue(mockSupabase)

      // Create a request with invalid JSON
      const request = new NextRequest('http://localhost:3000/api/annotations/highlights', {
        method: 'POST',
        body: 'invalid json',
      })

      const response = await createHighlight(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })

    it('should handle malformed JSON in note request', async () => {
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: mockUser },
            error: null,
          }),
        },
      }
      ;(createClient as Mock).mockResolvedValue(mockSupabase)

      const request = new NextRequest('http://localhost:3000/api/annotations/notes', {
        method: 'POST',
        body: 'invalid json',
      })

      const response = await createNote(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })
})
