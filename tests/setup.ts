import '@testing-library/jest-dom/vitest'
import { beforeAll, afterAll, afterEach, vi } from 'vitest'
import { server } from './mocks/server'

// Mock environment variables
vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key')
vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-role-key')
vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_mock')
vi.stubEnv('STRIPE_WEBHOOK_SECRET', 'whsec_test_mock')
vi.stubEnv('RESEND_API_KEY', 're_test_mock')
vi.stubEnv('RESEND_AUDIENCE_ID', 'aud_test_mock')

// Mock Next.js headers function
vi.mock('next/headers', () => ({
  headers: vi.fn(() => {
    const headersMap = new Map<string, string>()
    return {
      get: (key: string) => headersMap.get(key) || null,
      set: (key: string, value: string) => headersMap.set(key, value),
      has: (key: string) => headersMap.has(key),
      delete: (key: string) => headersMap.delete(key),
      forEach: (callback: (value: string, key: string) => void) => headersMap.forEach(callback),
    }
  }),
  cookies: vi.fn(() => ({
    get: () => null,
    getAll: () => [],
    has: () => false,
    set: () => {},
  })),
}))

// Create mock Supabase client factory
const createMockSupabaseClient = (authenticated = true) => ({
  auth: {
    getUser: vi.fn().mockResolvedValue({
      data: authenticated ? {
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
        }
      } : { user: null },
      error: authenticated ? null : { message: 'Invalid JWT' },
    }),
  },
  from: vi.fn((table: string) => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
  })),
})

// Mock Supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue(createMockSupabaseClient(true)),
  createAdminClient: vi.fn(() => createMockSupabaseClient(true)),
}))

// Setup MSW server for API mocking
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
