'use client'

import { X, Terminal, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import type { StackItem as StackItemType } from '@/lib/stores/stack-store'

interface StackItemProps {
  skill: StackItemType
  onRemove: (itemId: string) => void
}

const CATEGORY_EMOJI: Record<string, string> = {
  documents: '📄',
  communication: '📬',
  research: '🔍',
  writing: '✍️',
  design: '🎨',
  code: '💻',
  project: '📋',
  business: '💼',
  domain: '🏢',
  personal: '👤',
  meta: '⚙️',
  git: '🔄',
  testing: '🧪',
  deployment: '🚀',
  setup: '⚡',
  quality: '✨',
  model: '🤖',
  permissions: '🔐',
  context: '📦',
  budget: '💰',
}

export function StackItem({ skill, onRemove }: StackItemProps) {
  // Get icon/emoji based on type and category
  const getDisplay = () => {
    if (skill.type === 'command') {
      return { icon: <Terminal className="w-5 h-5" />, fallback: '⚡' }
    }
    if (skill.type === 'setting') {
      return { icon: <Settings className="w-5 h-5" />, fallback: '⚙️' }
    }
    return { icon: null, fallback: CATEGORY_EMOJI[skill.category || 'meta'] || '⚙️' }
  }

  const display = getDisplay()
  const emoji = display.fallback

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="group flex items-center gap-3 p-3 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border)] hover:border-[var(--id8-orange)]/50 transition-all"
    >
      {display.icon ? (
        <div className="text-[var(--id8-orange)] flex-shrink-0">{display.icon}</div>
      ) : (
        <span className="text-2xl flex-shrink-0">{emoji}</span>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{skill.name}</h4>
        <p className="text-xs text-[var(--text-secondary)] truncate">
          {skill.category || skill.type}
        </p>
      </div>
      <button
        onClick={() => onRemove(skill.id)}
        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Remove from stack"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}
