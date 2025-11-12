'use client'

import { motion } from 'framer-motion'

export default function Builder() {
  return (
    <section className="section-spacing border-t border-[var(--border)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-12">The Builder</h2>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-8">
            <p className="text-2xl font-bold">
              Eddie Belaval<br />
              <span className="text-[var(--text-secondary)] text-xl">Miami</span>
            </p>

            <p>
              Started as a cameraman on <span className="text-id8-orange">First 48</span>, Orange County Choppers, 90 Day Fiancé. 
              Worked from hands-on production into <span className="text-id8-orange">systems architecture</span> and product development.
            </p>

            <p>
              <span className="text-id8-orange">Multidisciplinary:</span> filmmaking, AI, mycology, biology, finance, music, writing, complex systems. 
              Pattern recognition is the superpower.
            </p>

            <p className="text-[var(--text-secondary)]">
              ID8Labs is where I work through problems in public and ship solutions.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
