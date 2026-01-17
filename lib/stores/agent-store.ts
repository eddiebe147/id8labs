'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Contract,
  ContractVersion,
  ContractAmendment,
  AddendumWizardState,
  AddendumType,
  VersionHistoryEntry,
  AmendmentStatus,
} from '@/lib/types/workspace'

// UI State
interface UIState {
  isContractReaderOpen: boolean
  isAddendumWizardOpen: boolean
  isAmendmentReviewOpen: boolean
  selectedAmendmentId: string | null
  selectedVersionId: string | null
  activeTab: 'overview' | 'contract' | 'timeline' | 'documents'
}

// Agent Store State
interface AgentState {
  // Contract Data
  currentContract: Contract | null

  // UI State
  ui: UIState

  // Addendum Wizard State
  wizard: AddendumWizardState

  // Actions - Contract
  setContract: (contract: Contract | null) => void
  updateContractVersion: (version: ContractVersion) => void
  addAmendment: (amendment: ContractAmendment) => void
  updateAmendmentStatus: (amendmentId: string, status: AmendmentStatus) => void

  // Actions - UI
  openContractReader: () => void
  closeContractReader: () => void
  openAddendumWizard: () => void
  closeAddendumWizard: () => void
  openAmendmentReview: (amendmentId: string) => void
  closeAmendmentReview: () => void
  selectVersion: (versionId: string | null) => void
  setActiveTab: (tab: UIState['activeTab']) => void

  // Actions - Wizard
  setWizardStep: (step: AddendumWizardState['step']) => void
  setWizardType: (type: AddendumType | null) => void
  setWizardDetails: (details: Record<string, string | number | boolean>) => void
  updateWizardDetail: (key: string, value: string | number | boolean) => void
  setWizardContent: (content: string | null) => void
  setWizardProcessing: (isProcessing: boolean) => void
  setWizardError: (error: string | null) => void
  resetWizard: () => void

  // Computed / Helpers
  getVersionHistory: () => VersionHistoryEntry[]
  getPendingAmendments: () => ContractAmendment[]
  getCurrentVersion: () => ContractVersion | null
}

// Initial wizard state
const initialWizardState: AddendumWizardState = {
  step: 'type_selection',
  selectedType: null,
  details: {},
  generatedContent: null,
  isProcessing: false,
  error: null,
}

// Initial UI state
const initialUIState: UIState = {
  isContractReaderOpen: false,
  isAddendumWizardOpen: false,
  isAmendmentReviewOpen: false,
  selectedAmendmentId: null,
  selectedVersionId: null,
  activeTab: 'overview',
}

