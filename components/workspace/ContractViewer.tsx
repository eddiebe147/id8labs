'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  ExternalLink,
  Calendar,
  Hash,
  Clock,
  AlertTriangle,
  Plus,
  ChevronRight,
  DollarSign,
  Wallet,
} from 'lucide-react'
import { AmendmentHistoryTimeline } from './AmendmentHistoryTimeline'
import { ContractReaderModal } from './ContractReaderModal'
import type { Contract, ContractAmendment } from '@/lib/types/workspace'
import { getVersionBadgeColor } from '@/lib/types/workspace'
import { useAgentStore, useContractReader, useAddendumWizard } from '@/lib/stores/agent-store'

interface ContractViewerProps {
  contract: Contract | null
  onAmendmentClick?: (amendment: ContractAmendment) => void
  className?: string
}

/**
 * ContractViewer - Enhanced contract display with preview, stats, and history
 *
 * Layout:
 * ┌─────────────────────────────────────────────────────┐
 * │ ┌─────────────────────────┐ ┌─────────────────────┐ │
 * │ │ Contract Preview        │ │ Stats Sidebar       │ │
 * │ │ [First 500 chars...]   │ │ • Version Badge     │ │
 * │ │ [Read Full Contract →] │ │ • Created Date      │ │
 * │ └─────────────────────────┘ └─────────────────────┘ │
 * │ ┌─────────────────────────────────────────────────┐ │
 * │ │ ⚠️ Pending Amendments (X awaiting approval)    │ │
 * │ └─────────────────────────────────────────────────┘ │
 * │ ┌─────────────────────────────────────────────────┐ │
 * │ │ 📜 Amendment History Timeline                   │ │
 * │ └─────────────────────────────────────────────────┘ │
 * └─────────────────────────────────────────────────────┘
 */
