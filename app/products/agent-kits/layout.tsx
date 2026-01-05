import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Kits - AI Teams That Actually Work',
  description: 'Complete AI agent systems for Claude Code. 35+ agents across 5 production-tested kits: TMNT Elite (9-agent dev team), LLC Ops (business operations), Pipeline (11-stage methodology), Foundry (self-improving framework), Factory (multi-AI creative). Not prompts—complete CLAUDE.md frameworks.',
  keywords: [
    'AI agent kits',
    'Claude Code agents',
    'CLAUDE.md framework',
    'Claude Code SDK',
    'multi-agent systems',
    'AI development team',
    'Claude Code automation',
    'AI workflow automation',
    'Claude Code prompts',
    'AI business operations',
    'Claude agent orchestration',
    'production AI agents',
    'Claude Code tools',
    'AI coding assistant',
    'agent-based development',
  ],
  openGraph: {
    title: 'Agent Kits - AI Teams That Actually Work | ID8Labs',
    description: '35+ AI agents across 5 production-tested kits. Complete CLAUDE.md frameworks—not just prompts. Configure once, delegate forever.',
    url: 'https://id8labs.app/products/agent-kits',
    type: 'website',
    images: [
      {
        url: '/og-agent-kits.png',
        width: 1200,
        height: 630,
        alt: 'ID8Labs Agent Kits - AI Teams That Actually Work',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Kits - AI Teams That Actually Work',
    description: '35+ AI agents across 5 production-tested kits. Complete CLAUDE.md frameworks—not just prompts.',
    images: ['/og-agent-kits.png'],
  },
  alternates: {
    canonical: 'https://id8labs.app/products/agent-kits',
  },
}

export default function AgentKitsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
