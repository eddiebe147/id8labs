'use client'

import { ReactNode } from 'react'

/**
 * TerminalCard - Feature card with terminal styling and Pip-Boy aesthetic
 *
 * Usage:
 * <TerminalCard
 *   icon={<ServerIcon className="w-8 h-8" />}
 *   title="VOICE COMMANDS"
 *   description="Control MILO with natural language. Just talk, and MILO listens."
 * />
 */

interface TerminalCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export default function TerminalCard({
  icon,
  title,
  description,
  className = ''
}: TerminalCardProps) {
  return (
    <div
      className={`
        group
        relative
        bg-[#1a1a1a]
        border border-[#333333]
        p-6
        transition-all duration-300 ease-out
        hover:border-[#00ff41]
        hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]
        ${className}
      `}
      style={{
        borderRadius: '4px' // Subtle rounding to avoid hard 90° angles
      }}
    >
      {/* Icon with pulse animation on hover */}
      <div
        className="
          mb-4
          text-[#00ff41]
          transition-all duration-300
          group-hover:drop-shadow-[0_0_10px_currentColor]
          group-hover:animate-pulse-subtle
        "
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className="
          font-mono font-bold text-lg uppercase tracking-wider
          text-[#00ff41] mb-2
          transition-all duration-300
          group-hover:drop-shadow-[0_0_5px_currentColor]
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          font-mono text-sm leading-relaxed
          text-[#00cc33]
        "
      >
        {description}
      </p>

      {/* Bottom accent line */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          h-[2px]
          bg-gradient-to-r from-transparent via-[#00ff41] to-transparent
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Global style for subtle pulse */}
      <style jsx global>{`
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
