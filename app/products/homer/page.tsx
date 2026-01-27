'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { m } from '@/components/motion'

/**
 * HOMER - Deal & Negotiation Automation
 *
 * Manages the entire deal lifecycle:
 * - Contract parsing & validation
 * - Multi-party calendar coordination
 * - Deadline tracking & compliance
 * - Deal intelligence & health checks
 * - Communication translation
 *
 * Two tiers: Homer (free) and Homer Pro (full automation)
 */

export default function HomerPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-400">New Release</span>
          </m.div>

          {/* Headline */}
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Deals Don't Manage Themselves.
            <span className="text-blue-400"> HOMER Does.</span>
          </m.h1>

          {/* Subheading */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-zinc-400 leading-relaxed"
          >
            Contract parsing. Calendar coordination. Deadline tracking. Compliance checking.
            <br />
            <span className="text-zinc-300">One agent handles it all.</span>
          </m.p>

          {/* CTA Buttons */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
            >
              Request Early Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/10"
            >
              Learn More
            </Link>
          </m.div>

          {/* Metadata */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 pt-8 text-sm text-zinc-500"
          >
            <span>Homer Free</span>
            <span className="text-zinc-700">•</span>
            <span>Homer Pro (Coming Jan 2026)</span>
            <span className="text-zinc-700">•</span>
            <span>Web App</span>
          </m.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="relative px-6 py-24 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto space-y-12">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-zinc-400">The deal graveyard is full of</span>
              <br />
              <span className="text-[var(--id8-orange)]">bad process, not bad deals.</span>
            </h2>
          </m.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                problem: "Contracts buried in email",
                reality: "You don't know what you agreed to until it's too late."
              },
              {
                problem: "Calendar chaos with 5+ parties",
                reality: "The inspection got scheduled for next month. By accident."
              },
              {
                problem: "Deadlines hidden in documents",
                reality: "Missed contingencies. Missed signatures. Missed everything."
              }
            ].map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <p className="font-semibold text-white mb-2">{item.problem}</p>
                <p className="text-sm text-zinc-400">{item.reality}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="relative px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-blue-400">HOMER automates</span>
              <br />
              <span>the entire deal lifecycle.</span>
            </h2>
          </m.div>

          <div className="space-y-12">
            {/* Feature 1: Contract Intelligence */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
                  Contract Intelligence
                </div>
                <h3 className="text-3xl font-bold">Extract what matters.</h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Upload a contract. HOMER reads it, extracts deadlines, financial terms, conditions, and parties. No PDF hunting. No spreadsheet updates. All data structured and searchable.
                </p>
                <div className="space-y-3 pt-4">
                  {["Parse 50-page contracts in seconds", "Extract all parties & roles", "Identify key dates & milestones"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-64 md:h-80 rounded-xl border border-blue-500/20 overflow-hidden">
                <Image
                  src="/products/homer/homer-deal-metrics.png"
                  alt="Homer deal metrics showing purchase price, earnest money, commission, and documents"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </m.div>

            {/* Feature 2: Calendar Coordination */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center md:grid-flow-dense"
            >
              <div className="relative h-64 md:h-96 rounded-xl border border-emerald-500/20 overflow-hidden md:order-2 flex items-center justify-center bg-emerald-500/5">
                <Image
                  src="/products/homer/homer-deal-card.png"
                  alt="Homer deal card with quick actions for calling, emailing, and scheduling"
                  width={300}
                  height={500}
                  className="object-contain"
                />
              </div>
              <div className="space-y-6 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                  Multi-Party Coordination
                </div>
                <h3 className="text-3xl font-bold">Sync every calendar.</h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Schedule showings, inspections, closings across buyer, seller, lender, and agent. HOMER checks all calendars, finds open slots, sends invites, tracks confirmations.
                </p>
                <div className="space-y-3 pt-4">
                  {["Find consensus times instantly", "Auto-send calendar invites", "Track confirmations in real-time"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </m.div>

            {/* Feature 3: Deal Health */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium border border-amber-500/20">
                  Deal Intelligence
                </div>
                <h3 className="text-3xl font-bold">Know deal health instantly.</h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Red flags emerge early. Missed inspections. Expired contingencies. Parties going silent. HOMER sends alerts before deals die.
                </p>
                <div className="space-y-3 pt-4">
                  {["Deadline tracking", "Contingency monitoring", "Party communication alerts"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-64 md:h-80 rounded-xl border border-amber-500/20 overflow-hidden">
                <Image
                  src="/products/homer/homer-analytics.png"
                  alt="Homer analytics dashboard showing portfolio overview, deal pipeline, and performance metrics"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="features" className="relative px-6 py-24 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Free tools. Pro automation.
            </h2>
            <p className="text-lg text-zinc-400">
              Start for free. Scale with Homer Pro.
            </p>
          </m.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Homer Free */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Homer Free</h3>
                <p className="text-zinc-400 text-sm">Perfect for getting started</p>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  "Contract parsing & extraction",
                  "Deal timeline creation",
                  "Deadline tracking",
                  "Basic compliance checks",
                  "Email reminders",
                  "Up to 3 deals"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              <button className="w-full py-2 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-all">
                Get Started Free
              </button>
            </m.div>

            {/* Homer Pro */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent hover:border-blue-500/50 transition-all relative"
            >
              <div className="absolute -top-4 right-4 px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">
                Coming Soon
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Homer Pro</h3>
                <p className="text-zinc-400 text-sm">Full automation powerhouse</p>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  "Everything in Homer Free",
                  "Unlimited deals",
                  "Multi-party calendar sync",
                  "AI-powered communication",
                  "Advanced compliance",
                  "Deal workflow automation",
                  "Priority support"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              <button className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all">
                Join Waitlist
              </button>
            </m.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <m.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative px-6 py-24"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to automate your deals?
          </h2>
          <p className="text-lg text-zinc-400">
            Start with Homer Free today. Upgrade to Pro when you're ready to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/10"
            >
              Explore Other Tools
            </Link>
          </div>
        </div>
      </m.section>

      {/* Footer */}
      <footer className="relative px-6 py-8 border-t border-white/10 text-center text-sm text-zinc-500">
        <p>Built by ID8Labs • Automating deals, one agreement at a time</p>
      </footer>
    </div>
  )
}
