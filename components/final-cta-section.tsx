'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Final CTA Section Component
 *
 * Large directional CTA before footer
 * Guides visitors to explore products or learn more
 * Replaces generic stats section
 */
export function FinalCTASection() {
  const products = [
    { name: 'ID8Composer', href: '/id8composer' },
    { name: 'Lexicon', href: '/lexicon' },
    { name: 'Clear', href: '/clear' },
  ]

  return (
    <section
      className="relative px-8 overflow-hidden"
      style={{
        background: 'var(--bg-primary)',
        paddingTop: 'var(--spacing-5xl)',
        paddingBottom: 'var(--spacing-5xl)',
      }}
    >
      {/* Geometric Accent - Floating Triangle */}
      <motion.div
        className="absolute top-20 left-10 pointer-events-none hidden md:block"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: 0,
          height: 0,
          borderLeft: '40px solid transparent',
          borderRight: '40px solid transparent',
          borderBottom: '70px solid rgba(255, 107, 53, 0.1)',
          filter: 'blur(0.5px)',
        }}
      />

      {/* Content Container */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-text-primary mb-6"
        >
          Ready to Build Differently?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto"
        >
          Join creators who refuse to compromise
        </motion.p>

        {/* Product Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={product.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-bg-primary border-2 border-text-secondary/20 text-text-primary font-mono text-sm md:text-base tracking-wide rounded-md transition-all duration-300 hover:border-accent hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-secondary group"
              >
                Explore {product.name}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Alternative: Read Lab Story */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm text-text-secondary"
        >
          Or{' '}
          <Link
            href="/lab"
            className="text-accent hover:text-text-primary transition-colors underline decoration-accent/30 hover:decoration-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-secondary rounded"
          >
            read the full story
          </Link>
        </motion.div>
      </div>

      {/* Hover Effect Styles */}
      <style jsx>{`
        :global(.final-cta-link:hover) {
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.3),
            0 0 40px rgba(255, 107, 53, 0.15);
        }

        :global([data-theme='dark']) :global(.final-cta-link:hover) {
          box-shadow: 0 0 20px rgba(255, 60, 56, 0.4),
            0 0 40px rgba(255, 60, 56, 0.2);
        }
      `}</style>
    </section>
  )
}