export const useAgentStore = create<AgentState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentContract: null,
      ui: initialUIState,
      wizard: initialWizardState,

      // Contract Actions
      setContract: (contract) => set({ currentContract: contract }),

      updateContractVersion: (version) =>
        set((state) => {
          if (!state.currentContract) return state
          return {
            currentContract: {
              ...state.currentContract,
              currentVersion: version,
              versions: [...state.currentContract.versions, version],
              updatedAt: new Date().toISOString(),
            },
          }
        }),

      addAmendment: (amendment) =>
        set((state) => {
          if (!state.currentContract) return state
          return {
            currentContract: {
              ...state.currentContract,
              amendments: [...state.currentContract.amendments, amendment],
              updatedAt: new Date().toISOString(),
            },
          }
        }),

      updateAmendmentStatus: (amendmentId, status) =>
        set((state) => {
          if (!state.currentContract) return state
          return {
            currentContract: {
              ...state.currentContract,
              amendments: state.currentContract.amendments.map((a) =>
                a.id === amendmentId ? { ...a, status } : a
              ),
              updatedAt: new Date().toISOString(),
            },
          }
        }),

      // UI Actions
      openContractReader: () =>
        set((state) => ({
          ui: { ...state.ui, isContractReaderOpen: true },
        })),

      closeContractReader: () =>
        set((state) => ({
          ui: { ...state.ui, isContractReaderOpen: false },
        })),

      openAddendumWizard: () =>
        set((state) => ({
          ui: { ...state.ui, isAddendumWizardOpen: true },
          wizard: initialWizardState, // Reset wizard on open
        })),

      closeAddendumWizard: () =>
        set((state) => ({
          ui: { ...state.ui, isAddendumWizardOpen: false },
        })),

      openAmendmentReview: (amendmentId) =>
        set((state) => ({
          ui: {
            ...state.ui,
            isAmendmentReviewOpen: true,
            selectedAmendmentId: amendmentId,
          },
        })),

      closeAmendmentReview: () =>
        set((state) => ({
          ui: {
            ...state.ui,
            isAmendmentReviewOpen: false,
            selectedAmendmentId: null,
          },
        })),

      selectVersion: (versionId) =>
        set((state) => ({
          ui: { ...state.ui, selectedVersionId: versionId },
        })),

      setActiveTab: (tab) =>
        set((state) => ({
          ui: { ...state.ui, activeTab: tab },
        })),

      // Wizard Actions
      setWizardStep: (step) =>
        set((state) => ({
          wizard: { ...state.wizard, step, error: null },
        })),

      setWizardType: (type) =>
        set((state) => ({
          wizard: {
            ...state.wizard,
            selectedType: type,
            details: {}, // Reset details when type changes
            error: null,
          },
        })),

      setWizardDetails: (details) =>
        set((state) => ({
          wizard: { ...state.wizard, details },
        })),

      updateWizardDetail: (key, value) =>
        set((state) => ({
          wizard: {
            ...state.wizard,
            details: { ...state.wizard.details, [key]: value },
          },
        })),

      setWizardContent: (content) =>
        set((state) => ({
          wizard: { ...state.wizard, generatedContent: content },
        })),

      setWizardProcessing: (isProcessing) =>
        set((state) => ({
          wizard: { ...state.wizard, isProcessing },
        })),

      setWizardError: (error) =>
        set((state) => ({
          wizard: { ...state.wizard, error, isProcessing: false },
        })),

      resetWizard: () =>
        set((state) => ({
          wizard: initialWizardState,
        })),

      // Computed Helpers
      getVersionHistory: () => {
        const contract = get().currentContract
        if (!contract) return []

        return contract.versions
          .map((v): VersionHistoryEntry => ({
            id: v.id,
            version: v.version,
            versionType: v.versionType,
            title: v.summary || `Version ${v.version}`,
            summary: v.summary,
            createdAt: v.createdAt,
            createdByName: v.createdBy.name,
            amendmentId: contract.amendments.find(
              (a) => a.resultingVersionId === v.id
            )?.id,
            isCurrentVersion: v.id === contract.currentVersion.id,
          }))
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
      },

      getPendingAmendments: () => {
        const contract = get().currentContract
        if (!contract) return []

        return contract.amendments.filter(
          (a) =>
            a.status === 'pending_review' ||
            a.status === 'pending_signature' ||
            a.status === 'draft'
        )
      },

      getCurrentVersion: () => {
        return get().currentContract?.currentVersion || null
      },
    }),
    {
      name: 'agent-workspace',
      version: 1,
      partialize: (state) => ({
        // Only persist UI preferences, not contract data (that comes from API)
        ui: {
          activeTab: state.ui.activeTab,
        },
      }),
    }
  )
)

// Selector hooks for performance
export const useContractReader = () =>
  useAgentStore((state) => ({
    isOpen: state.ui.isContractReaderOpen,
    open: state.openContractReader,
    close: state.closeContractReader,
  }))

export const useAddendumWizard = () =>
  useAgentStore((state) => ({
    isOpen: state.ui.isAddendumWizardOpen,
    open: state.openAddendumWizard,
    close: state.closeAddendumWizard,
    wizard: state.wizard,
    setStep: state.setWizardStep,
    setType: state.setWizardType,
    setDetails: state.setWizardDetails,
    updateDetail: state.updateWizardDetail,
    setContent: state.setWizardContent,
    setProcessing: state.setWizardProcessing,
    setError: state.setWizardError,
    reset: state.resetWizard,
  }))

export const useAmendmentReview = () =>
  useAgentStore((state) => ({
    isOpen: state.ui.isAmendmentReviewOpen,
    selectedId: state.ui.selectedAmendmentId,
    open: state.openAmendmentReview,
    close: state.closeAmendmentReview,
  }))
