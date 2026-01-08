'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import type { StackItem } from '@/lib/stores/stack-store'

interface GeneratedCommandProps {
  items: StackItem[]
}

export function GeneratedCommand({ items }: GeneratedCommandProps) {
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<'bash' | 'cli'>('cli')
  // Defer timestamp to client-only to prevent hydration mismatch
  const [timestamp, setTimestamp] = useState<string>('')

  useEffect(() => {
    setTimestamp(new Date().toLocaleString())
  }, [])

  const generateCLICommands = () => {
    if (items.length === 0) return ''

    const commands = items.map((item) => {
      return `stackshack install ${item.slug}`
    })

    return `# StackShack CLI Installation
# Install the CLI: npm install -g stackshack
# Or use npx: npx stackshack install <slug>

${commands.join('\n')}

# That's it! All items will be installed to ~/.claude/
`
  }

  const generateBashScript = () => {
    if (items.length === 0) return ''

    const skills = items.filter(i => i.type === 'skill')
    const agents = items.filter(i => i.type === 'agent')
    const commands = items.filter(i => i.type === 'command')
    const settings = items.filter(i => i.type === 'setting')

    const repoBase = 'https://raw.githubusercontent.com/eddiebe147/claude-settings/main/skills'
    
    let scriptParts: string[] = []

    // Skills installation
    if (skills.length > 0) {
      const skillCommands = skills.map((skill) => {
        return `curl -fsSL ${repoBase}/${skill.slug}/SKILL.md -o ~/.claude/skills/${skill.slug}.md`
      })
      scriptParts.push(`# Install ${skills.length} skill${skills.length === 1 ? '' : 's'}
mkdir -p ~/.claude/skills
${skillCommands.join('\n')}`)
    }

    // Agents installation
    if (agents.length > 0) {
      const agentCommands = agents.map((agent) => {
        return `curl -fsSL ${repoBase}/${agent.slug}/SKILL.md -o ~/.claude/agents/${agent.slug}.md`
      })
      scriptParts.push(`# Install ${agents.length} agent${agents.length === 1 ? '' : 's'}
mkdir -p ~/.claude/agents
${agentCommands.join('\n')}`)
    }

    // Commands installation (via API)
    if (commands.length > 0) {
      scriptParts.push(`# Install ${commands.length} command${commands.length === 1 ? '' : 's'}
mkdir -p ~/.claude/commands
# Note: Commands require StackShack CLI for full installation
# Install CLI: npm install -g stackshack
${commands.map(c => `# stackshack install ${c.slug}`).join('\n')}`)
    }

    // Settings installation (via API)
    if (settings.length > 0) {
      scriptParts.push(`# Install ${settings.length} setting${settings.length === 1 ? '' : 's'}
mkdir -p ~/.claude/settings
# Note: Settings require StackShack CLI for full installation
# Install CLI: npm install -g stackshack
${settings.map(s => `# stackshack install ${s.slug}`).join('\n')}`)
    }

    return `#!/bin/bash
# StackShack Install Script
# Generated at ${timestamp || 'loading...'}
# Total items: ${items.length}

${scriptParts.join('\n\n')}

echo "✓ Installation complete!"
echo "Installed: ${skills.length} skills, ${agents.length} agents, ${commands.length} commands, ${settings.length} settings"
`
  }

  const handleCopy = async () => {
    const script = mode === 'cli' ? generateCLICommands() : generateBashScript()
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

  const script = mode === 'cli' ? generateCLICommands() : generateBashScript()

  // Check if we have commands or settings (require CLI)
  const hasCommandsOrSettings = items.some(i => i.type === 'command' || i.type === 'setting')

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--text-secondary)]" />
          <h4 className="text-sm font-semibold">Installation</h4>
        </div>
        <div className="flex items-center gap-2">
          {/* Mode Toggle */}
          <div className="flex items-center gap-1 p-0.5 bg-[var(--bg-secondary)] rounded-lg">
            <button
              onClick={() => setMode('cli')}
              className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                mode === 'cli'
                  ? 'bg-[var(--id8-orange)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              CLI
            </button>
            <button
              onClick={() => setMode('bash')}
              className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                mode === 'bash'
                  ? 'bg-[var(--id8-orange)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Bash
            </button>
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
      </div>

      <div className="relative">
        <pre className="p-4 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto">
          <code className="text-[var(--text-secondary)]">{script}</code>
        </pre>
      </div>

      {mode === 'cli' && (
        <p className="text-xs text-[var(--text-tertiary)] italic">
          Install the CLI with: <code className="text-[var(--id8-orange)]">npm install -g stackshack</code>
        </p>
      )}
      {mode === 'bash' && hasCommandsOrSettings && (
        <p className="text-xs text-[var(--text-tertiary)] italic">
          ⚠️ Commands and settings require the StackShack CLI for installation
        </p>
      )}
      {mode === 'bash' && !hasCommandsOrSettings && (
        <p className="text-xs text-[var(--text-tertiary)] italic">
          Copy and paste this script into your terminal to install all items
        </p>
      )}
    </div>
  )
}
