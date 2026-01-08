'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useStackStore } from '@/lib/stores/stack-store'
import { StackBuilder } from './StackBuilder'

export function StackFloatingButton() {
  const [isOpen, setIsOpen] = useState(false)
  const items = useStackStore((state) => state.items)

  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-40 p-4 bg-[var(--id8-orange)] text-white rounded-full shadow-2xl hover:shadow-[var(--id8-orange)]/50 transition-shadow lg:hidden"
        aria-label="Open stack"
      >
        <ShoppingBag className="w-6 h-6" />
        {items.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
          >
            {items.length}
          </motion.span>
        )}
      </motion.button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleToggle}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Drawer */}
            <StackBuilder onClose={handleToggle} isMobile />
          </>
        )}
      </AnimatePresence>
    </>
  )
}
