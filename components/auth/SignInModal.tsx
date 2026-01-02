'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

type AuthMethod = 'magic-link' | 'password'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  moduleName?: string
  redirectTo?: string
}

export default function SignInModal({
  isOpen,
  onClose,
  onSuccess,
  moduleName,
  redirectTo
}: SignInModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [authMethod, setAuthMethod] = useState<AuthMethod>('magic-link')
  const router = useRouter()
  const supabase = createClient()

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleGoogleSignIn = async () => {
    setError(null)
    setLoading(true)

    try {
      const callbackUrl = redirectTo
        ? `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirectTo)}`
        : `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(window.location.pathname)}`

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
        },
      })

      if (error) {
        setError(error.message)
        setLoading(false)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const callbackUrl = redirectTo
        ? `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirectTo)}`
        : `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(window.location.pathname)}`

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: callbackUrl,
        },
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setMagicLinkSent(true)
      setLoading(false)
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Success! Refresh and call onSuccess
      router.refresh()
      onSuccess?.()
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  const resetForm = () => {
    setMagicLinkSent(false)
    setEmail('')
    setPassword('')
    setError(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[var(--bg-primary)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  {magicLinkSent ? 'Check your email' : 'Sign in to continue'}
                </h2>
                {moduleName && !magicLinkSent && (
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {moduleName} requires sign-in
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {magicLinkSent ? (
                  <motion.div
                    key="magic-link-sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-[var(--id8-orange)]/10 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-[var(--id8-orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[var(--text-primary)] font-medium">
                        We sent a magic link to
                      </p>
                      <p className="text-[var(--id8-orange)] font-semibold">{email}</p>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Click the link in the email to sign in. No password needed.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-sm text-[var(--id8-orange)] hover:underline"
                    >
                      Use a different email
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sign-in-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Context Banner */}
                    {moduleName && (
                      <div className="p-3 bg-[var(--id8-orange)]/10 border border-[var(--id8-orange)]/30 rounded-xl">
                        <p className="text-sm text-[var(--text-secondary)]">
                          Sign in to access course content and track your progress.
                        </p>
                      </div>
                    )}

                    {/* Google Sign In */}
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium transition-colors disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continue with Google
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[var(--border)]" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-[var(--bg-primary)] text-[var(--text-tertiary)]">
                          or continue with email
                        </span>
                      </div>
                    </div>

                    {/* Auth Method Toggle */}
                    <div className="flex rounded-xl border border-[var(--border)] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setAuthMethod('magic-link')}
                        className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                          authMethod === 'magic-link'
                            ? 'bg-[var(--id8-orange)] text-white'
                            : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                      >
                        Magic Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMethod('password')}
                        className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                          authMethod === 'password'
                            ? 'bg-[var(--id8-orange)] text-white'
                            : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                      >
                        Password
                      </button>
                    </div>

                    {authMethod === 'magic-link' ? (
                      <form onSubmit={handleMagicLink} className="space-y-4">
                        <div>
                          <label htmlFor="modal-email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Email
                          </label>
                          <input
                            id="modal-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] focus:border-transparent"
                            placeholder="you@example.com"
                          />
                          <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                            We'll email you a magic link for password-free sign in.
                          </p>
                        </div>

                        {error && (
                          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                            <p className="text-sm text-red-400">{error}</p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full btn btn-primary disabled:opacity-50"
                        >
                          {loading ? 'Sending...' : 'Send Magic Link'}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handlePasswordSignIn} className="space-y-4">
                        <div>
                          <label htmlFor="modal-email-pw" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Email
                          </label>
                          <input
                            id="modal-email-pw"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] focus:border-transparent"
                            placeholder="you@example.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="modal-password" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Password
                          </label>
                          <input
                            id="modal-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] focus:border-transparent"
                            placeholder="Enter your password"
                          />
                        </div>

                        {error && (
                          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                            <p className="text-sm text-red-400">{error}</p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full btn btn-primary disabled:opacity-50"
                        >
                          {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                      </form>
                    )}

                    <p className="text-center text-sm text-[var(--text-tertiary)]">
                      Don't have an account?{' '}
                      <a href="/sign-up" className="text-[var(--id8-orange)] hover:underline font-medium">
                        Sign up
                      </a>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
