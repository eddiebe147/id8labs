/**
 * Stack Database Operations (Client-side)
 * For client components with 'use client'
 */

import { createClient } from '@/lib/supabase/client'
import type { SavedStack } from '@/lib/stores/stack-store'

/**
 * Save stack to database (client-side)
 */
export async function saveStackToDb(
  stack: SavedStack
): Promise<{ id: string; share_id: string } | null> {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error('User not authenticated')

    const { data: stackData, error: stackError } = await supabase
      .from('user_skill_stacks')
      .upsert(
        {
          id: stack.id,
          user_id: user.id,
          name: stack.name,
          description: stack.description || null,
          is_public: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()
      .single()

    if (stackError) throw stackError

    await supabase.from('user_skill_stack_items').delete().eq('stack_id', stack.id)

    if (stack.items.length > 0) {
      const items = stack.items.map((item, index) => ({
        stack_id: stack.id,
        skill_id: item.id,
        display_order: index,
      }))

      const { error: itemsError } = await supabase
        .from('user_skill_stack_items')
        .insert(items)

      if (itemsError) throw itemsError
    }

    return {
      id: stackData.id,
      share_id: stackData.share_id || '',
    }
  } catch (error) {
    console.error('Failed to save stack to database:', error)
    return null
  }
}

/**
 * Make stack public and generate share_id (client-side)
 */
export async function makeStackPublic(stackId: string): Promise<string | null> {
  try {
    const supabase = createClient()
    const shareId =
      Math.random().toString(36).substring(2, 6) +
      Math.random().toString(36).substring(2, 6)

    const { data, error } = await supabase
      .from('user_skill_stacks')
      .update({
        is_public: true,
        share_id: shareId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', stackId)
      .select()
      .single()

    if (error) throw error
    return data.share_id
  } catch (error) {
    console.error('Failed to make stack public:', error)
    return null
  }
}

/**
 * Fork a public stack (client-side)
 */
export async function forkStack(sourceStackId: string, newName: string): Promise<string | null> {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error('User not authenticated')

    const { data: sourceItems } = await supabase
      .from('user_skill_stack_items')
      .select('skill_id, display_order')
      .eq('stack_id', sourceStackId)

    if (!sourceItems) throw new Error('Source stack not found')

    const { data: newStack, error: stackError } = await supabase
      .from('user_skill_stacks')
      .insert({
        user_id: user.id,
        name: newName,
        is_public: false,
      })
      .select()
      .single()

    if (stackError) throw stackError

    const items = sourceItems.map((item) => ({
      stack_id: newStack.id,
      skill_id: item.skill_id,
      display_order: item.display_order,
    }))

    const { error: itemsError } = await supabase.from('user_skill_stack_items').insert(items)

    if (itemsError) throw itemsError

    return newStack.id
  } catch (error) {
    console.error('Failed to fork stack:', error)
    return null
  }
}
