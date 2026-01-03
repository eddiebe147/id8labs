'use client'

import { useState, useEffect, useCallback } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number        // Delay before starting (ms)
  speed?: number        // Characters per second
  onComplete?: () => void
  className?: string
  children?: React.ReactNode  // For complex formatted content
}

export default function TypewriterText({
  text,
  delay = 0,
  speed = 60,          // Default: 60 chars/sec (fast but readable)
  onComplete,
  className = '',
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const charInterval = 1000 / speed

  useEffect(() => {
    // Initial delay before typing starts
    const startTimer = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, charInterval)
      return () => clearTimeout(timer)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [hasStarted, displayedText, text, charInterval, isComplete, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {hasStarted && !isComplete && (
        <span className="animate-pulse text-[#ff6b35]">▌</span>
      )}
    </span>
  )
}

// Sequence typewriter - types multiple lines in sequence
interface TypewriterSequenceProps {
  lines: Array<{
    text: string
    className?: string
    element?: 'p' | 'span' | 'div'
  }>
  baseDelay?: number
  speed?: number
  lineGap?: number      // Time gap between lines (ms)
  onComplete?: () => void
}

export function TypewriterSequence({
  lines,
  baseDelay = 0,
  speed = 50,
  lineGap = 200,
  onComplete,
}: TypewriterSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleLineComplete = useCallback(() => {
    setCompletedLines(prev => [...prev, lines[currentLine].text])

    if (currentLine < lines.length - 1) {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1)
        setIsTyping(true)
      }, lineGap)
    } else {
      onComplete?.()
    }
  }, [currentLine, lines, lineGap, onComplete])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, baseDelay)
    return () => clearTimeout(timer)
  }, [baseDelay])

  return (
    <div className="space-y-3">
      {/* Already typed lines */}
      {completedLines.map((text, i) => {
        const Element = lines[i].element || 'p'
        return (
          <Element key={i} className={lines[i].className}>
            {text}
          </Element>
        )
      })}

      {/* Currently typing line */}
      {isTyping && currentLine < lines.length && !completedLines.includes(lines[currentLine].text) && (
        (() => {
          const Element = lines[currentLine].element || 'p'
          return (
            <Element className={lines[currentLine].className}>
              <TypewriterText
                text={lines[currentLine].text}
                speed={speed}
                onComplete={handleLineComplete}
              />
            </Element>
          )
        })()
      )}
    </div>
  )
}
