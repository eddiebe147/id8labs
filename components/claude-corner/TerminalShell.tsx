'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from '@/components/motion'
import CRTOverlay from '@/components/milo/CRTOverlay'
import IntroMessage from './IntroMessage'
import StatsPanel from './StatsPanel'
import FieldNotesPanel from './FieldNotesPanel'
import ChatPanel from './ChatPanel'

interface TerminalShellProps {
  userId: string
  userEmail?: string | null
}

// Staggered panel animation config with CRT focus effect
const panelVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: 'blur(2px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
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
  const [flickerPhase, setFlickerPhase] = useState(0)

  // CRT power-on flicker effect
  useEffect(() => {
    // Phase timing for authentic CRT warm-up
    const phases = [
      { delay: 100, phase: 1 },   // Initial dim glow
      { delay: 200, phase: 2 },   // Flicker up
      { delay: 150, phase: 1 },   // Flicker back down
      { delay: 100, phase: 3 },   // Brighter
      { delay: 80, phase: 2 },    // Quick flicker
      { delay: 120, phase: 4 },   // Full brightness
    ]

    let totalDelay = 0
    const timers: NodeJS.Timeout[] = []

    phases.forEach(({ delay, phase }) => {
      totalDelay += delay
      timers.push(setTimeout(() => setFlickerPhase(phase), totalDelay))
    })

    // Show content after flicker sequence
    timers.push(setTimeout(() => setShowContent(true), totalDelay + 100))

    return () => timers.forEach(clearTimeout)
  }, [])

  // Map phase to opacity for CRT effect
  const flickerOpacity = [0, 0.3, 0.6, 0.85, 1][flickerPhase]

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* CRT Effects Overlay */}
      <CRTOverlay enableFlicker={true} />

      {/* Phosphor glow pulse - Claude's heartbeat */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 107, 53, 0.03) 0%, transparent 50%)',
          animation: 'pulse 3s ease-in-out infinite'
        }}
      />

      {/* Terminal Container with flicker */}
      <m.div
        className="relative z-10 min-h-screen p-4 md:p-6 lg:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: flickerOpacity }}
        transition={{ duration: 0.1 }}
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

          {/* Terminal Content */}
          <div className="bg-[#1e1e1e] rounded-b-xl border border-[#3d3d3d] border-t-0 overflow-hidden">
            <AnimatePresence>
              {showContent && (
                <m.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Intro Message */}
                  <m.div
                    variants={panelVariants}
                    className="p-6 md:p-8 border-b border-[#2d2d2d]"
                  >
                    <IntroMessage userEmail={userEmail} />
                  </m.div>

                  {/* Two Column Layout: Stats & Notes */}
                  <div className="grid lg:grid-cols-2 gap-0 lg:gap-0">
                    {/* Stats Panel */}
                    <m.div
                      variants={panelVariants}
                      className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#2d2d2d]"
                    >
                      <StatsPanel onLiveStatusChange={setIsLive} />
                    </m.div>

                    {/* Field Notes Panel */}
                    <m.div
                      variants={panelVariants}
                      className="p-6 md:p-8 border-b border-[#2d2d2d]"
                    >
                      <FieldNotesPanel />
                    </m.div>
                  </div>

                  {/* Chat Panel - Full Width */}
                  <m.div
                    variants={panelVariants}
                    className="p-6 md:p-8"
                  >
                    <ChatPanel userId={userId} />
                  </m.div>

                  {/* Footer */}
                  <m.div
                    variants={panelVariants}
                    className="px-6 md:px-8 py-4 border-t border-[#2d2d2d] flex items-center justify-between text-xs font-mono text-[#404040]"
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
