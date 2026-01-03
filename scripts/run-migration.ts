#!/usr/bin/env npx tsx
/**
 * Run migration directly via Supabase
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

// Load env
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('\\n', '').trim()
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

// TypeScript doesn't know process.exit() never returns, so we assert the types
const validUrl = supabaseUrl as string
const validKey = supabaseKey as string

const supabase = createClient(validUrl, validKey)

async function runMigration() {
  console.log('\n🔄 Running content_queue migration...\n')

  const migrationPath = resolve(process.cwd(), 'supabase/migrations/20260102_create_content_queue.sql')
  const sql = readFileSync(migrationPath, 'utf-8')

  // Split into individual statements (basic split on semicolons outside strings)
  const statements = sql
    .split(/;(?=(?:[^']*'[^']*')*[^']*$)/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  console.log(`   Found ${statements.length} SQL statements\n`)

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i]
    const preview = stmt.substring(0, 60).replace(/\n/g, ' ')
    console.log(`   [${i + 1}/${statements.length}] ${preview}...`)

    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: stmt })

      if (error) {
        // Try direct query instead
        const { error: queryError } = await supabase.from('_temp').select().limit(0)
        // This won't work for DDL, need pg_net or REST API
        console.log(`   ⚠️  RPC not available, skipping validation`)
      }
    } catch (err) {
      // Expected - we can't run DDL through the client
    }
  }

  console.log('\n✅ Migration file ready.')
  console.log('\n📋 To apply, run this SQL in Supabase Dashboard > SQL Editor:\n')
  console.log(`   https://${validUrl.replace('https://', '').split('.')[0]}.supabase.co/project/default/sql/new`)
  console.log('\n   Or copy from: supabase/migrations/20260102_create_content_queue.sql\n')
}

runMigration()
