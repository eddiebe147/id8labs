import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Products - ID8Labs',
  description: 'Professional tools for creators, AI orchestration for builders, and experiments because we can\'t help ourselves.',
}

interface Product {
  name: string
  status: 'active' | 'coming-soon' | 'internal'
  tagline: string
  description: string
  link?: string
  external?: boolean
}

// FOR CREATORS - Professional tools for people who make things
const creatorProducts: Product[] = [
  {
    name: 'Composer',
    status: 'active',
    tagline: 'Timeline-based AI story development platform',
    description:
      'Built for writers, directors, and producers who think visually and work non-linearly. Composer treats story development like the messy, iterative process it actually is. Work with AI as a collaborative partner, not a replacement.',
    link: 'https://id8composer.app',
    external: true,
  },
  {
    name: 'DeepStack',
    status: 'active',
    tagline: 'AI-powered trading research platform',
    description:
      'Think of it as having a research analyst in your pocket. Claude-powered analysis with 30+ tools, professional charts, thesis tracking, trade journaling with emotion monitoring, and an emotional firewall that blocks revenge trading. Research only—we never execute trades.',
    link: 'https://deepstack.trade',
    external: true,
  },
  {
    name: 'Lexicon',
    status: 'coming-soon',
    tagline: 'Wikipedia for your story universe',
    description:
      "When you're 100 episodes deep, find any character, relationship, or plot thread instantly. Graph-powered search that understands your narrative universe—from character connections to timeline conflicts to thematic patterns.",
    link: '/products/lexicon',
  },
  {
    name: 'Clearance',
    status: 'coming-soon',
    tagline: 'Remove background music from video clips',
    description:
      'AI-powered audio separation for production environments. Clean up interviews, isolate dialogue, remove music from archival footage. What used to take expensive post-production now happens on set.',
    link: '/products/clear',
  },
]

// FOR BUILDERS - AI orchestration for solo builders
const builderProducts: Product[] = [
  {
    name: 'Pipeline',
    status: 'internal',
    tagline: 'Complete idea-to-exit lifecycle management',
    description:
      '8 interconnected AI agents handle validation, architecture, launch, growth, ops, and exit prep. Decay mechanics keep projects moving. Stage gates prevent premature advancement. Built for solo builders who want structure without bureaucracy.',
    link: '/products/pipeline',
  },
  {
    name: 'Factory',
    status: 'coming-soon',
    tagline: 'AI creative production pipeline',
    description:
      'Orchestrates Midjourney, Grok, Gemini and other AI image tools into a single tracked workflow. Browser automation handles the tab-switching. State management remembers which prompt made what. The AI handles logistics, you handle taste.',
    link: '/products/factory',
  },
  {
    name: 'LLC Ops',
    status: 'internal',
    tagline: 'Custom AI agent systems for business operations',
    description:
      '9 specialized agents for tax strategy, compliance, asset protection, and financial management. Built for ID8Labs, now a framework for any business domain. Replace a $50k back office with agents.',
    link: '/products/llc-ops',
  },
  {
    name: 'Pipeline CLI',
    status: 'internal',
    tagline: 'Visual terminal dashboard for Pipeline',
    description:
      'A stunning CLI dashboard that shows your entire product portfolio at a glance. Live updating display with decay bars, sparklines, health indicators, and stage distribution. Built with Python + Rich for that control room aesthetic.',
    link: '/essays/building-pipeline-cli',
  },
]

// FOR FUN - Building in public, social experiments
const funProducts: Product[] = [
  {
    name: 'X-Place',
    status: 'coming-soon',
    tagline: 'Collaborative pixel canvas for the X ecosystem',
    description:
      'r/place meets Twitter. A 500x500 shared canvas where thousands of users create pixel art together—one pixel at a time, with cooldowns that force collaboration. X OAuth login, spectator mode for new accounts (anti-bot), real-time updates via WebSocket.',
    link: '/products/xplace',
  },
  {
    name: 'Memmon',
    status: 'internal',
    tagline: 'RAM monitor for AI development',
    description:
      'A simple dashboard with colored bars and a kill button. Green means work. Yellow means pay attention. Red means kill something now. Built because AI agents kept crashing my computer.',
    link: '/essays/memmon-making-the-invisible-visible',
  },
]

function ProductCard({ product }: { product: Product }) {
  const statusLabels = {
    'active': '● Live',
    'coming-soon': '◐ Coming Soon',
    'internal': '◆ Internal Tool',
  }

  const cardStyles = {
    'active': 'border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]',
    'coming-soon': 'border-[var(--border)] opacity-90',
    'internal': 'border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]',
  }

  const card = (
    <div className={`group p-8 border bg-[var(--bg-primary)] hover:shadow-lg transition-all duration-200 ${cardStyles[product.status]}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <span className={`text-xs uppercase tracking-wide ${
          product.status === 'active' ? 'text-green-500' :
          product.status === 'internal' ? 'text-purple-400' :
          'text-[var(--text-secondary)]'
        }`}>
          {statusLabels[product.status]}
        </span>
      </div>

      <p className="text-lg mb-4 text-[var(--text-secondary)]">{product.tagline}</p>

      <p className="text-base leading-relaxed mb-6">{product.description}</p>

      {product.link && (
        <div className="flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform text-[var(--id8-orange)]">
          {product.status === 'active' ? 'Launch App' : 'Learn more'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      )}
    </div>
  )

  if (!product.link) {
    return card
  }

  if (product.external) {
    return (
      <a href={product.link} target="_blank" rel="noopener noreferrer" className="block">
        {card}
      </a>
    )
  }

  return <Link href={product.link}>{card}</Link>
}

function CategorySection({
  title,
  subtitle,
  products,
  accent = 'orange'
}: {
  title: string
  subtitle: string
  products: Product[]
  accent?: 'orange' | 'purple' | 'cyan'
}) {
  const accentColors = {
    orange: 'text-[var(--id8-orange)]',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
  }

  return (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${accentColors[accent]}`}>{title}</h2>
        <p className="text-lg text-[var(--text-secondary)]">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}

export default function ProductsPage() {
  return (
    <div className="container py-24">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to home
      </Link>

      {/* Header */}
      <header className="max-w-3xl mb-16">
        <h1 className="mb-6">Products</h1>
        <p className="text-xl text-[var(--text-secondary)]">
          Professional tools for creators. AI orchestration for builders.
          Experiments because we can't help ourselves.
        </p>
      </header>

      {/* For Creators */}
      <CategorySection
        title="For Creators"
        subtitle="Professional tools for people who make things"
        products={creatorProducts}
        accent="orange"
      />

      {/* For Builders */}
      <CategorySection
        title="For Builders"
        subtitle="AI orchestration for solo builders"
        products={builderProducts}
        accent="purple"
      />

      {/* For Fun */}
      <CategorySection
        title="For Fun"
        subtitle="Building in public, social experiments"
        products={funProducts}
        accent="cyan"
      />

      {/* Custom Builds CTA */}
      <section className="mt-16 p-12 border-2 border-[var(--id8-orange)] bg-[var(--id8-orange)]/5 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Need Something Custom?</h2>
        <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl">
          Every tool here started as a real problem I faced. If you've got a workflow that's
          held together by duct tape and browser tabs, I can probably build something better.
        </p>
        <p className="text-lg mb-8">
          <strong>CLI dashboards. AI orchestration. Production tools.</strong> Whatever you need
          to stop fighting your tools and start shipping.
        </p>
        <a
          href="https://x.com/eddiebe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-lg px-8 py-4 bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-colors"
        >
          Let's Talk
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </section>
    </div>
  )
}
