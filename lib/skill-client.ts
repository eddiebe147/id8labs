/**
 * Client-safe skill utilities
 * These functions have no server-side dependencies and can be used in 'use client' components
 */

import type { Skill, InstallMethod } from './skill-types'

// Re-export types for convenience
export type { Skill, SkillCategory, SkillCollection, SkillStack, InstallMethod } from './skill-types'

/**
 * Generate install command for a skill
 * Pure function - no database dependencies
 */
export function getInstallCommand(skill: Skill, method: InstallMethod = 'copy'): string {
  const repoBase = 'https://github.com/id8labs/claude-code-skills'

  switch (method) {
    case 'curl':
      return `curl -fsSL ${repoBase}/raw/main/skills/${skill.slug}/SKILL.md -o ~/.claude/skills/${skill.slug}.md`
    case 'git':
      return `git clone ${repoBase} && cp -r claude-code-skills/skills/${skill.slug} ~/.claude/skills/`
    case 'copy':
    default:
      // The copy method will use clipboard in the UI
      return skill.content || ''
  }
}

/**
 * Get shareable stack URL
 */
export function getStackShareUrl(shareId: string): string {
  return `${process.env.NEXT_PUBLIC_SITE_URL || ''}/skills/share/${shareId}`
}

/**
 * Track skill install via API
 * Client-safe - calls API route instead of direct database
 */
export async function trackSkillInstall(
  skillId: string,
  method: InstallMethod = 'copy',
  platform?: string
): Promise<void> {
  try {
    await fetch('/api/skills/track-install', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skillId,
        method,
        platform: platform || getBrowserPlatform(),
      }),
    })
  } catch (error) {
    // Silently fail - analytics shouldn't break the user experience
    console.error('Failed to track install:', error)
  }
}

/**
 * Track skill view via API
 * Client-safe - calls API route instead of direct database
 */
export async function trackSkillView(
  skillId: string,
  sessionId?: string,
  referrer?: string
): Promise<void> {
  try {
    await fetch('/api/skills/track-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skillId,
        sessionId,
        referrer,
      }),
    })
  } catch (error) {
    // Silently fail - analytics shouldn't break the user experience
    console.error('Failed to track view:', error)
  }
}

/**
 * Detect browser platform for analytics
 */
function getBrowserPlatform(): string {
  if (typeof navigator === 'undefined') return 'unknown'

  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('win')) return 'windows'
  if (ua.includes('mac')) return 'macos'
  if (ua.includes('linux')) return 'linux'
  return 'unknown'
}

/**
 * Category emoji mapping
 */
export const CATEGORY_EMOJI: Record<string, string> = {
  documents: '📄',
  communication: '📬',
  research: '🔍',
  writing: '✍️',
  design: '🎨',
  code: '💻',
  project: '📋',
  business: '💼',
  domain: '🏢',
  personal: '👤',
  meta: '⚙️',
}

export function getCategoryEmoji(categoryId: string | null): string {
  return CATEGORY_EMOJI[categoryId || 'meta'] || '⚙️'
}
