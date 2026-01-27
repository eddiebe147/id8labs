'use client'

import Link from 'next/link'
import Image from 'next/image'
import { m } from '@/components/motion'

interface Product {
  name: string
  status: 'shipping' | 'development' | 'exploration' | 'internal'
  statusLabel: string
  description: string
  link?: string
  external?: boolean
  category: 'creators' | 'builders' | 'fun'
  previewImage?: string
}

// Real product screenshots - full images with CSS cropping to show top content
function ComposerPreview() {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-72 rounded-lg overflow-hidden border-2 border-[var(--id8-orange)]/30 shadow-[0_0_30px_rgba(255,107,0,0.15)]">
      <Image
        src="/images/composer-preview.webp"
        alt="id8Composer - AI Writing Partner with Knowledge Base, Canvas, and Sandbox"
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

function DeepStackPreview() {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-72 rounded-lg overflow-hidden border-2 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
      <Image
        src="/images/deepstack-preview.webp"
        alt="DeepStack - Trading Research Platform with AI Analysis and Process Integrity"
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

function MiloPreview() {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-72 rounded-lg overflow-hidden border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
      <Image
        src="/products/milo/milo-dashboard.png"
        alt="MILO - Signal-to-noise task manager with Claude Code integration"
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

function HomerPreview() {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-72 rounded-lg overflow-hidden border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-gradient-to-br from-blue-500/10 to-transparent p-4">
      {/* Abstract Deal Dashboard UI */}
      <div className="relative z-10 h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <div className="h-2 w-20 bg-white/20 rounded" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-emerald-400">Active</span>
          </div>
        </div>
        {/* Deal Cards */}
        <div className="flex-1 grid grid-cols-2 gap-2 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="flex items-center gap-1 mb-2">
                <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-400' : i === 1 ? 'bg-blue-400' : i === 2 ? 'bg-amber-400' : 'bg-purple-400'}`} />
                <div className="h-1.5 bg-white/20 rounded flex-1" />
              </div>
              <div className="space-y-1">
                <div className="h-1 bg-white/10 rounded w-3/4" />
                <div className="h-1 bg-white/10 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between text-[9px] text-zinc-400 pt-2 border-t border-white/10">
          <span>4 Active Deals</span>
          <span className="text-blue-400">View All</span>
        </div>
      </div>
    </div>
  )
}

// Featured products with screenshots
const featuredProducts: Product[] = [
  {
    name: 'Composer',
    status: 'shipping',
    statusLabel: 'v1.8161 • Live',
    description: 'AI writing partner that actually remembers your story world. Built in the field when other tools failed us.',
    link: 'https://id8composer.app',
    external: true,
    category: 'creators',
  },
  {
    name: 'HOMER',
    status: 'shipping',
    statusLabel: 'v1.0 • Live',
    description: 'Deal automation from contract to close. Parse contracts, coordinate calendars, track deadlines, automate compliance. Deals don\'t manage themselves.',
    link: '/products/homer',
    external: false,
    category: 'builders',
  },
  {
    name: 'DeepStack',
    status: 'shipping',
    statusLabel: 'v2.5.0 • Live',
    description: 'Trading research with Claude. 30+ analysis tools, thesis tracking, emotion-aware journaling. Blocks revenge trades.',
    link: 'https://deepstack.trade',
    external: true,
    category: 'builders',
  },
  {
    name: 'MILO',
    status: 'internal',
    statusLabel: 'Open Source • Free',
    description: 'Signal-to-noise task manager with Claude Code integration. Jobs/Musk-level filtering. 17 MCP tools for natural language task management.',
    link: '/products/milo',
    external: false,
    category: 'builders',
  },
]

// Compact showcase - best of the rest
const showcaseProducts: Product[] = [
  {
    name: 'LLC Ops',
    status: 'internal',
    statusLabel: 'Internal',
    description: '9 AI agents for taxes, compliance, asset protection.',
    link: '/products/llc-ops',
    category: 'builders',
  },
  {
    name: 'Pipeline',
    status: 'internal',
    statusLabel: 'Internal',
    description: 'Idea-to-exit in 11 stages. Decay mechanics keep projects moving.',
    link: '/products/pipeline',
    category: 'builders',
  },
  {
    name: 'Lexicon',
    status: 'development',
    statusLabel: 'In Development',
    description: 'Story bible as knowledge graph. 100 episodes deep, instantly searchable.',
    link: '/products/lexicon',
    category: 'creators',
  },
]

function FeaturedCard({ product, index }: { product: Product; index: number }) {
  const getPreview = () => {
    switch (product.name) {
      case 'Composer':
        return <ComposerPreview />
      case 'HOMER':
        return <HomerPreview />
      case 'DeepStack':
        return <DeepStackPreview />
      case 'MILO':
        return <MiloPreview />
      default:
        return null
    }
  }

  const content = (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card-featured group cursor-pointer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left - Content */}
        <div>
          {/* Status Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="badge badge-shipping">
              <div className="w-1.5 h-1.5 bg-[var(--id8-orange)] rounded-full animate-pulse" />
              {product.statusLabel}
            </span>
            <span className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
              Shipping Now
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-orange">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
            {product.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-3 text-[var(--id8-orange)] font-semibold text-lg group-hover:gap-4 transition-all">
            Launch App
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        {/* Right - Product Preview */}
        <m.div
          className="order-first lg:order-last"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {getPreview()}
        </m.div>
      </div>
    </m.div>
  )

  if (product.external) {
    return (
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    )
  }

  return <Link href={product.link || '#'}>{content}</Link>
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const getStatusBadgeClass = (status: Product['status']) => {
    switch (status) {
      case 'development':
        return 'badge-development'
      case 'exploration':
        return 'badge-exploration'
      case 'internal':
        return 'badge-personal'
      default:
        return 'badge-development'
    }
  }

  const getCardStyle = (status: Product['status']) => {
    switch (status) {
      case 'shipping':
        return 'border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]'
      case 'internal':
        return 'border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.08)]'
      case 'development':
      case 'exploration':
      default:
        return 'border-[var(--border)] opacity-90'
    }
  }

  const content = (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className={`card group cursor-pointer h-full flex flex-col relative ${getCardStyle(product.status)}`}
    >
      {/* Subtle dithered corner accent on hover */}
      <div className="absolute top-2 right-2 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {Array.from({ length: 16 }, (_, i) => {
            const row = Math.floor(i / 4)
            const col = i % 4
            return (
              <circle
                key={i}
                cx={col * 12 + 6}
                cy={row * 12 + 6}
                r={2 - (row + col) * 0.3}
                fill="currentColor"
                className="text-[var(--id8-orange)]"
                opacity={0.5 - (row + col) * 0.08}
              />
            )
          })}
        </svg>
      </div>
      {/* Status Badge */}
      <div className="mb-4">
        <span className={`badge ${getStatusBadgeClass(product.status)}`}>
          {product.statusLabel}
        </span>
      </div>

      {/* Product Name */}
      <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[var(--id8-orange)] transition-colors">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-[var(--text-secondary)] leading-relaxed mb-6 flex-grow">
        {product.description}
      </p>

      {/* CTA - Only show if link exists */}
      {product.link && (
        <div className="flex items-center gap-2 text-[var(--id8-orange)] font-semibold group-hover:gap-3 transition-all">
          Learn more
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      )}
    </m.div>
  )

  if (!product.link) {
    return <div className="opacity-75 cursor-not-allowed">{content}</div>
  }

  if (product.external) {
    return (
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {content}
      </a>
    )
  }

  return <Link href={product.link} className="block h-full">{content}</Link>
}

export default function ProductGrid() {
  return (
    <section id="products" className="section-spacing bg-zone-text scroll-mt-20">
      <div className="container">
        {/* Two Column Layout - Sticky Header + Products */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left - Sticky Section Header */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              What's Happening
              <br />
              <span className="text-gradient-orange">in the Lab</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--id8-orange)] to-transparent mb-6" />
            <p className="text-xl text-[var(--text-secondary)]">
              Tools for creators. Infrastructure for builders.
            </p>
          </m.div>

          {/* Right - Products Content */}
          <div className="space-y-12">
            {/* Featured Products - Shipping Now */}
            <div>
              {featuredProducts.map((product, index) => (
                <FeaturedCard key={product.name} product={product} index={index} />
              ))}
            </div>

            {/* More from the Lab - Compact Grid */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-[var(--text-secondary)]">
                More from the Lab
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {showcaseProducts.map((product, index) => (
                  <ProductCard key={product.name} product={product} index={index} />
                ))}
              </div>

              {/* See All Link */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-[var(--id8-orange)] font-semibold hover:gap-3 transition-all"
                >
                  See all products
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
