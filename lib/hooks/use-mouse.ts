'use client'

import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom hook for smooth mouse position tracking
 * Uses Framer Motion spring physics for natural, non-jittery movement
 */
export function useMouse() {
  // Raw motion values for mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring-animated values for smooth following
  // damping: 25 - Controls bounce/overshoot (higher = less bounce)
  // stiffness: 200 - Controls speed of response (higher = faster)
  const springConfig = { damping: 25, stiffness: 200 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update raw values - spring handles smoothing
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseLeave = () => {
      // Optional: Reset to center when mouse leaves viewport
      // Comment out if you want cursor to stay at last position
      // mouseX.set(window.innerWidth / 2)
      // mouseY.set(window.innerHeight / 2)
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Initialize to center of screen
    mouseX.set(window.innerWidth / 2)
    mouseY.set(window.innerHeight / 2)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return {
    mouseX: smoothMouseX,
    mouseY: smoothMouseY,
    rawMouseX: mouseX,
    rawMouseY: mouseY,
  }
}
