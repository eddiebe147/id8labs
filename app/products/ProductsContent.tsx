'use client'

import { useState } from 'react'
import { m } from '@/components/motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, Check, Download, Package, Sparkles, Wrench, Zap, Users, Brain, Shield, Code, Database, Terminal } from 'lucide-react'
import AgentKitCheckout from '@/components/checkout/AgentKitCheckout'

// ============================================
// FLAGSHIP PRODUCTS - Full feature showcase
// ============================================

interface FlagshipProduct {
  name: string
  tagline: string
  description: string
  version: string
  status: 'live' | 'beta'
  link: string
  external?: boolean
  image: string
  features: string[]
  specs: { label: string; value: string }[]
  accentColor: string
}

const flagshipProducts: FlagshipProduct[] = [
  {
    name: 'Composer',
    tagline: 'AI Writing Partner with Memory',
    description: 'AI writing partner that actually remembers your story world. Built for 90 Day Fiancé production—context rot solved. Knowledge bases, canvas mode, and persistent story memory.',
    version: 'v1.8161',
    status: 'live',
    link: 'https://id8composer.app',
    external: true,
    image: '/images/composer-preview.webp',
    features: [
      'Persistent knowledge bases',
      'Canvas mode for visual writing',
      'Story bible integration',
      'Character relationship tracking',
      'Context that survives sessions',
      'Export to multiple formats',
    ],
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'AI Model', value: 'Claude' },
      { label: 'Price', value: 'Free' },
    ],
    accentColor: 'orange',
  },
  {
    name: 'DeepStack',
    tagline: 'Trading Research with Claude',
    description: '30+ analysis tools, thesis tracking, emotion-aware journaling. Blocks revenge trades. Built to protect you from yourself while making better decisions.',
    version: 'v2.5.0',
    status: 'live',
    link: 'https://deepstack.trade',
    external: true,
    image: '/images/deepstack-preview.webp',
    features: [
      '30+ analysis tools',
      'Thesis tracking & validation',
      'Emotion-aware journaling',
      'Revenge trade blocking',
      'Process integrity scoring',
      'Pattern recognition',
    ],
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'AI Model', value: 'Claude' },
      { label: 'Price', value: 'Free' },
    ],
    accentColor: 'green',
  },
  {
    name: 'MILO',
    tagline: 'Signal-to-Noise Task Manager',
    description: 'Jobs/Musk-level signal filtering with Claude Code integration. 17 MCP tools for natural language task management. Open source and free.',
    version: 'v1.0',
    status: 'live',
    link: '/products/milo',
    external: false,
    image: '/products/milo/milo-dashboard.png',
    features: [
      'Signal/noise filtering',
      'Natural language task creation',
      '17 MCP tools included',
      'Claude Code integration',
      'Project-based organization',
      'Focus mode with timers',
    ],
    specs: [
      { label: 'Platform', value: 'CLI + Web' },
      { label: 'Integration', value: 'Claude Code' },
      { label: 'Price', value: 'Open Source' },
    ],
    accentColor: 'emerald',
  },
]

// ============================================
// AGENT KITS - Downloadable systems for sale
// ============================================

interface AgentKit {
  productId: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice?: number
  agentCount: number
  icon: React.ReactNode
  features: string[]
  included: string[]
  popular?: boolean
}

