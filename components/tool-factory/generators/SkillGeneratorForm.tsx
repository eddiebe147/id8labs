'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToolFactoryStore } from '@/lib/stores/tool-factory-store'
import {
  SKILL_CATEGORIES,
  COMPLEXITY_LEVELS,
  SKILL_CATEGORY_LABELS,
  COMPLEXITY_LABELS,
  COMPLEXITY_DESCRIPTIONS,
} from '@/lib/tool-factory/types'

export function SkillGeneratorForm() {
  const {
    description,
    setDescription,
    skillCategoryHint,
    setSkillCategoryHint,
    complexityHint,
    setComplexityHint,
  } = useToolFactoryStore()

  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="space-y-4">
      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          What skill do you need?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A skill that helps me write cold outreach emails for SaaS founders, with personalization and follow-up sequences..."
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
                value={skillCategoryHint || ''}
                onChange={(e) =>
                  setSkillCategoryHint(
                    e.target.value ? (e.target.value as typeof skillCategoryHint) : null
                  )
                }
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg
                           bg-[var(--bg-secondary)] text-[var(--text-primary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
              >
                <option value="">Auto-detect</option>
                {SKILL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {SKILL_CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
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
                  : 'Simple = single task, Complex = multi-step, Multi-agent = orchestration'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
