'use client'

import Link from 'next/link'
import { m } from '@/components/motion'

const learningPaths = [
  {
    title: 'AI Foundations',
    description: 'Start here. Learn how to think about AI before touching any tools.',
    badge: 'Free',
    badgeColor: 'bg-green-500',
    courses: [
      { name: 'AI Conversation Fundamentals', duration: '45 min', href: '/courses/ai-conversation-fundamentals' },
      { name: 'Prompt Engineering for Creators', duration: '9 modules', href: '/academy/prompt-engineering-creators', isNew: true },
    ]
  },
  {
    title: 'Claude Mastery',
    description: 'Go from casual user to power user. Build real workflows.',
    badge: '$99',
    badgeColor: 'bg-id8-orange',
    courses: [
      { name: 'Claude Code for Knowledge Workers', duration: '10 modules', href: '/courses/claude-for-knowledge-workers' },
    ]
  },
  {
    title: 'Live Training',
    description: 'Work directly with me. Build your project as the curriculum.',
    badge: 'Instructor-Led',
    badgeColor: 'bg-purple-500',
    courses: [
      { name: 'Claude Code Basics', duration: '90 min', href: '/services#claude-code' },
      { name: 'Claude Code for Builders', duration: '3 sessions', href: '/services#claude-code' },
      { name: 'Build With Claude', duration: '6-week cohort', href: '/services#claude-code' },
    ]
  }
]

export default function Education() {
  return (
    <section id="education" className="section-spacing bg-zone-text scroll-mt-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Headline */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Learn
              <br />
              <span className="text-gradient-orange">the Approach</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--id8-orange)] to-transparent mb-6" />
            <p className="text-xl text-[var(--text-secondary)]">
              From free foundations to live training. Learn to build with AI the way I do.
            </p>
          </m.div>

          {/* Right - Learning Paths */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {learningPaths.map((path, index) => (
              <m.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-[var(--id8-orange)] transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-[var(--text-secondary)]">{path.description}</p>
                  </div>
                  <span className={`${path.badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                    {path.badge}
                  </span>
                </div>

                {/* Courses */}
                <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                  {path.courses.map((course) => (
                    <Link
                      key={course.name}
                      href={course.href}
                      className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {course.isNew && (
                          <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                            New
                          </span>
                        )}
                        <span className="font-medium">{course.name}</span>
                      </div>
                      <span className="text-sm text-[var(--text-tertiary)]">{course.duration}</span>
                    </Link>
                  ))}
                </div>
              </m.div>
            ))}

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 text-[var(--id8-orange)] font-semibold hover:gap-3 transition-all"
              >
                View all courses
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
