import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Implementation Services & Claude Code Training | ID8Labs',
  description: 'Live AI implementation services and Claude Code training. Learn hooks, MCP servers, plugins, and production workflows. From 90-minute sessions to full operational transformation.',
  keywords: [
    'Claude Code training',
    'Claude Code course',
    'AI implementation',
    'MCP servers',
    'Claude Code hooks',
    'AI workflow automation',
    'Claude Code plugins',
    'AI consulting',
    'learn Claude Code',
  ],
  openGraph: {
    title: 'AI Implementation Services & Claude Code Training | ID8Labs',
    description: 'Live AI implementation services and Claude Code training. Learn hooks, MCP servers, plugins, and production workflows from someone who ships with Claude Code daily.',
    url: 'https://id8labs.app/services',
    siteName: 'ID8Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Implementation & Claude Code Training | ID8Labs',
    description: 'Live Claude Code training. Hooks, MCP servers, plugins, and production workflows.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
