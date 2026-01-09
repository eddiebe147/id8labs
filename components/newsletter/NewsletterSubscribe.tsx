'use client'

import { useState } from 'react'
import { m, AnimatePresence } from '@/components/motion'

export type NewsletterVariant = 'inline' | 'compact' | 'full-width'

interface NewsletterSubscribeProps {
  variant?: NewsletterVariant
  source?: string
  title?: string
  description?: string
  buttonText?: string
  className?: string
  showPrivacyNote?: boolean
  onSuccess?: (email: string) => void
}

export default function NewsletterSubscribe({
  variant = 'inline',
  source = 'website',
  title = 'The Innovation Brief',
  description = 'Weekly insights on AI, automation, and building the future.',
  buttonText = 'Subscribe',
  className = '',
  showPrivacyNote = true,
  onSuccess,
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus('success')
      setEmail('')
      onSuccess?.(email)
    } catch (error) {
      console.error('Subscribe error:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  const SuccessMessage = () => (
    <m.div
      key="success"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 p-4 bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30 rounded-xl"
    >
      <div className="w-8 h-8 bg-[var(--accent-green)]/20 rounded-full flex items-center justify-center flex-shrink-0">
        <svg
          className="w-4 h-4 text-[var(--accent-green)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-[var(--text-primary)] text-sm">
        You're subscribed to The Innovation Brief! Check your inbox.
      </p>
    </m.div>
  )

  const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  const ErrorMessage = () => (
    <m.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-sm text-center text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg"
    >
      {errorMessage}
    </m.p>
  )

  // Inline variant - horizontal form
  if (variant === 'inline') {
    return (
      <div className={`w-full max-w-md ${className}`}>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <SuccessMessage />
          ) : (
            <m.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              {title && (
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-[var(--text-secondary)] text-sm">
                  {description}
                </p>
              )}

              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] focus:border-transparent transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? <LoadingSpinner /> : buttonText}
                </button>
              </div>

              {status === 'error' && <ErrorMessage />}

              {showPrivacyNote && (
                <p className="text-xs text-[var(--text-tertiary)]">
                  No spam. Unsubscribe anytime.
                </p>
              )}
            </m.form>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Compact variant - single line with button
  if (variant === 'compact') {
    return (
      <div className={`w-full max-w-sm ${className}`}>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <m.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-[var(--accent-green)] text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Subscribed!</span>
            </m.div>
          ) : (
            <m.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                className="flex-1 px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-1 focus:ring-[var(--id8-orange)] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary btn-sm disabled:opacity-50"
              >
                {status === 'loading' ? <LoadingSpinner /> : 'Go'}
              </button>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Full-width variant - hero style with more emphasis
  return (
    <div className={`w-full ${className}`}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-[var(--accent-green)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[var(--accent-green)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Welcome to The Innovation Brief!
            </h3>
            <p className="text-[var(--text-secondary)]">
              Check your inbox for a confirmation email.
            </p>
          </m.div>
        ) : (
          <m.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full mb-4">
                Newsletter
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
                {title}
              </h2>
              <p className="text-[var(--text-secondary)] max-w-md mx-auto">
                {description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 px-5 py-4 text-base border border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] focus:border-transparent transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary px-8 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === 'loading' ? <LoadingSpinner /> : buttonText}
                </button>
              </div>

              {status === 'error' && (
                <m.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 mt-3"
                >
                  {errorMessage}
                </m.p>
              )}

              {showPrivacyNote && (
                <p className="text-xs text-[var(--text-tertiary)] mt-4">
                  Join 1,000+ innovators. No spam, unsubscribe anytime.
                </p>
              )}
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
