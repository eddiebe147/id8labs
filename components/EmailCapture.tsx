'use client'

import { useState } from 'react'
import { m, AnimatePresence } from '@/components/motion'

interface EmailCaptureProps {
  source: string
  title?: string
  className?: string
}

export default function EmailCapture({
  source,
  title = "Get notified about new modules and tips",
  className = ""
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribe', {
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
    } catch (error) {
      console.error('Subscribe error:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
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
              You're subscribed! Check your inbox for a confirmation.
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <p className="text-[var(--text-secondary)] text-sm text-center mb-4">
              {title}
            </p>

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
                {status === 'loading' ? (
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
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {status === 'error' && (
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-center text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg"
              >
                {errorMessage}
              </m.p>
            )}

            <p className="text-xs text-center text-[var(--text-tertiary)]">
              No spam. Unsubscribe anytime.
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  )
}
