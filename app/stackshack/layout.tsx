import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | StackShack | ID8Labs',
    default: 'StackShack - AI Marketplace | ID8Labs',
  },
  description:
    'Build your AI workflow stack. 180+ free skills, agents, commands & settings for Claude Code. One-click install, community sharing, zero config.',
  keywords: [
    'Claude Code',
    'AI skills',
    'AI agents',
    'workflow automation',
    'developer tools',
    'Claude',
    'Anthropic',
    'AI marketplace',
    'stack builder',
  ],
  openGraph: {
    title: 'StackShack - Build Your AI Workflow Stack',
    description:
      'Discover 180+ free skills, agents, commands & settings for Claude Code. Build custom stacks, share with community, install with one command.',
    type: 'website',
    siteName: 'ID8Labs',
    url: 'https://id8labs.app/stackshack',
    images: [
      {
        url: 'https://id8labs.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StackShack - AI Marketplace by ID8Labs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackShack - Build Your AI Workflow Stack',
    description:
      '180+ free skills, agents & tools for Claude Code. Build stacks, share, install instantly.',
    images: ['https://id8labs.app/og-image.png'],
    creator: '@eddiebe',
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
