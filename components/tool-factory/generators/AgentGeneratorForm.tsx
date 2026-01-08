'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToolFactoryStore } from '@/lib/stores/tool-factory-store'
import {
  AGENT_CATEGORIES,
  COMPLEXITY_LEVELS,
  AGENT_CATEGORY_LABELS,
  COMPLEXITY_LABELS,
  COMPLEXITY_DESCRIPTIONS,
} from '@/lib/tool-factory/types'

const AGENT_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  orchestration: 'Coordinates multiple agents or complex processes',
  quality: 'Code review, testing, security, best practices',
  research: 'Information gathering, analysis, fact-checking',
  automation: 'Repetitive tasks, batch processing, workflows',
  domain: 'Industry-specific expertise (legal, medical, etc.)',
}

export function AgentGeneratorForm() {
  const {
    description,
    setDescription,
    agentCategoryHint,
    setAgentCategoryHint,
    complexityHint,
    setComplexityHint,
    personaHint,
    setPersonaHint,
  } = useToolFactoryStore()

  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="space-y-4">
      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          What agent do you need?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., An agent that reviews code for security vulnerabilities, suggests fixes, and explains the reasoning behind each recommendation..."
          className="w-full px-4 py-3 border border-[var(--border)] rounded-xl
                     bg-[var(--bg-secondary)] text-[var(--text-primary)]
                     placeholder:text-[var(--text-tertiary)]
                     focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]
                     focus:border-transparent resize-none transition-all"
          rows={4}
        />
        <p className="mt-1 text-xs text-[var(--text-tertiary)]">
          {description.length}/1000 characters
        </p>
      </div>

      {/* Advanced Options Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-[var(--id8-orange)] hover:underline"
      >
        {showAdvanced ? 'Hide' : 'Show'} advanced options
      </button>

      {/* Advanced Options */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Category (optional)
              </label>
              <select
                value={agentCategoryHint || ''}
                onChange={(e) =>
                  setAgentCategoryHint(
                    e.target.value ? (e.target.value as typeof agentCategoryHint) : null
                  )
                }
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg
                           bg-[var(--bg-secondary)] text-[var(--text-primary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
              >
                <option value="">Auto-detect</option>
                {AGENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {AGENT_CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
              {agentCategoryHint && (
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  {AGENT_CATEGORY_DESCRIPTIONS[agentCategoryHint]}
                </p>
              )}
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Complexity (optional)
              </label>
              <select
                value={complexityHint || ''}
                onChange={(e) =>
                  setComplexityHint(
                    e.target.value ? (e.target.value as typeof complexityHint) : null
                  )
                }
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg
                           bg-[var(--bg-secondary)] text-[var(--text-primary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
              >
                <option value="">Auto-detect</option>
                {COMPLEXITY_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {COMPLEXITY_LABELS[level]}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                {complexityHint
                  ? COMPLEXITY_DESCRIPTIONS[complexityHint]
                  : 'Simple = focused, Complex = multi-capability, Multi-agent = coordinates others'}
              </p>
            </div>

            {/* Persona Hint */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Persona hint (optional)
              </label>
              <input
                type="text"
                value={personaHint || ''}
                onChange={(e) => setPersonaHint(e.target.value || null)}
                placeholder="e.g., Senior security engineer with 15+ years experience"
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg
                           bg-[var(--bg-secondary)] text-[var(--text-primary)]
                           placeholder:text-[var(--text-tertiary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
              />
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                Describe the expert personality this agent should embody
              </p>
            </div>

            {/* Tips */}
            <div className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <p className="text-xs text-[var(--text-secondary)]">
                <strong>Tips for great agents:</strong>
              </p>
              <ul className="mt-1 text-xs text-[var(--text-tertiary)] list-disc list-inside">
                <li>Give them a distinct personality and expertise</li>
                <li>Define specific capabilities they should have</li>
                <li>Consider how they might work with other agents</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
