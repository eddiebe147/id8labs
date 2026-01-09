'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { m } from '@/components/motion'
import { LearningRoadmap, AcademyProgressBar, ResumeButton } from '@/components/progress'
import { createClient } from '@/lib/supabase/client'

// Animation variants - start visible to avoid FOUC if JS fails
const fadeUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Icon components
const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// Full course catalog with all details
const coursesCatalog = [
  {
    id: 'ai-conversation-fundamentals',
    title: 'AI Conversation Fundamentals',
    subtitle: 'Foundation Course',
    description: 'Start here. Learn how to think about AI conversations before touching any tools. The mental models that make every AI interaction more effective.',
    modules: 6,
    duration: '45 min',
    href: '/courses/ai-conversation-fundamentals',
    isFoundation: true,
    features: [
      'How to think about AI conversations',
      'Context, clarity, and iteration',
      'Self-paced video lessons',
      'Required to unlock other courses',
    ]
  },
  {
    id: 'ai-partner-mastery',
    title: 'AI Partner Mastery',
    subtitle: 'Work WITH AI',
    description: 'Go beyond prompts. Learn to work with AI as a partner in your daily workflow. Real collaboration techniques for knowledge workers.',
    modules: 8,
    duration: '8 modules',
    href: '/academy/ai-partner-mastery',
    isFoundation: false,
    features: [
      'Day-to-day AI collaboration',
      'Task delegation frameworks',
      'Quality control techniques',
      'Build your AI partnership system',
    ]
  },
  {
    id: 'prompt-engineering-creators',
    title: 'Prompt Engineering for Creators',
    subtitle: 'Better Prompts & Outputs',
    description: 'Learn the 9 techniques that make every AI conversation more effective - through real examples from writers, content creators, and indie makers.',
    modules: 9,
    duration: '9 modules',
    href: '/academy/prompt-engineering-creators',
    isFoundation: false,
    isNew: true,
    features: [
      'Real-world examples, not theory',
      '9 modules from Anthropic, translated for creators',
      'Before/after prompt comparisons',
      'Build your own prompt library',
    ]
  },
  {
    id: 'claude-for-knowledge-workers',
    title: 'Claude Code for Knowledge Workers',
    subtitle: 'Deep Dive Course',
    description: 'Complete 10-module course teaching non-programmers how to use Claude Code. No coding required - just delegation. From file processing to building your operating system.',
    modules: 10,
    duration: '10 modules',
    href: '/courses/claude-for-knowledge-workers',
    isFoundation: false,
    features: [
      'Full 10-module course',
      'File processing & document workflows',
      'Research & analysis automation',
      'Build your operating system',
    ]
  },
  {
    id: 'ai-for-leaders',
    title: 'AI for Leaders',
    subtitle: 'Organizational Strategy',
    description: 'Strategic decision-making for leaders adopting AI. From vision to execution, governance to change management.',
    modules: 8,
    duration: '8 modules',
    href: '/academy/ai-for-leaders',
    isFoundation: false,
    features: [
      'Strategic AI vision and roadmaps',
      'Decision frameworks for AI adoption',
      'Change management and culture',
      'Risk and governance',
    ]
  },
  {
    id: 'ai-at-scale',
    title: 'AI at Scale',
    subtitle: 'Team Adoption',
    description: 'Scale AI across your organization. Processes, standards, measurement, and sustainable team adoption.',
    modules: 8,
    duration: '8 modules',
    href: '/academy/ai-at-scale',
    isFoundation: false,
    features: [
      'Team adoption frameworks',
      'Process standardization',
      'Measurement and ROI',
      'Sustainable scaling practices',
    ]
  },
  {
    id: 'private-ai',
    title: 'Private AI',
    subtitle: 'Security & Compliance',
    description: 'Data privacy, security, and compliance for AI adoption. Protect your data while leveraging AI capabilities.',
    modules: 8,
    duration: '8 modules',
    href: '/academy/private-ai',
    isFoundation: false,
    features: [
      'Data privacy best practices',
      'Security frameworks',
      'Compliance requirements',
      'Private deployment options',
    ]
  }
]

// Why ID8Labs differentiators
const differentiators = [
  {
    title: 'Real examples, not abstract concepts',
    description: 'Every technique is taught through actual creator scenarios - writing, research, content, operations.',
  },
  {
    title: 'Built by a creator, for creators',
    description: '20+ years in film production taught me systems. Now I translate AI into practical workflows.',
  },
  {
    title: 'No paywalls, no upsells',
    description: 'All 57 modules across 7 courses. No gated content. Learn at your own pace.',
  },
  {
    title: 'Pathways, not random courses',
    description: 'Clear progression from foundations to mastery. Know exactly what to learn next.',
  },
]

