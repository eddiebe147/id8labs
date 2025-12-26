import { createClient } from '@/lib/supabase/client'

// Client-side: Check if user has purchased a course
export async function hasPurchasedClient(productId: string): Promise<boolean> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data, error } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .eq('status', 'completed')
    .limit(1)
    .single()

  if (error || !data) return false
  return true
}

// Define which modules require purchase
export const PAID_MODULES = ['module-1', 'module-2', 'module-3', 'module-4', 'module-5']
export const FREE_MODULES = ['module-0']

export function isPaidModule(moduleSlug: string): boolean {
  return PAID_MODULES.includes(moduleSlug)
}
