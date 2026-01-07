import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase credentials under NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fixSlop() {
    console.log('🧹 Starting data cleanup...')

    // DEBUG: List some skills to verify connection and data
    const { data: debugSkills } = await supabase.from('skills').select('slug, name').limit(5)
    console.log('🔍 Debug: First 5 skills:', debugSkills)

    // 1. Fix "slop" descriptions by searching CONTENT first
    console.log('\n🔍 Searching for skills with known bad content...')

    const badPatterns = [
        { pattern: '<example>', fix: 'market-intelligence' },
        { pattern: '**Agent Name:**', fix: 'chat-test-runner' },
        { pattern: '⚠️ RESTRICTED AGENT', fix: 'strategic-think-tank' },
    ]

    for (const { pattern } of badPatterns) {
        const { data: matches } = await supabase
            .from('skills')
            .select('id, slug, description, name')
            .ilike('description', `%${pattern}%`)

        if (matches && matches.length > 0) {
            for (const skill of matches) {
                console.log(`🎯 Found match for "${pattern}": ${skill.slug}`)

                let newDesc = skill.description;

                if (skill.description.includes('Context: User is developing')) {
                    newDesc = 'Context: User is developing a business strategy and needs comprehensive market data.\n\nProvides deep market analysis including competitor research, trend identification, and SWOT analysis.';
                } else if (skill.description.includes('Expert at optimizing')) {
                    newDesc = 'Expert at optimizing business workflows and operational efficiency. Can analyze processes and suggest improvements.';
                } else if (skill.description.includes('chat-test-runner')) {
                    newDesc = 'Automated test runner for validating chat interactions and ensuring conversation flows meet quality standards.';
                } else if (skill.description.includes('RESTRICTED AGENT')) {
                    newDesc = 'High-level strategic planning advisor for complex business decisions and long-term roadmap development.';
                }

                // Clean up ANY lingering <example> tags if specific logic didn't catch it
                if (newDesc.includes('<example>')) {
                    newDesc = newDesc.split('<example>')[0].trim();
                }

                if (newDesc !== skill.description) {
                    const { error } = await supabase.from('skills').update({ description: newDesc }).eq('id', skill.id)
                    if (!error) console.log(`✅ Updated description for ${skill.slug}`)
                    else console.error(`❌ Failed to update ${skill.slug}:`, error)
                } else {
                    console.log(`⚠️ Match found but no specific replace logic hit for ${skill.slug}`)
                }
            }
        } else {
            console.log(`No matches found for pattern: "${pattern}"`)
        }
    }

    // 2. Fix trailing "/>"
    console.log('\nScanning for trailing "/>"...')
    const { data: trailingSkills } = await supabase
        .from('skills')
        .select('id, slug, description')
        .ilike('description', '%/>')

    if (trailingSkills?.length) {
        for (const skill of trailingSkills) {
            const newDesc = skill.description.replace(/\/>$/, '').trim()
            await supabase.from('skills').update({ description: newDesc }).eq('id', skill.id)
            console.log(`✅ Fixed trailing char in ${skill.slug}`)
        }
    } else {
        console.log('No trailing "/>" found.')
    }

    // 3. Fix Title Casing and Formatting
    console.log('\nStandardizing names to Title Case...')
    const { data: allSkills } = await supabase.from('skills').select('id, name')

    if (allSkills) {
        let fixedCount = 0
        for (const skill of allSkills) {
            const originalName = skill.name;

            // 1. Replace hyphens with spaces
            let newName = originalName.replace(/-/g, ' ');

            // 2. Title Case (capitalize first letter of each word)
            newName = newName.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });

            // 3. Special case fixes
            newName = newName
                .replace(/\bMcp\b/g, 'MCP')
                .replace(/\bAi\b/g, 'AI')
                .replace(/\bNextjs\b/gi, 'Next.js')
                .replace(/\bSupabase\b/gi, 'Supabase')
                .replace(/\bApi\b/g, 'API');

            if (newName !== originalName) {
                // console.log(`Renaming: "${originalName}" -> "${newName}"`)
                await supabase.from('skills').update({ name: newName }).eq('id', skill.id)
                fixedCount++
            }
        }
        console.log(`✅ Fixed names for ${fixedCount} skills`)
    }

    console.log('\n✨ Cleanup complete!')
}

fixSlop()
