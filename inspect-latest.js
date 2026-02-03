// Inspect the latest observation to see full structure
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

async function inspect() {
  const { data } = await supabase
    .from('claude_observations')
    .select('*')
    .order('date', { ascending: false })
    .limit(3)

  console.log('📋 Latest 3 observations (full structure):\n')
  data.forEach((obs, i) => {
    console.log(`${i + 1}. ${'-'.repeat(70)}`)
    console.log(JSON.stringify(obs, null, 2))
    console.log()
  })
}

inspect()
