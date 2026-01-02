'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursor?: boolean
}

export default function Typewriter({
  text,
  speed = 0.05,
  delay = 0,
  className = '',
  cursor = true
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (isInView && !hasStartedRef.current) {
      hasStartedRef.current = true
      
      let currentIndex = 0
      const startTimeout = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayText((prev) => prev + text[currentIndex])
            currentIndex++
          } else {
            clearInterval(interval)
          }
        }, speed * 1000)
        
        return () => clearInterval(interval)
      }, delay * 1000)
      
      return () => clearTimeout(startTimeout)
    }
  }, [isInView, text, speed, delay])

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  )
}
