import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Skills Marketplace | ID8Labs',
    default: 'Skills Marketplace | ID8Labs',
  },
  description:
    'Discover 187+ production-quality Claude Code skills. Search, install, and build your custom AI workflow stack.',
  openGraph: {
    title: 'Skills Marketplace | ID8Labs',
    description:
      'Discover 187+ production-quality Claude Code skills. Search, install, and build your custom AI workflow stack.',
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
