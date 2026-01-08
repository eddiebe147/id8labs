import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock stripe-raw (the module actually used by the route)
const mockStripeCheckoutCreate = vi.fn()
const mockStripeCustomerCreate = vi.fn()

vi.mock('@/lib/stripe-raw', () => ({
  stripeRaw: {
    checkout: {
      sessions: {
        create: (...args: unknown[]) => mockStripeCheckoutCreate(...args),
      },
    },
    customers: {
      create: (...args: unknown[]) => mockStripeCustomerCreate(...args),
    },
  },
}))

// Mock products module
vi.mock('@/lib/products', () => ({
  getProduct: vi.fn((id: string) => {
    if (id === 'claude-for-knowledge-workers') {
      return {
        id: 'claude-for-knowledge-workers',
        name: 'Claude Code for Knowledge Workers',
        description: 'Complete 6-module course + lifetime updates',
        price: 9900,
        currency: 'usd',
        purchaseType: 'stripe',
        category: 'self-paced-course',
        features: [],
        priceDisplay: '$99',
      }
    }
    return undefined
  }),
}))

// Mock Supabase client
const mockGetUser = vi.fn()
const mockFrom = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    auth: {
      getUser: mockGetUser,
    },
    from: mockFrom,
  })),
  createAdminClient: vi.fn(() => ({
    from: mockFrom,
  })),
}))

// Mock GitHub validation
vi.mock('@/lib/github', () => ({
  isValidGitHubUsername: vi.fn(() => true),
}))

// Import the route after mocks are set up
import { POST } from '@/app/api/stripe/checkout/route'

