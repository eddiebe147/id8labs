'use client'

import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'

interface ResumeButtonProps {
  className?: string
}

const PlayIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function ResumeButton({ className = '' }: ResumeButtonProps) {
  const { progress, loading } = useProgress()

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="h-12 w-48 bg-[var(--border)] rounded-lg animate-pulse" />
      </div>
    )
  }

  // Not logged in - show sign in prompt
  if (!progress) {
    return (
      <div className={`${className}`}>
        <Link
          href="/sign-in?redirect=/academy"
          className="btn btn-primary group inline-flex items-center gap-2"
        >
          Sign in to track progress
          <ArrowRightIcon />
        </Link>
      </div>
    )
  }

  // No progress yet - show start button
  if (!progress.resumePoint) {
    return (
      <div className={`${className}`}>
        <Link
          href="/courses/ai-conversation-fundamentals/module-1"
          className="btn btn-primary group inline-flex items-center gap-2"
        >
          <PlayIcon />
          Start Learning
        </Link>
        <p className="text-sm text-[var(--text-tertiary)] mt-2">
          Begin with AI Conversation Fundamentals
        </p>
      </div>
    )
  }

  const { resumePoint, stats } = progress

  return (
    <div className={`${className}`}>
      <Link
        href={resumePoint.path}
        className="btn btn-primary group inline-flex items-center gap-2"
      >
        <PlayIcon />
        Continue Learning
      </Link>
      <p className="text-sm text-[var(--text-tertiary)] mt-2">
        {resumePoint.courseTitle} - Module {resumePoint.moduleNumber}
        {stats.completed > 0 && (
          <span className="ml-2 text-[var(--text-secondary)]">
            ({stats.percent}% complete)
          </span>
        )}
      </p>
    </div>
  )
}
