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

function ProductCard({ product, index }: { product: Product; index: number }) {
  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'shipping':
        return 'text-id8-orange font-medium'
      case 'development':
        return 'text-blue-400'
      case 'exploration':
        return 'text-purple-400'
      case 'personal':
        return 'text-green-400'
      case 'classified':
        return 'text-[var(--text-secondary)]'
      default:
        return 'text-[var(--text-secondary)]'
    }
  }

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-8 border border-[var(--border)] bg-[var(--bg-primary)] hover:shadow-lg transition-all duration-200 rounded-soft"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-2xl font-bold">{product.name}</h3>
      </div>
      
      <p className={`text-sm mb-4 ${getStatusColor(product.status)}`}>
        {product.statusLabel}
      </p>

      <p className="text-[var(--text-secondary)] mb-6">
        {product.description}
      </p>

      {product.link && (
        <div className="flex items-center gap-2 text-sm text-id8-orange group-hover:translate-x-1 transition-transform">
          {product.status === 'shipping' ? 'Launch' : 'Learn more'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      )}
    </motion.div>
  )

  if (!product.link) {
    return card
  }

  if (product.external) {
    return (
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {card}
      </a>
    )
  }

  return <Link href={product.link}>{card}</Link>
}

export default function ProductGrid() {
  const shippingProducts = products.filter(p => p.status === 'shipping')
  const developmentProducts = products.filter(p => p.status !== 'shipping')

  return (
    <section className="section-spacing">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4">What's Happening in the Lab</h2>
        </motion.div>

        {/* Shipping Now */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-id8-orange">Shipping Now</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingProducts.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>

        {/* In Development */}
        <div>
          <h3 className="text-2xl font-bold mb-6">In Development</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {developmentProducts.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index + shippingProducts.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
