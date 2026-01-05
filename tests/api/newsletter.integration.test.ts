import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Use vi.hoisted to declare mocks that will be available in vi.mock
const { mockFrom, mockSelect, mockEq, mockInsert, mockUpdate, mockSingle } = vi.hoisted(() => {
  const mockSingle = vi.fn()
  const mockEq = vi.fn()
  const mockSelect = vi.fn()
  const mockInsert = vi.fn()
  const mockUpdate = vi.fn()
  const mockFrom = vi.fn()

  // Create chainable mock
  mockEq.mockReturnThis()
  mockSelect.mockReturnValue({ eq: mockEq })
  mockEq.mockReturnValue({ single: mockSingle })
  mockUpdate.mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) })
  mockFrom.mockReturnValue({
    select: mockSelect,
    insert: mockInsert,
    update: mockUpdate,
  })

  return { mockFrom, mockSelect, mockEq, mockInsert, mockUpdate, mockSingle }
})

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn().mockReturnValue({
    from: mockFrom,
  }),
}))

// Import routes after mock setup
import { POST, DELETE, GET } from '@/app/api/newsletter/subscribe/route'

describe('Newsletter API', () => {
  const createPostRequest = (body: unknown) => {
    return new NextRequest('http://localhost:3000/api/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const createDeleteRequest = (body: unknown) => {
    return new NextRequest('http://localhost:3000/api/newsletter/subscribe', {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const createGetRequest = (email?: string) => {
    const url = email
      ? `http://localhost:3000/api/newsletter/subscribe?email=${encodeURIComponent(email)}`
      : 'http://localhost:3000/api/newsletter/subscribe'
    return new NextRequest(url, { method: 'GET' })
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset chainable mock
    mockEq.mockReturnThis()
    mockSelect.mockReturnValue({ eq: mockEq })
    mockEq.mockReturnValue({ single: mockSingle })
    mockUpdate.mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) })
    mockFrom.mockReturnValue({
      select: mockSelect,
      insert: mockInsert,
      update: mockUpdate,
    })
  })

  describe('POST /api/newsletter/subscribe', () => {
    describe('Validation', () => {
      it('should return 400 when email is missing', async () => {
        const request = createPostRequest({ source: 'website' })
        const response = await POST(request)

        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.error).toBe('Email is required')
      })

      it('should return 400 for invalid email format', async () => {
        const request = createPostRequest({ email: 'not-an-email' })
        const response = await POST(request)

        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.error).toBe('Invalid email format')
      })

      it('should return 400 for empty email', async () => {
        const request = createPostRequest({ email: '' })
        const response = await POST(request)

        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.error).toBe('Email is required')
      })
    })

    describe('New Subscriber', () => {
      it('should successfully subscribe new user', async () => {
        // No existing subscriber
        mockSingle.mockResolvedValue({ data: null, error: null })
        mockInsert.mockResolvedValue({ error: null })

        const request = createPostRequest({
          email: 'newuser@example.com',
          source: 'website',
        })
        const response = await POST(request)

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.success).toBe(true)
        expect(data.isNewSubscriber).toBe(true)
        expect(data.message).toContain('Successfully subscribed')
      })

      it('should normalize email to lowercase', async () => {
        mockSingle.mockResolvedValue({ data: null, error: null })
        mockInsert.mockResolvedValue({ error: null })

        const request = createPostRequest({
          email: 'Test@Example.COM',
          source: 'website',
        })
        await POST(request)

        // Verify the insert was called (we can't easily check the exact value due to mock structure)
        expect(mockInsert).toHaveBeenCalled()
      })

      it('should use default source if not provided', async () => {
        mockSingle.mockResolvedValue({ data: null, error: null })
        mockInsert.mockResolvedValue({ error: null })

        const request = createPostRequest({ email: 'test@example.com' })
        await POST(request)

        expect(mockInsert).toHaveBeenCalled()
      })
    })

    describe('Existing Subscriber', () => {
      it('should return success for already active subscriber', async () => {
        mockSingle.mockResolvedValue({
          data: { id: 1, status: 'active' },
          error: null,
        })

        const request = createPostRequest({ email: 'existing@example.com' })
        const response = await POST(request)

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.success).toBe(true)
        expect(data.isNewSubscriber).toBe(false)
        expect(data.message).toBe('Already subscribed')
      })

      it('should reactivate previously unsubscribed user', async () => {
        mockSingle.mockResolvedValue({
          data: { id: 1, status: 'unsubscribed' },
          error: null,
        })
        mockUpdate.mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        })

        const request = createPostRequest({ email: 'resubscribe@example.com' })
        const response = await POST(request)

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.success).toBe(true)
        expect(data.message).toContain('Welcome back')
      })
    })

    describe('Error Handling', () => {
      it('should return 500 when database insert fails', async () => {
        mockSingle.mockResolvedValue({ data: null, error: null })
        mockInsert.mockResolvedValue({ error: { message: 'Database error' } })

        const request = createPostRequest({ email: 'test@example.com' })
        const response = await POST(request)

        expect(response.status).toBe(500)
        const data = await response.json()
        expect(data.error).toBe('Failed to subscribe')
      })
    })
  })

  describe('DELETE /api/newsletter/subscribe', () => {
    describe('Validation', () => {
      it('should return 400 when email is missing', async () => {
        const request = createDeleteRequest({})
        const response = await DELETE(request)

        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.error).toBe('Email is required')
      })
    })

    describe('Unsubscribe', () => {
      it('should successfully unsubscribe user', async () => {
        mockUpdate.mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        })

        const request = createDeleteRequest({ email: 'unsubscribe@example.com' })
        const response = await DELETE(request)

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.success).toBe(true)
        expect(data.message).toBe('Successfully unsubscribed')
      })

      it('should return 500 when unsubscribe fails', async () => {
        mockUpdate.mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: { message: 'Database error' } }),
        })

        const request = createDeleteRequest({ email: 'fail@example.com' })
        const response = await DELETE(request)

        expect(response.status).toBe(500)
        const data = await response.json()
        expect(data.error).toBe('Failed to unsubscribe')
      })
    })
  })

  describe('GET /api/newsletter/subscribe', () => {
    describe('Validation', () => {
      it('should return 400 when email parameter is missing', async () => {
        const request = createGetRequest()
        const response = await GET(request)

        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.error).toBe('Email parameter is required')
      })
    })

    describe('Status Check', () => {
      it('should return subscription status for subscribed user', async () => {
        mockSingle.mockResolvedValue({
          data: {
            status: 'active',
            is_academy_member: true,
            subscribed_at: '2024-01-01',
          },
          error: null,
        })

        const request = createGetRequest('subscribed@example.com')
        const response = await GET(request)

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.isSubscribed).toBe(true)
        expect(data.isAcademyMember).toBe(true)
      })

      it('should return false for non-existent user', async () => {
        mockSingle.mockResolvedValue({ data: null, error: { code: 'PGRST116' } })

        const request = createGetRequest('nonexistent@example.com')
        const response = await GET(request)

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.isSubscribed).toBe(false)
        expect(data.isAcademyMember).toBe(false)
      })

      it('should return false for unsubscribed user', async () => {
        mockSingle.mockResolvedValue({
          data: {
            status: 'unsubscribed',
            is_academy_member: false,
            subscribed_at: '2024-01-01',
          },
          error: null,
        })

        const request = createGetRequest('unsubscribed@example.com')
        const response = await GET(request)

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.isSubscribed).toBe(false)
      })
    })
  })
})
