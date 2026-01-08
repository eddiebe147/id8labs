'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Package, Trash2, X } from 'lucide-react'
import { useStackStore } from '@/lib/stores/stack-store'
import { StackItem } from './StackItem'
import { GeneratedCommand } from './GeneratedCommand'

interface StackBuilderProps {
  onClose?: () => void
  isMobile?: boolean
}

export function StackBuilder({ onClose, isMobile = false }: StackBuilderProps) {
  const { items, removeItem, clearStack, getSkillsOnly, getAgentsOnly } = useStackStore()

  const skills = getSkillsOnly()
  const agents = getAgentsOnly()

  const isEmpty = items.length === 0

  return (
    <motion.aside
      initial={isMobile ? { y: '100%' } : { x: '100%' }}
      animate={isMobile ? { y: 0 } : { x: 0 }}
      exit={isMobile ? { y: '100%' } : { x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className={`
        ${isMobile ? 'fixed inset-x-0 bottom-0 top-[10vh] rounded-t-2xl' : 'fixed top-0 right-0 h-screen w-full max-w-md'}
        bg-[var(--bg-primary)] border-l border-[var(--border)] shadow-2xl z-50 flex flex-col
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--border)] bg-gradient-to-r from-[var(--id8-orange)]/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--id8-orange)]/20 rounded-lg">
            <Package className="w-5 h-5 text-[var(--id8-orange)]" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Your Stack</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEmpty && (
            <button
              onClick={clearStack}
              className="p-2 hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-500 rounded-lg transition-colors"
              aria-label="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            {/* Skills Group */}
            {skills.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                    Skills ({skills.length})
                  </h4>
                </div>
                <AnimatePresence mode="popLayout">
                  {skills.map((skill) => (
                    <StackItem key={skill.id} skill={skill} onRemove={removeItem} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Agents Group */}
            {agents.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                    Agents ({agents.length})
                  </h4>
                </div>
                <AnimatePresence mode="popLayout">
                  {agents.map((agent) => (
                    <StackItem key={agent.id} skill={agent} onRemove={removeItem} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Generated Command */}
            <div className="pt-6 border-t border-[var(--border)]">
              <GeneratedCommand items={items} />
            </div>
          </>
        )}
      </div>
    </motion.aside>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mb-4">
        <Package className="w-10 h-10 text-[var(--text-tertiary)]" />
      </div>
      <h4 className="font-semibold text-lg mb-2">Your stack is empty</h4>
      <p className="text-sm text-[var(--text-secondary)] max-w-xs">
        Browse skills and click "Add to Stack" to build your installation command
      </p>
    </div>
  )
}
