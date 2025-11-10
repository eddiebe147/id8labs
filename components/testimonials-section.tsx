'use client'

import { motion } from 'framer-motion'

/**
 * Testimonials Section Component
 *
 * Cross-product testimonials building trust
 * Mix of different user types and products
 */

interface Testimonial {
  quote: string
  name: string
  title: string
  product: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    quote:
      "ID8Composer changed how our writer's room collaborates. We cut story development time in half.",
    name: 'Sarah Chen',
    title: 'Showrunner, Midnight Protocol',
    product: 'ID8Composer',
    rating: 5,
  },
  {
    quote:
      "Lexicon saved my 10-book series from continuity hell. It's like version control for my universe.",
    name: 'Marcus Webb',
    title: 'Author, The Chronos Saga',
    product: 'Lexicon',
    rating: 5,
  },
  {
    quote:
      'Clear recovered 100+ interviews I thought were unusable. Dialogue crystal clear, music gone.',
    name: 'Priya Desai',
    title: 'Host, The Creative Grind',
    product: 'Clear',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="px-6 bg-bg-primary" style={{ paddingTop: 'var(--spacing-5xl)', paddingBottom: 'var(--spacing-5xl)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Built By Creators,{' '}
            <span className="font-mono tracking-wider text-accent">
              For Creators
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real feedback from people using these tools in production
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="testimonial-card relative group rounded-lg p-8 bg-bg-secondary border-2 border-text-secondary/10 transition-all duration-300 hover:border-accent/30 hover:shadow-lg flex flex-col"
            >
              {/* Quote Icon */}
              <div className="text-4xl text-accent/30 mb-4 font-serif">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-accent text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base text-text-secondary mb-6 leading-relaxed flex-grow">
                {testimonial.quote}
              </blockquote>

              {/* Author */}
              <div className="border-t border-text-secondary/10 pt-4">
                <div className="font-semibold text-text-primary mb-1">
                  {testimonial.name}
                </div>
                <div className="text-sm text-text-secondary mb-2">
                  {testimonial.title}
                </div>
                <div className="text-xs font-mono text-accent tracking-wider uppercase">
                  Using {testimonial.product}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
