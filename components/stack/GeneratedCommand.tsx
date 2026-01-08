'use client'

import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import type { Skill } from '@/lib/skill-types'

interface GeneratedCommandProps {
  items: Skill[]
}

export function GeneratedCommand({ items }: GeneratedCommandProps) {
  const [copied, setCopied] = useState(false)

  const generateBashScript = () => {
    if (items.length === 0) return ''

    const repoBase = 'https://raw.githubusercontent.com/eddiebe147/claude-settings/main/skills'
    
    const commands = items.map((skill) => {
      return `# ${skill.name}\ncurl -fsSL ${repoBase}/${skill.slug}/SKILL.md -o ~/.claude/skills/${skill.slug}.md`
    })

    return `#!/bin/bash
# StackShack Install - ${items.length} skill${items.length === 1 ? '' : 's'}
# Generated at ${new Date().toLocaleString()}

mkdir -p ~/.claude/skills

${commands.join('\n\n')}

echo "✓ Installed ${items.length} skill${items.length === 1 ? '' : 's'} to ~/.claude/skills/"
`
  }

  const handleCopy = async () => {
    const script = generateBashScript()
    try {
      await navigator.clipboard.writeText(script)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  if (items.length === 0) {
    return null
  }

  const script = generateBashScript()

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--text-secondary)]" />
          <h4 className="text-sm font-semibold">Installation Command</h4>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange-hover)]'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <pre className="p-4 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto">
          <code className="text-[var(--text-secondary)]">{script}</code>
        </pre>
      </div>

      <p className="text-xs text-[var(--text-tertiary)] italic">
        Copy and paste this script into your terminal to install all skills at once.
      </p>
    </div>
  )
}