export default function AcademyPage() {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsSignedIn(!!user)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session?.user)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

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
            <m.p
              variants={fadeUp}
              className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-6"
            >
              ID8Labs Academy
            </m.p>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-bold tracking-tight mb-8"
            >
              Learn AI through
              <br />
              <span className="text-gradient-orange">real examples.</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed"
            >
              Not another abstract tutorial. Learn prompt engineering and AI workflows through real scenarios from writers, content creators, and indie makers. All courses free.
            </m.p>

            {/* Progress Bar for logged-in users */}
            <m.div variants={fadeUp} className="mb-8 max-w-md">
              <AcademyProgressBar />
            </m.div>

            {/* Resume Button (shows for logged-in users) or Start buttons */}
            <m.div variants={fadeUp} className="flex flex-wrap gap-4 items-start">
              <ResumeButton />
              <Link
                href="#curriculum"
                className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50"
              >
                View Full Curriculum
              </Link>
            </m.div>
          </m.div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Learning Roadmap Section */}
      <section className="py-16 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Your Learning Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              One foundation unlocks six specializations
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Complete AI Conversation Fundamentals to unlock all advanced courses. Choose your own path based on your goals.
            </p>
          </div>

          <LearningRoadmap />
        </div>
      </section>

      {/* Sign In Benefits Section - Only show when not signed in */}
      {isSignedIn === false && (
        <section className="py-12 border-t border-[var(--border)]">
          <div className="container">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="card bg-gradient-to-br from-id8-orange/5 to-transparent border-id8-orange/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-2">
                      Your Account
                    </p>
                    <h3 className="text-2xl font-bold mb-3">
                      Sign in to track your progress
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-4">
                      Create an account to unlock the full learning experience.
                    </p>

                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 text-green-500">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                          </svg>
                        </span>
                        <span className="text-sm"><strong>Save your place</strong> - Resume exactly where you left off</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-500">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                          </svg>
                        </span>
                        <span className="text-sm"><strong>Add notes</strong> - Capture insights as you learn</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-id8-orange/10 text-id8-orange">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="8" r="7"/>
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                          </svg>
                        </span>
                        <span className="text-sm"><strong>Earn certificates</strong> - Showcase your completion</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 text-purple-500">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                        </span>
                        <span className="text-sm"><strong>Track completion</strong> - See your progress across all courses</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <Link
                      href="/auth/signin?redirect=/academy"
                      className="btn btn-primary text-center group inline-flex items-center justify-center gap-2"
                    >
                      Sign In
                      <ArrowRightIcon />
                    </Link>
                    <Link
                      href="/auth/signup?redirect=/academy"
                      className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 text-center"
                    >
                      Create Account
                    </Link>
                    <p className="text-xs text-[var(--text-tertiary)] text-center">
                      No credit card required
                    </p>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>
      )}

      {/* Full Course Catalog */}
      <section className="section-spacing" id="curriculum">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Complete Curriculum
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              All courses. All modules. Your journey.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              7 courses, 57 total modules covering everything from AI fundamentals to organizational scaling.
            </p>
          </div>

          {/* Foundation Course - Full Width */}
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-12"
          >
            <div className="card-featured max-w-4xl mx-auto ring-2 ring-id8-orange/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                  {coursesCatalog[0].subtitle}
                </span>
                <span className="px-2 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                  Start Here
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{coursesCatalog[0].title}</h3>
                  <p className="text-[var(--text-secondary)] mb-4">{coursesCatalog[0].description}</p>
                  <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)] mb-4">
                    <span>{coursesCatalog[0].modules} modules</span>
                    <span>•</span>
                    <span>{coursesCatalog[0].duration}</span>
                  </div>
                </div>

                <div>
                  <ul className="space-y-2 mb-6">
                    {coursesCatalog[0].features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckIcon />
                        <span className="text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={coursesCatalog[0].href}
                    className="btn bg-id8-orange text-white hover:bg-id8-orange/90 w-full text-center group inline-flex items-center justify-center gap-2"
                  >
                    Start Foundation Course
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            </div>
          </m.div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12 max-w-4xl mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-[var(--border)]" />
            <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              Then choose your path
            </p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--border)] to-[var(--border)]" />
          </div>

          {/* Advanced Courses Grid */}
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coursesCatalog.slice(1).map((course, index) => (
              <m.div
                key={course.id}
                variants={fadeUp}
                className={`card-featured flex flex-col ${course.isNew ? 'ring-2 ring-id8-orange/30' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                    {course.subtitle}
                  </span>
                  {course.isNew && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                      New
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{course.title}</h3>

                <div className="flex items-center gap-3 text-sm text-[var(--text-tertiary)] mb-3">
                  <span className="font-mono">{course.modules} modules</span>
                  <span>•</span>
                  <span>{course.duration}</span>
                </div>

                <p className="text-[var(--text-secondary)] mb-6 flex-grow">{course.description}</p>

                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <CheckIcon />
                      <span className="text-[var(--text-secondary)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={course.href}
                  className="btn btn-primary text-center group inline-flex items-center justify-center gap-2"
                >
                  Start Course
                  <ArrowRightIcon />
                </Link>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Why ID8Labs Section */}
      <section className="section-spacing bg-[var(--bg-secondary)] border-y border-[var(--border)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Why ID8Labs Academy
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Learn through doing,
                <br />
                <span className="text-gradient-orange">not watching.</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Most AI courses teach abstract concepts. We show you exactly how a newsletter writer, a YouTuber, or an indie maker actually uses these techniques - then you try it yourself.
              </p>
            </div>

            <m.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="grid sm:grid-cols-2 gap-5"
            >
              {differentiators.map((diff, index) => (
                <m.div
                  key={index}
                  variants={fadeUp}
                  className="card"
                >
                  <h3 className="font-bold mb-2">{diff.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{diff.description}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      {/* Implementation Services Cross-link */}
      <section className="py-12 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-2">Need hands-on implementation?</h3>
              <p className="text-[var(--text-secondary)]">
                If you'd rather have AI workflows built for you, check out our implementation services.
              </p>
            </div>
            <Link
              href="/services"
              className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 whitespace-nowrap group inline-flex items-center gap-2"
            >
              View Services
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-lg relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Start with foundations
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-10">
              The best way to learn AI is to use it. Get the mental models first, then practice with your own work.
            </p>

            <Link
              href="/courses/ai-conversation-fundamentals"
              className="btn btn-primary hover-lift group inline-flex items-center gap-3 text-lg px-8 py-4"
            >
              Start Foundation Course
              <ArrowRightIcon />
            </Link>

            <p className="mt-6 text-sm font-mono text-[var(--text-tertiary)]">
              6 modules. 45 minutes. Unlocks everything.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
