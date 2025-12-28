import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { GET } from '@/app/api/auth/callback/route'
import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

// Mock the supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('GET /api/auth/callback', () => {
  const createMockRequest = (url: string): NextRequest => {
    return new NextRequest(new URL(url, 'http://localhost:3000'))
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Successful Authentication', () => {
    it('should redirect to default course page when code is valid', async () => {
      const mockSupabase = {
        auth: {
          exchangeCodeForSession: vi.fn().mockResolvedValue({
            data: { session: { access_token: 'token' } },
            error: null,
          }),
        },
      }
      ;(createClient as Mock).mockResolvedValue(mockSupabase)

      const request = createMockRequest('http://localhost:3000/api/auth/callback?code=valid-code')
      const response = await GET(request)

      expect(response.status).toBe(307) // Redirect status
      expect(response.headers.get('location')).toBe(
        'http://localhost:3000/courses/claude-for-knowledge-workers'
      )
      expect(mockSupabase.auth.exchangeCodeForSession).toHaveBeenCalledWith('valid-code')
    })

    it('should redirect to custom next URL when provided', async () => {
      const mockSupabase = {
        auth: {
          exchangeCodeForSession: vi.fn().mockResolvedValue({
            data: { session: { access_token: 'token' } },
            error: null,
          }),
        },
      }
      ;(createClient as Mock).mockResolvedValue(mockSupabase)

      const request = createMockRequest(
        'http://localhost:3000/api/auth/callback?code=valid-code&next=/dashboard'
      )
      const response = await GET(request)

      expect(response.status).toBe(307)
      expect(response.headers.get('location')).toBe('http://localhost:3000/dashboard')
    })

    it('should handle URL-encoded next parameter', async () => {
      const mockSupabase = {
        auth: {
          exchangeCodeForSession: vi.fn().mockResolvedValue({
            data: { session: {} },
            error: null,
          }),
        },
      }
      ;(createClient as Mock).mockResolvedValue(mockSupabase)

      const encodedNext = encodeURIComponent('/courses/advanced?lesson=1')
      const request = createMockRequest(
        `http://localhost:3000/api/auth/callback?code=valid-code&next=${encodedNext}`
      )
      const response = await GET(request)

      expect(response.status).toBe(307)
      expect(response.headers.get('location')).toContain('/courses/advanced')
    })
  })

  describe('Failed Authentication', () => {
    it('should redirect to sign-in with error when code exchange fails', async () => {
      const mockSupabase = {
        auth: {
          exchangeCodeForSession: vi.fn().mockResolvedValue({
            data: { session: null },
            error: { message: 'Invalid code' },
          }),
        },
      }
      ;(createClient as Mock).mockResolvedValue(mockSupabase)

      const request = createMockRequest('http://localhost:3000/api/auth/callback?code=invalid-code')
      const response = await GET(request)

      expect(response.status).toBe(307)
      expect(response.headers.get('location')).toBe(
        'http://localhost:3000/sign-in?error=authentication_failed'
      )
    })

    it('should redirect to sign-in when no code is provided', async () => {
      const request = createMockRequest('http://localhost:3000/api/auth/callback')
      const response = await GET(request)

      expect(response.status).toBe(307)
      expect(response.headers.get('location')).toBe(
        'http://localhost:3000/sign-in?error=authentication_failed'
      )
    })

    it('should redirect to sign-in when code is empty string', async () => {
      const request = createMockRequest('http://localhost:3000/api/auth/callback?code=')
      const response = await GET(request)

      expect(response.status).toBe(307)
      expect(response.headers.get('location')).toBe(
        'http://localhost:3000/sign-in?error=authentication_failed'
      )
    })
  })

  describe('Edge Cases', () => {
    it('should preserve origin from request URL', async () => {
      const mockSupabase = {
        auth: {
          exchangeCodeForSession: vi.fn().mockResolvedValue({
            data: { session: {} },
            error: null,
          }),
        },
      }
      ;(createClient as Mock).mockResolvedValue(mockSupabase)

      const request = createMockRequest(
        'https://id8labs.app/api/auth/callback?code=valid-code'
      )
      const response = await GET(request)

      expect(response.headers.get('location')).toContain('https://id8labs.app')
    })

    it('should handle session with all required fields', async () => {
      const fullSession = {
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        expires_in: 3600,
        token_type: 'bearer',
        user: { id: 'user-123', email: 'test@example.com' },
      }

      const mockSupabase = {
        auth: {
          exchangeCodeForSession: vi.fn().mockResolvedValue({
            data: { session: fullSession },
            error: null,
          }),
        },
      }
      ;(createClient as Mock).mockResolvedValue(mockSupabase)

      const request = createMockRequest('http://localhost:3000/api/auth/callback?code=valid-code')
      const response = await GET(request)

      expect(response.status).toBe(307)
      expect(response.headers.get('location')).not.toContain('error')
    })
  })
})
