/**
 * Workspace Types - Contract, Amendment, and Deal Management
 *
 * These types support the Contract Tab enhancement with version tracking,
 * amendment history, and voice addendum workflows.
 */

// Version Types
export type VersionType = 'major' | 'minor' | 'patch'
export type AmendmentStatus = 'draft' | 'pending_review' | 'pending_signature' | 'executed' | 'rejected'
export type AddendumType =
  | 'closing_extension'
  | 'inspection_extension'
  | 'financing_extension'
  | 'price_reduction'
  | 'price_increase'
  | 'repair_request'
  | 'repair_credit'
  | 'earnest_money_change'
  | 'contingency_removal'
  | 'contingency_addition'
  | 'closing_cost_credit'
  | 'home_warranty'
  | 'personal_property'
  | 'other'

// Contract Version - represents a specific point-in-time snapshot
export interface ContractVersion {
  id: string
  contractId: string
  version: string // semver format: "1.0.0", "1.1.0", "2.0.0"
  versionType: VersionType
  content: string // The actual contract text/content
  summary: string // Brief description of what changed
  createdAt: string // ISO date
  createdBy: {
    id: string
    name: string
    role: 'buyer' | 'seller' | 'buyer_agent' | 'seller_agent' | 'escrow' | 'attorney'
  }
  previousVersionId: string | null
  signatures: ContractSignature[]
  isExecuted: boolean
}

// Contract Signature
export interface ContractSignature {
  id: string
  signerId: string
  signerName: string
  signerRole: 'buyer' | 'seller' | 'buyer_agent' | 'seller_agent' | 'escrow' | 'attorney'
  signedAt: string | null
  status: 'pending' | 'signed' | 'declined'
  docusignEnvelopeId?: string
}

// Contract Amendment - a proposed change that creates a new version when executed
export interface ContractAmendment {
  id: string
  contractId: string
  type: AddendumType
  title: string
  description: string
  proposedChanges: AmendmentChange[]
  status: AmendmentStatus
  createdAt: string
  createdBy: {
    id: string
    name: string
    role: string
  }
  reviewedAt?: string
  reviewedBy?: {
    id: string
    name: string
    role: string
  }
  executedAt?: string
  resultingVersionId?: string // The new ContractVersion ID if executed
  docusignEnvelopeId?: string
}

// Individual change within an amendment
export interface AmendmentChange {
  field: string
  fieldLabel: string
  oldValue: string | number | null
  newValue: string | number | null
  reason?: string
}

// Version History Entry - for timeline display
export interface VersionHistoryEntry {
  id: string
  version: string
  versionType: VersionType
  title: string
  summary: string
  createdAt: string
  createdByName: string
  amendmentId?: string // If this version was created from an amendment
  isCurrentVersion: boolean
}

// Key Terms extracted from contract
export interface KeyTerms {
  purchasePrice: number
  closingDate: string
  inspectionDeadline?: string
  financingDeadline?: string
  earnestMoney: number
  propertyAddress: string
  buyerNames: string[]
  sellerNames: string[]
}

// Full Contract with all versions
export interface Contract {
  id: string
  dealId: string
  currentVersion: ContractVersion
  versions: ContractVersion[]
  amendments: ContractAmendment[]
  keyTerms: KeyTerms
  createdAt: string
  updatedAt: string
}

// Voice Addendum Wizard State
export interface AddendumWizardState {
  step: 'type_selection' | 'details' | 'review' | 'confirm'
  selectedType: AddendumType | null
  details: Record<string, string | number | boolean>
  generatedContent: string | null
  isProcessing: boolean
  error: string | null
}

// Addendum Type Metadata for UI
export interface AddendumTypeInfo {
  type: AddendumType
  label: string
  description: string
  icon: string // Lucide icon name
  requiredFields: AddendumField[]
  commonlyUsed: boolean
}

export interface AddendumField {
  key: string
  label: string
  type: 'text' | 'number' | 'date' | 'textarea' | 'currency'
  placeholder?: string
  required: boolean
  voicePrompt: string // What to ask when using voice input
}

