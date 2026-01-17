'use client'

import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileEdit } from 'lucide-react'
import { VoiceAddendumWizard } from './VoiceAddendumWizard'
import { useAddendumWizard } from '@/lib/stores/agent-store'

interface AddendumWizardModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: (addendumData: Record<string, unknown>) => void
}

/**
 * AddendumWizardModal - Modal wrapper for the voice addendum wizard
 *
 * Features:
 * - Portal rendering for proper z-index stacking
 * - Escape key handling
 * - Scroll lock
 * - Animation on open/close
 */
export function AddendumWizardModal({
  isOpen,
  onClose,
  onComplete,
}: AddendumWizardModalProps) {
  const [mounted, setMounted] = useState(false)
  const { wizard, reset } = useAddendumWizard()

  // Handle close with reset - memoized for useEffect dependency
  const handleClose = useCallback(() => {
    reset()
    onClose()
  }, [reset, onClose])

  // Client-side mount for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      // Don't close during processing
      if (wizard.isProcessing) return
      if (e.key === 'Escape') handleClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, wizard.isProcessing, handleClose])

  // Handle completion
  const handleComplete = (addendumData: Record<string, unknown>) => {
    onComplete?.(addendumData)
    handleClose()
  }

  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ isolation: 'isolate' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="addendum-wizard-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-[var(--bg-primary)] rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center">
                  <FileEdit className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <h2
                  id="addendum-wizard-title"
                  className="text-base font-semibold text-[var(--text-primary)]"
                >
                  Create Addendum
                </h2>
              </div>
              <button
                onClick={handleClose}
                disabled={wizard.isProcessing}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            {/* Wizard content */}
            <div className="flex-1 overflow-hidden">
              <VoiceAddendumWizard
                onComplete={handleComplete}
                onCancel={handleClose}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

export default AddendumWizardModal
