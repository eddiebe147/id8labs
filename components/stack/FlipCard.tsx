'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface FlipCardProps {
  children: React.ReactNode
  isFlipped: boolean
  onFlipComplete?: () => void
}

export function FlipCard({ children, isFlipped, onFlipComplete }: FlipCardProps) {
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    if (isFlipped) {
      // Show back side during flip
      const timer = setTimeout(() => setShowBack(true), 300)
      return () => clearTimeout(timer)
    } else {
      setShowBack(false)
    }
  }, [isFlipped])

  return (
    <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 0.6,
        }}
        onAnimationComplete={() => {
          if (isFlipped && onFlipComplete) {
            onFlipComplete()
          }
        }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
        className="relative"
      >
        {/* Front Side */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className={isFlipped ? 'invisible' : ''}
        >
          {children}
        </div>

        {/* Back Side - Checkmark */}
        {showBack && (
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-2xl border-4 border-emerald-400"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
            >
              <CheckCircle className="w-20 h-20 text-white drop-shadow-lg" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white font-bold text-lg mt-4 drop-shadow-md"
            >
              Added to Stack!
            </motion.p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
