'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from '@/components/motion'
import CRTMonitorPanel from './CRTMonitorPanel'
import IntroMessage from './IntroMessage'
import StatsPanel from './StatsPanel'
import FieldNotesPanel from './FieldNotesPanel'
import ChatPanel from './ChatPanel'

interface TerminalShellProps {
  userId: string
  userEmail?: string | null
}

// Staggered panel animation config - smooth fade-in without jarring effects
const panelVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.99
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1] // Smooth easing curve
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

export default function TerminalShell({ userId, userEmail }: TerminalShellProps) {
  const [isLive, setIsLive] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showPanels, setShowPanels] = useState(false) // Phase 2: other panels
  const [flickerPhase, setFlickerPhase] = useState(0)

  // CRT power-on flicker effect (only runs once on mount)
  useEffect(() => {
    // Simplified flicker sequence - shorter and less jarring
    const phases = [
      { delay: 100, phase: 1 },   // Initial dim glow
      { delay: 150, phase: 2 },   // Flicker up
      { delay: 100, phase: 3 },   // Brighter
      { delay: 100, phase: 4 },   // Full brightness
    ]

    let totalDelay = 0
    const timers: NodeJS.Timeout[] = []

    phases.forEach(({ delay, phase }) => {
      totalDelay += delay
      timers.push(setTimeout(() => setFlickerPhase(phase), totalDelay))
    })

    // Show intro content after flicker completes
    timers.push(setTimeout(() => setShowContent(true), totalDelay + 50))

    return () => timers.forEach(clearTimeout)
  }, [])

  // Called when Claude's intro boot sequence completes (typing finished)
  const handleBootComplete = useCallback(() => {
    // Store current scroll position
    const scrollY = window.scrollY

    setShowPanels(true)

    // Restore scroll position after panels render to prevent jump
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY)
    })
  }, [])

  // Map phase to opacity for CRT effect - smoother progression
  const flickerOpacity = [0, 0.4, 0.7, 0.9, 1][flickerPhase]

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle background glow - no global CRT overlay, effects are per-panel now */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 107, 53, 0.02) 0%, transparent 60%)',
        }}
      />

      {/* Terminal Container with initial power-on flicker only */}
      <m.div
        className="relative z-10 min-h-screen p-4 md:p-6 lg:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: flickerPhase === 4 ? 1 : flickerOpacity }}
        transition={{ duration: flickerPhase === 4 ? 0.3 : 0.08 }}
      >
        {/* Terminal Window */}
        <div className="max-w-7xl mx-auto">
          {/* Title Bar */}
          <div className="bg-[#2d2d2d] rounded-t-xl border border-[#3d3d3d] border-b-0 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Window Controls */}
              <div className="flex gap-2">
                <Link
                  href="/"
                  className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30] transition-colors"
                  title="Return to ID8Labs"
                />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* Title */}
              <span className="text-sm font-mono text-[#a0a0a0] hidden sm:inline">
                claude-corner — live terminal
              </span>
            </div>

            {/* Live Indicator with Claude Heartbeat */}
            <div className="flex items-center gap-3">
              {/* Claude's Heartbeat - EKG style */}
              <div className="flex items-center gap-1">
                <m.div
                  className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                    boxShadow: [
                      '0 0 0px rgba(255, 107, 53, 0)',
                      '0 0 12px rgba(255, 107, 53, 0.8)',
                      '0 0 0px rgba(255, 107, 53, 0)'
                    ]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <span className="text-[10px] font-mono text-[#ff6b35]/60 uppercase tracking-wider">
                  CLAUDE
                </span>
              </div>

              {/* Live/Cached Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-[#27c93f] animate-pulse' : 'bg-[#ffbd2e]'}`} />
                <span className="text-xs font-mono text-[#606060] uppercase tracking-wider">
                  {isLive ? 'LIVE' : 'CACHED'}
                </span>
              </div>
            </div>
          </div>

          {/* Terminal Content - Vertical stack of CRT monitors */}
          <div className="bg-[#1a1a1a] rounded-b-xl border border-[#3d3d3d] border-t-0 p-4 md:p-6" style={{ overflowAnchor: 'none' }}>
            {/* Phase 1: Intro Panel - Appears first, alone */}
            <AnimatePresence>
              {showContent && (
                <m.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                  className="space-y-4"
                >
                  {/* Intro Monitor - Orange glow */}
                  <CRTMonitorPanel title="claude_corner" glowColor="#ff6b35">
                    <div className="p-6 md:p-8">
                      <IntroMessage
                        userEmail={userEmail}
                        onBootComplete={handleBootComplete}
                      />
                    </div>
                  </CRTMonitorPanel>
                </m.div>
              )}
            </AnimatePresence>

            {/* Phase 2: Other Panels - Appear after intro animation completes */}
            <AnimatePresence>
              {showPanels && (
                <m.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 mt-4"
                >
                  {/* Stats Monitor - Orange glow */}
                  <m.div variants={panelVariants}>
                    <CRTMonitorPanel title="stats_console" glowColor="#ff6b35">
                      <div className="p-6 md:p-8">
                        <StatsPanel onLiveStatusChange={setIsLive} />
                      </div>
                    </CRTMonitorPanel>
                  </m.div>

                  {/* Field Notes Monitor - Green glow */}
                  <m.div variants={panelVariants}>
                    <CRTMonitorPanel title="field_notes" glowColor="#27c93f">
                      <div className="p-6 md:p-8">
                        <FieldNotesPanel />
                      </div>
                    </CRTMonitorPanel>
                  </m.div>

                  {/* Lab Assistant Monitor - Amber glow */}
                  <m.div variants={panelVariants}>
                    <CRTMonitorPanel title="lab_assistant" glowColor="#f59e0b">
                      <div className="p-6 md:p-8">
                        <ChatPanel userId={userId} />
                      </div>
                    </CRTMonitorPanel>
                  </m.div>

                  {/* Footer */}
                  <m.div
                    variants={panelVariants}
                    className="pt-4 flex items-center justify-between text-xs font-mono text-[#404040]"
                  >
                    <span>ID8Labs × Claude Partnership</span>
                    <span>Since October 2025</span>
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </m.div>
    </div>
  )
}
