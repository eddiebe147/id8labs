import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

/**
 * Get the current user on the server side
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Get the current session on the server side
 * Returns null if no active session
 */
export async function getCurrentSession() {
  const supabase = await createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

/**
 * Sign out on the client side
 */
export async function signOut() {
  const supabase = createBrowserClient()
  await supabase.auth.signOut()
}

/**
 * Check if user is authenticated (server-side)
 */
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user
}
