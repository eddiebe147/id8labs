'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Lab Story Preview Component
 *
 * Founder story teaser to drive deeper engagement
 * Bridges brand philosophy to Lab page
 */
export function LabStoryPreview() {
  return (
    <section className="relative px-8 overflow-hidden bg-bg-secondary" style={{ paddingTop: 'var(--spacing-5xl)', paddingBottom: 'var(--spacing-5xl)' }}>
      {/* Geometric Accent - Floating Circle */}
      <motion.div
        className="absolute bottom-16 right-16 w-24 h-24 rounded-full pointer-events-none hidden md:block"
        style={{
          background: 'rgba(0, 217, 255, 0.08)',
          filter: 'blur(1px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Behind the{' '}
            <span className="font-mono tracking-wider text-accent">Lab</span>
          </h2>
        </motion.div>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-lg text-text-secondary leading-relaxed mb-12"
        >
          <p>
            For 20 years, I worked as a TV producer drowning in AI outputs with
            no way to organize them into compelling stories.
          </p>
          <p>
            Every tool was built by engineers who&apos;d never faced a creative
            deadline. They made &apos;writing assistants&apos; when we needed
            &apos;composition platforms.&apos;
          </p>
          <p className="text-text-primary font-medium">
            So I built the lab I wished existed. Tools made by someone who
            actually uses them. Battle-tested in real production.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/lab"
            className="lab-story-cta inline-flex items-center gap-3 px-10 py-5 bg-accent text-bg-primary font-mono font-semibold text-base md:text-lg tracking-wide rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-4 focus:ring-offset-bg-secondary group"
          >
            Read the Full Story
            <span className="inline-block transition-transform group-hover:translate-x-2 text-xl">
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Hover Effect Styles */}
      <style jsx>{`
        .lab-story-cta:hover {
          box-shadow: 0 0 25px rgba(255, 107, 53, 0.5),
            0 0 50px rgba(255, 107, 53, 0.25),
            inset 0 0 15px rgba(255, 255, 255, 0.15);
          filter: brightness(1.1);
        }

        :global([data-theme='dark']) .lab-story-cta:hover {
          box-shadow: 0 0 25px rgba(255, 60, 56, 0.6),
            0 0 50px rgba(255, 60, 56, 0.3),
            inset 0 0 15px rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </section>
  )
}
