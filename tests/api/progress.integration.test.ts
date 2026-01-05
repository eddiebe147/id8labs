import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Use vi.hoisted to declare mocks that will be available in vi.mock
const { mockGetUser, mockFrom, mockOrder, mockUpsert } = vi.hoisted(() => {
  const mockGetUser = vi.fn()
  const mockFrom = vi.fn()
  const mockOrder = vi.fn()
  const mockUpsert = vi.fn()
  const mockSelect = vi.fn()
  const mockEq = vi.fn()

  // Create chainable mock
  const createChainableMock = () => ({
    select: mockSelect.mockReturnThis(),
    eq: mockEq.mockReturnThis(),
    order: mockOrder,
    upsert: mockUpsert,
  })

  mockFrom.mockReturnValue(createChainableMock())

  return { mockGetUser, mockFrom, mockSelect, mockEq, mockOrder, mockUpsert }
})

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: mockGetUser,
    },
    from: mockFrom,
  }),
}))

// Import routes after mock setup
import { GET as getProgress } from '@/app/api/progress/route'
import { POST as postComplete } from '@/app/api/progress/complete/route'

describe('GET /api/progress', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default: authenticated user
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'test-user-123', email: 'test@example.com' } },
      error: null,
    })
  })

  describe('Authentication', () => {
    it('should return 401 when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid JWT' },
      })

      const response = await getProgress()
      expect(response.status).toBe(401)

      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
    })
  })

  describe('Progress Retrieval', () => {
    it('should return empty progress for new user', async () => {
      mockOrder.mockResolvedValue({
        data: [],
        error: null,
      })

      const response = await getProgress()
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.progress).toEqual([])
      expect(data.stats.completed).toBe(0)
      expect(data.stats.percent).toBe(0)
      expect(data.isFoundationComplete).toBe(false)
    })

    it('should return progress with correct stats', async () => {
      const mockProgress = [
        { course_slug: 'ai-conversation-fundamentals', module_slug: 'module-1', completed_at: '2024-01-01' },
        { course_slug: 'ai-conversation-fundamentals', module_slug: 'module-2', completed_at: '2024-01-02' },
        { course_slug: 'ai-conversation-fundamentals', module_slug: 'module-3', completed_at: '2024-01-03' },
      ]

      mockOrder.mockResolvedValue({
        data: mockProgress,
        error: null,
      })

      const response = await getProgress()
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.progress).toHaveLength(3)
      expect(data.stats.completed).toBe(3)
    })

    it('should calculate foundation completion correctly', async () => {
      // Complete all 6 foundation modules
      const mockProgress = Array.from({ length: 6 }, (_, i) => ({
        course_slug: 'ai-conversation-fundamentals',
        module_slug: `module-${i + 1}`,
        completed_at: new Date().toISOString(),
      }))

      mockOrder.mockResolvedValue({
        data: mockProgress,
        error: null,
      })

      const response = await getProgress()
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.isFoundationComplete).toBe(true)
      expect(data.courseStats['ai-conversation-fundamentals'].percent).toBe(100)
    })

    it('should provide resume point for incomplete progress', async () => {
      mockOrder.mockResolvedValue({
        data: [
          { course_slug: 'ai-conversation-fundamentals', module_slug: 'module-1', completed_at: '2024-01-01' },
        ],
        error: null,
      })

      const response = await getProgress()
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.resumePoint).toBeDefined()
      expect(data.resumePoint.moduleNumber).toBe(2) // Next uncompleted module
    })
  })

  describe('Error Handling', () => {
    it('should return 500 when database query fails', async () => {
      mockOrder.mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      })

      const response = await getProgress()
      expect(response.status).toBe(500)

      const data = await response.json()
      expect(data.error).toBe('Failed to fetch progress')
    })
  })
})

describe('POST /api/progress/complete', () => {
  const createRequest = (body: unknown) => {
    return new NextRequest('http://localhost:3000/api/progress/complete', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Default: authenticated user
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'test-user-123', email: 'test@example.com' } },
      error: null,
    })
  })

  describe('Authentication', () => {
    it('should return 401 when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid JWT' },
      })

      const request = createRequest({
        courseSlug: 'ai-conversation-fundamentals',
        moduleSlug: 'module-1',
      })

      const response = await postComplete(request)
      expect(response.status).toBe(401)

      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
    })
  })

  describe('Validation', () => {
    it('should return 400 for invalid course slug', async () => {
      const request = createRequest({
        courseSlug: 'invalid-course',
        moduleSlug: 'module-1',
      })

      const response = await postComplete(request)
      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.error).toBe('Invalid course')
    })

    it('should return 400 for invalid module format', async () => {
      const request = createRequest({
        courseSlug: 'ai-conversation-fundamentals',
        moduleSlug: 'invalid-module',
      })

      const response = await postComplete(request)
      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.error).toBe('Invalid module format')
    })

    it('should return 400 for module number out of range', async () => {
      const request = createRequest({
        courseSlug: 'ai-conversation-fundamentals',
        moduleSlug: 'module-999',
      })

      const response = await postComplete(request)
      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.error).toBe('Invalid module number')
    })

    it('should return 400 for module-0', async () => {
      const request = createRequest({
        courseSlug: 'ai-conversation-fundamentals',
        moduleSlug: 'module-0',
      })

      const response = await postComplete(request)
      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.error).toBe('Invalid module number')
    })
  })

  describe('Success Cases', () => {
    it('should successfully mark module as complete', async () => {
      mockUpsert.mockResolvedValue({
        data: null,
        error: null,
      })

      const request = createRequest({
        courseSlug: 'ai-conversation-fundamentals',
        moduleSlug: 'module-1',
      })

      const response = await postComplete(request)
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.courseSlug).toBe('ai-conversation-fundamentals')
      expect(data.moduleSlug).toBe('module-1')
    })

    it('should handle idempotent completion (marking same module twice)', async () => {
      mockUpsert.mockResolvedValue({
        data: null,
        error: null,
      })

      const request = createRequest({
        courseSlug: 'ai-conversation-fundamentals',
        moduleSlug: 'module-1',
      })

      // First completion
      const response1 = await postComplete(request)
      expect(response1.status).toBe(200)

      // Second completion (should still succeed - idempotent)
      const request2 = createRequest({
        courseSlug: 'ai-conversation-fundamentals',
        moduleSlug: 'module-1',
      })
      const response2 = await postComplete(request2)
      expect(response2.status).toBe(200)
    })
  })

  describe('Error Handling', () => {
    it('should return 500 when database insert fails', async () => {
      mockUpsert.mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      })

      const request = createRequest({
        courseSlug: 'ai-conversation-fundamentals',
        moduleSlug: 'module-1',
      })

      const response = await postComplete(request)
      expect(response.status).toBe(500)

      const data = await response.json()
      expect(data.error).toBe('Failed to mark complete')
    })
  })
})
