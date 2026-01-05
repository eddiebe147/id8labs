import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CourseProgress from '@/components/CourseProgress'

// Mock framer-motion to avoid animation issues in tests
vi.mock('@/components/motion', () => ({
  m: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
}))

describe('CourseProgress', () => {
  describe('Rendering', () => {
    it('should render progress bar and module counter', () => {
      render(
        <CourseProgress currentModule={3} totalModules={6} />
      )

      expect(screen.getByText('Module 3 of 6')).toBeInTheDocument()
    })

    it('should render course title when provided', () => {
      render(
        <CourseProgress
          currentModule={1}
          totalModules={6}
          courseTitle="AI Conversation Fundamentals"
        />
      )

      expect(screen.getByText('AI Conversation Fundamentals')).toBeInTheDocument()
    })

    it('should not render course title when not provided', () => {
      render(
        <CourseProgress currentModule={1} totalModules={6} />
      )

      // The module counter should be visible, but no course title
      expect(screen.getByText('Module 1 of 6')).toBeInTheDocument()
      expect(screen.queryByText('AI Conversation Fundamentals')).not.toBeInTheDocument()
    })
  })

  describe('Progress Calculation', () => {
    it('should show 0% progress at module 0', () => {
      const { container } = render(
        <CourseProgress currentModule={0} totalModules={6} />
      )

      expect(screen.getByText('Module 0 of 6')).toBeInTheDocument()
    })

    it('should show correct progress at start (module 1)', () => {
      render(
        <CourseProgress currentModule={1} totalModules={6} />
      )

      expect(screen.getByText('Module 1 of 6')).toBeInTheDocument()
    })

    it('should show correct progress midway', () => {
      render(
        <CourseProgress currentModule={3} totalModules={6} />
      )

      expect(screen.getByText('Module 3 of 6')).toBeInTheDocument()
    })

    it('should show 100% progress at completion', () => {
      render(
        <CourseProgress currentModule={6} totalModules={6} />
      )

      expect(screen.getByText('Module 6 of 6')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle single module course', () => {
      render(
        <CourseProgress currentModule={1} totalModules={1} />
      )

      expect(screen.getByText('Module 1 of 1')).toBeInTheDocument()
    })

    it('should handle large module counts', () => {
      render(
        <CourseProgress currentModule={50} totalModules={100} />
      )

      expect(screen.getByText('Module 50 of 100')).toBeInTheDocument()
    })
  })
})
