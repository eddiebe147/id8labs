'use client'

import { m } from '@/components/motion'
import Link from 'next/link'

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const UsersIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

// Data
const modules = [
  {
    number: "1",
    title: "From You to Your Team",
    duration: "45 min",
    description: "Why what works for one person doesn't automatically work for ten. Diagnosing resistance and designing adoption.",
    deliverable: "Team AI adoption plan",
    href: "/academy/ai-at-scale/module-1",
  },
  {
    number: "2",
    title: "The Cost Reality",
    duration: "45 min",
    description: "What AI actually costs at scale. Tokens, seats, compute — build a realistic budget before you commit.",
    deliverable: "AI budget model",
    href: "/academy/ai-at-scale/module-2",
  },
  {
    number: "3",
    title: "Quality at Scale",
    duration: "45 min",
    description: "You can't review everything when ten people are using AI. Build systems that ensure consistency.",
    deliverable: "Quality framework",
    href: "/academy/ai-at-scale/module-3",
  },
  {
    number: "4",
    title: "Teaching Others",
    duration: "45 min",
    description: "How to train people who aren't as excited about AI as you are. Meet them where they are.",
    deliverable: "Training curriculum",
    href: "/academy/ai-at-scale/module-4",
  },
  {
    number: "5",
    title: "Building AI Services",
    duration: "45 min",
    description: "Offer AI-enhanced services to clients. Package your expertise with AI amplification.",
    deliverable: "Service design document",
    href: "/academy/ai-at-scale/module-5",
  },
  {
    number: "6",
    title: "Managing AI Workflows",
    duration: "45 min",
    description: "Track and improve AI use across multiple people. Version control for prompts and processes.",
    deliverable: "Workflow documentation system",
    href: "/academy/ai-at-scale/module-6",
  },
  {
    number: "7",
    title: "When AI Fails",
    duration: "45 min",
    description: "Errors happen at scale. Build escalation paths and recovery procedures before you need them.",
    deliverable: "Error handling plan",
    href: "/academy/ai-at-scale/module-7",
  },
  {
    number: "8",
    title: "Evolving Your System",
    duration: "30 min",
    description: "AI changes fast. Keep your systems current without constant rewrites.",
    deliverable: "Evolution process",
    href: "/academy/ai-at-scale/module-8",
  },
]

const audiences = [
  { title: "Team Leads", description: "Rolling out AI to their teams" },
  { title: "Entrepreneurs", description: "Building AI into products and services" },
  { title: "Consultants", description: "Offering AI-augmented services to clients" },
  { title: "Educators", description: "Teaching others to use AI effectively" },
  { title: "Managers", description: "Responsible for AI adoption in their org" },
  { title: "Content Creators", description: "Building AI-enhanced offerings" },
]