const agentKits: AgentKit[] = [
  {
    productId: 'agent-kit-tmnt',
    name: 'TMNT Elite',
    tagline: '9-Agent SDK Dev Team',
    description: 'Complete software development team built on Claude SDK. Strategic brain (KRANG), team lead, architect, creative dev, QA, DevOps, and more.',
    price: 79,
    agentCount: 9,
    icon: <Users className="w-6 h-6" />,
    popular: true,
    features: [
      'KRANG strategic brain with scope protection',
      'Leonardo team coordination',
      'Donatello architecture patterns',
      'Raphael security & code review',
      'Splinter wisdom & mentorship',
      'Full DevOps & QA coverage',
    ],
    included: [
      '9 SDK agent configurations',
      'Orchestration system',
      'Pattern library',
      'Setup documentation',
    ],
  },
  {
    productId: 'agent-kit-llc-ops',
    name: 'LLC Ops',
    tagline: '9-Agent Business Operations',
    description: 'Replace a $50k back office. AI agents for taxes, compliance, asset protection, bookkeeping, and strategic planning.',
    price: 49,
    agentCount: 9,
    icon: <Shield className="w-6 h-6" />,
    features: [
      'Tax strategy & planning',
      'Compliance monitoring',
      'Asset protection guidance',
      'Bookkeeping automation',
      'Quarterly planning',
      'Audit preparation',
    ],
    included: [
      '9 agent prompts',
      'CLAUDE.md framework',
      'Slash commands',
      'Workflow templates',
    ],
  },
  {
    productId: 'agent-kit-pipeline',
    name: 'Pipeline',
    tagline: '11-Stage Product Methodology',
    description: 'Idea-to-exit in 11 stages. 8 AI agents handle validation through exit prep. Decay mechanics keep projects moving.',
    price: 49,
    agentCount: 8,
    icon: <Code className="w-6 h-6" />,
    features: [
      '11-stage development process',
      'Decay mechanics for momentum',
      'Checkpoint validation',
      'Scope protection',
      'Progress tracking',
      'Exit preparation',
    ],
    included: [
      '8 stage-specific agents',
      'PIPELINE_STATUS.md template',
      'Decay calculation system',
      'Gate checklists',
    ],
  },
  {
    productId: 'agent-kit-foundry',
    name: 'Foundry',
    tagline: 'Self-Improving Dev Framework',
    description: 'The system that builds systems. Captures patterns, decisions, and failures across projects. Every build makes the next one faster.',
    price: 49,
    agentCount: 5,
    icon: <Brain className="w-6 h-6" />,
    features: [
      'Pattern capture & elevation',
      'Decision audit trails',
      'Cross-project learning',
      'Anti-pattern detection',
      'Knowledge synthesis',
      'Continuous improvement',
    ],
    included: [
      '5 specialized agents',
      'Pattern library starter',
      'ADR templates',
      'Learning protocols',
    ],
  },
  {
    productId: 'agent-kit-factory',
    name: 'Factory',
    tagline: 'Multi-AI Creative Pipeline',
    description: 'Midjourney + Grok + Gemini in one tracked workflow. Browser automation handles the tabs. You handle taste.',
    price: 39,
    agentCount: 4,
    icon: <Sparkles className="w-6 h-6" />,
    features: [
      'Multi-AI orchestration',
      'Browser automation',
      'Asset tracking',
      'Style consistency',
      'Batch processing',
      'Export workflows',
    ],
    included: [
      '4 orchestration agents',
      'Automation scripts',
      'Prompt templates',
      'Asset organization system',
    ],
  },
]

const bundlePrice = 199
const bundleSavings = agentKits.reduce((sum, kit) => sum + kit.price, 0) - bundlePrice

// ============================================
// IN DEVELOPMENT - Coming soon products
// ============================================

interface ComingSoonProduct {
  name: string
  tagline: string
  description: string
  status: 'development' | 'exploration'
  link?: string
}

const comingSoonProducts: ComingSoonProduct[] = [
  {
    name: 'Lexicon',
    tagline: 'Story bible as knowledge graph',
    description: 'Characters, relationships, timelines—100 episodes deep, instantly searchable.',
    status: 'development',
    link: '/products/lexicon',
  },
  {
    name: 'Pause',
    tagline: 'Communication translator for conflict',
    description: 'When emotions run high, people stop hearing each other. Translation, not therapy.',
    status: 'exploration',
    link: '/products/pause',
  },
  {
    name: 'X-Place',
    tagline: 'r/place meets X',
    description: 'Shared pixel canvas, cooldown timers, real-time chaos. A social experiment.',
    status: 'exploration',
    link: '/products/xplace',
  },
]

