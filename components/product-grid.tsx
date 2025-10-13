'use client'

import { motion } from 'framer-motion'
import { ProductCard } from './product-card'

/**
 * ProductGrid Component
 *
 * Displays 2x2 grid of products with:
 * - Staggered entrance animations
 * - Responsive layout (1 col mobile, 2 cols desktop)
 * - Real product lineup (ID8Composer, Lexicon, Clear, Mystery)
 */

const products = [
  {
    name: 'ID8Composer',
    tagline: 'Story Composition Platform',
    status: 'active' as const,
    href: '/id8composer',
    accentColor: 'orange' as const,
  },
  {
    name: 'Lexicon',
    tagline: 'Story Universe Wiki',
    status: 'active' as const,
    href: '/lexicon',
    accentColor: 'rgb-blue' as const,
  },
  {
    name: 'Clear',
    tagline: 'Background Music Remover',
    status: 'active' as const,
    href: '/clear',
    accentColor: 'rgb-green' as const,
  },
  {
    name: 'Coming Soon',
    tagline: '???',
    status: 'mystery' as const,
    href: null,
    accentColor: 'rgb-red' as const,
  },
]

export function ProductGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-bold text-text-primary mb-4"
        >
          Our{' '}
          <span className="font-mono tracking-wider text-accent">Products</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-lg text-text-secondary mb-16 max-w-2xl mx-auto"
        >
          Professional tools built for creators who demand excellence.
        </motion.p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
