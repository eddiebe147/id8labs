'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Hero } from '@/components/hero'
import { ProductGrid } from '@/components/product-grid'

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <Hero />

      {/* Product Showcase */}
      <ProductGrid />

      {/* Philosophy Section */}
      <section
        className="relative py-32 px-8 overflow-hidden"
        style={{
          background: 'var(--bg-secondary)',
        }}
      >
        {/* Geometric Accent - RGB Blue Square */}
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none hidden md:block"
          style={{
            background: 'rgba(0, 217, 255, 0.12)',
            filter: 'blur(0.5px)',
          }}
          animate={{
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Content Container */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 leading-tight"
          >
            We don&apos;t improve tools.
            <br />
            We invent new categories.
          </motion.blockquote>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8"
          >
            <Link
              href="/lab"
              className="philosophy-cta inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg-primary font-mono font-semibold text-sm md:text-base tracking-wide rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary group"
            >
              Read the Lab Story
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Hover Effect Styles */}
        <style jsx>{`
          .philosophy-cta:hover {
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.4),
              0 0 40px rgba(255, 107, 53, 0.2),
              inset 0 0 10px rgba(255, 255, 255, 0.1);
            filter: brightness(1.1);
          }

          :global([data-theme='dark']) .philosophy-cta:hover {
            box-shadow: 0 0 20px rgba(255, 60, 56, 0.5),
              0 0 40px rgba(255, 60, 56, 0.3),
              inset 0 0 10px rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </section>

      {/* VHS Style Stats */}
      <section className="py-20 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-mono font-bold text-accent mb-2 chromatic-hover">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-mono text-text-secondary tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const stats = [
  { value: '10+', label: 'Products' },
  { value: '500+', label: 'Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
]
