import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Course module pages use client-side AuthGate for protection (modal instead of redirect)
  // Middleware only handles:
  // - Refreshing auth session (above)
  // - Redirecting authenticated users away from auth pages (below)
  //
  // All course pages are allowed through - AuthGate component handles auth gating
  // This provides better UX: modal overlay instead of hard redirect

  // Redirect to courses if accessing auth pages while authenticated
  const authPaths = ['/sign-in', '/sign-up']
  const isAuthPath = authPaths.includes(request.nextUrl.pathname)

  if (isAuthPath && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/courses/claude-for-knowledge-workers'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * PERFORMANCE OPTIMIZED: Only run middleware on paths that need auth
     * - /courses/* (protected content, except free paths handled in middleware)
     * - /sign-in, /sign-up (auth redirects)
     * - /api/auth/* (auth callbacks)
     *
     * EXCLUDED (massive performance gain):
     * - All static assets (_next/static, images, etc.)
     * - All other API routes (they handle their own auth)
     * - All public pages (/, /essays, /products, etc.)
     */
    '/courses/:path*',
    '/sign-in',
    '/sign-up',
    '/api/auth/:path*',
  ],
}
