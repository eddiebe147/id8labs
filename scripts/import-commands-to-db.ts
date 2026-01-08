/**
 * Import commands from JSON to Supabase
 * Run with: tsx scripts/import-commands-to-db.ts
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Load commands data
const commandsPath = path.join(process.cwd(), 'commands', 'commands-data.json')
const commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'))

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function importCommands() {
  console.log(`Importing ${commands.length} commands...`)
  
  let imported = 0
  let updated = 0
  let errors = 0

  for (const cmd of commands) {
    try {
      // Check if command exists
      const { data: existing } = await supabase
        .from('commands')
        .select('id')
        .eq('slug', cmd.slug)
        .single()

      const commandData = {
        slug: cmd.slug,
        name: cmd.name,
        description: cmd.description,
        category: cmd.category,
        command: cmd.command,
        prerequisites: cmd.prerequisites,
        tags: cmd.tags,
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
          .from('commands')
          .update({
            ...commandData,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)

        if (error) throw error
        updated++
        console.log(`✓ Updated: ${cmd.slug}`)
      } else {
        // Insert new
        const { error } = await supabase
          .from('commands')
          .insert(commandData)

        if (error) throw error
        imported++
        console.log(`✓ Imported: ${cmd.slug}`)
      }
    } catch (error: any) {
      console.error(`✗ Error with ${cmd.slug}:`, error.message)
      errors++
    }
  }

  console.log('\\n' + '='.repeat(50))
  console.log(`Imported: ${imported}`)
  console.log(`Updated: ${updated}`)
  console.log(`Errors: ${errors}`)
  console.log(`Total: ${commands.length}`)
  console.log('='.repeat(50))

  // Show summary by category
  const byCategory = commands.reduce((acc: any, cmd: any) => {
    acc[cmd.category] = (acc[cmd.category] || 0) + 1
    return acc
  }, {})

  console.log('\\nCommands by category:')
  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`)
  })
}

importCommands()
  .then(() => {
    console.log('\\n✅ Import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\\n❌ Import failed:', error)
    process.exit(1)
  })
