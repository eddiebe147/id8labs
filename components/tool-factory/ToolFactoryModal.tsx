'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ToolFactory } from './ToolFactory'
import { useToolFactoryStore } from '@/lib/stores/tool-factory-store'
import type { ToolType } from '@/lib/tool-factory/types'

interface ToolFactoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSaved?: (toolId: string, toolType: ToolType) => void
  initialToolType?: ToolType
}

export function ToolFactoryModal({
  isOpen,
  onClose,
  onSaved,
  initialToolType = 'skill',
}: ToolFactoryModalProps) {
  const { reset, state, setToolType } = useToolFactoryStore()

  // Set initial tool type when modal opens
  useEffect(() => {
    if (isOpen && initialToolType) {
      setToolType(initialToolType)
    }
  }, [isOpen, initialToolType, setToolType])

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      // Don't close during generation or saving
      if (state === 'generating' || state === 'saving' || state === 'verifying') return
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, state])

  // Reset store when modal closes
  const handleClose = () => {
    reset()
    onClose()
  }

  // Handle saved callback
  const handleSaved = (toolId: string, toolType: ToolType) => {
    onSaved?.(toolId, toolType)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-[var(--bg-primary)] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)] flex-shrink-0">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                AI Tool Factory
              </h2>
              <button
                onClick={handleClose}
                disabled={state === 'generating' || state === 'saving' || state === 'verifying'}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <ToolFactory onClose={handleClose} onSaved={handleSaved} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
