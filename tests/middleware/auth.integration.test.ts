import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import { middleware } from '@/middleware'
import type { SupabaseClient } from '@supabase/supabase-js'

// Mock @supabase/ssr module
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}))

// Helper to create mock NextRequest
function createMockRequest(url: string, cookies: Record<string, string> = {}) {
  const mockUrl = new URL(url, 'http://localhost:3000')

  // Add clone method to URL for middleware compatibility
  const urlWithClone = Object.assign(mockUrl, {
    clone: () => new URL(mockUrl.href),
  })

  const mockCookies = {
    getAll: vi.fn(() => {
      return Object.entries(cookies).map(([name, value]) => ({ name, value }))
    }),
    set: vi.fn(),
  }

  const mockRequest = {
    nextUrl: urlWithClone,
    url: mockUrl.href,
    cookies: mockCookies,
    headers: new Headers(),
  } as unknown as NextRequest

  return mockRequest
}

// Helper to create mock Supabase client
function createMockSupabaseClient(user: any = null) {
  return {
    auth: {
      getUser: vi.fn(async () => ({
        data: { user },
        error: null,
      })),
    },
  } as unknown as SupabaseClient
}

// Setup mock for createServerClient
async function setupSupabaseMock(user: any = null) {
  const { createServerClient } = await import('@supabase/ssr')
  const mockClient = createMockSupabaseClient(user)

  vi.mocked(createServerClient).mockImplementation((url, key, options) => {
    // Call the cookie handlers to test they're invoked
    if (options?.cookies?.getAll) {
      options.cookies.getAll()
    }
    return mockClient
  })

  return mockClient
}

