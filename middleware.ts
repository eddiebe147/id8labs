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

  // Protected routes - courses are protected EXCEPT:
  // - module-0 of paid course (free preview)
  // - entire AI Conversation Fundamentals course (free lead magnet)
  // - course landing page (so users can browse before signing up)
  // - course media files (so videos/audio load on free modules)
  const protectedPaths = ['/courses']

  // Paths that use startsWith matching (sub-paths included)
  const freePathPrefixes = [
    '/courses/claude-for-knowledge-workers/module-0', // Module 0 + subpaths
    '/courses/ai-conversation-fundamentals', // Entire free course
    '/courses/module-0/media', // Media files for free module-0
  ]

  // Paths that require exact match only
  const freePathExact = [
    '/courses/claude-for-knowledge-workers', // Landing page only (not module-1+)
  ]

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )
  const isFreePath =
    freePathPrefixes.some((path) => request.nextUrl.pathname.startsWith(path)) ||
    freePathExact.includes(request.nextUrl.pathname)

  // Redirect to sign-in if accessing protected route without auth (except free paths)
  if (isProtectedPath && !isFreePath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

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
