import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock Stripe before importing the route
const mockWebhooksConstructEvent = vi.fn()

vi.mock('@/lib/stripe', () => ({
  getStripe: vi.fn(() => ({
    webhooks: {
      constructEvent: mockWebhooksConstructEvent,
    },
  })),
}))

// Mock Supabase client
const mockFrom = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createAdminClient: vi.fn(() => ({
    from: mockFrom,
  })),
}))

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(async () => ({
    get: vi.fn((key: string) => {
      if (key === 'stripe-signature') return 'valid_signature'
      return null
    }),
  })),
}))

// Import the route after mocks
import { POST } from '@/app/api/stripe/webhook/route'

describe('POST /api/stripe/webhook', () => {
  const createRequest = (body: string, signature?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (signature) {
      headers['stripe-signature'] = signature
    }

    return new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      body,
      headers,
    })
  }

  const mockSupabaseChain = (data: unknown = null, error: unknown = null) => {
    return {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ data, error }),
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()

    // Default: valid webhook event
    mockWebhooksConstructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_123',
          payment_intent: 'pi_test_123',
          metadata: {
            user_id: 'test-user-id',
            product_id: 'claude-for-knowledge-workers',
          },
        },
      },
    })

    // Default Supabase mock
    mockFrom.mockReturnValue(mockSupabaseChain(null, null))
  })

  describe('Signature Validation', () => {
    it('should return 400 when stripe-signature header is missing', async () => {
      // Override the headers mock for this test
      const { headers } = await import('next/headers')
      vi.mocked(headers).mockResolvedValueOnce({
        get: vi.fn().mockReturnValue(null),
      } as any)

      const request = createRequest('{}')

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing stripe-signature header')
    })

    it('should return 400 when signature verification fails', async () => {
      mockWebhooksConstructEvent.mockImplementation(() => {
        throw new Error('Invalid signature')
      })

      const request = createRequest('{}', 'invalid_signature')

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Webhook signature verification failed')
    })
  })

  describe('checkout.session.completed Event', () => {
    it('should update purchase to completed status', async () => {
      const mockUpdate = vi.fn().mockReturnThis()
      const mockEq = vi.fn().mockResolvedValue({ data: null, error: null })

      mockFrom.mockReturnValue({
        update: mockUpdate,
        eq: mockEq,
      })

      mockWebhooksConstructEvent.mockReturnValue({
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            payment_intent: 'pi_test_123',
            metadata: {
              user_id: 'test-user-id',
              product_id: 'claude-for-knowledge-workers',
            },
          },
        },
      })

      const request = createRequest('{}', 'valid_signature')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
      expect(mockFrom).toHaveBeenCalledWith('purchases')
    })

    it('should handle missing metadata gracefully', async () => {
      mockWebhooksConstructEvent.mockReturnValue({
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            payment_intent: 'pi_test_123',
            metadata: {},
          },
        },
      })

      const request = createRequest('{}', 'valid_signature')
      const response = await POST(request)
      const data = await response.json()

      // Should still return 200, just logs error
      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
    })
  })

  describe('checkout.session.expired Event', () => {
    it('should update purchase to expired status', async () => {
      const mockUpdate = vi.fn().mockReturnThis()
      const mockEq = vi.fn().mockResolvedValue({ data: null, error: null })

      mockFrom.mockReturnValue({
        update: mockUpdate,
        eq: mockEq,
      })

      mockWebhooksConstructEvent.mockReturnValue({
        type: 'checkout.session.expired',
        data: {
          object: {
            id: 'cs_test_expired_123',
          },
        },
      })

      const request = createRequest('{}', 'valid_signature')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
      expect(mockFrom).toHaveBeenCalledWith('purchases')
    })
  })

  describe('charge.refunded Event', () => {
    it('should update purchase to refunded status', async () => {
      const mockUpdate = vi.fn().mockReturnThis()
      const mockEq = vi.fn().mockResolvedValue({ data: null, error: null })

      mockFrom.mockReturnValue({
        update: mockUpdate,
        eq: mockEq,
      })

      mockWebhooksConstructEvent.mockReturnValue({
        type: 'charge.refunded',
        data: {
          object: {
            id: 'ch_test_123',
            payment_intent: 'pi_test_refund_123',
          },
        },
      })

      const request = createRequest('{}', 'valid_signature')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
      expect(mockFrom).toHaveBeenCalledWith('purchases')
    })
  })

  describe('Unknown Events', () => {
    it('should handle unknown event types gracefully', async () => {
      mockWebhooksConstructEvent.mockReturnValue({
        type: 'unknown.event.type',
        data: {
          object: {},
        },
      })

      const request = createRequest('{}', 'valid_signature')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('should return 500 when database update fails', async () => {
      mockFrom.mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockRejectedValue(new Error('Database error')),
      })

      mockWebhooksConstructEvent.mockReturnValue({
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            payment_intent: 'pi_test_123',
            metadata: {
              user_id: 'test-user-id',
              product_id: 'claude-for-knowledge-workers',
            },
          },
        },
      })

      const request = createRequest('{}', 'valid_signature')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Webhook handler failed')
    })
  })
})
