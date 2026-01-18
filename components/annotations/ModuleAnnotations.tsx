'use client'

import { ReactNode } from 'react'
import { AnnotationProvider } from './AnnotationProvider'
import { HighlightableContent } from './HighlightableContent'
import { NotesSidebar } from './NotesSidebar'
import { QuickNoteButton } from './QuickNoteButton'

interface ModuleAnnotationsProps {
  children: ReactNode
  courseSlug: string
  moduleSlug: string
  /**
   * Class name to apply to the highlightable content wrapper
   */
  contentClassName?: string
  /**
   * Whether to show the floating quick note button (default: true)
   */
  showQuickNoteButton?: boolean
  /**
   * Whether to enable text selection highlighting (default: true)
   */
  enableHighlighting?: boolean
}

/**
 * Wrapper component for module pages that enables the annotation system.
 *
 * Usage:
 * ```tsx
 * <ModuleAnnotations courseSlug="private-ai" moduleSlug="module-2">
 *   <div className="prose">
 *     {/* Your module content *//*}
 *   </div>
 * </ModuleAnnotations>
 * ```
 *
 * This wraps your content with:
 * - AnnotationProvider (context for annotation state)
 * - HighlightableContent (enables text selection → highlight)
 * - NotesSidebar (slide-out panel for viewing/managing notes)
 * - QuickNoteButton (floating button to open sidebar)
 */
export function ModuleAnnotations({
  children,
  courseSlug,
  moduleSlug,
  contentClassName = '',
  showQuickNoteButton = true,
  enableHighlighting = true,
}: ModuleAnnotationsProps) {
  return (
    <AnnotationProvider courseSlug={courseSlug} moduleSlug={moduleSlug}>
      {enableHighlighting ? (
        <HighlightableContent className={contentClassName}>
          {children}
        </HighlightableContent>
      ) : (
        <div className={contentClassName}>{children}</div>
      )}

      {/* Sidebar - rendered outside content for proper z-index */}
      <NotesSidebar />

      {/* Quick note button */}
      {showQuickNoteButton && <QuickNoteButton />}
    </AnnotationProvider>
  )
}

/**
 * Alternative: Just the provider and sidebar without highlighting.
 * Use this if you want to handle highlighting manually or only want notes.
 */
export function ModuleAnnotationsSimple({
  children,
  courseSlug,
  moduleSlug,
  showQuickNoteButton = true,
}: Omit<ModuleAnnotationsProps, 'contentClassName' | 'enableHighlighting'>) {
  return (
    <AnnotationProvider courseSlug={courseSlug} moduleSlug={moduleSlug}>
      {children}
      <NotesSidebar />
      {showQuickNoteButton && <QuickNoteButton />}
    </AnnotationProvider>
  )
}
