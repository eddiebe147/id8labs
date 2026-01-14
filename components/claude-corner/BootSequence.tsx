'use client'

import { useState, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from '@/components/motion'

interface BootSequenceProps {
  onComplete: () => void
}

const ASCII_LOGO = ` ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
            ═══ C O R N E R  v2.1 ═══`

const BOOT_MESSAGES = [
  { text: '> Initializing partnership matrix...', delay: 0 },
  { text: '[OK]', delay: 400, isStatus: true },
  { text: '> Loading field observations...', delay: 600 },
  { text: '[OK]', delay: 1000, isStatus: true },
  { text: '> Connecting to stats feed...', delay: 1200 },
  { text: '[OK]', delay: 1600, isStatus: true },
  { text: '> Lab Assistant standing by...', delay: 1800 },
  { text: '[OK]', delay: 2200, isStatus: true },
  { text: '', delay: 2400 },
  { text: 'System ready.', delay: 2600, isHighlight: true },
]

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<'flicker' | 'logo' | 'boot' | 'fade'>('flicker')
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Ensure client-side only rendering for animations
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check for reduced motion preference
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches) {
      // Skip animation entirely
      onComplete()
    }
  }, [mounted, onComplete])

  // Phase transitions
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return

    const timers: NodeJS.Timeout[] = []

    // Flicker → Logo (500ms)
    timers.push(setTimeout(() => setPhase('logo'), 500))

    // Logo → Boot (1500ms)
    timers.push(setTimeout(() => setPhase('boot'), 1500))

    // Fade out and complete (4000ms)
    timers.push(setTimeout(() => setPhase('fade'), 4000))
    timers.push(setTimeout(() => onComplete(), 4500))

    return () => timers.forEach(clearTimeout)
  }, [mounted, onComplete, prefersReducedMotion])

  // Boot messages reveal
  useEffect(() => {
    if (phase !== 'boot' || prefersReducedMotion) return

    const timers: NodeJS.Timeout[] = []

    BOOT_MESSAGES.forEach((msg, index) => {
      timers.push(setTimeout(() => {
        setVisibleMessages(index + 1)
      }, msg.delay))
    })

    return () => timers.forEach(clearTimeout)
  }, [phase, prefersReducedMotion])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Skip on click/key
  const handleSkip = useCallback(() => {
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkip])

  // Show black screen placeholder until mounted to prevent hydration mismatch
  // Once mounted, the animation begins
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-black z-50" />
    )
  }

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion) return null

  return (
    <AnimatePresence>
      {phase !== 'fade' ? (
        <m.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={handleSkip}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* CRT Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.15),
                rgba(0, 0, 0, 0.15) 1px,
                transparent 1px,
                transparent 2px
              )`,
              zIndex: 10
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%)`,
              zIndex: 11
            }}
          />

          {/* Main Content */}
          <div className="relative z-20 font-mono text-center max-w-4xl px-4">

            {/* Flicker Phase */}
            <AnimatePresence mode="wait">
              {phase === 'flicker' && (
                <m.div
                  key="flicker"
                  className="text-[#27c93f]"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0.3, 1, 0.5, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    times: [0, 0.1, 0.2, 0.4, 0.6, 1]
                  }}
                >
                  <div className="text-2xl">▌</div>
                </m.div>
              )}

              {/* Logo Phase */}
              {phase === 'logo' && (
                <m.pre
                  key="logo"
                  className="text-[#ff6b35] text-[0.35rem] xs:text-[0.45rem] sm:text-[0.6rem] md:text-xs leading-none whitespace-pre"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {ASCII_LOGO}
                </m.pre>
              )}

              {/* Boot Phase */}
              {phase === 'boot' && (
                <m.div
                  key="boot"
                  className="text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Logo stays visible during boot */}
                  <pre className="text-[#ff6b35] text-[0.35rem] xs:text-[0.45rem] sm:text-[0.6rem] md:text-xs leading-none whitespace-pre mb-6 text-center">
                    {ASCII_LOGO}
                  </pre>

                  {/* Boot messages */}
                  <div className="space-y-1 text-xs sm:text-sm">
                    {BOOT_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        className={`
                          ${msg.isStatus ? 'text-[#27c93f] inline ml-2' : ''}
                          ${msg.isHighlight ? 'text-[#27c93f] mt-4' : 'text-[#808080]'}
                        `}
                      >
                        {msg.isStatus ? (
                          <span className="text-[#27c93f]">{msg.text}</span>
                        ) : (
                          msg.text
                        )}
                      </m.div>
                    ))}

                    {/* Cursor */}
                    {visibleMessages >= BOOT_MESSAGES.length && (
                      <div className="mt-2 text-[#27c93f]">
                        {'> '}
                        <span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>▌</span>
                      </div>
                    )}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip hint */}
          <m.div
            className="absolute bottom-8 left-0 right-0 text-center text-[#404040] text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Press any key or click to skip
          </m.div>

          {/* Phosphor glow effect */}
          <div
            className="absolute inset-0 pointer-events-none animate-pulse"
            style={{
              background: `radial-gradient(ellipse at center, rgba(39, 201, 63, 0.03) 0%, transparent 60%)`,
              zIndex: 5
            }}
          />
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}
