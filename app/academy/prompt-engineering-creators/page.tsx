'use client'

import Link from 'next/link'
import { m } from '@/components/motion'

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
const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const PlayIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

// Module data with real-world creator examples
const modules = [
  {
    number: 1,
    title: 'The Anatomy of a Great Prompt',
    source: 'Basic Prompt Structure',
    duration: '15 min',
    description: 'What makes prompts work — the building blocks every creator needs.',
    creatorExample: 'Writing a product description vs a blog intro — same product, different prompts.',
    href: '/academy/prompt-engineering-creators/module-1',
  },
  {
    number: 2,
    title: 'Say What You Mean',
    source: 'Being Clear and Direct',
    duration: '15 min',
    description: 'Clarity beats cleverness. How to get exactly what you asked for.',
    creatorExample: 'Getting Claude to match your voice for social posts instead of sounding generic.',
    href: '/academy/prompt-engineering-creators/module-2',
  },
  {
    number: 3,
    title: 'Give Claude a Job Description',
    source: 'Assigning Roles',
    duration: '15 min',
    description: 'Persona-based prompting transforms generic outputs into expert-level work.',
    creatorExample: '"You are my editor who knows my audience" — how role context changes everything.',
    href: '/academy/prompt-engineering-creators/module-3',
  },
  {
    number: 4,
    title: 'Context Without Confusion',
    source: 'Separating Data',
    duration: '15 min',
    description: 'How to feed Claude information without creating a mess.',
    creatorExample: 'Giving Claude your brand guidelines + the task — structured context that works.',
    href: '/academy/prompt-engineering-creators/module-4',
  },
  {
    number: 5,
    title: 'Get the Format You Need',
    source: 'Formatting Output',
    duration: '15 min',
    description: 'Markdown, lists, tables, scripts — get exactly the structure you need.',
    creatorExample: 'Getting script formats, outline structures, and Twitter thread formats.',
    href: '/academy/prompt-engineering-creators/module-5',
  },
  {
    number: 6,
    title: 'Help Claude Think',
    source: 'Chain of Thought',
    duration: '15 min',
    description: 'Step-by-step reasoning for complex tasks that require nuance.',
    creatorExample: 'Research synthesis that doesn\'t miss the nuance — making Claude show its work.',
    href: '/academy/prompt-engineering-creators/module-6',
  },
  {
    number: 7,
    title: 'Show, Don\'t Just Tell',
    source: 'Few-shot Learning',
    duration: '15 min',
    description: 'Examples are the secret weapon. Teach Claude by showing.',
    creatorExample: 'Teaching Claude your newsletter style by showing 3 past examples.',
    href: '/academy/prompt-engineering-creators/module-7',
  },
  {
    number: 8,
    title: 'Keep Claude Honest',
    source: 'Avoiding Hallucinations',
    duration: '15 min',
    description: 'Accuracy techniques for content you\'ll actually publish.',
    creatorExample: 'Fact-checking claims, citing sources, and knowing when Claude doesn\'t know.',
    href: '/academy/prompt-engineering-creators/module-8',
  },
  {
    number: 9,
    title: 'Build Your Prompt Library',
    source: 'Complex Prompts',
    duration: '20 min',
    description: 'Templates and systems for recurring creative work.',
    creatorExample: 'Your personal system prompts for research, writing, and operations.',
    href: '/academy/prompt-engineering-creators/module-9',
  },
]

// What you'll learn
const learningOutcomes = [
  'Write prompts that get exactly what you need on the first try',
  'Make Claude match your voice and style',
  'Structure complex research and analysis tasks',
  'Build reusable templates for your recurring work',
  'Know when Claude is confident vs. guessing',
  'Create a personal prompt library for your workflows',
]

// Who this is for
const targetAudience = [
  {
    title: 'Newsletter writers',
    description: 'Draft, edit, and research faster without losing your voice.',
  },
  {
    title: 'Content creators',
    description: 'Scripts, outlines, and research for YouTube, podcasts, and more.',
  },
  {
    title: 'Indie makers',
    description: 'Product copy, documentation, and customer communication.',
  },
  {
    title: 'Freelancers & consultants',
    description: 'Proposals, reports, and client deliverables.',
  },
]

