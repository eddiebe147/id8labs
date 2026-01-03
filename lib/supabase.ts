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

// Types for Claude stats (live from GitHub)
export interface ClaudeStats {
  id: string
  commits_together: number
  lines_added: number
  lines_removed: number
  lines_of_code: number
  projects_shipped: number
  milestones_hit: number
  first_commit_date: string | null
  last_commit_date: string | null
  tool_bash: number
  tool_read: number
  tool_edit: number
  tool_write: number
  languages: Record<string, number>
  // Extended stats - agents, skills, MCP
  agents_used: Record<string, number>
  skills_used: Record<string, number>
  mcp_used: Record<string, number>
  // Session metrics
  sessions_count: number
  hours_collaborated: number
  // Quality metrics
  tests_written: number
  builds_succeeded: number
  bugs_fixed: number
  // Timestamps
  last_synced_at: string
  created_at: string
  updated_at: string
}
