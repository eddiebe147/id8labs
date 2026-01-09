'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { AuthLoadingFallback } from '@/components/auth/AuthLoadingFallback'
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthErrorMessage } from '@/components/auth/AuthErrorMessage'
import { MagicLinkSuccess } from '@/components/auth/MagicLinkSuccess'

function SignUpForm(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const searchParams = useSearchParams()
  const supabase = createClient()

  const redirectTo = searchParams.get('redirect') || '/courses/claude-for-knowledge-workers'

  function buildRedirectUrl(path: string): string {
    return `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(path)}`
  }

  async function handleGoogleSignUp(): Promise<void> {
    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: buildRedirectUrl(redirectTo) },
    })

    if (authError) {
      setError(authError.message)
    }
    setLoading(false)
  }

  async function handleMagicLink(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: buildRedirectUrl(redirectTo) },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return <MagicLinkSuccess email={email} onReset={() => setSuccess(false)} variant="sign-up" />
  }

  return (
    <div className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-lg p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
        Create your account
      </h1>
      <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8">
        Start learning with ID8Labs
      </p>

      <GoogleAuthButton onClick={handleGoogleSignUp} disabled={loading} />
      <AuthDivider />

      <form onSubmit={handleMagicLink} className="space-y-6">
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
          <p className="mt-2 text-xs text-text-light-secondary dark:text-text-dark-secondary">
            We'll email you a magic link - no password required.
          </p>
        </div>

        <AuthErrorMessage error={error} />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:disabled:bg-orange-800 text-white font-medium rounded-md transition-colors"
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
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

export default function SignUpPage(): React.ReactElement {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <SignUpForm />
    </Suspense>
  )
}
