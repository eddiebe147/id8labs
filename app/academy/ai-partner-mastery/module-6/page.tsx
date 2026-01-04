'use client'

import { m } from '@/components/motion'
import Link from 'next/link'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
const stagger = { animate: { transition: { staggerChildren: 0.1 } } }
const ArrowLeftIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
const ArrowRightIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>

export default function Module6Page() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-zone-text">
        <div className="container">
          <m.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl">
            <m.div variants={fadeUp} className="mb-8">
              <Link href="/academy/ai-partner-mastery" className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"><ArrowLeftIcon /> Back to AI Partner Mastery</Link>
            </m.div>
            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">Module 6</span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">60 min</span>
            </m.div>
            <m.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Research Mode</m.h1>
            <m.p variants={fadeUp} className="text-xl text-[var(--text-secondary)]">Go from 'tell me about X' to deep, nuanced understanding. Research that actually teaches you.</m.p>
          </m.div>
        </div>
      </section>
      <section className="section-spacing">
        <div className="container"><div className="max-w-3xl mx-auto"><div className="p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-center"><p className="text-lg text-[var(--text-secondary)] mb-4">Full module content coming soon.</p><p className="text-sm text-[var(--text-tertiary)]">You'll build: Research brief</p></div></div></div>
      </section>
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between gap-4">
            <Link href="/academy/ai-partner-mastery/module-5" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"><ArrowLeftIcon /> Module 5: The Editing Partner</Link>
            <Link href="/academy/ai-partner-mastery/module-7" className="btn btn-primary group inline-flex items-center gap-2">Next: The Strategy Session <ArrowRightIcon /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