// ============================================
// COMPONENTS
// ============================================

function FlagshipCard({ product, index }: { product: FlagshipProduct; index: number }) {
  const isEven = index % 2 === 0

  const colorClasses = {
    orange: 'border-[var(--id8-orange)]/30 shadow-[0_0_30px_rgba(255,107,0,0.15)]',
    green: 'border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.15)]',
    emerald: 'border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]',
  }

  const content = (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 hover:bg-white/[0.04] transition-all"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content */}
        <div className={!isEven ? 'lg:order-2' : ''}>
          {/* Status Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              {product.version} • Live
            </span>
          </div>

          {/* Name & Tagline */}
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-[var(--id8-orange)] transition-colors">
            {product.name}
          </h3>
          <p className="text-lg text-[var(--id8-orange)]/80 font-medium mb-4">{product.tagline}</p>

          {/* Description */}
          <p className="text-zinc-400 leading-relaxed mb-6">{product.description}</p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            {product.specs.map((spec) => (
              <div key={spec.label} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-zinc-500">{spec.label}:</span>{' '}
                <span className="text-white font-medium">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-[var(--id8-orange)] font-semibold group-hover:gap-3 transition-all">
            {product.external ? 'Launch App' : 'Learn More'}
            {product.external ? (
              <ExternalLink className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </div>
        </div>

        {/* Image */}
        <div className={`relative ${!isEven ? 'lg:order-1' : ''}`}>
          <div className={`relative w-full h-64 md:h-80 rounded-xl overflow-hidden border-2 ${colorClasses[product.accentColor as keyof typeof colorClasses]}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Click target */}
      {product.external ? (
        <a href={product.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
          <span className="sr-only">Go to {product.name}</span>
        </a>
      ) : (
        <Link href={product.link} className="absolute inset-0 z-10">
          <span className="sr-only">Go to {product.name}</span>
        </Link>
      )}
    </m.div>
  )

  return content
}

function AgentKitCard({
  kit,
  index,
  onPurchase,
}: {
  kit: AgentKit
  index: number
  onPurchase: (productId: string) => void
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col p-6 rounded-2xl border bg-white/[0.02] transition-all hover:-translate-y-1 hover:bg-white/[0.04] ${
        kit.popular
          ? 'border-[var(--id8-orange)]/40 shadow-[0_0_40px_-10px_rgba(255,107,0,0.3)]'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {kit.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--id8-orange)] text-white text-xs font-bold rounded-full">
          MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]">
          {kit.icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">${kit.price}</div>
          <div className="text-xs text-zinc-500">{kit.agentCount} agents</div>
        </div>
      </div>

      {/* Name & Description */}
      <h3 className="text-xl font-bold text-white mb-1">{kit.name}</h3>
      <p className="text-sm text-[var(--id8-orange)]/80 font-medium mb-3">{kit.tagline}</p>
      <p className="text-sm text-zinc-400 leading-relaxed mb-6">{kit.description}</p>

      {/* Features */}
      <div className="space-y-2 mb-6 flex-grow">
        {kit.features.slice(0, 4).map((feature) => (
          <div key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            {feature}
          </div>
        ))}
      </div>

      {/* What's Included */}
      <div className="pt-4 border-t border-white/10 mb-6">
        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Includes</p>
        <div className="flex flex-wrap gap-2">
          {kit.included.map((item) => (
            <span key={item} className="px-2 py-1 text-xs bg-white/5 rounded-md text-zinc-400">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onPurchase(kit.productId)}
        className="w-full py-3 px-4 rounded-xl bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-all flex items-center justify-center gap-2 group"
      >
        <Download className="w-4 h-4" />
        Get Kit
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </m.div>
  )
}

function ComingSoonCard({ product }: { product: ComingSoonProduct }) {
  const statusConfig = {
    development: { label: 'In Development', color: 'amber' },
    exploration: { label: 'Exploring', color: 'violet' },
  }
  const config = statusConfig[product.status]

  return (
    <div className="group relative flex flex-col p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-white group-hover:text-[var(--id8-orange)] transition-colors">
          {product.name}
        </h3>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-${config.color}-500/10 text-${config.color}-400 border border-${config.color}-500/20`}>
          {config.label}
        </span>
      </div>
      <p className="text-sm text-[var(--id8-orange)]/70 mb-2">{product.tagline}</p>
      <p className="text-sm text-zinc-500 leading-relaxed">{product.description}</p>

      {product.link && (
        <Link href={product.link} className="absolute inset-0">
          <span className="sr-only">Learn more about {product.name}</span>
        </Link>
      )}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function ProductsContent() {
  const [checkoutProduct, setCheckoutProduct] = useState<string | null>(null)

  const handlePurchase = (productId: string) => {
    setCheckoutProduct(productId)
  }

  const handleCloseCheckout = () => {
    setCheckoutProduct(null)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] px-6 py-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-12 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Header */}
        <m.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Products<span className="text-[var(--id8-orange)]">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
            Professional tools for creators. Agent kits for builders.
            <span className="text-zinc-300"> Everything battle-tested in production.</span>
          </p>
        </m.header>

        {/* ===== FLAGSHIP PRODUCTS ===== */}
        <section className="mb-24">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Flagship Products</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Now
            </span>
          </m.div>

          <div className="space-y-8">
            {flagshipProducts.map((product, index) => (
              <FlagshipCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </section>

        {/* ===== AGENT KITS STORE ===== */}
        <section className="mb-24">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-3"
          >
            <div className="p-2 rounded-lg bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]">
              <Package className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Agent Kits</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] border border-[var(--id8-orange)]/20">
              Download & Use
            </span>
          </m.div>
          <p className="text-zinc-400 ml-12 mb-8">
            Battle-tested Claude Code agent systems. Download, configure, ship.
          </p>

          {/* Bundle Banner */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 p-6 rounded-2xl border border-[var(--id8-orange)]/30 bg-gradient-to-r from-[var(--id8-orange)]/10 to-transparent"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Complete Agent Bundle</h3>
                <p className="text-zinc-400">All 5 kits • 35 agents • Everything you need</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">${bundlePrice}</div>
                  <div className="text-sm text-emerald-400">Save ${bundleSavings}</div>
                </div>
                <button
                  onClick={() => handlePurchase('agent-kit-bundle')}
                  className="px-6 py-3 rounded-xl bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-all flex items-center gap-2"
                >
                  Get Bundle
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </m.div>

          {/* Kit Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentKits.map((kit, index) => (
              <AgentKitCard key={kit.name} kit={kit} index={index} onPurchase={handlePurchase} />
            ))}
          </div>
        </section>

        {/* ===== IN DEVELOPMENT ===== */}
        <section className="mb-24">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-3"
          >
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <Wrench className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">In Development</h2>
          </m.div>
          <p className="text-zinc-400 ml-12 mb-8">
            What's cooking in the lab. Building in public.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comingSoonProducts.map((product) => (
              <ComingSoonCard key={product.name} product={product} />
            ))}
          </div>
        </section>

        {/* ===== CUSTOM BUILDS CTA ===== */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-[var(--id8-orange)]/20 bg-[var(--id8-orange)]/5 p-8 md:p-12 md:py-20 text-center"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--id8-orange)]/5 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] mb-6">
              <Terminal className="w-8 h-8" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Something Custom?</h2>

            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Every tool here started as a real problem I faced. If you've got a workflow that's
              held together by duct tape and browser tabs, I can probably build something better.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--id8-orange)] text-white font-semibold rounded-full hover:bg-[var(--id8-orange)]/90 transition-all hover:scale-105 active:scale-95"
              >
                Let's Talk
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </m.section>
      </div>

      {/* Agent Kit Checkout Modal */}
      <AgentKitCheckout
        productId={checkoutProduct || ''}
        isOpen={checkoutProduct !== null}
        onClose={handleCloseCheckout}
      />
    </div>
  )
}