describe('POST /api/stripe/checkout', () => {
  const createRequest = (body: unknown) => {
    return new NextRequest('http://localhost:3000/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const mockSupabaseChain = (data: unknown = null, error: unknown = null) => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data, error }),
    }
    return chain
  }

  beforeEach(() => {
    vi.clearAllMocks()

    // Default: authenticated user
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
        },
      },
      error: null,
    })

    // Default Stripe mock responses
    mockStripeCheckoutCreate.mockResolvedValue({
      id: 'cs_test_session_123',
      url: 'https://checkout.stripe.com/test',
    })

    mockStripeCustomerCreate.mockResolvedValue({
      id: 'cus_test_123',
      email: 'test@example.com',
    })
  })

  describe('Authentication', () => {
    it('should return 401 when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid JWT' },
      })

      const request = createRequest({
        productId: 'claude-for-knowledge-workers',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized. Please sign in to continue.')
    })

    it('should proceed when user is authenticated', async () => {
      // Setup mocks for successful flow
      const purchaseChain = mockSupabaseChain(null, null)
      const customerChain = mockSupabaseChain(null, null)

      mockFrom.mockImplementation((table: string) => {
        if (table === 'purchases') return purchaseChain
        if (table === 'customers') return customerChain
        return mockSupabaseChain()
      })

      const request = createRequest({
        productId: 'claude-for-knowledge-workers',
      })

      const response = await POST(request)

      expect(response.status).not.toBe(401)
    })
  })

  describe('Product Validation', () => {
    it('should return 400 when productId is missing', async () => {
      const request = createRequest({})

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid product ID')
    })

    it('should return 400 when productId is invalid', async () => {
      const request = createRequest({
        productId: 'invalid-product-id',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid product ID')
    })

    it('should accept valid product ID', async () => {
      // Setup mocks for successful flow
      const purchaseChain = mockSupabaseChain(null, null)
      const customerChain = mockSupabaseChain(null, null)

      mockFrom.mockImplementation((table: string) => {
        if (table === 'purchases') return purchaseChain
        if (table === 'customers') return customerChain
        return mockSupabaseChain()
      })

      const request = createRequest({
        productId: 'claude-for-knowledge-workers',
      })

      const response = await POST(request)

      expect(response.status).not.toBe(400)
    })
  })

  describe('Duplicate Purchase Check', () => {
    it('should return 400 when user already purchased the course', async () => {
      // Mock existing completed purchase
      const purchaseChain = mockSupabaseChain({
        id: 'existing-purchase-123',
        status: 'completed',
      }, null)

      mockFrom.mockImplementation((table: string) => {
        if (table === 'purchases') return purchaseChain
        return mockSupabaseChain()
      })

      const request = createRequest({
        productId: 'claude-for-knowledge-workers',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('You have already purchased this course')
    })

    it('should allow purchase when user has not purchased before', async () => {
      // Mock no existing purchase
      const purchaseChain = mockSupabaseChain(null, null)
      const customerChain = mockSupabaseChain(null, null)

      mockFrom.mockImplementation((table: string) => {
        if (table === 'purchases') return purchaseChain
        if (table === 'customers') return customerChain
        return mockSupabaseChain()
      })

      const request = createRequest({
        productId: 'claude-for-knowledge-workers',
      })

      const response = await POST(request)

      expect(response.status).not.toBe(400)
    })
  })

  describe('Successful Checkout', () => {
    it('should create checkout session with correct data', async () => {
      // Setup full success flow
      let insertCallCount = 0
      const purchaseSelectChain = mockSupabaseChain(null, null)
      const purchaseInsertChain = {
        ...mockSupabaseChain(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: {
            id: 'new-purchase-123',
            user_id: 'test-user-id',
            product_id: 'claude-for-knowledge-workers',
            status: 'pending',
          },
          error: null,
        }),
      }
      const purchaseUpdateChain = mockSupabaseChain({ id: 'new-purchase-123' }, null)
      const customerChain = mockSupabaseChain(null, null)

      mockFrom.mockImplementation((table: string) => {
        if (table === 'purchases') {
          insertCallCount++
          if (insertCallCount === 1) {
            // First call: check for existing purchase
            return purchaseSelectChain
          } else if (insertCallCount === 2) {
            // Second call: insert new purchase
            return {
              insert: vi.fn().mockReturnValue(purchaseInsertChain),
            }
          } else {
            // Third call: update with session ID
            return {
              update: vi.fn().mockReturnValue(purchaseUpdateChain),
            }
          }
        }
        if (table === 'customers') return customerChain
        return mockSupabaseChain()
      })

      const request = createRequest({
        productId: 'claude-for-knowledge-workers',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('url')
      expect(data).toHaveProperty('sessionId')
      expect(data.url).toBe('https://checkout.stripe.com/test')
      expect(data.sessionId).toBe('cs_test_session_123')
    })

    it('should call Stripe to create checkout session', async () => {
      // Setup mocks for success
      let callCount = 0
      mockFrom.mockImplementation((table: string) => {
        callCount++
        if (table === 'purchases') {
          if (callCount === 1) {
            return mockSupabaseChain(null, null) // No existing purchase
          } else if (callCount === 2) {
            return {
              insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({
                  data: { id: 'new-purchase-123' },
                  error: null,
                }),
              }),
            }
          } else {
            return {
              update: vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({ data: null, error: null }),
              }),
            }
          }
        }
        if (table === 'customers') {
          return mockSupabaseChain(null, null)
        }
        return mockSupabaseChain()
      })

      const request = createRequest({
        productId: 'claude-for-knowledge-workers',
      })

      await POST(request)

      expect(mockStripeCheckoutCreate).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle purchase creation failure', async () => {
      // First call: no existing purchase
      // Second call: insert fails
      let callCount = 0
      mockFrom.mockImplementation((table: string) => {
        callCount++
        if (table === 'purchases') {
          if (callCount === 1) {
            return mockSupabaseChain(null, null)
          } else {
            return {
              insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({
                  data: null,
                  error: { message: 'Database error' },
                }),
              }),
            }
          }
        }
        return mockSupabaseChain()
      })

      const request = createRequest({
        productId: 'claude-for-knowledge-workers',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to create purchase record')
    })

    it('should handle Stripe API failure', async () => {
      // Setup success for Supabase
      let callCount = 0
      mockFrom.mockImplementation((table: string) => {
        callCount++
        if (table === 'purchases') {
          if (callCount === 1) {
            return mockSupabaseChain(null, null)
          } else if (callCount === 2) {
            return {
              insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({
                  data: { id: 'new-purchase-123' },
                  error: null,
                }),
              }),
            }
          } else {
            return {
              update: vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({ data: null, error: null }),
              }),
            }
          }
        }
        if (table === 'customers') {
          return mockSupabaseChain(null, null)
        }
        return mockSupabaseChain()
      })

      // Make Stripe fail
      mockStripeCheckoutCreate.mockRejectedValue(new Error('Stripe error'))

      const request = createRequest({
        productId: 'claude-for-knowledge-workers',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to create checkout session')
    })
  })
})
