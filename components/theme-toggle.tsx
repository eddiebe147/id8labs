'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-14 h-8 rounded-full bg-bg-secondary" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #252220 0%, #1A1614 100%)'
          : 'linear-gradient(135deg, #EAE3D2 0%, #F5F1E8 100%)',
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
        style={{
          background: isDark ? '#FF3C38' : '#FF6B35',
        }}
        animate={{
          x: isDark ? 28 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          {/* Moon Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-[#F5F1E8]"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -180 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          {/* Sun Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-[#2C2416]"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </motion.div>
      </motion.div>

      {/* VHS Style Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <motion.span
          className="text-[10px] font-mono uppercase tracking-wider"
          style={{ color: isDark ? '#B8AEA3' : '#2C2416' }}
          animate={{ opacity: isDark ? 0.3 : 0.6 }}
        >
          L
        </motion.span>
        <motion.span
          className="text-[10px] font-mono uppercase tracking-wider"
          style={{ color: isDark ? '#F5F1E8' : '#5C534A' }}
          animate={{ opacity: isDark ? 0.6 : 0.3 }}
        >
          D
        </motion.span>
      </div>
    </button>
  )
}
