'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Clock,
  FolderOpen,
  ChevronRight,
  Home,
  Users,
  DollarSign,
  Calendar,
} from 'lucide-react'
import { ContractViewer } from './ContractViewer'
import { AddendumWizardModal } from './AddendumWizardModal'
import { useAgentStore, useAddendumWizard } from '@/lib/stores/agent-store'
import type { Contract, ContractAmendment } from '@/lib/types/workspace'

interface ContextPanelProps {
  contract?: Contract | null
  className?: string
}

type TabId = 'overview' | 'contract' | 'timeline' | 'documents'

interface TabConfig {
  id: TabId
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'contract', label: 'Contract', icon: FileText },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'documents', label: 'Documents', icon: FolderOpen },
]

/**
 * ContextPanel - Side panel with tabs for deal context
 *
 * Tabs:
 * - Overview: Deal summary and key info
 * - Contract: Enhanced contract viewer with amendments
 * - Timeline: Transaction timeline
 * - Documents: Related documents
 */
export function ContextPanel({ contract, className = '' }: ContextPanelProps) {
  const { ui, setActiveTab } = useAgentStore()
  const { isOpen: isWizardOpen, close: closeWizard } = useAddendumWizard()

  const activeTab = ui.activeTab

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
    console.log('View amendment:', amendment.id)
    // Would open amendment review modal
  }

  // Handle wizard complete
  const handleWizardComplete = (data: Record<string, unknown>) => {
    console.log('Addendum created:', data)
    // Would submit to API and refresh contract
  }

  return (
    <div className={`flex flex-col h-full bg-[var(--bg-primary)] ${className}`}>
      {/* Tab navigation */}
      <div className="flex items-center gap-1 px-2 py-2 border-b border-[var(--border)] overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Property Card */}
            <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">
                    {contract?.keyTerms?.propertyAddress || '123 Main Street'}
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                    Single Family Home
                  </p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
                <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  Purchase Price
                </div>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {contract?.keyTerms?.purchasePrice
                    ? formatCurrency(contract.keyTerms.purchasePrice)
                    : '$485,000'}
                </p>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
                <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Closing Date
                </div>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {contract?.keyTerms?.closingDate
                    ? new Date(contract.keyTerms.closingDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Feb 15'}
                </p>
              </div>
            </div>

            {/* Parties */}
            <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-[var(--text-tertiary)]" />
                <h4 className="text-sm font-medium text-[var(--text-secondary)]">
                  Parties
                </h4>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-[var(--text-tertiary)]">Buyer</p>
                    <p className="text-sm text-[var(--text-primary)]">
                      {contract?.keyTerms?.buyerNames?.[0] || 'John & Jane Smith'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                </div>

                <div className="border-t border-[var(--border)] pt-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-[var(--text-tertiary)]">Seller</p>
                    <p className="text-sm text-[var(--text-primary)]">
                      {contract?.keyTerms?.sellerNames?.[0] || 'Robert Johnson'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('contract')}
                className="flex-1 py-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                View Contract
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className="flex-1 py-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                Documents
              </button>
            </div>
          </motion.div>
        )}

        {/* Contract Tab */}
        {activeTab === 'contract' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ContractViewer
              contract={contract || null}
              onAmendmentClick={handleAmendmentClick}
            />
          </motion.div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              Transaction Timeline
            </h3>

            {/* Placeholder timeline */}
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[var(--border)]" />

              {[
                { date: 'Jan 15', title: 'Offer Accepted', status: 'complete' },
                { date: 'Jan 18', title: 'Earnest Money Deposited', status: 'complete' },
                { date: 'Jan 25', title: 'Inspection Complete', status: 'complete' },
                { date: 'Feb 1', title: 'Appraisal Ordered', status: 'active' },
                { date: 'Feb 8', title: 'Final Walkthrough', status: 'pending' },
                { date: 'Feb 15', title: 'Closing', status: 'pending' },
              ].map((item, index) => (
                <div key={index} className="relative flex items-start gap-4 pb-4 last:pb-0">
                  <div
                    className={`relative z-10 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      item.status === 'complete'
                        ? 'bg-emerald-500 border-emerald-500'
                        : item.status === 'active'
                        ? 'bg-[var(--accent)] border-[var(--accent)]'
                        : 'bg-[var(--bg-secondary)] border-[var(--border)]'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              Documents
            </h3>

            {/* Placeholder documents */}
            <div className="space-y-2">
              {[
                { name: 'Purchase Agreement', type: 'contract', date: 'Jan 15' },
                { name: 'Inspection Report', type: 'inspection', date: 'Jan 25' },
                { name: 'Seller Disclosures', type: 'disclosure', date: 'Jan 16' },
                { name: 'Title Commitment', type: 'title', date: 'Jan 28' },
              ].map((doc, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors text-left"
                >
                  <FileText className="w-5 h-5 text-[var(--text-tertiary)]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">{doc.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Addendum Wizard Modal */}
      <AddendumWizardModal
        isOpen={isWizardOpen}
        onClose={closeWizard}
        onComplete={handleWizardComplete}
      />
    </div>
  )
}

export default ContextPanel
