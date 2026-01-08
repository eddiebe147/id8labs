/**
 * Stack Database Operations (Server-side)
 * For server components and API routes
 */

import { createClient } from '@/lib/supabase/server'
import type { StackItem } from '@/lib/stores/stack-store'

export interface DbStack {
  id: string
  user_id: string
  name: string
  description: string | null
  share_id: string | null
  is_public: boolean
  created_at: string
  updated_at: string
  items?: StackItem[]
}

/**
 * Get public stacks for gallery (server-side)
 */
export async function getPublicStacks(limit = 50): Promise<DbStack[]> {
  try {
    const supabase = await createClient()
    if (!supabase) return []

    const { data, error } = await supabase
      .from('user_skill_stacks')
      .select(
        `
        *,
        items:user_skill_stack_items(
          skill_id,
          display_order,
          skill:skills(id, slug, name, description)
        )
      `
      )
      .eq('is_public', true)
      .order('updated_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return (
      data?.map((stack: any) => ({
        ...stack,
        items: stack.items
          ?.sort((a: any, b: any) => a.display_order - b.display_order)
          .map((item: any) => ({
            id: item.skill?.id || item.skill_id,
            slug: item.skill?.slug || '',
            name: item.skill?.name || '',
            description: item.skill?.description || '',
            type: 'skill' as const,
          })) || [],
      })) || []
    )
  } catch (error) {
    console.error('Failed to get public stacks:', error)
    return []
  }
}

/**
 * Get stack by share_id (server-side)
 */
export async function getStackByShareId(shareId: string): Promise<DbStack | null> {
  try {
    const supabase = await createClient()
    if (!supabase) return null

    const { data, error } = await supabase
      .from('user_skill_stacks')
      .select(
        `
        *,
        items:user_skill_stack_items(
          skill_id,
          display_order,
          skill:skills(id, slug, name, description, category_id, tags)
        )
      `
      )
      .eq('share_id', shareId)
      .eq('is_public', true)
      .single()

    if (error) throw error

    return {
      ...data,
      items: data.items
        ?.sort((a: any, b: any) => a.display_order - b.display_order)
        .map((item: any) => ({
          id: item.skill?.id || item.skill_id,
          slug: item.skill?.slug || '',
          name: item.skill?.name || '',
          description: item.skill?.description || '',
          type: 'skill' as const,
          category: item.skill?.category_id || undefined,
          tags: item.skill?.tags || undefined,
        })) || [],
    }
  } catch (error) {
    console.error('Failed to get stack by share_id:', error)
    return null
  }
}
