// Quick test to check Supabase connection and count observations
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local
dotenv.config({ path: join(__dirname, '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔍 Testing Supabase Connection...\n')
console.log('URL:', supabaseUrl ? '✓ Found' : '✗ Missing')
console.log('Service Key:', supabaseKey ? '✓ Found' : '✗ Missing')

if (!supabaseUrl || !supabaseKey) {
  console.log('\n❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  try {
    // Try to fetch observations
    const { data, error } = await supabase
      .from('claude_observations')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.log('\n❌ Error fetching from database:')
      console.log(error.message)
      console.log('\nTable probably doesn\'t exist or migrations not run.')
      return
    }

    console.log(`\n✅ Connected! Found ${data.length} observations in database\n`)
    
    if (data.length > 0) {
      console.log('📊 Most recent 5 entries:')
      data.slice(0, 5).forEach((obs, i) => {
        console.log(`${i + 1}. [${obs.date}] ${obs.text.substring(0, 80)}...`)
      })
      
      console.log('\n📅 Date range:')
      console.log('Oldest:', data[data.length - 1]?.date)
      console.log('Newest:', data[0]?.date)
      
      console.log('\n📁 By category:')
      const counts = data.reduce((acc, obs) => {
        acc[obs.category] = (acc[obs.category] || 0) + 1
        return acc
      }, {})
      console.log(counts)
    }
  } catch (err) {
    console.log('\n❌ Unexpected error:')
    console.log(err)
  }
}

test()
