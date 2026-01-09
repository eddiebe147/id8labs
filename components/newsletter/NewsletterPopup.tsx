'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence } from '@/components/motion'
import NewsletterSubscribe from './NewsletterSubscribe'

interface NewsletterPopupProps {
  /** Delay before showing popup (ms) */
  delay?: number
  /** Show on exit intent */
  exitIntent?: boolean
  /** Trigger type */
  trigger?: 'delay' | 'scroll' | 'exit' | 'manual'
  /** Scroll percentage to trigger (0-100) */
  scrollThreshold?: number
  /** Whether popup is open (for manual control) */
  isOpen?: boolean
  /** Callback when popup closes */
  onClose?: () => void
  /** Storage key for "don't show again" */
  storageKey?: string
}

export default function NewsletterPopup({
  delay = 5000,
  exitIntent = false,
  trigger = 'delay',
  scrollThreshold = 50,
  isOpen: controlledIsOpen,
  onClose,
  storageKey = 'newsletter_popup_dismissed',
}: NewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  const isControlled = controlledIsOpen !== undefined
  const showPopup = isControlled ? controlledIsOpen : isOpen

  useEffect(() => {
    // Check if user has already dismissed
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem(storageKey)
      if (dismissed) return
    }

    if (trigger === 'delay' && !hasTriggered) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasTriggered(true)
      }, delay)
      return () => clearTimeout(timer)
    }

    if (trigger === 'scroll' && !hasTriggered) {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        if (scrollPercent >= scrollThreshold) {
          setIsOpen(true)
          setHasTriggered(true)
        }
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }

    if (trigger === 'exit' && !hasTriggered) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsOpen(true)
          setHasTriggered(true)
        }
      }
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [trigger, delay, scrollThreshold, hasTriggered, storageKey])

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, 'true')
    }
    handleClose()
  }

  const handleSuccess = () => {
    // Auto-close after success
    setTimeout(() => {
      handleDismiss()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden">
              {/* Header */}
              <div className="relative p-6 pb-4 bg-gradient-to-br from-[var(--id8-orange)]/10 to-transparent">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label="Close popup"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--id8-orange)]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-[var(--id8-orange)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    Stay in the loop
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-2">
                <NewsletterSubscribe
                  variant="inline"
                  source="popup"
                  title=""
                  description="Get weekly insights on AI, automation, and building the future delivered to your inbox."
                  buttonText="Subscribe"
                  showPrivacyNote={true}
                  onSuccess={handleSuccess}
                />
              </div>

              {/* Footer */}
              <div className="px-6 pb-4">
                <button
                  onClick={handleDismiss}
                  className="w-full text-center text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                >
                  No thanks, don't show this again
                </button>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
