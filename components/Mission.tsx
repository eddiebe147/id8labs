'use client'

import { motion } from 'framer-motion'

export default function Mission() {
  return (
    <section className="section-spacing bg-zone-text">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Headline (Asymmetric) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              How I
              <br />
              <span className="text-gradient-orange">Build</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--id8-orange)] to-transparent" />
          </motion.div>

          {/* Right - Content Stack (Asymmetric) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Principle Cards */}
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-xl md:text-2xl leading-relaxed">
                    Every tool starts with a <span className="text-[var(--id8-orange)] font-semibold">real problem I hit in production</span>.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-xl md:text-2xl leading-relaxed">
                    Filmmaking, mycology, trading systems, complex systems.
                    The <span className="text-[var(--id8-orange)] font-semibold">connections between fields</span> reveal what's missing.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-xl md:text-2xl leading-relaxed">
                    AI should augment thinking, not replace it. These tools treat <span className="text-[var(--id8-orange)] font-semibold">AI as a creative partner</span> with functional memory.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-xl md:text-2xl leading-relaxed">
                    I build <span className="text-[var(--id8-orange)] font-semibold">comprehensive systems</span>, not isolated features. I learn by building, not by theorizing.
                  </p>
                </div>
              </div>
            </div>

            {/* Pull Quote */}
            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <blockquote className="text-2xl md:text-3xl font-bold italic text-[var(--text-secondary)]">
                "Products get personality.
                <br />
                The lab stays focused."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
