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
            className="space-y-12"
          >
            {/* Core Principles */}
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <p className="text-xl md:text-2xl leading-relaxed mb-2">
                      <span className="text-[var(--id8-orange)] font-semibold">Problem-First, Always</span>
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Every tool starts with friction I hit in production. Context rot on 90 Day scripts became Composer.
                      Revenge trades bleeding my account became DeepStack's emotion detection. Problems are never abstract—they're personally painful.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <p className="text-xl md:text-2xl leading-relaxed mb-2">
                      <span className="text-[var(--id8-orange)] font-semibold">Systems Over Features</span>
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Most builders add features. I add systems. LLC Ops isn't tax tools—it's 9 agents working together.
                      Pipeline isn't a tracker—it's decay mechanics that create urgency. Connections matter more than components.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <p className="text-xl md:text-2xl leading-relaxed mb-2">
                      <span className="text-[var(--id8-orange)] font-semibold">Claude as Creative Partner</span>
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      AI isn't a chatbot—it's a thinking partner with functional memory. I build context systems (knowledge bases,
                      story bibles, thesis tracking) so conversations compound. Every session picks up where the last ended.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <p className="text-xl md:text-2xl leading-relaxed mb-2">
                      <span className="text-[var(--id8-orange)] font-semibold">Build to Learn</span>
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Don't wait until you understand—build something, watch it break, build it better.
                      Composer started simple. Now it has canvas, sandbox, persistent story memory. The first version teaches what the real version needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <p className="text-xl md:text-2xl leading-relaxed mb-2">
                      <span className="text-[var(--id8-orange)] font-semibold">Multidisciplinary Translation</span>
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Mycology teaches networks. Trading teaches emotional systems. Filmmaking teaches narrative structure.
                      Pattern recognition is pulling insight from one field into another. DeepStack's "process integrity" came from production workflows, not finance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <p className="text-xl md:text-2xl leading-relaxed mb-2">
                      <span className="text-[var(--id8-orange)] font-semibold">Working in Public</span>
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      The lab isn't hidden. Ship before it's polished, iterate on real feedback.
                      The discomfort of public imperfection is offset by the acceleration of real-world validation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pull Quote */}
            <div className="pt-8 border-t border-[var(--border)]">
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
