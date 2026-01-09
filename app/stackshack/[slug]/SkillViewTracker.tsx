'use client'

import { useEffect, useRef } from 'react'
import { trackSkillView } from '@/lib/skill-client'

interface Props {
  skillId: string
}

export function SkillViewTracker({ skillId }: Props): null {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true
    trackSkillView(skillId, undefined, document.referrer || undefined)
  }, [skillId])

  return null
}
