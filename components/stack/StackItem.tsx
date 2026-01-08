'use client'

import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Skill } from '@/lib/skill-types'

interface StackItemProps {
  skill: Skill
  onRemove: (skillId: string) => void
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
}

export function StackItem({ skill, onRemove }: StackItemProps) {
  const emoji = CATEGORY_EMOJI[skill.category_id || 'meta'] || '⚙️'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="group flex items-center gap-3 p-3 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border)] hover:border-[var(--id8-orange)]/50 transition-all"
    >
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{skill.name}</h4>
        <p className="text-xs text-[var(--text-secondary)] truncate">
          {skill.category_id}
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
