'use client'

import { motion } from 'framer-motion'

export default function Builder() {
  return (
    <section className="section-spacing">

      <div className="container pt-8">
        <div className="max-w-5xl mx-auto">
          {/* Header - Off-center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              The <span className="text-gradient-orange">Builder</span>
            </h2>
          </motion.div>

          {/* Two Column Layout - Asymmetric */}
          <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16">
            {/* Left - Name & Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  Eddie Belaval
                </h3>
                <p className="text-xl text-[var(--text-secondary)] font-medium">
                  Miami, FL
                </p>
              </div>

              {/* Visual Accent */}
              <div className="flex gap-2 items-center">
                <div className="w-3 h-3 bg-[var(--id8-orange)] rounded-full" />
                <div className="w-2 h-2 bg-[var(--id8-orange)]/60 rounded-full" />
                <div className="w-1 h-1 bg-[var(--id8-orange)]/30 rounded-full" />
              </div>

              {/* Contact/Links could go here */}
              <div className="pt-8 space-y-3 text-sm text-[var(--text-tertiary)]">
                <p>Filmmaker turned Product Builder</p>
                <p>Pattern Recognition Specialist</p>
                <p>Complex Systems Thinker</p>
              </div>
            </motion.div>

            {/* Right - Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 text-lg md:text-xl leading-relaxed"
            >
              <p>
                Started as a cameraman on <span className="text-[var(--id8-orange)] font-semibold">First 48</span>,
                Orange County Choppers, 90 Day Fiancé. Worked from hands-on production into{' '}
                <span className="text-[var(--id8-orange)] font-semibold">systems architecture</span> and product development.
              </p>

              <p>
                <span className="text-[var(--id8-orange)] font-semibold">Multidisciplinary:</span>{' '}
                filmmaking, AI, mycology, biology, finance, music, writing, complex systems.
                Pattern recognition is the superpower.
              </p>

              <div className="pt-6 border-t border-[var(--border)]">
                <p className="text-2xl md:text-3xl font-bold text-[var(--text-secondary)] italic">
                  ID8Labs is where I work through problems in public and ship solutions.
                </p>
              </div>

              {/* Stats or highlights */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[var(--id8-orange)]">15+</p>
                  <p className="text-sm text-[var(--text-tertiary)]">Years in Production</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[var(--id8-orange)]">5</p>
                  <p className="text-sm text-[var(--text-tertiary)]">Active Projects</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
