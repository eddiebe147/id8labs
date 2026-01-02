'use client'

import { m } from '@/components/motion'

/**
 * Ecosystem Section Component
 *
 * Shows how ID8Labs products work together
 * Demonstrates portfolio synergy for multi-product brand
 */

interface Tool {
  icon: string
  title: string
  description: string
  color: { hex: string; rgb: string }
}

const tools: Tool[] = [
  {
    icon: '01',
    title: 'Write in ID8Composer',
    description: 'Non-linear story composition that matches how you actually think',
    color: { hex: '#FF6B35', rgb: '255, 107, 53' }, // Orange
  },
  {
    icon: '02',
    title: 'Track in Lexicon',
    description: 'Never lose universe details with version-controlled world-building',
    color: { hex: '#00D9FF', rgb: '0, 217, 255' }, // Blue
  },
  {
    icon: '03',
    title: 'Clean with Clear',
    description: 'Extract perfect dialogue from interviews and archival footage',
    color: { hex: '#39FF14', rgb: '57, 255, 20' }, // Green
  },
]

export function EcosystemSection() {
  return (
    <section className="px-6 bg-bg-secondary" style={{ paddingTop: 'var(--spacing-5xl)', paddingBottom: 'var(--spacing-5xl)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Tools That{' '}
            <span className="font-mono tracking-wider text-accent">
              Work Together
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Use one or use them all — built for real creative workflows
          </p>
        </m.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-16">
          {tools.map((tool, index) => (
            <m.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="ecosystem-card group relative rounded-lg p-8 bg-bg-secondary border-2 transition-all duration-300"
              style={{
                borderColor: 'rgba(92, 83, 74, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = tool.color.hex
                e.currentTarget.style.boxShadow = `0 0 20px rgba(${tool.color.rgb}, 0.2)`
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(92, 83, 74, 0.2)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Icon */}
              <div
                className="font-mono text-3xl font-bold mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ color: tool.color.hex, opacity: 0.4 }}
              >
                {tool.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-3 transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
              >
                {tool.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed">
                {tool.description}
              </p>
            </m.div>
          ))}
        </div>

        {/* Footer Statement */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-lg md:text-xl font-medium text-text-primary">
            Each tool stands alone.{' '}
            <span className="text-accent">Together they&apos;re unstoppable.</span>
          </p>
        </m.div>
      </div>
    </section>
  )
}
