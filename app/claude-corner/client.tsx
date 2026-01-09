'use client'

import { useState, useEffect, useLayoutEffect } from 'react'
import BootSequence from '@/components/claude-corner/BootSequence'
import TerminalShell from '@/components/claude-corner/TerminalShell'

interface ClaudeCornerClientProps {
  user: {
    id: string
    email?: string | null
  } | null
}

export default function ClaudeCornerClient({ user }: ClaudeCornerClientProps) {
  const [bootComplete, setBootComplete] = useState(false)
  const [skipBoot, setSkipBoot] = useState(false)

  // Prevent scroll restoration and force scroll to top immediately
  useLayoutEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    // Force scroll to top before paint
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Check if user has seen boot sequence before
    const hasSeen = localStorage.getItem('claude-corner-boot-seen')
    if (hasSeen) {
      setSkipBoot(true)
      setBootComplete(true)
    }

    // Also scroll to top after state updates
    window.scrollTo(0, 0)
  }, [])

  const handleBootComplete = () => {
    localStorage.setItem('claude-corner-boot-seen', 'true')
    // Force scroll to top before transitioning to prevent jump
    window.scrollTo(0, 0)
    setBootComplete(true)
    // Force again after state change
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })
  }

  // Show boot sequence on first visit
  if (!bootComplete && !skipBoot) {
    return <BootSequence onComplete={handleBootComplete} />
  }

  // Show terminal shell after boot (guest mode if no user)
  return (
    <TerminalShell
      userId={user?.id ?? 'guest'}
      userEmail={user?.email}
    />
  )
}
