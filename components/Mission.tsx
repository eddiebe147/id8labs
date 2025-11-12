'use client'

import { motion } from 'framer-motion'

export default function Mission() {
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
          <h2 className="mb-12">How I Build</h2>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-12">
            <p>
              Every tool starts with a <span className="text-id8-orange font-medium">real problem I hit in production</span>.
            </p>

            <p>
              I see patterns across domains—filmmaking, mycology, wildlife biology, trading systems, complex systems analysis. 
              The <span className="text-id8-orange">connections between fields</span> reveal what's missing.
            </p>

            <p>
              AI should augment thinking, not replace it. These tools treat <span className="text-id8-orange">AI as a creative partner</span> with functional memory.
            </p>

            <p>
              I build <span className="text-id8-orange">comprehensive systems</span>, not isolated features. I learn by building, not by theorizing.
            </p>

            <p className="text-[var(--text-secondary)] font-medium italic">
              Products get personality. The lab stays focused.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
