'use client'

import { m } from '@/components/motion'

export default function Builder() {
  return (
    <section id="builder" className="section-spacing bg-zone-text scroll-mt-20">

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Headline (Asymmetric) */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              The
              <br />
              <span className="text-gradient-orange">Builder</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--id8-orange)] to-transparent" />
          </m.div>

          {/* Right - Content */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Name & Location */}
            <div className="space-y-6">
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

              {/* Contact/Links */}
              <div className="pt-4 space-y-3 text-sm text-[var(--text-tertiary)]">
                <p>Filmmaker turned Product Builder</p>
                <p>Pattern Recognition Specialist</p>
                <p>Complex Systems Thinker</p>
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-6 text-lg md:text-xl leading-relaxed">
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
                  <p className="text-3xl font-bold text-[var(--id8-orange)]">20+</p>
                  <p className="text-sm text-[var(--text-tertiary)]">Years in Production</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[var(--id8-orange)]">9</p>
                  <p className="text-sm text-[var(--text-tertiary)]">Active Projects</p>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
