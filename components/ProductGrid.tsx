'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Product {
  name: string
  status: 'active' | 'coming-soon'
  description: string
  link?: string
  external?: boolean
}

const products: Product[] = [
  {
    name: 'ID8Composer',
    status: 'active',
    description: 'Timeline-based AI story development platform',
    link: 'https://id8composer.app',
    external: true,
  },
  {
    name: 'Lexicon',
    status: 'coming-soon',
    description: 'Universal glossary management for production teams',
    link: '/products/lexicon',
  },
  {
    name: 'Clear',
    status: 'coming-soon',
    description: 'Remove background music from video clips',
    link: '/products/clear',
  },
  {
    name: '[Classified]',
    status: 'coming-soon',
    description: 'Something revolutionary brewing…',
  },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-8 border border-[var(--border)] bg-[var(--bg-primary)] hover:shadow-lg transition-all duration-200 rounded-soft"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <span className={`text-xs uppercase tracking-wide ${
          product.status === 'active' ? 'text-id8-orange font-medium' : 'text-[var(--text-secondary)]'
        }`}>
          {product.status === 'active' ? '● Active' : '◐ Coming Soon'}
        </span>
      </div>

      <p className="text-[var(--text-secondary)] mb-6">
        {product.description}
      </p>

      {product.link && (
        <div className="flex items-center gap-2 text-sm text-id8-orange group-hover:translate-x-1 transition-transform">
          Learn more
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
  return (
    <section className="section-spacing">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4">Our Products</h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Category-defining tools built from 20 years in production
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
