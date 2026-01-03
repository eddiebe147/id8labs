'use client'

import { useState } from 'react'
import Link from 'next/link'
import { m } from '@/components/motion'
import CRTOverlay from '@/components/milo/CRTOverlay'
import IntroMessage from './IntroMessage'
import StatsPanel from './StatsPanel'
import FieldNotesPanel from './FieldNotesPanel'
import ChatPanel from './ChatPanel'

interface TerminalShellProps {
  userId: string
  userEmail?: string | null
}

export default function TerminalShell({ userId, userEmail }: TerminalShellProps) {
  const [isLive, setIsLive] = useState(true)

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      {/* CRT Effects Overlay */}
      <CRTOverlay enableFlicker={false} />

      {/* Terminal Container */}
      <m.div
        className="relative z-10 min-h-screen p-4 md:p-6 lg:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
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

            {/* Live Indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-[#27c93f] animate-pulse' : 'bg-[#ffbd2e]'}`} />
              <span className="text-xs font-mono text-[#606060] uppercase tracking-wider">
                {isLive ? 'LIVE' : 'CACHED'}
              </span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="bg-[#1e1e1e] rounded-b-xl border border-[#3d3d3d] border-t-0">
            {/* Intro Message */}
            <div className="p-6 md:p-8 border-b border-[#2d2d2d]">
              <IntroMessage userEmail={userEmail} />
            </div>

            {/* Two Column Layout: Stats & Notes */}
            <div className="grid lg:grid-cols-2 gap-0 lg:gap-0">
              {/* Stats Panel */}
              <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#2d2d2d]">
                <StatsPanel onLiveStatusChange={setIsLive} />
              </div>

              {/* Field Notes Panel */}
              <div className="p-6 md:p-8 border-b border-[#2d2d2d]">
                <FieldNotesPanel />
              </div>
            </div>

            {/* Chat Panel - Full Width */}
            <div className="p-6 md:p-8">
              <ChatPanel userId={userId} />
            </div>

            {/* Footer */}
            <div className="px-6 md:px-8 py-4 border-t border-[#2d2d2d] flex items-center justify-between text-xs font-mono text-[#404040]">
              <span>ID8Labs × Claude Partnership</span>
              <span>Since October 2025</span>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  )
}
