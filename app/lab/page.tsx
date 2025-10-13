'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/product-card'

/**
 * Lab Story Page
 *
 * Origin story and philosophy behind ID8Labs
 * Authentic, visionary tone - not corporate
 */
export default function LabPage() {
  // Active products only (no mystery product)
  const activeProducts = [
    {
      name: 'ID8Composer',
      tagline: 'Story Composition Platform',
      status: 'active' as const,
      href: '/id8composer',
      accentColor: 'orange' as const,
    },
    {
      name: 'Lexicon',
      tagline: 'Story Universe Wiki',
      status: 'active' as const,
      href: '/lexicon',
      accentColor: 'rgb-blue' as const,
    },
    {
      name: 'Clear',
      tagline: 'Background Music Remover',
      status: 'active' as const,
      href: '/clear',
      accentColor: 'rgb-green' as const,
    },
  ]

  // Philosophy principles with RGB accents
  const principles = [
    {
      title: 'Category Creation > Competition',
      subtitle: "We don't improve. We invent.",
      icon: 'square',
      color: { hex: '#FF6B35', rgb: '255, 107, 53' }, // Orange
    },
    {
      title: 'Professional Tools, Not Toys',
      subtitle: 'Built for working creatives.',
      icon: 'circle',
      color: { hex: '#00D9FF', rgb: '0, 217, 255' }, // Blue
    },
    {
      title: 'Human-AI Orchestration',
      subtitle: 'AI assists, humans compose.',
      icon: 'triangle',
      color: { hex: '#39FF14', rgb: '57, 255, 20' }, // Green
    },
  ]

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <motion.div
        className="max-w-4xl mx-auto px-8 py-20 space-y-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.header variants={itemVariants} className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary">
            The Lab
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            Where we build the future of human-AI creation
          </p>
        </motion.header>

        {/* Origin Section */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">Origin</h2>
          <div className="text-lg text-text-secondary max-w-2xl space-y-4">
            <p>
              I spent years as a TV producer drowning in AI outputs with no way to
              organize them into compelling stories.
            </p>
            <p>
              Every tool was built by engineers who&apos;d never faced a creative
              deadline. They made &apos;writing assistants&apos; when we needed
              &apos;composition platforms.&apos;
            </p>
            <p>So I built the lab I wished existed.</p>
          </div>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <h2 className="text-3xl font-bold text-text-primary">Philosophy</h2>

          {/* Philosophy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="philosophy-card relative group rounded-lg p-6 bg-bg-secondary transition-all duration-300"
                style={{
                  border: '2px solid rgba(92, 83, 74, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                  e.currentTarget.style.borderColor = principle.color.hex
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(${principle.color.rgb}, 0.3)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.borderColor = 'rgba(92, 83, 74, 0.2)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Geometric Icon */}
                <div className="mb-4 flex items-center justify-center">
                  {principle.icon === 'square' && (
                    <div
                      className="w-8 h-8"
                      style={{
                        backgroundColor: principle.color.hex,
                        opacity: 0.8,
                      }}
                    />
                  )}
                  {principle.icon === 'circle' && (
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{
                        backgroundColor: principle.color.hex,
                        opacity: 0.8,
                      }}
                    />
                  )}
                  {principle.icon === 'triangle' && (
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: '16px solid transparent',
                        borderRight: '16px solid transparent',
                        borderBottom: `28px solid ${principle.color.hex}`,
                        opacity: 0.8,
                      }}
                    />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary mb-2 text-center">
                  {principle.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-text-secondary text-center">
                  {principle.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Products Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-text-primary">The Products</h2>
            <p className="text-lg text-text-secondary">
              Three platforms that prove category creation works.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* What's Next Section */}
        <motion.section
          variants={itemVariants}
          className="relative space-y-6 py-12"
        >
          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-0 right-0 w-6 h-6"
            style={{
              backgroundColor: 'rgba(255, 60, 56, 0.15)',
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute bottom-0 left-10 w-5 h-5 rounded-full"
            style={{
              backgroundColor: 'rgba(0, 217, 255, 0.15)',
            }}
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute top-1/2 right-20"
            style={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: '18px solid rgba(57, 255, 20, 0.15)',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <h2 className="text-3xl font-bold text-text-primary relative z-10">
            What&apos;s Next
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl relative z-10">
            Three more tools are in development. We&apos;ll share more when
            they&apos;re ready.
          </p>
        </motion.section>
      </motion.div>
    </div>
  )
}
