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

const ShieldIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

// Data
const modules = [
  {
    number: "1",
    title: "The Privacy Landscape",
    duration: "45 min",
    description: "What's actually at stake? Understand the real risks of cloud AI with sensitive information.",
    deliverable: "Personal risk assessment",
    href: "/academy/private-ai/module-1",
  },
  {
    number: "2",
    title: "Your Private AI Setup",
    duration: "60 min",
    description: "Run AI locally on your machine. No data ever leaves your computer. Step-by-step setup.",
    deliverable: "Local AI running on your machine",
    href: "/academy/private-ai/module-2",
  },
  {
    number: "3",
    title: "The Scrub & Use Method",
    duration: "45 min",
    description: "When you need cloud AI power, learn to de-identify first. Get the help without the exposure.",
    deliverable: "De-identification workflow",
    href: "/academy/private-ai/module-3",
  },
  {
    number: "4",
    title: "Boundaries That Work",
    duration: "45 min",
    description: "What's safe for cloud AI? What requires local only? Build your GREEN/YELLOW/RED system.",
    deliverable: "Classification system",
    href: "/academy/private-ai/module-4",
  },
  {
    number: "5",
    title: "Client Communication",
    duration: "45 min",
    description: "How to talk about AI use with clients. Disclosure that builds trust, not anxiety.",
    deliverable: "AI disclosure language",
    href: "/academy/private-ai/module-5",
  },
  {
    number: "6",
    title: "Your AI Policy",
    duration: "45 min",
    description: "Written rules you follow consistently. Professional standards that protect you and your clients.",
    deliverable: "Personal AI policy",
    href: "/academy/private-ai/module-6",
  },
  {
    number: "7",
    title: "When Things Go Wrong",
    duration: "45 min",
    description: "What if there's a breach? An exposure? A mistake? Have a plan before you need one.",
    deliverable: "Incident response plan",
    href: "/academy/private-ai/module-7",
  },
  {
    number: "8",
    title: "Staying Current",
    duration: "30 min",
    description: "AI changes fast. Privacy policies change. Build a sustainable way to stay informed.",
    deliverable: "AI update routine",
    href: "/academy/private-ai/module-8",
  },
]

const audiences = [
  { title: "Consultants", description: "With client confidentiality obligations" },
  { title: "Executive Coaches", description: "Handling sensitive personal information" },
  { title: "Therapists", description: "Who want administrative help within appropriate boundaries" },
  { title: "Lawyers", description: "With privilege and confidentiality concerns" },
  { title: "Financial Advisors", description: "With compliance requirements" },
  { title: "HR Professionals", description: "Handling employee data" },
]

export default function PrivateAIPage() {
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
                Course 3 of 4 • AI Academy
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight mb-6"
            >
              Private AI for{' '}
              <span className="text-gradient-orange">Sensitive Work</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-2xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mb-4 font-medium"
            >
              How do I use AI when privacy and compliance matter?
            </m.p>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              You don't have to choose between AI and trust. Learn to use AI productively while protecting the confidentiality that defines your professional integrity.
            </m.p>

            {/* CTA */}
            <m.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/academy/private-ai/module-1"
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
              8 modules • ~6.5 hours • Completely free
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
              Your reputation is built on{' '}
              <span className="text-gradient-orange">confidentiality</span>.
            </h2>
            <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                You work with sensitive information. Client confidences. Personal struggles. Proprietary data. Information that people <strong className="text-[var(--text-primary)]">trusted you with</strong>.
              </p>
              <p>
                Meanwhile, AI is transforming how knowledge work gets done. Your competitors are getting faster. Your peers are raving about productivity gains.
              </p>
              <p>
                And you're stuck, because every AI tool seems to want your data.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                The question isn't "Should I use AI?" It's "How do I use AI responsibly?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Jennifer */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Guide
              </p>
              <h3 className="text-xl font-bold mb-4">Meet Jennifer Chen</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Jennifer is an executive coach with a thriving practice. She works with C-suite leaders on career transitions, leadership development, and navigating organizational politics.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Her clients share deeply personal information — fears, failures, family situations, health struggles. Information they would never want public. Information that could damage careers and relationships if exposed.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Jennifer watches other coaches adopt AI and rave about productivity gains. She can't imagine pasting her session notes into ChatGPT. But doing everything manually while competitors speed up isn't sustainable either.
              </p>
              <p className="text-[var(--text-secondary)] mt-4 italic">
                Her journey through this course mirrors yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Promise */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-id8-orange/10 text-id8-orange mb-6">
              <ShieldIcon />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              The Core Promise
            </h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              Every module helps you answer the same question: <br />
              <strong className="text-[var(--text-primary)]">"How do I get the benefits of AI without betraying the trust others have placed in me?"</strong>
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
              If you handle information others trusted you with
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
              8 modules. ~6.5 hours. Privacy-first.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              From understanding the risks to building a complete system that protects you and your clients.
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
              href="/academy/private-ai/module-1"
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
              Protection systems, not just knowledge
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Personal Risk Assessment — What's actually at stake for your situation",
              "Local AI Setup — AI running on your machine, data never leaving",
              "Scrub & Use Workflow — De-identify before using cloud AI",
              "GREEN/YELLOW/RED System — What's safe for which type of AI",
              "AI Disclosure Language — How to communicate with clients about AI use",
              "Personal AI Policy — Written rules you follow consistently",
              "Incident Response Plan — What to do if something goes wrong",
              "AI Update Routine — Stay current as things change",
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
              Want Hands-On Setup?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Get your private AI system running fast
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              This course teaches the concepts. Our Workshop gives you 2 hours of live setup assistance — local AI running, workflows configured, policies drafted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="btn btn-primary group inline-flex items-center justify-center gap-2"
              >
                Explore Services
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
                href="/academy/ai-for-leaders"
                className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl hover:border-id8-orange/30 transition-colors group"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  ← Previous Course
                </p>
                <h3 className="text-lg font-bold group-hover:text-id8-orange transition-colors">AI for Leaders</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Make informed AI decisions for your organization.
                </p>
              </Link>

              {/* Next Course */}
              <Link
                href="/academy/ai-at-scale"
                className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl hover:border-id8-orange/30 transition-colors group"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  Next Course →
                </p>
                <h3 className="text-lg font-bold group-hover:text-id8-orange transition-colors">AI at Scale</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Go from personal productivity to team-wide transformation.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