export function ContractViewer({
  contract,
  onAmendmentClick,
  className = '',
}: ContractViewerProps) {
  const { getVersionHistory, getPendingAmendments, openAmendmentReview } = useAgentStore()
  const { isOpen: isReaderOpen, open: openReader, close: closeReader } = useContractReader()
  const { open: openWizard } = useAddendumWizard()

  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)

  // Computed values
  const currentVersion = contract?.currentVersion
  const versionHistory = useMemo(() => contract ? getVersionHistory() : [], [contract, getVersionHistory])
  const pendingAmendments = useMemo(() => contract ? getPendingAmendments() : [], [contract, getPendingAmendments])
  const versionColors = currentVersion ? getVersionBadgeColor(currentVersion.versionType) : null

  // Get preview text (first 500 chars)
  const previewText = useMemo(() => {
    if (!currentVersion?.content) return ''
    const text = currentVersion.content
    if (text.length <= 500 || isPreviewExpanded) return text
    return text.slice(0, 500) + '...'
  }, [currentVersion?.content, isPreviewExpanded])

  // Format relative time
  const formatRelativeTime = (dateStr: string): string => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Handle amendment click
  const handleAmendmentClick = (amendment: ContractAmendment) => {
    if (onAmendmentClick) {
      onAmendmentClick(amendment)
    } else {
      openAmendmentReview(amendment.id)
    }
  }

  if (!contract) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
        <FileText className="w-12 h-12 text-[var(--text-tertiary)] mb-4" />
        <h3 className="text-lg font-medium text-[var(--text-secondary)] mb-2">
          No Contract Available
        </h3>
        <p className="text-sm text-[var(--text-tertiary)] max-w-sm">
          A purchase agreement will appear here once the deal is under contract.
        </p>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Section: Contract Preview + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Contract Preview - 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--text-secondary)]" />
              <h3 className="text-sm font-medium text-[var(--text-primary)]">
                Purchase Agreement
              </h3>
            </div>
            <button
              onClick={openReader}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Read Full Contract
            </button>
          </div>

          {/* Preview Content */}
          <div className="relative">
            <div className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap max-h-40 overflow-hidden">
              {previewText}
            </div>

            {/* Fade overlay for truncated content */}
            {currentVersion?.content && currentVersion.content.length > 500 && !isPreviewExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
            )}
          </div>

          {/* Expand/Collapse button */}
          {currentVersion?.content && currentVersion.content.length > 500 && (
            <button
              onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
              className="mt-2 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              {isPreviewExpanded ? 'Show less' : 'Show more preview...'}
            </button>
          )}
        </motion.div>

        {/* Stats Sidebar - 1 column */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4"
        >
          <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
            Contract Details
          </h3>

          <div className="space-y-4">
            {/* Version Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                <Hash className="w-3.5 h-3.5" />
                Version
              </div>
              {versionColors && (
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${versionColors.bg} ${versionColors.text} border ${versionColors.border}`}
                >
                  v{currentVersion?.version}
                </span>
              )}
            </div>

            {/* Created Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                <Calendar className="w-3.5 h-3.5" />
                Created
              </div>
              <span className="text-xs text-[var(--text-primary)]">
                {contract.createdAt && new Date(contract.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Total Versions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                <FileText className="w-3.5 h-3.5" />
                Total Versions
              </div>
              <span className="text-xs text-[var(--text-primary)]">
                {contract.versions?.length || 1}
              </span>
            </div>

            {/* Last Modified */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                <Clock className="w-3.5 h-3.5" />
                Last Modified
              </div>
              <span className="text-xs text-[var(--text-primary)]">
                {contract.updatedAt && formatRelativeTime(contract.updatedAt)}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--border)] pt-3">
              {/* Key Terms Summary */}
              {contract.keyTerms && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                      <DollarSign className="w-3.5 h-3.5" />
                      Price
                    </div>
                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      {formatCurrency(contract.keyTerms.purchasePrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                      <Wallet className="w-3.5 h-3.5" />
                      Earnest
                    </div>
                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      {formatCurrency(contract.keyTerms.earnestMoney)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pending Amendments Alert */}
      {pendingAmendments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400">
                {pendingAmendments.length} Pending Amendment{pendingAmendments.length !== 1 ? 's' : ''}
              </h4>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-0.5">
                Review and approve amendments to proceed with the transaction.
              </p>

              {/* List pending amendments */}
              <div className="mt-3 space-y-2">
                {pendingAmendments.slice(0, 3).map((amendment) => (
                  <button
                    key={amendment.id}
                    onClick={() => handleAmendmentClick(amendment)}
                    className="flex items-center justify-between w-full p-2 bg-white/50 dark:bg-black/20 rounded-lg hover:bg-white/80 dark:hover:bg-black/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[var(--text-primary)]">
                        {amendment.title}
                      </span>
                      <span className={`px-1.5 py-0.5 text-[10px] rounded ${
                        amendment.status === 'pending_signature'
                          ? 'bg-blue-500/20 text-blue-600'
                          : 'bg-amber-500/20 text-amber-600'
                      }`}>
                        {amendment.status === 'pending_signature' ? 'Awaiting Signature' : 'Needs Review'}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                  </button>
                ))}
                {pendingAmendments.length > 3 && (
                  <p className="text-xs text-amber-600/70 text-center">
                    +{pendingAmendments.length - 3} more
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Amendment History Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4"
      >
        <AmendmentHistoryTimeline
          entries={versionHistory}
          onViewDiff={(versionId) => {
            // Handle viewing diff for a specific version
            console.log('View diff for version:', versionId)
          }}
        />
      </motion.div>

      {/* Add Addendum Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={openWizard}
        className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--accent)] text-white rounded-xl font-medium hover:bg-[var(--accent)]/90 transition-colors"
      >
        <Plus className="w-4 h-4" />
        New Addendum
      </motion.button>

      {/* Contract Reader Modal */}
      <ContractReaderModal
        isOpen={isReaderOpen}
        onClose={closeReader}
        version={currentVersion || null}
        keyTerms={contract.keyTerms}
      />
    </div>
  )
}

export default ContractViewer