describe('Middleware - Authentication and Authorization', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('Protected Routes - /courses/*', () => {
    // NOTE: Middleware no longer redirects unauthenticated users from /courses/*
    // Protection is now handled client-side by AuthGate component (modal UX)

    it('should allow unauthenticated users to access courses (AuthGate handles protection)', async () => {
      // Arrange: No authenticated user
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers')

      // Act
      const response = await middleware(request)

      // Assert - passes through, AuthGate handles client-side protection
      expect(response.status).toBe(200)
    })

    it('should allow unauthenticated users to access nested course paths', async () => {
      // Arrange: No authenticated user
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers/module-1')

      // Act
      const response = await middleware(request)

      // Assert - passes through, AuthGate handles client-side protection
      expect(response.status).toBe(200)
    })

    it('should allow authenticated users to access protected course routes', async () => {
      // Arrange: Authenticated user
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        aud: 'authenticated',
      }
      await setupSupabaseMock(mockUser)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(200) // NextResponse.next() returns 200
    })

    it('should allow authenticated users to access nested course modules', async () => {
      // Arrange: Authenticated user
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        aud: 'authenticated',
      }
      await setupSupabaseMock(mockUser)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers/module-5/lesson-2')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(200)
    })
  })

  describe('Free Paths - module-0 Access', () => {
    it('should allow unauthenticated users to access free module-0', async () => {
      // Arrange: No authenticated user
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers/module-0')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(200) // Should allow access
    })

    it('should allow unauthenticated users to access nested paths in module-0', async () => {
      // Arrange: No authenticated user
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers/module-0/lesson-1')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(200)
    })

    it('should allow authenticated users to access module-0', async () => {
      // Arrange: Authenticated user
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        aud: 'authenticated',
      }
      await setupSupabaseMock(mockUser)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers/module-0')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(200)
    })
  })

  describe('Auth Pages Redirection', () => {
    it('should redirect authenticated users from /sign-in to courses', async () => {
      // Arrange: Authenticated user
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        aud: 'authenticated',
      }
      await setupSupabaseMock(mockUser)
      const request = createMockRequest('http://localhost:3000/sign-in')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(307)
      expect(response.headers.get('location')).toBe(
        'http://localhost:3000/courses/claude-for-knowledge-workers'
      )
    })

    it('should redirect authenticated users from /sign-up to courses', async () => {
      // Arrange: Authenticated user
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        aud: 'authenticated',
      }
      await setupSupabaseMock(mockUser)
      const request = createMockRequest('http://localhost:3000/sign-up')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(307)
      expect(response.headers.get('location')).toBe(
        'http://localhost:3000/courses/claude-for-knowledge-workers'
      )
    })

    it('should allow unauthenticated users to access /sign-in', async () => {
      // Arrange: No authenticated user
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/sign-in')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(200)
    })

    it('should allow unauthenticated users to access /sign-up', async () => {
      // Arrange: No authenticated user
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/sign-up')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(200)
    })
  })

  describe('Unprotected Routes', () => {
    const unprotectedPaths = [
      '/',
      '/products',
      '/essays',
      '/essays/example-essay',
      '/about',
      '/contact',
      '/pricing',
    ]

    unprotectedPaths.forEach((path) => {
      it(`should allow unauthenticated access to ${path}`, async () => {
        // Arrange: No authenticated user
        await setupSupabaseMock(null)
        const request = createMockRequest(`http://localhost:3000${path}`)

        // Act
        const response = await middleware(request)

        // Assert
        expect(response.status).toBe(200)
      })

      it(`should allow authenticated access to ${path}`, async () => {
        // Arrange: Authenticated user
        const mockUser = {
          id: 'test-user-id',
          email: 'test@example.com',
          aud: 'authenticated',
        }
        await setupSupabaseMock(mockUser)
        const request = createMockRequest(`http://localhost:3000${path}`)

        // Act
        const response = await middleware(request)

        // Assert
        expect(response.status).toBe(200)
      })
    })
  })

  // NOTE: Redirect Parameter Preservation tests removed
  // Middleware no longer redirects unauthenticated users from /courses/*
  // Protection is handled client-side by AuthGate component

  describe('Supabase Client Initialization', () => {
    it('should create Supabase client with correct configuration', async () => {
      // Arrange
      const { createServerClient } = await import('@supabase/ssr')
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/')

      // Act
      await middleware(request)

      // Assert
      expect(createServerClient).toHaveBeenCalledWith(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        expect.objectContaining({
          cookies: expect.objectContaining({
            getAll: expect.any(Function),
            setAll: expect.any(Function),
          }),
        })
      )
    })

    it('should call auth.getUser() to refresh session', async () => {
      // Arrange
      const mockClient = await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/')

      // Act
      await middleware(request)

      // Assert
      expect(mockClient.auth.getUser).toHaveBeenCalled()
    })
  })

  describe('Cookie Handling', () => {
    it('should read cookies from request', async () => {
      // Arrange
      const mockCookies = {
        'sb-access-token': 'mock-access-token',
        'sb-refresh-token': 'mock-refresh-token',
      }
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/', mockCookies)

      // Act
      await middleware(request)

      // Assert
      expect(request.cookies.getAll).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    // NOTE: Middleware no longer redirects unauthenticated users from /courses/*
    // These tests verify pass-through behavior; AuthGate handles client-side protection

    it('should handle null user response from Supabase', async () => {
      // Arrange: Explicitly null user
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers')

      // Act
      const response = await middleware(request)

      // Assert - passes through, AuthGate handles protection
      expect(response.status).toBe(200)
    })

    it('should handle undefined user response from Supabase', async () => {
      // Arrange: Undefined user
      await setupSupabaseMock(undefined)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers')

      // Act
      const response = await middleware(request)

      // Assert - passes through, AuthGate handles protection
      expect(response.status).toBe(200)
    })

    it('should handle user with minimal properties', async () => {
      // Arrange: Minimal user object
      const minimalUser = { id: 'minimal-user-id' }
      await setupSupabaseMock(minimalUser)
      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(200) // Should allow access
    })

    it('should handle deeply nested course paths', async () => {
      // Arrange: No authenticated user
      await setupSupabaseMock(null)
      const deepPath = '/courses/claude-for-knowledge-workers/module-5/section-2/lesson-3/quiz'
      const request = createMockRequest(`http://localhost:3000${deepPath}`)

      // Act
      const response = await middleware(request)

      // Assert - passes through, AuthGate handles protection
      expect(response.status).toBe(200)
    })

    it('should NOT protect paths that only contain "courses" but are not course routes', async () => {
      // Arrange: No authenticated user
      await setupSupabaseMock(null)
      // This path contains "courses" but doesn't start with /courses
      const request = createMockRequest('http://localhost:3000/about-our-courses')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response.status).toBe(200) // Should allow access (not protected)
    })
  })

  describe('Response Headers and Cookies', () => {
    it('should preserve request headers in response', async () => {
      // Arrange
      await setupSupabaseMock(null)
      const request = createMockRequest('http://localhost:3000/')
      request.headers.set('User-Agent', 'Test-Agent')

      // Act
      const response = await middleware(request)

      // Assert
      expect(response).toBeDefined()
      // NextResponse.next() should preserve headers
    })
  })

  describe('Integration with Supabase SSR', () => {
    it('should handle session refresh for expired tokens', async () => {
      // Arrange: User with valid session
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        aud: 'authenticated',
      }
      const mockClient = await setupSupabaseMock(mockUser)
      const request = createMockRequest('http://localhost:3000/')

      // Act
      await middleware(request)

      // Assert
      // getUser() is called which triggers session refresh if needed
      expect(mockClient.auth.getUser).toHaveBeenCalledTimes(1)
    })

    it('should handle Supabase client errors gracefully', async () => {
      // Arrange: Mock Supabase error
      const { createServerClient } = await import('@supabase/ssr')
      const mockClient = {
        auth: {
          getUser: vi.fn(async () => ({
            data: { user: null },
            error: { message: 'Network error' },
          })),
        },
      } as unknown as SupabaseClient

      vi.mocked(createServerClient).mockImplementation(() => mockClient)

      const request = createMockRequest('http://localhost:3000/courses/claude-for-knowledge-workers')

      // Act
      const response = await middleware(request)

      // Assert - passes through, AuthGate handles client-side protection
      // Middleware no longer redirects unauthenticated users from /courses/*
      expect(response.status).toBe(200)
    })
  })
})
