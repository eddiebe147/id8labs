'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { AuthLoadingFallback } from '@/components/auth/AuthLoadingFallback'
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthErrorMessage } from '@/components/auth/AuthErrorMessage'
import { MagicLinkSuccess } from '@/components/auth/MagicLinkSuccess'

type AuthMethod = 'magic-link' | 'password'
type ContextMessage = { title: string; subtitle: string }

function getContextMessage(redirect: string | null): ContextMessage | null {
  if (!redirect) return null

  if (redirect.startsWith('/courses/claude-for-knowledge-workers/module-')) {
    const moduleNum = redirect.match(/module-(\d+)/)?.[1] ?? ''
    return {
      title: `Module ${moduleNum} requires sign-in`,
      subtitle: 'Sign in to access paid course content and track your progress.',
    }
  }

  if (redirect.startsWith('/courses/')) {
    return {
      title: 'Sign in to continue',
      subtitle: 'Create a free account to save your progress and access course materials.',
    }
  }

  return null
}

function SignInForm(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [authMethod, setAuthMethod] = useState<AuthMethod>('magic-link')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const redirectTo = searchParams.get('redirect') || '/courses/claude-for-knowledge-workers'
  const contextMessage = getContextMessage(searchParams.get('redirect'))

  function buildRedirectUrl(path: string): string {
    return `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(path)}`
  }

  async function handleGoogleSignIn(): Promise<void> {
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

    setMagicLinkSent(true)
    setLoading(false)
  }

  async function handlePasswordSignIn(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  if (magicLinkSent) {
    return <MagicLinkSuccess email={email} onReset={() => setMagicLinkSent(false)} variant="sign-in" />
  }

  const title = contextMessage ? 'Sign in to continue' : 'Welcome back'
  const subtitle = contextMessage
    ? 'Your progress will be saved automatically.'
    : 'Sign in to continue your learning journey'

  return (
    <div className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-lg p-8 shadow-lg">
      {contextMessage && (
        <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div>
              <p className="font-medium text-orange-800 dark:text-orange-200">
                {contextMessage.title}
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                {contextMessage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">{title}</h1>
      <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8">{subtitle}</p>

      <GoogleAuthButton onClick={handleGoogleSignIn} disabled={loading} />
      <AuthDivider />

      {/* Auth Method Toggle */}
      <div className="flex rounded-md border border-border-light dark:border-border-dark mb-6 overflow-hidden">
        <button
          type="button"
          onClick={() => setAuthMethod('magic-link')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            authMethod === 'magic-link'
              ? 'bg-orange-500 text-white'
              : 'bg-white dark:bg-bg-dark text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          Magic Link
        </button>
        <button
          type="button"
          onClick={() => setAuthMethod('password')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            authMethod === 'password'
              ? 'bg-orange-500 text-white'
              : 'bg-white dark:bg-bg-dark text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          Password
        </button>
      </div>

      {authMethod === 'magic-link' ? (
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
              We'll email you a magic link for password-free sign in.
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
      ) : (
        <form onSubmit={handlePasswordSignIn} className="space-y-6">
          <div>
            <label
              htmlFor="email-password"
              className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
            >
              Email
            </label>
            <input
              id="email-password"
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
              placeholder="************"
            />
          </div>

          <AuthErrorMessage error={error} />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:disabled:bg-orange-800 text-white font-medium rounded-md transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-text-light-secondary dark:text-text-dark-secondary">
        Don't have an account?{' '}
        <Link
          href="/sign-up"
          className="text-orange-500 dark:text-orange-400 hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default function SignInPage(): React.ReactElement {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <SignInForm />
    </Suspense>
  )
}
