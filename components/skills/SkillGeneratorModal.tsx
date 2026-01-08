'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { SkillGenerator } from './SkillGenerator'
import { useSkillGeneratorStore } from '@/lib/stores/skill-generator-store'

interface SkillGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  onSaved?: (skillId: string) => void
}

export function SkillGeneratorModal({
  isOpen,
  onClose,
  onSaved,
}: SkillGeneratorModalProps) {
  const { reset, state } = useSkillGeneratorStore()

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      // Don't close during generation
      if (state === 'generating' || state === 'saving') return
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

  // Handle saved callback and close
  const handleSaved = (skillId: string) => {
    onSaved?.(skillId)
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
            className="bg-[var(--bg-primary)] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)] flex-shrink-0">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Generate New Skill
              </h2>
              <button
                onClick={handleClose}
                disabled={state === 'generating' || state === 'saving'}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <SkillGenerator onClose={handleClose} onSaved={handleSaved} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
