'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  FileCheck,
  Sparkles,
  Settings,
  Bot,
  Loader2,
} from 'lucide-react'
import type { VerificationResult } from '@/lib/tool-factory/types'

interface VerificationPanelProps {
  result: VerificationResult | null
  isVerifying: boolean
  autoFixes?: Array<{ field: string; original: string; fixed: string }>
  onApplyFix?: (field: string, fixed: string) => void
}

export function VerificationPanel({
  result,
  isVerifying,
  autoFixes = [],
  onApplyFix,
}: VerificationPanelProps) {
  if (isVerifying) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl"
      >
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-[var(--id8-orange)] animate-spin" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            Verifying tool...
          </span>
        </div>
      </motion.div>
    )
  }

  if (!result) {
    return null
  }

  const { passed, score, checks } = result

  // Get badge color based on score
  const getBadgeColor = () => {
    if (score >= 90) return 'text-green-500 bg-green-500/10 border-green-500/30'
    if (score >= 70) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
    return 'text-red-500 bg-red-500/10 border-red-500/30'
  }

  // Get icon for check status
  const getCheckIcon = (check: { passed: boolean; issues: string[] }) => {
    if (check.passed) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    }
    if (check.issues.length > 2) {
      return <AlertCircle className="w-4 h-4 text-red-500" />
    }
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />
  }

  const checkItems = [
    {
      key: 'format',
      label: 'Format',
      icon: FileCheck,
      check: checks.format,
      description: 'Valid YAML structure and required fields',
    },
    {
      key: 'quality',
      label: 'Quality',
      icon: Sparkles,
      check: checks.quality,
      description: 'Content quality and completeness',
    },
    {
      key: 'typeSpecific',
      label: 'Type-Specific',
      icon: Settings,
      check: checks.typeSpecific,
      description: 'Tool type requirements met',
    },
    {
      key: 'aiReview',
      label: 'AI Review',
      icon: Bot,
      check: { passed: true, issues: [] }, // AI review is always "passed" for now
      description: 'AI-powered quality review',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl space-y-4"
    >
      {/* Header with Score Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {passed ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          )}
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {passed ? 'Verification Passed' : 'Verification Issues'}
          </span>
        </div>
        <span
          className={`px-3 py-1 text-sm font-bold rounded-full border ${getBadgeColor()}`}
        >
          {score}/100
        </span>
      </div>

      {/* Check Items */}
      <div className="space-y-2">
        {checkItems.map((item) => (
          <div key={item.key} className="space-y-1">
            <div className="flex items-center gap-2">
              {getCheckIcon(item.check)}
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {item.label}
              </span>
              <span className="text-xs text-[var(--text-tertiary)]">
                {item.description}
              </span>
            </div>

            {/* Issues list */}
            <AnimatePresence>
              {item.check.issues.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-6 space-y-1"
                >
                  {item.check.issues.map((issue, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-[var(--text-secondary)] flex items-start gap-1"
                    >
                      <span className="text-red-400">•</span>
                      {issue}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* AI Suggestions (if any) */}
      {checks.aiReview.suggestions.length > 0 && (
        <div className="pt-2 border-t border-[var(--border)]">
          <p className="text-xs font-medium text-[var(--text-tertiary)] mb-2">
            AI Suggestions
          </p>
          <ul className="space-y-1">
            {checks.aiReview.suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                className="text-xs text-[var(--text-secondary)] flex items-start gap-1"
              >
                <Sparkles className="w-3 h-3 text-[var(--id8-orange)] flex-shrink-0 mt-0.5" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Auto-Fix Suggestions */}
      {autoFixes.length > 0 && onApplyFix && (
        <div className="pt-2 border-t border-[var(--border)]">
          <p className="text-xs font-medium text-[var(--text-tertiary)] mb-2">
            Auto-Fix Available
          </p>
          <div className="space-y-2">
            {autoFixes.map((fix, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-[var(--bg-primary)] rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[var(--text-primary)]">
                    {fix.field}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] truncate">
                    {fix.original} → {fix.fixed}
                  </p>
                </div>
                <button
                  onClick={() => onApplyFix(fix.field, fix.fixed)}
                  className="px-2 py-1 text-xs font-medium text-[var(--id8-orange)]
                             border border-[var(--id8-orange)] rounded
                             hover:bg-[var(--id8-orange)]/10 transition-colors"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
