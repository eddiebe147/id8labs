import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ID8Labs Supabase project - lazy loaded to avoid build-time errors
let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}

// Legacy export for compatibility - will be null if not configured
export const supabase = null as unknown as SupabaseClient

// Types for Claude observations
export interface ClaudeObservation {
  id: string
  date: string
  text: string
  category: 'observation' | 'milestone' | 'insight' | 'general'
  is_pinned: boolean
  created_at: string
  updated_at: string
}
