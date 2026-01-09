'use client'

import { useState } from 'react'
import { Copy, Check, Plus, CheckCircle, Puzzle } from 'lucide-react'
import type { Plugin } from '@/lib/plugin-types'
import { useStackStore } from '@/lib/stores/stack-store'

interface PluginInstallButtonProps {
  plugin: Plugin
}

export function PluginInstallButton({ plugin }: PluginInstallButtonProps) {
  const [copied, setCopied] = useState(false)
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(plugin.id)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plugin.install_command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)

      // Track install via API
      fetch('/api/plugins/track-install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pluginId: plugin.id }),
      }).catch(() => {
        // Silently fail
      })
    } catch {
      // Clipboard failed
    }
  }

  const handleStackToggle = () => {
    if (inStack) {
      removeItem(plugin.id)
    } else {
      addItem({
        id: plugin.id,
        slug: plugin.slug,
        name: plugin.name,
        description: plugin.description,
        type: 'plugin',
        category: plugin.category,
        tags: plugin.tags,
      })
    }
  }

  return (
    <div className="space-y-3">
      {/* Copy Install Command */}
      <button
        onClick={handleCopy}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
          plugin.official
            ? 'bg-amber-500 hover:bg-amber-600 text-white'
            : 'bg-[var(--id8-orange)] hover:bg-[var(--id8-orange-hover)] text-white'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            Copied to Clipboard!
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            Copy Install Command
          </>
        )}
      </button>

      {/* Install command preview */}
      <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
        <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-1">
          <Puzzle className="w-3 h-3" />
          <span>Install Command</span>
        </div>
        <code className="text-sm font-mono text-[var(--text-secondary)] break-all">
          {plugin.install_command}
        </code>
      </div>

      {/* Add to Stack */}
      <button
        onClick={handleStackToggle}
        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium transition-all border ${
          inStack
            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500'
            : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--id8-orange)] hover:text-[var(--id8-orange)]'
        }`}
      >
        {inStack ? (
          <>
            <CheckCircle className="w-4 h-4" />
            In Your Stack
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add to Stack
          </>
        )}
      </button>
    </div>
  )
}
