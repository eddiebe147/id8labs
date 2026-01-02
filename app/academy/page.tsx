'use client'

import Link from 'next/link'
import { m } from '@/components/motion'
import { PRODUCTS, getProductsByCategory } from '@/lib/products'

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

// Icon components
const BookOpenIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)

const GraduationCapIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)

const UsersIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

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

// Learning paths data
const learningPaths = [
  {
    icon: <BookOpenIcon />,
    title: 'AI Foundations',
    description: 'Start here. Learn how to think about AI before touching any tools.',
    badge: 'Free',
    badgeColor: 'bg-green-500',
    courses: [
      { name: 'AI Conversation Fundamentals', duration: '45 min', href: '/courses/ai-conversation-fundamentals', free: true },
      { name: 'Prompt Engineering for Creators', duration: '9 modules', href: '/academy/prompt-engineering-creators', free: true, isNew: true },
    ]
  },
  {
    icon: <GraduationCapIcon />,
    title: 'Claude Mastery',
    description: 'Go from casual user to power user. Build real workflows.',
    badge: 'Self-Paced',
    badgeColor: 'bg-id8-orange',
    courses: [
      { name: 'Claude Code for Knowledge Workers', duration: '10 modules', href: '/courses/claude-for-knowledge-workers', price: '$99' },
    ]
  },
  {
    icon: <UsersIcon />,
    title: 'Live Training',
    description: 'Work directly with me. Build your project as the curriculum.',
    badge: 'Instructor-Led',
    badgeColor: 'bg-purple-500',
    courses: [
      { name: 'Claude Code Basics', duration: '90 min', href: '/services#claude-code', price: '$149' },
      { name: 'Claude Code for Builders', duration: '3 sessions', href: '/services#claude-code', price: '$497' },
      { name: 'Build With Claude', duration: '6-week cohort', href: '/services#claude-code', price: '$1,497' },
    ]
  }
]

// Featured courses
const featuredCourses = [
  {
    id: 'prompt-engineering-creators',
    title: 'Prompt Engineering for Creators',
    subtitle: 'NEW • Free Course',
    description: 'Learn the 9 techniques that make every AI conversation more effective — through real examples from writers, content creators, and indie makers.',
    features: [
      'Real-world examples, not theory',
      '9 modules from Anthropic, translated for creators',
      'Before/after prompt comparisons',
      'Build your own prompt library',
    ],
    href: '/academy/prompt-engineering-creators',
    badge: 'Free',
    badgeColor: 'bg-green-500',
    isNew: true,
  },
  {
    id: 'ai-conversation-fundamentals',
    title: 'AI Conversation Fundamentals',
    subtitle: 'Foundation Course',
    description: 'The mental models that make every AI interaction more effective. Start here if you\'re new to AI.',
    features: [
      'How to think about AI conversations',
      'Context, clarity, and iteration',
      'Self-paced video lessons',
      '45 minutes total',
    ],
    href: '/courses/ai-conversation-fundamentals',
    badge: 'Free',
    badgeColor: 'bg-green-500',
  },
  {
    id: 'claude-for-knowledge-workers',
    title: 'Claude Code for Knowledge Workers',
    subtitle: 'Premium Course',
    description: 'Complete 10-module course teaching non-programmers how to use Claude Code. No coding required — just delegation.',
    features: [
      'Module 0 free to try',
      'File processing & document workflows',
      'Research & analysis automation',
      'Build your operating system',
    ],
    href: '/courses/claude-for-knowledge-workers',
    badge: '$99',
    badgeColor: 'bg-id8-orange',
    originalPrice: '$197',
  }
]

// Why ID8Labs differentiators
const differentiators = [
  {
    title: 'Real examples, not abstract concepts',
    description: 'Every technique is taught through actual creator scenarios — writing, research, content, operations.',
  },
  {
    title: 'Built by a creator, for creators',
    description: '20+ years in film production taught me systems. Now I translate AI into practical workflows.',
  },
  {
    title: 'Free foundation, paid depth',
    description: 'Start with free courses to build mental models. Go deeper only if you want to.',
  },
  {
    title: 'Pathways, not random courses',
    description: 'Clear progression from foundations to mastery. Know exactly what to learn next.',
  },
]

export default function AcademyPage() {
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
              className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              Not another abstract tutorial. Learn prompt engineering and AI workflows through real scenarios from writers, content creators, and indie makers. Start free.
            </m.p>

            <m.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/academy/prompt-engineering-creators"
                className="btn btn-primary hover-lift group inline-flex items-center gap-3"
              >
                Start Free Course
                <ArrowRightIcon />
              </Link>
              <Link
                href="#courses"
                className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50"
              >
                Browse All Courses
              </Link>
            </m.div>
          </m.div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Learning Paths Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Learning Paths
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Three paths to AI fluency
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto">
              Start with foundations for free, then go as deep as you want.
            </p>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {learningPaths.map((path, index) => (
              <m.div
                key={index}
                variants={fadeUp}
                className="card hover:border-[var(--border-light)] flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-id8-orange">{path.icon}</span>
                  <span className={`px-2 py-1 text-xs font-mono uppercase tracking-wider ${path.badgeColor} text-white rounded`}>
                    {path.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <p className="text-[var(--text-secondary)] mb-6 flex-grow">{path.description}</p>

                <div className="space-y-3 pt-4 border-t border-[var(--border)]">
                  {path.courses.map((course, courseIndex) => (
                    <Link
                      key={courseIndex}
                      href={course.href}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium group-hover:text-id8-orange transition-colors">
                          {course.name}
                        </span>
                        {'isNew' in course && course.isNew && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-tertiary)]">{course.duration}</span>
                        {'free' in course && course.free ? (
                          <span className="text-xs font-mono text-green-500">Free</span>
                        ) : 'price' in course && course.price && (
                          <span className="text-xs font-mono text-id8-orange">{course.price}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]" id="courses">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Courses
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Start learning today
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto">
              Pick a course based on where you are in your AI journey.
            </p>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-6"
          >
            {featuredCourses.map((course, index) => (
              <m.div
                key={course.id}
                variants={fadeUp}
                className={`card-featured flex flex-col ${course.isNew ? 'ring-2 ring-id8-orange/50' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                    {course.subtitle}
                  </span>
                  <div className="flex items-center gap-2">
                    {course.originalPrice && (
                      <span className="text-xs font-mono text-[var(--text-tertiary)] line-through">
                        {course.originalPrice}
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-mono uppercase tracking-wider ${course.badgeColor} text-white rounded`}>
                      {course.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{course.title}</h3>
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
                  className={`btn text-center group inline-flex items-center justify-center gap-2 ${
                    course.badgeColor === 'bg-green-500'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'btn-primary'
                  }`}
                >
                  {course.badge === 'Free' ? 'Start Free' : 'Learn More'}
                  <ArrowRightIcon />
                </Link>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Why ID8Labs Section */}
      <section className="section-spacing border-t border-[var(--border)]">
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
                Most AI courses teach abstract concepts. We show you exactly how a newsletter writer, a YouTuber, or an indie maker actually uses these techniques — then you try it yourself.
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Start with free foundations
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-10">
              The best way to learn AI is to use it. Our free courses give you the mental models — then you practice with your own work.
            </p>

            <Link
              href="/academy/prompt-engineering-creators"
              className="btn btn-primary hover-lift group inline-flex items-center gap-3 text-lg px-8 py-4"
            >
              Start Prompt Engineering Course
              <ArrowRightIcon />
            </Link>

            <p className="mt-6 text-sm font-mono text-[var(--text-tertiary)]">
              Free. 9 modules. Real creator examples.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
