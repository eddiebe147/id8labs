'use client'

import { useRef, useState, useEffect } from 'react'
import { m, useInView } from '@/components/motion'

// ============================================
// Section type for navigation
// ============================================

export interface Section {
  id: string
  title: string
}

// ============================================
// FadeInSection - Animated section wrapper
// ============================================

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
}

export function FadeInSection({ children, delay = 0 }: FadeInSectionProps): React.ReactElement {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  )
}

// ============================================
// StickySection - Section with sticky header
// ============================================

interface StickySectionProps {
  id: string
  title: string
  children: React.ReactNode
}

export function StickySection({ id, title, children }: StickySectionProps): React.ReactElement {
  return (
    <section id={id} className="mb-16 scroll-mt-32">
      <div className="sticky top-20 z-10 mb-6 -mx-4 px-4 py-4 backdrop-blur-md bg-[var(--bg-primary)]/80 rounded-subtle">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <FadeInSection>
        <div className="space-y-6">{children}</div>
      </FadeInSection>
    </section>
  )
}

// ============================================
// SideNavigation - Right-side navigation dots
// ============================================

interface SideNavigationProps {
  sections: Section[]
  activeSection: string
}

export function SideNavigation({ sections, activeSection }: SideNavigationProps): React.ReactElement {
  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-20">
      <ul className="space-y-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-3 text-sm transition-all"
                aria-label={`Jump to ${section.title}`}
              >
                <div
                  className={`h-2 rounded-full transition-all ${
                    isActive
                      ? 'w-12 bg-[var(--id8-orange)]'
                      : 'w-8 bg-[var(--border)] group-hover:w-10 group-hover:bg-[var(--text-secondary)]'
                  }`}
                />
                <span
                  className={`transition-all ${
                    isActive
                      ? 'text-[var(--id8-orange)] font-medium opacity-100'
                      : 'text-[var(--text-secondary)] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {section.title}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// ============================================
// useSectionObserver - Hook for tracking active section
// ============================================

export function useSectionObserver(sections: Section[], initialSection: string): string {
  const [activeSection, setActiveSection] = useState(initialSection)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          })
        },
        {
          rootMargin: '-20% 0px -60% 0px',
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sections])

  return activeSection
}