export default function AIAtScalePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <m.div variants={fadeUp} className="mb-8">
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Academy
              </Link>
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-green-500 text-white rounded">
                Free Course
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                Course 4 of 4 • AI Academy
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight mb-6"
            >
              AI at{' '}
              <span className="text-gradient-orange">Scale</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-2xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mb-4 font-medium"
            >
              How do I go from "this works for me" to "this works for everyone"?
            </m.p>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              You've cracked the code for yourself. Now everyone wants what you have. Learn to multiply your AI success through teams, clients, and organizations.
            </m.p>

            {/* CTA */}
            <m.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/academy/ai-at-scale/module-1"
                className="btn btn-primary group inline-flex items-center justify-center gap-2"
              >
                Start Module 1
                <ArrowRightIcon />
              </Link>
              <a
                href="#curriculum"
                className="btn btn-secondary group inline-flex items-center justify-center gap-2"
              >
                View Curriculum
              </a>
            </m.div>

            <m.p variants={fadeUp} className="mt-4 text-sm text-[var(--text-tertiary)]">
              8 modules • ~6 hours • Completely free
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* The Problem Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              The Problem
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              What works for one doesn't{' '}
              <span className="text-gradient-orange">work for ten</span>.
            </h2>
            <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                You've 3x'd your output with AI. You're faster, more consistent, and getting better results than ever.
              </p>
              <p>
                Now everyone wants what you have. Your team is watching. Your clients are asking. Your boss wants the whole department to "use AI."
              </p>
              <p>
                But when you tried to teach others, they struggled in ways you didn't expect. When you tried to scale your workflows, things broke. When you tried to measure ROI, you realized you had no idea how.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Going from "this works for me" to "this works for everyone" is a different skill entirely. This course teaches you that skill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet David */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Guide
              </p>
              <h3 className="text-xl font-bold mb-4">Meet David Chen</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                David is a content marketing director at a growing agency. He's been using AI personally for a year and has 3x'd his output. Now his agency has 15 people, and leadership wants him to "scale" his AI success across the team.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                But David's team is mixed. Some are excited about AI. Some are skeptical. Some think it's cheating. Some are afraid for their jobs. And a few just don't see the point.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                David tried sharing his prompts, but people used them wrong. He tried running a training session, but it didn't stick. He tried mandating AI use, but that backfired.
              </p>
              <p className="text-[var(--text-secondary)] mt-4 italic">
                He realized: personal AI success and scalable AI success require different skills. His journey through this course mirrors yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scale Promise */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-id8-orange/10 text-id8-orange mb-6">
              <UsersIcon />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              The Core Question
            </h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              Every module helps you answer a version of the same question: <br />
              <strong className="text-[var(--text-primary)]">"How do I take what works for me and make it work for everyone?"</strong>
            </p>
            <p className="mt-4 text-[var(--text-secondary)]">
              This isn't about forcing AI on people. It's about creating systems that let others succeed with AI the way you have.
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Who This Is For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              If you want to multiply your AI success
            </h2>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {audiences.map((audience, index) => (
              <m.div
                key={index}
                variants={fadeUp}
                className="flex items-start gap-3 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
              >
                <span className="text-id8-orange flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </span>
                <div>
                  <p className="font-bold text-[var(--text-primary)]">{audience.title}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{audience.description}</p>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Prerequisite Note */}
          <div className="max-w-2xl mx-auto mt-8 p-4 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-lg">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Prerequisite:</strong> This course assumes you've completed Course 1 (AI Partner Mastery) or have equivalent personal AI experience. If you're still figuring out personal AI use, <Link href="/academy/ai-partner-mastery" className="text-id8-orange hover:underline">start there</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="section-spacing border-t border-[var(--border)]" id="curriculum">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Curriculum
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              8 modules. ~6 hours. Team transformation.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              From diagnosing resistance to building systems that scale. Everything you need to multiply your AI success.
            </p>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-4"
          >
            {modules.map((module, index) => (
              <m.div key={index} variants={fadeUp}>
                <Link
                  href={module.href}
                  className="flex items-start gap-4 p-5 rounded-xl border bg-[var(--bg-secondary)] border-[var(--border)] hover:border-id8-orange/30 transition-colors group"
                >
                  <span className="text-2xl font-mono font-bold text-id8-orange">
                    {module.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold group-hover:text-id8-orange transition-colors">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm mb-2">{module.description}</p>
                    <p className="text-xs font-mono text-id8-orange">
                      You'll build: {module.deliverable}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-[var(--text-tertiary)] whitespace-nowrap">
                    {module.duration}
                  </span>
                </Link>
              </m.div>
            ))}
          </m.div>

          {/* Start CTA */}
          <div className="text-center mt-12">
            <Link
              href="/academy/ai-at-scale/module-1"
              className="btn btn-primary group inline-flex items-center justify-center gap-2"
            >
              Start Module 1
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Build */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              What You'll Build
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Scalable systems, not just skills
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Team Adoption Plan — How to bring your team along without resistance",
              "AI Budget Model — What AI actually costs at scale",
              "Quality Framework — Ensure consistency when you're not checking everything",
              "Training Curriculum — Teach people who aren't naturally excited",
              "Service Design Document — Offer AI-enhanced services to clients",
              "Workflow Documentation System — Track and improve AI use across people",
              "Error Handling Plan — What to do when AI fails at scale",
              "Evolution Process — Keep your systems current as AI changes",
            ].map((item, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
              >
                <span className="text-id8-orange flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </span>
                <span className="text-[var(--text-primary)]">{item}</span>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service CTA */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Ready for Full Transformation?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              The Build: 8+ weeks of hands-on implementation
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              This course teaches the frameworks. The Build gives you 8+ weeks of hands-on partnership — full operational transformation with custom AI systems built for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="btn btn-primary group inline-flex items-center justify-center gap-2"
              >
                Explore The Build
                <ArrowRightIcon />
              </Link>
              <Link
                href="/academy"
                className="btn btn-secondary group inline-flex items-center justify-center gap-2"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Previous Course */}
              <Link
                href="/academy/private-ai"
                className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl hover:border-id8-orange/30 transition-colors group"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  ← Previous Course
                </p>
                <h3 className="text-lg font-bold group-hover:text-id8-orange transition-colors">Private AI for Sensitive Work</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Use AI when privacy and compliance matter.
                </p>
              </Link>

              {/* Back to Academy */}
              <Link
                href="/academy"
                className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl hover:border-id8-orange/30 transition-colors group"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  Completed the Academy?
                </p>
                <h3 className="text-lg font-bold group-hover:text-id8-orange transition-colors">Explore All Courses</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Browse the full ID8 Academy curriculum.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
