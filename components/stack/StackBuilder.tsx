'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useStackStore } from '@/lib/stores/stack-store'
import { StackItem } from './StackItem'
import { GeneratedCommand } from './GeneratedCommand'
import { StackManager } from './StackManager'

export function StackBuilder() {
  const { 
    items, 
    currentStackId,
    savedStacks,
    removeItem, 
    clearStack, 
    getSkillsOnly, 
    getAgentsOnly,
    getCommandsOnly,
    getSettingsOnly 
  } = useStackStore()
  const [isExpanded, setIsExpanded] = useState(true)

  const skills = getSkillsOnly()
  const agents = getAgentsOnly()
  const commands = getCommandsOnly()
  const settings = getSettingsOnly()
  
  const currentStack = savedStacks.find((s) => s.id === currentStackId)

  const isEmpty = items.length === 0

  // Don't show if empty
  if (isEmpty) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]"
    >
      <div className="bg-[var(--bg-primary)] border-2 border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
    >
        {/* Header - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--id8-orange)]/20 rounded-lg">
              <Package className="w-5 h-5 text-[var(--id8-orange)]" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-base">
                {currentStack?.name || 'Stack Builder'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                {items.length} {items.length === 1 ? 'item' : 'items'}
                {savedStacks.length > 0 && ` • ${savedStacks.length} saved`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEmpty && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  clearStack()
                }}
                className="p-2 hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-500 rounded-lg transition-colors"
                aria-label="Clear all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-[var(--text-secondary)]" />
            ) : (
              <ChevronUp className="w-5 h-5 text-[var(--text-secondary)]" />
            )}
          </div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-[var(--border)]"
            >
              <div className="max-h-[500px] overflow-y-auto p-4 space-y-4">
                {/* Skills Group */}
                {skills.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Skills ({skills.length})
                    </h4>
                    <AnimatePresence mode="popLayout">
                      {skills.map((skill) => (
                        <StackItem key={skill.id} skill={skill} onRemove={removeItem} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Agents Group */}
                {agents.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Agents ({agents.length})
                    </h4>
                    <AnimatePresence mode="popLayout">
                      {agents.map((agent) => (
                        <StackItem key={agent.id} skill={agent} onRemove={removeItem} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Commands Group */}
                {commands.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Commands ({commands.length})
                    </h4>
                    <AnimatePresence mode="popLayout">
                      {commands.map((command) => (
                        <StackItem key={command.id} skill={command} onRemove={removeItem} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Settings Group */}
                {settings.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Settings ({settings.length})
                    </h4>
                    <AnimatePresence mode="popLayout">
                      {settings.map((setting) => (
                        <StackItem key={setting.id} skill={setting} onRemove={removeItem} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Generated Command */}
                <div className="pt-4 border-t border-[var(--border)]">
                  <GeneratedCommand items={items} />
                </div>

                {/* Stack Manager */}
                <div className="pt-4 border-t border-[var(--border)]">
                  <StackManager />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
