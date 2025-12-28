import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'

/**
 * Email Sequence Cron API - Authentication & Validation Tests
 *
 * Note: Full integration tests with database/email mocking are complex due to
 * the route creating its own Supabase and Resend clients internally.
 * These tests focus on authentication and basic validation.
 */

// Mock dependencies to prevent initialization errors
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue({ data: [], error: null }),
    })),
  })),
}))

vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = {
      send: vi.fn().mockResolvedValue({ data: { id: 'email-123' }, error: null }),
    }
  },
}))

describe('Email Sequence Cron API', () => {
  let GET: typeof import('@/app/api/email-sequences/cron/route').GET
  let POST: typeof import('@/app/api/email-sequences/cron/route').POST

  beforeEach(async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-role-key')
    vi.stubEnv('RESEND_API_KEY', 're_test_mock')
    vi.stubEnv('CRON_SECRET', 'test-cron-secret')

    // Import fresh module
    vi.resetModules()
    const mod = await import('@/app/api/email-sequences/cron/route')
    GET = mod.GET
    POST = mod.POST
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  const createGetRequest = (authHeader?: string): NextRequest => {
    const headers: Record<string, string> = {}
    if (authHeader) {
      headers['authorization'] = authHeader
    }
    return new NextRequest('http://localhost:3000/api/email-sequences/cron', {
      method: 'GET',
      headers,
    })
  }

  describe('Authentication', () => {
    it('should return 401 when authorization header is missing', async () => {
      const request = createGetRequest()
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return 401 when authorization header is incorrect', async () => {
      const request = createGetRequest('Bearer wrong-secret')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return 401 when Bearer prefix is missing', async () => {
      const request = createGetRequest('test-cron-secret')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should accept valid authorization', async () => {
      const request = createGetRequest('Bearer test-cron-secret')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })

  describe('Development Mode (no CRON_SECRET)', () => {
    it('should allow request when CRON_SECRET is not set', async () => {
      // Reset and reimport without CRON_SECRET
      vi.stubEnv('CRON_SECRET', '')
      vi.resetModules()
      const mod = await import('@/app/api/email-sequences/cron/route')

      const request = new NextRequest('http://localhost:3000/api/email-sequences/cron', {
        method: 'GET',
      })
      const response = await mod.GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })

  describe('No Pending Emails', () => {
    it('should return success with zero processed when no pending sequences', async () => {
      const request = createGetRequest('Bearer test-cron-secret')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('No emails to send')
      expect(data.results.processed).toBe(0)
      expect(data.results.sent).toBe(0)
      expect(data.results.completed).toBe(0)
      expect(data.results.errors).toEqual([])
    })
  })

  describe('POST endpoint (manual trigger)', () => {
    it('should require authentication same as GET', async () => {
      const request = new NextRequest('http://localhost:3000/api/email-sequences/cron', {
        method: 'POST',
      })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should work with valid auth (delegates to GET)', async () => {
      const request = new NextRequest('http://localhost:3000/api/email-sequences/cron', {
        method: 'POST',
        headers: { authorization: 'Bearer test-cron-secret' },
      })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })
})
