'use client'

import { FormEvent, useState } from 'react'
import GlowButton from './GlowButton'

/**
 * WaitlistForm - Email capture form with terminal styling
 *
 * Usage:
 * <WaitlistForm
 *   onSuccess={() => console.log('Email captured!')}
 * />
 */

interface WaitlistFormProps {
  className?: string
  onSuccess?: () => void
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function WaitlistForm({
  className = '',
  onSuccess
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error')
      setErrorMessage('INVALID EMAIL FORMAT')
      return
    }

    setState('loading')

    try {
      // TODO: Wire up to Supabase
      // For now, just simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Email submitted:', email)

      setState('success')
      setEmail('')

      if (onSuccess) {
        onSuccess()
      }

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setState('idle')
      }, 3000)

    } catch (error) {
      console.error('Submission error:', error)
      setState('error')
      setErrorMessage('SUBMISSION FAILED. TRY AGAIN.')
    }
  }

  return (
    <div className={`w-full max-w-md ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === 'error') {
                setState('idle')
                setErrorMessage('')
              }
            }}
            placeholder="EMAIL_ADDRESS@DOMAIN.COM"
            disabled={state === 'loading' || state === 'success'}
            className={`
              w-full px-4 py-3
              font-mono uppercase text-sm tracking-wider
              bg-[#0a0a0a]
              border-2 transition-all duration-300
              focus:outline-none
              ${state === 'error'
                ? 'border-[#ff3333] text-[#ff3333]'
                : 'border-[#333333] text-[#00ff41]'
              }
              ${state === 'idle' || state === 'loading'
                ? 'focus:border-[#00ff41] focus:shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                : ''
              }
              placeholder:text-[#00cc33] placeholder:opacity-50
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            style={{
              borderRadius: '4px'
            }}
          />

          {/* Green glow on focus */}
          {state === 'idle' && (
            <div
              className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 peer-focus:opacity-100"
              style={{
                boxShadow: '0 0 10px rgba(0, 255, 65, 0.3)',
                borderRadius: '4px'
              }}
            />
          )}
        </div>

        {/* Submit Button */}
        <GlowButton
          variant="primary"
          size="lg"
          className="w-full"
          disabled={state === 'loading' || state === 'success'}
        >
          {state === 'loading' && '> PROCESSING...'}
          {state === 'success' && '> CONFIRMED'}
          {state === 'idle' && '> JOIN WAITLIST'}
          {state === 'error' && '> TRY AGAIN'}
        </GlowButton>

        {/* Error Message */}
        {state === 'error' && errorMessage && (
          <div
            className="
              font-mono text-xs uppercase tracking-wider
              text-[#ff3333]
              text-center
            "
            style={{
              textShadow: '0 0 5px currentColor'
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {state === 'success' && (
          <div
            className="
              font-mono text-xs uppercase tracking-wider
              text-[#00ff41]
              text-center
            "
            style={{
              textShadow: '0 0 5px currentColor'
            }}
          >
            SIGNAL RECEIVED. YOU'RE ON THE LIST.
          </div>
        )}
      </form>
    </div>
  )
}
