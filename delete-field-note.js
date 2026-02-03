#!/usr/bin/env node
/**
 * Delete a field note by ID
 * Usage: node delete-field-note.js <uuid>
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const id = process.argv[2]

if (!id) {
  console.error('Usage: node delete-field-note.js <uuid>')
  process.exit(1)
}

async function deleteNote() {
  const { error } = await supabase
    .from('claude_observations')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }

  console.log(`✅ Deleted observation ${id}`)
}

deleteNote()
