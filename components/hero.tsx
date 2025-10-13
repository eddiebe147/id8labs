'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * Hero Section Component
 *
 * Features:
 * - Full viewport height with centered content
 * - Grid overlay (50px, subtle)
 * - Enhanced CRT glow in center
 * - RGB chromatic aberration on title hover
 * - Floating geometric shape with rotation
 * - Staggered Framer Motion animations
 * - Theme-aware styling
 */
export function Hero() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && theme === 'dark'

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const, // Custom easing for smooth feel
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(245, 241, 232, 0.02)' : 'rgba(44, 36, 22, 0.02)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(245, 241, 232, 0.02)' : 'rgba(44, 36, 22, 0.02)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
        }}
      />

      {/* Enhanced CRT Glow (center focus) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 800px 600px at center, rgba(255, 60, 56, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 800px 600px at center, rgba(255, 107, 53, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Floating Geometric Shape - Triangle */}
      <motion.div
        className="absolute top-20 right-10 md:top-32 md:right-20 pointer-events-none"
        animate={{
          rotate: 360,
          y: [0, -20, 0],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{
          width: 0,
          height: 0,
          borderLeft: '100px solid transparent',
          borderRight: '100px solid transparent',
          borderBottom: `170px solid ${isDark ? 'rgba(255, 60, 56, 0.12)' : 'rgba(255, 107, 53, 0.12)'}`,
          filter: 'blur(1px)',
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="hero-title font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-8 cursor-default select-none"
        >
          <span className="inline-block">ID8LABS</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-text-secondary font-light tracking-wide mb-6"
        >
          Professional Tools for the AI Era
        </motion.p>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-text-secondary opacity-70 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We build category-defining platforms for creators who refuse to
          compromise.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Link
            href="/lab"
            className="cta-button inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg-primary font-mono font-semibold text-sm md:text-base tracking-wide rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
          >
            Explore the Lab
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Custom Styles */}
      <style jsx>{`
        /* RGB Chromatic Aberration on Title Hover */
        .hero-title:hover {
          animation: chromatic-aberration 0.3s ease-in-out infinite;
        }

        @keyframes chromatic-aberration {
          0%,
          100% {
            text-shadow: -3px 0 var(--rgb-red), 3px 0 var(--rgb-blue),
              0 0 20px var(--accent);
          }
          50% {
            text-shadow: -4px 0 var(--rgb-red), 4px 0 var(--rgb-blue),
              0 0 30px var(--accent);
          }
        }

        /* CTA Button RGB Glow */
        .cta-button:hover {
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.4),
            0 0 40px rgba(255, 107, 53, 0.2),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
          filter: brightness(1.1);
        }

        [data-theme='dark'] .cta-button:hover {
          box-shadow: 0 0 20px rgba(255, 60, 56, 0.5),
            0 0 40px rgba(255, 60, 56, 0.3),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
        }

        /* Smooth transitions */
        .cta-button {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </section>
  )
}
