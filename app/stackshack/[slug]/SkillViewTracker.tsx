'use client'

import { useEffect, useRef } from 'react'
import { trackSkillView } from '@/lib/skill-client'

export function SkillViewTracker({ skillId }: { skillId: string }) {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true

    // Track the view
    trackSkillView(skillId, undefined, document.referrer || undefined)
  }, [skillId])

  return null
}
