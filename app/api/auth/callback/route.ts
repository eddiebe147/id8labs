import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Allowed path prefixes for redirect (security: prevents open redirect attacks)
const ALLOWED_REDIRECT_PREFIXES = [
  '/courses/',
  '/dashboard',
  '/profile',
  '/stackshack',
  '/products/',
  '/settings',
]

function isValidRedirectPath(path: string): boolean {
  // Must be a relative path starting with /
  if (!path.startsWith('/')) return false
  // Prevent protocol-relative URLs (//evil.com)
  if (path.startsWith('//')) return false
  // Must start with an allowed prefix
  return ALLOWED_REDIRECT_PREFIXES.some(prefix => path.startsWith(prefix))
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const requestedNext = searchParams.get('next')

  // Validate redirect path to prevent open redirect attacks
  const defaultPath = '/courses/claude-for-knowledge-workers'
  const next = requestedNext && isValidRedirectPath(requestedNext)
    ? requestedNext
    : defaultPath

  if (code) {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.redirect(`${origin}/sign-in?error=server_configuration_error`)
    }
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Successful authentication - redirect to the validated next URL
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If there's an error, redirect to sign-in with error message
  return NextResponse.redirect(`${origin}/sign-in?error=authentication_failed`)
}
