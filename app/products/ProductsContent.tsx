'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, Check, Package, Wrench, Zap, Terminal, Bot } from 'lucide-react'

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
    name: 'HOMER',
    tagline: 'Deal & Negotiation Automation',
    description: 'Parse contracts, coordinate calendars, track deadlines, automate compliance. HOMER manages the entire deal lifecycle—from contract to close. Built to eliminate deal friction.',
    version: 'v1.0 Free',
    status: 'live',
    link: '/products/homer',
    external: false,
    image: '/products/homer/homer-dashboard.png',
    features: [
      'Contract parsing & extraction',
      'Multi-party calendar sync',
      'Deadline & compliance tracking',
      'Deal health intelligence',
      'AI-powered communication',
      'Unlimited deal storage (Pro)',
    ],
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'AI Model', value: 'Claude' },
      { label: 'Price', value: 'Free + Pro' },
    ],
    accentColor: 'blue',
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
    blue: 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]',
  }

  return (
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
}



function ComingSoonCard({ product }: { product: ComingSoonProduct }) {
  const statusStyles = {
    development: {
      label: 'In Development',
      className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    exploration: {
      label: 'Exploring',
      className: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    },
  }
  const status = statusStyles[product.status]

  return (
    <div className="group relative flex flex-col p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-white group-hover:text-[var(--id8-orange)] transition-colors">
          {product.name}
        </h3>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${status.className}`}>
          {status.label}
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

        {/* ===== STACKSHACK - FREE SKILLS & AGENTS ===== */}
        <section className="mb-24">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-[var(--id8-orange)]/30 bg-gradient-to-br from-[var(--id8-orange)]/10 via-[var(--id8-orange)]/5 to-transparent p-8 md:p-12"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[var(--id8-orange)]/20 text-[var(--id8-orange)]">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-press-start)' }}>
                    <span className="text-white">STACK</span>
                    <span className="text-[#FF6B00]">SHACK</span>
                  </h2>
                  <span className="text-sm text-[var(--id8-orange)]/80 font-medium">Free Skills & Agents for Claude</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-white font-semibold">228 skills & agents</span>
                  <span className="text-zinc-400">— all 100% free</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-white font-semibold">10 starter packs</span>
                  <span className="text-zinc-400">— curated for common workflows</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-white font-semibold">38 autonomous agents</span>
                  <span className="text-zinc-400">— ready to deploy in Claude Code</span>
                </div>
              </div>

              <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                Everything you need to build your AI workflow stack. No paywalls, no subscriptions—just tools that work.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/stackshack"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--id8-orange)] text-white font-semibold rounded-xl hover:bg-[var(--id8-orange)]/90 transition-all hover:scale-105 active:scale-95"
                >
                  Browse StackShack
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/stackshack/starter-kits"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/10"
                >
                  <Package className="w-4 h-4" />
                  View Starter Kits
                </Link>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[var(--id8-orange)]/10 rounded-full blur-3xl pointer-events-none" />
          </m.div>
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
    </div>
  )
}
