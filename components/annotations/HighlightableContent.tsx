'use client'

import { useState, useCallback, useRef, ReactNode, useEffect } from 'react'
import { HighlightPopover } from './HighlightPopover'
import { HighlightedText } from './HighlightedText'
import { useAnnotationContextSafe } from './AnnotationProvider'

interface Position {
  x: number
  y: number
}

interface HighlightableContentProps {
  children: ReactNode
  className?: string
}

export function HighlightableContent({ children, className = '' }: HighlightableContentProps) {
  const context = useAnnotationContextSafe()
  const containerRef = useRef<HTMLDivElement>(null)
  const [popoverPosition, setPopoverPosition] = useState<Position | null>(null)
  const [selectedText, setSelectedText] = useState('')
  const [textContext, setTextContext] = useState({ prefix: '', suffix: '' })

  // Handle text selection
  const handleMouseUp = useCallback(() => {
    // Small delay to let selection finalize
    setTimeout(() => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed) {
        return
      }

      const text = selection.toString().trim()
      if (text.length < 3) {
        // Ignore very short selections
        return
      }

      // Get selection bounds
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      // Check if selection is within our container
      if (!containerRef.current?.contains(range.commonAncestorContainer)) {
        return
      }

      // Get text context for re-positioning later
      const fullText = range.commonAncestorContainer.textContent || ''
      const selectionStart = range.startOffset
      const prefix = fullText.substring(Math.max(0, selectionStart - 50), selectionStart)
      const suffix = fullText.substring(
        selectionStart + text.length,
        Math.min(fullText.length, selectionStart + text.length + 50)
      )

      setSelectedText(text)
      setTextContext({ prefix, suffix })
      setPopoverPosition({
        x: rect.left + rect.width / 2 - 100, // Center popover
        y: rect.bottom + window.scrollY,
      })
    }, 10)
  }, [])

  const handleClosePopover = useCallback(() => {
    setPopoverPosition(null)
    setSelectedText('')
    setTextContext({ prefix: '', suffix: '' })
    window.getSelection()?.removeAllRanges()
  }, [])

  // Clear selection when clicking elsewhere
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed) {
        // Don't close if popover is visible (user might be interacting with it)
        if (!popoverPosition) return
      }
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [popoverPosition])

  // If no context, just render children without highlighting capability
  if (!context) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={containerRef}
      className={`highlightable-content ${className}`}
      onMouseUp={handleMouseUp}
    >
      {/* Render existing highlights */}
      <HighlightOverlay />

      {/* Original content */}
      {children}

      {/* Popover for new highlights */}
      {popoverPosition && (
        <HighlightPopover
          position={popoverPosition}
          selectedText={selectedText}
          textPrefix={textContext.prefix}
          textSuffix={textContext.suffix}
          onClose={handleClosePopover}
        />
      )}
    </div>
  )
}

// Renders the highlight markers/overlays
function HighlightOverlay() {
  const context = useAnnotationContextSafe()

  if (!context || context.moduleHighlights.length === 0) {
    return null
  }

  // Note: Full text highlighting with DOM manipulation is complex.
  // For now, we'll show highlights in a sidebar/panel view.
  // A production implementation would use a library like react-highlight-words
  // or implement custom Range-based highlighting.

  return null
}

// CSS for highlight colors (add to global styles or component)
export const highlightStyles = `
  .highlight-yellow { background-color: rgba(253, 224, 71, 0.5); }
  .highlight-green { background-color: rgba(134, 239, 172, 0.5); }
  .highlight-blue { background-color: rgba(147, 197, 253, 0.5); }
  .highlight-pink { background-color: rgba(249, 168, 212, 0.5); }

  .highlight-yellow:hover { background-color: rgba(253, 224, 71, 0.7); }
  .highlight-green:hover { background-color: rgba(134, 239, 172, 0.7); }
  .highlight-blue:hover { background-color: rgba(147, 197, 253, 0.7); }
  .highlight-pink:hover { background-color: rgba(249, 168, 212, 0.7); }
`
