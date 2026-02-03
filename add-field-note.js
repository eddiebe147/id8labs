#!/usr/bin/env node
/**
 * Add a new Claude field note to the database
 * 
 * Usage:
 *   node add-field-note.js "Your observation text here" [category] [pinned]
 * 
 * Examples:
 *   node add-field-note.js "Built something cool today"
 *   node add-field-note.js "Major milestone achieved" milestone
 *   node add-field-note.js "Critical insight" insight true
 * 
 * Categories: observation, milestone, insight, general (default: observation)
 * Pinned: true/false (default: false)
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Parse command line arguments
const text = process.argv[2]
const category = process.argv[3] || 'observation'
const isPinned = process.argv[4] === 'true'

if (!text) {
  console.error(`
❌ Error: Text is required

Usage:
  node add-field-note.js "Your observation text here" [category] [pinned]

Examples:
  node add-field-note.js "Built something cool today"
  node add-field-note.js "Major milestone achieved" milestone
  node add-field-note.js "Critical insight" insight true

Categories: observation, milestone, insight, general
Pinned: true/false (default: false)
`)
  process.exit(1)
}

// Validate category
const validCategories = ['observation', 'milestone', 'insight', 'general']
if (!validCategories.includes(category)) {
  console.error(`❌ Invalid category: ${category}`)
  console.error(`Valid categories: ${validCategories.join(', ')}`)
  process.exit(1)
}

async function addFieldNote() {
  console.log('\n📝 Adding new field note...\n')
  console.log('Text:', text)
  console.log('Category:', category)
  console.log('Pinned:', isPinned)
  console.log('Date:', new Date().toISOString().split('T')[0])
  console.log()

  try {
    const { data, error } = await supabase
      .from('claude_observations')
      .insert({
        text,
        category,
        is_pinned: isPinned,
        date: new Date().toISOString().split('T')[0],
      })
      .select()
      .single()

    if (error) throw error

    console.log('✅ Field note added successfully!\n')
    console.log('ID:', data.id)
    console.log('Created:', data.created_at)
    console.log()
    console.log('🌐 View at: https://id8labs.app/claude-corner')
    console.log()

    // Show updated count
    const { data: all } = await supabase
      .from('claude_observations')
      .select('id')

    console.log(`📊 Total observations: ${all.length}`)
  } catch (err) {
    console.error('\n❌ Error adding field note:')
    console.error(err.message)
    process.exit(1)
  }
}

addFieldNote()
