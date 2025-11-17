'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Product {
  name: string
  status: 'shipping' | 'development' | 'exploration' | 'personal' | 'classified'
  statusLabel: string
  description: string
  link?: string
  external?: boolean
}

const products: Product[] = [
  {
    name: 'ID8Composer',
    status: 'shipping',
    statusLabel: 'v0.8.1 • Live',
    description: 'Prevents context rot in AI-assisted writing through selective knowledge base management. Built for 90 Day Fiancé production, tested in the field. The AI finally remembers your story world across sessions.',
    link: 'https://id8composer.app',
    external: true,
  },
  {
    name: 'Lexicon',
    status: 'development',
    statusLabel: 'Technical architecture complete',
    description: 'Replace your Excel story bibles with a living, searchable knowledge graph. Track characters, relationships, events, and continuity across years of content. Every connection instantly searchable.',
    link: '/products/lexicon',
  },
  {
    name: 'ID8 Clearance',
    status: 'exploration',
    statusLabel: 'Early exploration',
    description: 'Extract clean dialogue audio from clips with background music. Built because transcription services can\'t handle music interference. Makes transcripts actually usable.',
    link: '/products/clear',
  },
  {
    name: 'MILO',
    status: 'personal',
    statusLabel: 'Foundation sprint active',
    description: 'Pip-Boy-style life dashboard. Context-aware task management that watches what you\'re doing.',
  },
  {
    name: '[Classified]',
    status: 'classified',
    statusLabel: 'Research phase',
    description: '3D story tree visualization. Semantic versioning for narrative.',
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
      case 'personal':
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
  const otherProducts = products.filter(p => p.status !== 'shipping')

  return (
    <section className="section-spacing">
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
            From production-tested tools to early experiments
          </p>
        </motion.div>

        {/* Featured Product - ID8Composer (2x size) */}
        <div className="mb-16">
          {shippingProducts.map((product, index) => (
            <FeaturedCard key={product.name} product={product} index={index} />
          ))}
        </div>

        {/* Other Products Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-[var(--text-secondary)]">
            In Development
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
