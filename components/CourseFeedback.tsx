'use client'

import { useState } from 'react'
import { m, AnimatePresence } from '@/components/motion'

interface CourseFeedbackProps {
  courseId: string
  courseName: string
  className?: string
}

type FeedbackValue = 'helpful' | 'not-helpful' | null
type FeedbackStatus = 'idle' | 'voted' | 'collecting-email' | 'submitting' | 'success' | 'error'

export default function CourseFeedback({
  courseId,
  courseName,
  className = ""
}: CourseFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackValue>(null)
  const [status, setStatus] = useState<FeedbackStatus>('idle')
  const [email, setEmail] = useState('')
  const [wantsFollowUp, setWantsFollowUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleVote = async (value: FeedbackValue) => {
    setFeedback(value)
    setStatus('voted')
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          courseName,
          helpful: feedback === 'helpful',
          email: wantsFollowUp ? email : undefined,
          wantsFollowUp,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback')
      }

      setStatus('success')
    } catch (error) {
      console.error('Feedback error:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const skipEmail = async () => {
    setWantsFollowUp(false)
    await handleSubmit()
  }

  return (
    <div className={`w-full ${className}`}>
      <AnimatePresence mode="wait">
        {/* Initial voting state */}
        {status === 'idle' && (
          <m.div
            key="voting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold mb-3">Was this course helpful?</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Your feedback helps us improve
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleVote('helpful')}
                className="flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-500/20 transition-colors"
              >
                <ThumbUpIcon />
                Yes, it was helpful
              </button>
              <button
                onClick={() => handleVote('not-helpful')}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] transition-colors"
              >
                <ThumbDownIcon />
                Could be better
              </button>
            </div>
          </m.div>
        )}

        {/* After voting - ask for email */}
        {status === 'voted' && (
          <m.div
            key="email-capture"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full mb-4">
              <CheckIcon className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Thanks for your feedback!</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              {feedback === 'helpful'
                ? "Want tips on what to learn next? We can send personalized recommendations."
                : "We'd love to hear more about how we can improve. Can we follow up?"}
            </p>

            <form onSubmit={(e) => {
              e.preventDefault()
              setWantsFollowUp(true)
              handleSubmit(e)
            }} className="max-w-md mx-auto">
              <div className="flex gap-2 mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-id8-orange focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="btn btn-primary px-6"
                >
                  Send
                </button>
              </div>
              <button
                type="button"
                onClick={skipEmail}
                className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                Skip — just submit my feedback
              </button>
            </form>
          </m.div>
        )}

        {/* Submitting state */}
        {status === 'submitting' && (
          <m.div
            key="submitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
              <svg className="animate-spin h-8 w-8 text-id8-orange" viewBox="0 0 24 24">
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
            </div>
            <p className="text-[var(--text-secondary)]">Submitting...</p>
          </m.div>
        )}

        {/* Success state */}
        {status === 'success' && (
          <m.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
              <CheckIcon className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Feedback received!</h3>
            <p className="text-[var(--text-secondary)]">
              {wantsFollowUp
                ? "We'll be in touch with personalized recommendations."
                : "Thanks for helping us improve."}
            </p>
          </m.div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <m.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-full mb-4">
              <XIcon className="text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Oops, something went wrong</h3>
            <p className="text-sm text-red-400 mb-4">{errorMessage}</p>
            <button
              onClick={() => setStatus('voted')}
              className="text-sm text-id8-orange hover:underline"
            >
              Try again
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Icons
const ThumbUpIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
)

const ThumbDownIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
  </svg>
)

const CheckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const XIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