export default function PromptEngineeringCreatorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <m.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-sm font-mono uppercase tracking-wider bg-green-500 text-white rounded">
                Free Course
              </span>
              <span className="px-3 py-1 text-sm font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                New
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight mb-8"
            >
              Prompt Engineering
              <br />
              <span className="text-gradient-orange">for Creators</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-6 leading-relaxed"
            >
              Learn the 9 techniques that make every AI conversation more effective — through real examples from writers, content creators, and indie makers.
            </m.p>

            <m.p
              variants={fadeUp}
              className="text-lg text-[var(--text-tertiary)] mb-10"
            >
              Based on Anthropic's official tutorial. Translated for non-technical creators.
            </m.p>

            <m.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/academy/prompt-engineering-creators/module-1"
                className="btn btn-primary hover-lift group inline-flex items-center gap-3"
              >
                <PlayIcon />
                Start Module 1
              </Link>
              <Link
                href="#modules"
                className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50"
              >
                View All 9 Modules
              </Link>
            </m.div>
          </m.div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* What Makes This Different */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The ID8Labs Approach
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Real examples,
                <br />
                <span className="text-gradient-orange">not abstract concepts.</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Anthropic's tutorial teaches the techniques. We show you how a newsletter writer, a YouTuber, or an indie maker actually uses them.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Every module includes before/after prompt comparisons and practice exercises with your own content.
              </p>
            </div>

            <m.ul
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="space-y-4"
            >
              {learningOutcomes.map((outcome, index) => (
                <m.li
                  key={index}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <CheckIcon />
                  <span className="text-lg text-[var(--text-secondary)]">{outcome}</span>
                </m.li>
              ))}
            </m.ul>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]" id="modules">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              9 Modules
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              The complete curriculum
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto">
              Each module takes 15-20 minutes. Finish the whole course in under 3 hours.
            </p>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-4xl mx-auto space-y-4"
          >
            {modules.map((module, index) => (
              <m.div
                key={module.number}
                variants={fadeUp}
              >
                <Link
                  href={module.href}
                  className="block card hover:border-id8-orange/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/10 text-id8-orange flex items-center justify-center font-mono font-bold">
                      {module.number}
                    </span>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold group-hover:text-id8-orange transition-colors">
                          {module.title}
                        </h3>
                        <span className="text-xs font-mono text-[var(--text-tertiary)]">
                          {module.duration}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] mb-2">
                        {module.description}
                      </p>
                      <p className="text-sm text-id8-orange">
                        <span className="font-medium">Creator example:</span> {module.creatorExample}
                      </p>
                    </div>
                    <ArrowRightIcon />
                  </div>
                </Link>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Who This Is For
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Built for creators who make things
            </h2>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
          >
            {targetAudience.map((audience, index) => (
              <m.div
                key={index}
                variants={fadeUp}
                className="card text-center"
              >
                <h3 className="font-bold mb-2">{audience.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{audience.description}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Source Attribution */}
      <section className="py-12 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-[var(--text-tertiary)] mb-2">
              Content based on
            </p>
            <p className="text-lg font-medium text-[var(--text-secondary)]">
              Anthropic's Prompt Engineering Tutorial
            </p>
            <p className="text-sm text-[var(--text-tertiary)] mt-2">
              Adapted and expanded with real-world creator examples by ID8Labs
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-lg relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to level up your prompts?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-10">
              Start with Module 1 and work through at your own pace. Each module builds on the last.
            </p>

            <Link
              href="/academy/prompt-engineering-creators/module-1"
              className="btn btn-primary hover-lift group inline-flex items-center gap-3 text-lg px-8 py-4"
            >
              <PlayIcon />
              Start Module 1
            </Link>

            <p className="mt-6 text-sm font-mono text-[var(--text-tertiary)]">
              Free. 9 modules. ~2.5 hours total.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
