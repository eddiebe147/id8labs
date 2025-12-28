import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { getCurrentUser, getCurrentSession, isAuthenticated } from '@/lib/auth/helpers'
import { createClient as createServerClient } from '@/lib/supabase/server'

// Mock the supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('Auth Helpers', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
  }

  const mockSession = {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    user: mockUser,
    expires_at: Date.now() / 1000 + 3600,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCurrentUser', () => {
    it('should return user when authenticated', async () => {
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: mockUser },
            error: null,
          }),
        },
      }
      ;(createServerClient as Mock).mockResolvedValue(mockSupabase)

      const user = await getCurrentUser()

      expect(user).toEqual(mockUser)
      expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1)
    })

    it('should return null when not authenticated', async () => {
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: null },
            error: { message: 'Invalid JWT' },
          }),
        },
      }
      ;(createServerClient as Mock).mockResolvedValue(mockSupabase)

      const user = await getCurrentUser()

      expect(user).toBeNull()
    })

    it('should return null when user data is undefined', async () => {
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: {},
            error: null,
          }),
        },
      }
      ;(createServerClient as Mock).mockResolvedValue(mockSupabase)

      const user = await getCurrentUser()

      expect(user).toBeUndefined()
    })
  })

  describe('getCurrentSession', () => {
    it('should return session when authenticated', async () => {
      const mockSupabase = {
        auth: {
          getSession: vi.fn().mockResolvedValue({
            data: { session: mockSession },
            error: null,
          }),
        },
      }
      ;(createServerClient as Mock).mockResolvedValue(mockSupabase)

      const session = await getCurrentSession()

      expect(session).toEqual(mockSession)
      expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1)
    })

    it('should return null when no active session', async () => {
      const mockSupabase = {
        auth: {
          getSession: vi.fn().mockResolvedValue({
            data: { session: null },
            error: null,
          }),
        },
      }
      ;(createServerClient as Mock).mockResolvedValue(mockSupabase)

      const session = await getCurrentSession()

      expect(session).toBeNull()
    })

    it('should return null when session is expired', async () => {
      const mockSupabase = {
        auth: {
          getSession: vi.fn().mockResolvedValue({
            data: { session: null },
            error: { message: 'Session expired' },
          }),
        },
      }
      ;(createServerClient as Mock).mockResolvedValue(mockSupabase)

      const session = await getCurrentSession()

      expect(session).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when user is authenticated', async () => {
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: mockUser },
            error: null,
          }),
        },
      }
      ;(createServerClient as Mock).mockResolvedValue(mockSupabase)

      const result = await isAuthenticated()

      expect(result).toBe(true)
    })

    it('should return false when user is not authenticated', async () => {
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: null },
            error: null,
          }),
        },
      }
      ;(createServerClient as Mock).mockResolvedValue(mockSupabase)

      const result = await isAuthenticated()

      expect(result).toBe(false)
    })

    it('should return false when getUser throws an error', async () => {
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: null },
            error: { message: 'Network error' },
          }),
        },
      }
      ;(createServerClient as Mock).mockResolvedValue(mockSupabase)

      const result = await isAuthenticated()

      expect(result).toBe(false)
    })
  })
})