// Addendum Type Definitions with required fields
export const ADDENDUM_TYPES: AddendumTypeInfo[] = [
  {
    type: 'closing_extension',
    label: 'Closing Extension',
    description: 'Extend the closing date',
    icon: 'Calendar',
    commonlyUsed: true,
    requiredFields: [
      { key: 'newClosingDate', label: 'New Closing Date', type: 'date', required: true, voicePrompt: 'What is the new closing date?' },
      { key: 'reason', label: 'Reason', type: 'textarea', required: false, voicePrompt: 'What is the reason for the extension?' }
    ]
  },
  {
    type: 'inspection_extension',
    label: 'Inspection Extension',
    description: 'Extend the inspection deadline',
    icon: 'Search',
    commonlyUsed: true,
    requiredFields: [
      { key: 'newInspectionDate', label: 'New Inspection Deadline', type: 'date', required: true, voicePrompt: 'What is the new inspection deadline?' },
      { key: 'reason', label: 'Reason', type: 'textarea', required: false, voicePrompt: 'What is the reason for the extension?' }
    ]
  },
  {
    type: 'financing_extension',
    label: 'Financing Extension',
    description: 'Extend the financing deadline',
    icon: 'Landmark',
    commonlyUsed: true,
    requiredFields: [
      { key: 'newFinancingDate', label: 'New Financing Deadline', type: 'date', required: true, voicePrompt: 'What is the new financing deadline?' },
      { key: 'reason', label: 'Reason', type: 'textarea', required: false, voicePrompt: 'What is the reason for the extension?' }
    ]
  },
  {
    type: 'price_reduction',
    label: 'Price Reduction',
    description: 'Reduce the purchase price',
    icon: 'TrendingDown',
    commonlyUsed: true,
    requiredFields: [
      { key: 'newPrice', label: 'New Purchase Price', type: 'currency', required: true, voicePrompt: 'What is the new purchase price?' },
      { key: 'reason', label: 'Reason', type: 'textarea', required: false, voicePrompt: 'What is the reason for the price reduction?' }
    ]
  },
  {
    type: 'price_increase',
    label: 'Price Increase',
    description: 'Increase the purchase price',
    icon: 'TrendingUp',
    commonlyUsed: false,
    requiredFields: [
      { key: 'newPrice', label: 'New Purchase Price', type: 'currency', required: true, voicePrompt: 'What is the new purchase price?' },
      { key: 'reason', label: 'Reason', type: 'textarea', required: false, voicePrompt: 'What is the reason for the price increase?' }
    ]
  },
  {
    type: 'repair_request',
    label: 'Repair Request',
    description: 'Request repairs from seller',
    icon: 'Wrench',
    commonlyUsed: true,
    requiredFields: [
      { key: 'repairs', label: 'Repairs Requested', type: 'textarea', required: true, voicePrompt: 'What repairs are you requesting?' },
      { key: 'deadline', label: 'Completion Deadline', type: 'date', required: false, voicePrompt: 'When should repairs be completed?' }
    ]
  },
  {
    type: 'repair_credit',
    label: 'Repair Credit',
    description: 'Credit in lieu of repairs',
    icon: 'DollarSign',
    commonlyUsed: true,
    requiredFields: [
      { key: 'creditAmount', label: 'Credit Amount', type: 'currency', required: true, voicePrompt: 'What is the credit amount?' },
      { key: 'reason', label: 'Credit For', type: 'textarea', required: true, voicePrompt: 'What is this credit for?' }
    ]
  },
  {
    type: 'earnest_money_change',
    label: 'Earnest Money Change',
    description: 'Modify earnest money deposit',
    icon: 'Wallet',
    commonlyUsed: false,
    requiredFields: [
      { key: 'newAmount', label: 'New Earnest Money Amount', type: 'currency', required: true, voicePrompt: 'What is the new earnest money amount?' },
      { key: 'dueDate', label: 'Due Date', type: 'date', required: false, voicePrompt: 'When is it due?' }
    ]
  },
  {
    type: 'contingency_removal',
    label: 'Contingency Removal',
    description: 'Remove a contingency',
    icon: 'CheckCircle',
    commonlyUsed: true,
    requiredFields: [
      { key: 'contingencyType', label: 'Contingency to Remove', type: 'text', required: true, voicePrompt: 'Which contingency are you removing?' }
    ]
  },
  {
    type: 'contingency_addition',
    label: 'Contingency Addition',
    description: 'Add a new contingency',
    icon: 'PlusCircle',
    commonlyUsed: false,
    requiredFields: [
      { key: 'contingencyType', label: 'Contingency Type', type: 'text', required: true, voicePrompt: 'What type of contingency are you adding?' },
      { key: 'contingencyTerms', label: 'Terms', type: 'textarea', required: true, voicePrompt: 'What are the contingency terms?' },
      { key: 'deadline', label: 'Deadline', type: 'date', required: false, voicePrompt: 'What is the deadline for this contingency?' }
    ]
  },
  {
    type: 'closing_cost_credit',
    label: 'Closing Cost Credit',
    description: 'Seller credit toward closing costs',
    icon: 'Receipt',
    commonlyUsed: true,
    requiredFields: [
      { key: 'creditAmount', label: 'Credit Amount', type: 'currency', required: true, voicePrompt: 'What is the closing cost credit amount?' }
    ]
  },
  {
    type: 'home_warranty',
    label: 'Home Warranty',
    description: 'Add or modify home warranty',
    icon: 'Shield',
    commonlyUsed: false,
    requiredFields: [
      { key: 'warrantyAmount', label: 'Warranty Value', type: 'currency', required: true, voicePrompt: 'What is the home warranty value?' },
      { key: 'paidBy', label: 'Paid By', type: 'text', placeholder: 'Buyer or Seller', required: true, voicePrompt: 'Who is paying for the warranty, buyer or seller?' }
    ]
  },
  {
    type: 'personal_property',
    label: 'Personal Property',
    description: 'Include/exclude personal property',
    icon: 'Package',
    commonlyUsed: false,
    requiredFields: [
      { key: 'items', label: 'Items', type: 'textarea', required: true, voicePrompt: 'What personal property items are you adding or removing?' },
      { key: 'action', label: 'Action', type: 'text', placeholder: 'Include or Exclude', required: true, voicePrompt: 'Are these items being included or excluded?' }
    ]
  },
  {
    type: 'other',
    label: 'Other Amendment',
    description: 'Custom amendment',
    icon: 'FileEdit',
    commonlyUsed: false,
    requiredFields: [
      { key: 'title', label: 'Amendment Title', type: 'text', required: true, voicePrompt: 'What is the title of this amendment?' },
      { key: 'terms', label: 'Amendment Terms', type: 'textarea', required: true, voicePrompt: 'What are the terms of this amendment?' }
    ]
  }
]

// Helper to get commonly used addendum types (for quick access)
export function getCommonAddendumTypes(): AddendumTypeInfo[] {
  return ADDENDUM_TYPES.filter(t => t.commonlyUsed)
}

// Helper to get addendum type info by type
export function getAddendumTypeInfo(type: AddendumType): AddendumTypeInfo | undefined {
  return ADDENDUM_TYPES.find(t => t.type === type)
}

// Parse version string
export function parseVersion(version: string): { major: number; minor: number; patch: number } {
  const [major = 1, minor = 0, patch = 0] = version.split('.').map(Number)
  return { major, minor, patch }
}

// Increment version based on type
export function incrementVersion(currentVersion: string, type: VersionType): string {
  const { major, minor, patch } = parseVersion(currentVersion)
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
  }
}

// Get version badge color
export function getVersionBadgeColor(type: VersionType): { bg: string; text: string; border: string } {
  switch (type) {
    case 'major':
      return { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' }
    case 'minor':
      return { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' }
    case 'patch':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' }
  }
}
