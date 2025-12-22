'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

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
        src="/images/composer-preview.png"
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
        src="/images/deepstack-preview.png"
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

const products: Product[] = [
  // FOR CREATORS
  {
    name: 'Composer',
    status: 'shipping',
    statusLabel: 'v0.8.1 • Live',
    description: 'AI writing partner that actually remembers your story world. Built for 90 Day Fiancé production—context rot solved.',
    link: 'https://id8composer.app',
    external: true,
    category: 'creators',
  },
  {
    name: 'DeepStack',
    status: 'shipping',
    statusLabel: 'v2.5.0 • Live',
    description: 'Trading research with Claude. 30+ analysis tools, thesis tracking, emotion-aware journaling. Blocks revenge trades. Research only.',
    link: 'https://deepstack.trade',
    external: true,
    category: 'builders',
  },
  // FOR BUILDERS
  {
    name: 'LLC Ops',
    status: 'internal',
    statusLabel: 'Internal tooling',
    description: '9 AI agents for taxes, compliance, asset protection. Replace a $50k back office.',
    link: '/products/llc-ops',
    category: 'builders',
  },
  {
    name: 'Pipeline',
    status: 'internal',
    statusLabel: 'Internal tooling',
    description: 'Idea-to-exit in 11 stages. 8 AI agents handle validation through exit prep. Decay mechanics keep projects moving.',
    link: '/products/pipeline',
    category: 'builders',
  },
  {
    name: 'Factory',
    status: 'development',
    statusLabel: 'Field testing',
    description: 'Midjourney + Grok + Gemini in one tracked workflow. Browser automation handles the tabs. You handle taste.',
    link: '/products/factory',
    category: 'builders',
  },
  {
    name: 'Pipeline CLI',
    status: 'internal',
    statusLabel: 'Just shipped',
    description: 'Terminal dashboard for your product portfolio. Decay bars, sparklines, health indicators. Control room aesthetic.',
    link: '/essays/building-pipeline-cli',
    category: 'builders',
  },
  {
    name: 'Lexicon',
    status: 'development',
    statusLabel: 'Architecture complete',
    description: 'Story bible as knowledge graph. Characters, relationships, timelines—100 episodes deep, instantly searchable.',
    link: '/products/lexicon',
    category: 'creators',
  },
  // FOR FUN
  {
    name: 'X-Place',
    status: 'exploration',
    statusLabel: 'Building in public',
    description: 'r/place meets X. Shared pixel canvas, cooldown timers, real-time chaos. A social experiment.',
    link: '/products/xplace',
    category: 'fun',
  },
]

function FeaturedCard({ product, index }: { product: Product; index: number }) {
  const getPreview = () => {
    switch (product.name) {
      case 'Composer':
        return <ComposerPreview />
      case 'DeepStack':
        return <DeepStackPreview />
      default:
        return null
    }
  }

  const content = (
    <motion.div
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
        <motion.div
          className="order-first lg:order-last"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {getPreview()}
        </motion.div>
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
    <motion.div
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
  // Exclude shipping products from category sections (they're already featured)
  const builderProducts = products.filter(p => p.category === 'builders' && p.status !== 'shipping')
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
