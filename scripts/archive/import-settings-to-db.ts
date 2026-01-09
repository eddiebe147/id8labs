/**
 * Import settings from JSON to Supabase
 * Run with: tsx scripts/import-settings-to-db.ts
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Load settings data
const settingsPath = path.join(process.cwd(), 'settings', 'settings-data.json')
const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'))

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function importSettings() {
  console.log(`Importing ${settings.length} settings presets...`)
  
  let imported = 0
  let updated = 0
  let errors = 0

  for (const setting of settings) {
    try {
      // Check if setting exists
      const { data: existing } = await supabase
        .from('settings')
        .select('id')
        .eq('slug', setting.slug)
        .single()

      const settingData = {
        slug: setting.slug,
        name: setting.name,
        description: setting.description,
        category: setting.category,
        settings: setting.settings,
        tags: setting.tags,
        verified: true,
        featured: false,
        author: 'ID8Labs',
        license: 'MIT',
        version: '1.0.0',
        status: 'published'
      }

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('settings')
          .update({
            ...settingData,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)

        if (error) throw error
        updated++
        console.log(`✓ Updated: ${setting.slug}`)
      } else {
        // Insert new
        const { error } = await supabase
          .from('settings')
          .insert(settingData)

        if (error) throw error
        imported++
        console.log(`✓ Imported: ${setting.slug}`)
      }
    } catch (error: any) {
      console.error(`✗ Error with ${setting.slug}:`, error.message)
      errors++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`Imported: ${imported}`)
  console.log(`Updated: ${updated}`)
  console.log(`Errors: ${errors}`)
  console.log(`Total: ${settings.length}`)
  console.log('='.repeat(50))

  // Show summary by category
  const byCategory = settings.reduce((acc: any, setting: any) => {
    acc[setting.category] = (acc[setting.category] || 0) + 1
    return acc
  }, {})

  console.log('\nSettings by category:')
  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`)
  })
}

importSettings()
  .then(() => {
    console.log('\n✅ Import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error)
    process.exit(1)
  })
