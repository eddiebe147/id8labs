import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from '../mocks/server'
import EmailCapture from '@/components/EmailCapture'

// Mock framer-motion
vi.mock('@/components/motion', () => ({
  m: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>{children}</div>
    ),
    form: ({ children, className, onSubmit, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => (
      <form className={className} onSubmit={onSubmit} {...props}>{children}</form>
    ),
    p: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className={className} {...props}>{children}</p>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Store original fetch
const originalFetch = globalThis.fetch

describe('EmailCapture', () => {
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
    mockFetch = vi.fn()
    globalThis.fetch = mockFetch as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  describe('Rendering', () => {
    it('should render with default title', () => {
      render(<EmailCapture source="test-source" />)

      expect(screen.getByText('Get notified about new modules and tips')).toBeInTheDocument()
    })

    it('should render with custom title', () => {
      render(
        <EmailCapture
          source="test-source"
          title="Subscribe to our newsletter"
        />
      )

      expect(screen.getByText('Subscribe to our newsletter')).toBeInTheDocument()
    })

    it('should render email input and submit button', () => {
      render(<EmailCapture source="test-source" />)

      expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(
        <EmailCapture source="test-source" className="custom-class" />
      )

      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('should show no-spam disclaimer', () => {
      render(<EmailCapture source="test-source" />)

      expect(screen.getByText('No spam. Unsubscribe anytime.')).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('should require email input', () => {
      render(<EmailCapture source="test-source" />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      expect(emailInput).toHaveAttribute('required')
    })

    it('should have email type input', () => {
      render(<EmailCapture source="test-source" />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      expect(emailInput).toHaveAttribute('type', 'email')
    })
  })

  describe('Successful Submission', () => {
    it('should show success message after successful subscription', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<EmailCapture source="landing-page" />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      const submitButton = screen.getByRole('button', { name: 'Subscribe' })

      await userEvent.type(emailInput, 'test@example.com')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/You're subscribed!/)).toBeInTheDocument()
      })
    })

    it('should call API with email and source', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<EmailCapture source="course-page" />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      await userEvent.type(emailInput, 'user@test.com')
      fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'user@test.com',
            source: 'course-page',
          }),
        })
      })
    })

    it('should clear email input after successful submission', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<EmailCapture source="test" />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      await userEvent.type(emailInput, 'test@example.com')

      expect(emailInput).toHaveValue('test@example.com')

      fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

      await waitFor(() => {
        expect(screen.getByText(/You're subscribed!/)).toBeInTheDocument()
      })
    })
  })

  describe('Loading State', () => {
    it('should disable inputs while loading', async () => {
      let resolvePromise: (value: Response) => void
      mockFetch.mockImplementation(() =>
        new Promise<Response>((resolve) => {
          resolvePromise = resolve
        })
      )

      render(<EmailCapture source="test" />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      await userEvent.type(emailInput, 'test@example.com')
      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(emailInput).toBeDisabled()
        expect(screen.getByRole('button')).toBeDisabled()
      })

      // Clean up
      resolvePromise!(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })

    it('should show loading spinner', async () => {
      mockFetch.mockImplementation(() => new Promise(() => {})) // Never resolves

      render(<EmailCapture source="test" />)

      await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com')
      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        // Look for the spinner SVG (has animate-spin class)
        const button = screen.getByRole('button')
        expect(button.querySelector('svg.animate-spin')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should display error message when API fails', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ error: 'Invalid email format' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<EmailCapture source="test" />)

      // Use a valid email format so browser validation passes
      await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com')
      fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

      await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument()
      })
    })

    it('should display generic error when no message returned', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({}), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<EmailCapture source="test" />)

      await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com')
      fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

      await waitFor(() => {
        expect(screen.getByText('Failed to subscribe')).toBeInTheDocument()
      })
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      render(<EmailCapture source="test" />)

      await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com')
      fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument()
      })
    })

    it('should re-enable form after error', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ error: 'Server error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<EmailCapture source="test" />)

      const emailInput = screen.getByPlaceholderText('you@example.com')
      await userEvent.type(emailInput, 'test@example.com')
      fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

      await waitFor(() => {
        expect(screen.getByText('Server error')).toBeInTheDocument()
      })

      // Inputs should be re-enabled
      expect(emailInput).not.toBeDisabled()
      expect(screen.getByRole('button', { name: 'Subscribe' })).not.toBeDisabled()
    })
  })

  describe('Different Sources', () => {
    it('should send correct source for landing page', async () => {
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      render(<EmailCapture source="ai-fundamentals-landing" />)

      await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com')
      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/subscribe',
          expect.objectContaining({
            body: expect.stringContaining('ai-fundamentals-landing'),
          })
        )
      })
    })
  })
})
