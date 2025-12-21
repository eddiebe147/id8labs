'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Product {
  name: string
  status: 'shipping' | 'development' | 'exploration' | 'internal'
  statusLabel: string
  description: string
  link?: string
  external?: boolean
  category: 'creators' | 'builders' | 'fun'
}

const products: Product[] = [
  // FOR CREATORS
  {
    name: 'Composer',
    status: 'shipping',
    statusLabel: 'v0.8.1 • Live',
    description: 'Prevents context rot in AI-assisted writing through selective knowledge base management. Built for 90 Day Fiancé production, tested in the field. The AI finally remembers your story world across sessions.',
    link: 'https://id8composer.app',
    external: true,
    category: 'creators',
  },
  {
    name: 'DeepStack',
    status: 'shipping',
    statusLabel: 'v2.5.0 • Live',
    description: 'AI-powered trading research platform. Claude-powered analysis with 30+ tools, professional charts, thesis tracking, trade journaling with emotion monitoring, and an emotional firewall that blocks revenge trading. Research only—we never execute trades.',
    link: 'https://deepstack.trade',
    external: true,
    category: 'creators',
  },
  // FOR BUILDERS
  {
    name: 'Pipeline',
    status: 'internal',
    statusLabel: 'Internal tooling',
    description: 'Complete idea-to-exit lifecycle management. 8 interconnected AI agents handle validation, architecture, launch, growth, ops, and exit prep. Decay mechanics keep projects moving. Stage gates prevent premature advancement.',
    link: '/products/pipeline',
    category: 'builders',
  },
  {
    name: 'Factory',
    status: 'development',
    statusLabel: 'Field testing',
    description: 'Orchestrates Midjourney, Grok, Gemini into a single tracked workflow. Browser automation handles the tab-switching. State management remembers which prompt made what. The AI handles logistics, you handle taste.',
    link: '/products/factory',
    category: 'builders',
  },
  {
    name: 'Pipeline CLI',
    status: 'internal',
    statusLabel: 'Just shipped',
    description: 'Visual terminal dashboard for your entire product portfolio. Live updating display with decay bars, sparklines, health indicators. Built with Python + Rich for that control room aesthetic.',
    link: '/essays/building-pipeline-cli',
    category: 'builders',
  },
  {
    name: 'Lexicon',
    status: 'development',
    statusLabel: 'Architecture complete',
    description: 'Replace your Excel story bibles with a living, searchable knowledge graph. Track characters, relationships, events, and continuity across years of content. Every connection instantly searchable.',
    link: '/products/lexicon',
    category: 'creators',
  },
  // FOR FUN
  {
    name: 'X-Place',
    status: 'exploration',
    statusLabel: 'Building in public',
    description: 'r/place meets Twitter. 500x500 shared pixel canvas with X OAuth, cooldown timers, and real-time updates. A social experiment for the X ecosystem.',
    link: '/products/xplace',
    category: 'fun',
  },
  {
    name: '[Classified]',
    status: 'exploration',
    statusLabel: 'Research phase',
    description: '3D story tree visualization. Semantic versioning for narrative.',
    category: 'fun',
  },
]

function FeaturedCard({ product, index }: { product: Product; index: number }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-featured group cursor-pointer"
    >
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
    </motion.div>
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

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group cursor-pointer h-full flex flex-col relative"
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
    </motion.div>
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
  const shippingProducts = products.filter(p => p.status === 'shipping')
  const builderProducts = products.filter(p => p.category === 'builders')
  const creatorProducts = products.filter(p => p.category === 'creators' && p.status !== 'shipping')
  const funProducts = products.filter(p => p.category === 'fun')

  return (
    <section className="section-spacing bg-zone-text">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            What's Happening
            <br />
            <span className="text-gradient-orange">in the Lab</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)]">
            Tools for creators. Infrastructure for builders. Experiments for fun.
          </p>
        </motion.div>

        {/* Featured Products - Shipping Now */}
        <div className="mb-16">
          {shippingProducts.map((product, index) => (
            <FeaturedCard key={product.name} product={product} index={index} />
          ))}
        </div>

        {/* For Builders */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-purple-400">
            For Builders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builderProducts.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>

        {/* For Creators (non-shipping) */}
        {creatorProducts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-[var(--id8-orange)]">
              For Creators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatorProducts.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* For Fun */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-cyan-400">
            For Fun
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funProducts.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
