import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'

/**
 * Email Sequence Trigger API - Validation Tests
 *
 * Note: Full integration tests with database mocking are complex due to
 * the route creating its own Supabase client internally. These tests focus
 * on input validation which can be tested without database interaction.
 */

// Mock Supabase to prevent actual initialization errors
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
  })),
}))

describe('Email Sequence Trigger API', () => {
  let POST: typeof import('@/app/api/email-sequences/trigger/route').POST
  let GET: typeof import('@/app/api/email-sequences/trigger/route').GET

  beforeEach(async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-role-key')

    // Import fresh module
    vi.resetModules()
    const mod = await import('@/app/api/email-sequences/trigger/route')
    POST = mod.POST
    GET = mod.GET
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  const createPostRequest = (body: Record<string, unknown>): NextRequest => {
    return new NextRequest('http://localhost:3000/api/email-sequences/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  const createGetRequest = (params: Record<string, string>): NextRequest => {
    const url = new URL('http://localhost:3000/api/email-sequences/trigger')
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
    return new NextRequest(url)
  }

  describe('POST /api/email-sequences/trigger', () => {
    describe('Validation', () => {
      it('should return 400 when email is missing', async () => {
        const request = createPostRequest({ sequenceId: 'ai-fundamentals-nurture' })
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Email and sequenceId are required')
      })

      it('should return 400 when sequenceId is missing', async () => {
        const request = createPostRequest({ email: 'test@example.com' })
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Email and sequenceId are required')
      })

      it('should return 400 when both email and sequenceId are missing', async () => {
        const request = createPostRequest({})
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Email and sequenceId are required')
      })

      it('should return 400 for invalid email format - no @', async () => {
        const request = createPostRequest({
          email: 'not-an-email',
          sequenceId: 'ai-fundamentals-nurture',
        })
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Invalid email format')
      })

      it('should return 400 for invalid email format - no domain', async () => {
        const request = createPostRequest({
          email: 'test@',
          sequenceId: 'ai-fundamentals-nurture',
        })
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Invalid email format')
      })

      it('should return 400 for invalid email format - spaces', async () => {
        const request = createPostRequest({
          email: 'test @example.com',
          sequenceId: 'ai-fundamentals-nurture',
        })
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Invalid email format')
      })

      it('should return 400 for unknown sequence', async () => {
        const request = createPostRequest({
          email: 'test@example.com',
          sequenceId: 'unknown-sequence',
        })
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toContain('Unknown sequence')
      })

      it('should return 400 for empty sequenceId', async () => {
        const request = createPostRequest({
          email: 'test@example.com',
          sequenceId: '',
        })
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
      })
    })

    describe('Error Handling', () => {
      it('should return 500 for malformed JSON', async () => {
        const request = new NextRequest('http://localhost:3000/api/email-sequences/trigger', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: 'invalid json {',
        })
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.error).toBe('Internal server error')
      })
    })
  })

  describe('GET /api/email-sequences/trigger', () => {
    describe('Validation', () => {
      it('should return 400 when email is missing', async () => {
        const request = createGetRequest({})
        const response = await GET(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Email is required')
      })

      it('should return 400 when email is empty', async () => {
        const request = createGetRequest({ email: '' })
        const response = await GET(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Email is required')
      })
    })
  })
})
