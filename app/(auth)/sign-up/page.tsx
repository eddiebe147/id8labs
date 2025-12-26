'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Show success message
      setSuccess(true)
      setLoading(false)
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-lg p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
            Check your email
          </h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6">
            We sent a confirmation link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
            Click the link in the email to complete your registration.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-lg p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
        Create your account
      </h1>
      <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8">
        Start learning with ID8Labs
      </p>

      <form onSubmit={handleSignUp} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-md bg-white dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-md bg-white dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-text-light-secondary dark:text-text-dark-secondary">
            Must be at least 6 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-md bg-white dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:disabled:bg-orange-800 text-white font-medium rounded-md transition-colors"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-text-light-secondary dark:text-text-dark-secondary">
        Already have an account?{' '}
        <Link
          href="/sign-in"
          className="text-orange-500 dark:text-orange-400 hover:underline font-medium"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
