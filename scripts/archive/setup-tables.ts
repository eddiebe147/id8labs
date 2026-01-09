// Script to create missing tables using Supabase Admin API
// This uses the service role key which has full access
// Run with: npx tsx scripts/setup-tables.ts

import { createClient } from '@supabase/supabase-js'

// Load env vars from .env.local
import { config } from 'dotenv'
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\\n$/, '') || ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

console.log('Connecting to Supabase:', supabaseUrl)

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
})

async function checkTable(tableName: string): Promise<boolean> {
  const { error } = await supabase.from(tableName).select('*').limit(1)
  return !error
}

async function main() {
  console.log('\n=== Checking existing tables ===\n')

  const tables = ['profiles', 'customers', 'purchases', 'email_subscribers']

  for (const table of tables) {
    const exists = await checkTable(table)
    console.log(`${table}: ${exists ? '✓ exists' : '✗ missing'}`)
  }

  console.log('\n=== Manual Setup Required ===\n')
  console.log('Since the tables are missing, please run the schema manually:')
  console.log('')
  console.log('1. Open: https://supabase.com/dashboard/project/rlzacttzdhmzypgjccri/sql/new')
  console.log('')
  console.log('2. Copy and paste the contents of: lib/supabase/schema.sql')
  console.log('')
  console.log('3. Click "Run" to execute the SQL')
  console.log('')
  console.log('The schema will create:')
  console.log('  - profiles table (user info)')
  console.log('  - customers table (Stripe customer mapping)')
  console.log('  - purchases table (course purchases)')
  console.log('  - email_subscribers table (email capture)')
  console.log('  - has_purchased() function')
  console.log('  - Auto-create profile trigger')
}

main()
