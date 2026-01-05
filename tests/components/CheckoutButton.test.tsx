import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { server } from '../mocks/server'
import CheckoutButton from '@/components/CheckoutButton'

// Mock window.location
const mockLocation = { href: '' }
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

// Store original fetch
const originalFetch = globalThis.fetch

describe('CheckoutButton', () => {
  let mockFetch: ReturnType<typeof vi.fn>

  // Temporarily stop MSW for component tests that mock fetch directly
  beforeAll(() => {
    server.close()
  })

  afterAll(() => {
    server.listen()
  })

  beforeEach(() => {
    vi.clearAllMocks()
    mockLocation.href = ''
    // Create fresh mock for each test
    mockFetch = vi.fn()
    globalThis.fetch = mockFetch
  })

  afterEach(() => {
    // Restore original fetch
    globalThis.fetch = originalFetch
  })

  describe('Rendering', () => {
    it('should render with default text', () => {
      render(<CheckoutButton productId="ai-conversation-fundamentals" />)

      expect(screen.getByRole('button', { name: 'Purchase Course' })).toBeInTheDocument()
    })

    it('should render with custom children', () => {
      render(
        <CheckoutButton productId="ai-conversation-fundamentals">
          Buy Now - $29
        </CheckoutButton>
      )

      expect(screen.getByRole('button', { name: 'Buy Now - $29' })).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(
        <CheckoutButton productId="ai-conversation-fundamentals" className="custom-class" />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })
  })

  describe('Loading State', () => {
    it('should show loading state while processing', async () => {
      // Create a promise that doesn't resolve immediately
      let resolvePromise: (value: Response) => void
      mockFetch.mockImplementation(() =>
        new Promise<Response>((resolve) => {
          resolvePromise = resolve
        })
      )

      render(<CheckoutButton productId="ai-conversation-fundamentals" />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText('Processing...')).toBeInTheDocument()
      })

      // Button should be disabled
      expect(button).toBeDisabled()

      // Clean up by resolving the promise
      resolvePromise!(
        new Response(JSON.stringify({ url: 'https://checkout.stripe.com/test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })

    it('should disable button while loading', async () => {
      mockFetch.mockImplementation(() => new Promise(() => {})) // Never resolves

      render(<CheckoutButton productId="ai-conversation-fundamentals" />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(button).toBeDisabled()
      })
    })
  })

  describe('Successful Checkout', () => {
    it('should redirect to Stripe checkout URL on success', async () => {
      const checkoutUrl = 'https://checkout.stripe.com/c/pay/test_session'
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ url: checkoutUrl }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<CheckoutButton productId="ai-conversation-fundamentals" />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(mockLocation.href).toBe(checkoutUrl)
      })
    })

    it('should call API with correct product ID', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ url: 'https://checkout.stripe.com/test' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<CheckoutButton productId="ai-for-leaders" />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/stripe/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: 'ai-for-leaders' }),
        })
      })
    })
  })

  describe('Error Handling', () => {
    it('should display error message when API fails', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ error: 'Product not found' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<CheckoutButton productId="invalid-product" />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(screen.getByText('Product not found')).toBeInTheDocument()
      })
    })

    it('should display generic error when no error message returned', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({}), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<CheckoutButton productId="ai-conversation-fundamentals" />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(screen.getByText('Failed to create checkout session')).toBeInTheDocument()
      })
    })

    it('should display error when no checkout URL returned', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({}), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<CheckoutButton productId="ai-conversation-fundamentals" />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(screen.getByText('No checkout URL returned')).toBeInTheDocument()
      })
    })

    it('should handle network errors gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      render(<CheckoutButton productId="ai-conversation-fundamentals" />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument()
      })
    })

    it('should re-enable button after error', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ error: 'Failed' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<CheckoutButton productId="ai-conversation-fundamentals" />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText('Failed')).toBeInTheDocument()
      })

      // Button should be re-enabled after error
      expect(button).not.toBeDisabled()
      expect(screen.getByText('Purchase Course')).toBeInTheDocument()
    })
  })
})
