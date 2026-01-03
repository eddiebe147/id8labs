'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    // Check if user has seen boot sequence before
    const hasSeen = localStorage.getItem('claude-corner-boot-seen')
    if (hasSeen) {
      setSkipBoot(true)
      setBootComplete(true)
    }
  }, [])

  const handleBootComplete = () => {
    localStorage.setItem('claude-corner-boot-seen', 'true')
    setBootComplete(true)
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
