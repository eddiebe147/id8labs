#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  // Check collection items count
  const { data: items, error: itemsError } = await supabase
    .from('skill_collection_items')
    .select('collection_id, skill_id')
  
  if (itemsError) {
    console.error('Error fetching collection items:', itemsError)
    return
  }

  console.log(`Total collection items: ${items?.length || 0}`)

  // Check collections with their skill counts
  const { data: collections, error: colError } = await supabase
    .from('skill_collections')
    .select(`
      slug,
      name,
      skill_collection_items(count)
    `)
    .eq('is_public', true)

  if (colError) {
    console.error('Error:', colError)
    return
  }

  console.log('\nCollections with skill counts:')
  collections?.forEach(col => {
    const count = (col.skill_collection_items as any)?.[0]?.count || 0
    console.log(`  ${col.slug}: ${count} skills`)
  })

  // Test the actual query used by the app
  console.log('\n--- Testing actual app query ---')
  const { data, error } = await supabase
    .from('skill_collections')
    .select(`
      *,
      skill_collection_items(
        skills(*)
      )
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('App query error:', error)
    return
  }

  console.log(`Query returned ${data?.length || 0} collections`)
  data?.forEach(col => {
    const skillCount = col.skill_collection_items?.length || 0
    console.log(`  ${col.slug}: ${skillCount} skill items`)
  })
}

main()
