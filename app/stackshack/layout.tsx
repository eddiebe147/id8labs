import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | StackShack | ID8Labs',
    default: 'StackShack | ID8Labs',
  },
  description:
    'Free skills & agents for Claude Code. 228+ tools to build your AI workflow stack.',
  openGraph: {
    title: 'StackShack | Free Skills & Agents for Claude',
    description:
      'Free skills & agents for Claude Code. 228+ tools to build your AI workflow stack.',
    type: 'website',
  },
}

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {children}
    </div>
  )
}
