'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Search, Network, Sparkles, BookOpen, Zap } from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

/**
 * Lexicon - Wikipedia + Perplexity for Story Universes
 * Graph-powered knowledge platform for narrative worlds
 *
 * High-converting landing page with:
 * - Hero with VHS aesthetic
 * - Problem/solution narrative
 * - Product demo with screenshots
 * - Feature cards
 * - Live app CTA
 */

// VHS Color System (matching Lexicon app)
const vhs = {
  orange: '#E8734A',
  orangeHover: '#D4623C',
  orangeGlow: 'rgba(232, 115, 74, 0.4)',
  bg: '#0a0a0f',
  bgSecondary: '#12121a',
  text: '#e8e6e3',
  textMuted: '#a8a6a3',
}

// Glow Text Component for VHS aesthetic
function GlowText({
  children,
  className = '',
  color = 'orange',
  glow = 'medium',
  as: Component = 'p',
}: {
  children: React.ReactNode
  className?: string
  color?: 'orange' | 'dim' | 'amber'
  glow?: 'none' | 'low' | 'medium' | 'high'
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}) {
  const colorStyles = {
    orange: { color: vhs.orange },
    amber: { color: '#F59E0B' },
    dim: { color: vhs.textMuted },
  }

  const glowStyles = {
    none: {},
    low: { textShadow: `0 0 10px ${vhs.orangeGlow}` },
    medium: { textShadow: `0 0 20px ${vhs.orangeGlow}, 0 0 40px ${vhs.orangeGlow}` },
    high: { textShadow: `0 0 30px ${vhs.orangeGlow}, 0 0 60px ${vhs.orangeGlow}, 0 0 90px ${vhs.orangeGlow}` },
  }

  return (
    <Component
      className={className}
      style={{ ...colorStyles[color], ...(color === 'orange' ? glowStyles[glow] : {}) }}
    >
      {children}
    </Component>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="group p-8 bg-[#12121a] border border-[#2a2a35] rounded-xl transition-all duration-300 hover:border-[#E8734A]/50 hover:shadow-[0_0_30px_rgba(232,115,74,0.1)]">
      <div className="text-[#E8734A] mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-[#a8a6a3] leading-relaxed">{description}</p>
    </div>
  )
}

// CTA Button Component
function CTAButton({
  children,
  href,
  variant = 'primary',
  external = false,
}: {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
  external?: boolean
}) {
  const baseStyles =
    'inline-flex items-center gap-2 px-8 py-4 font-semibold text-lg rounded-lg transition-all duration-300'
  const variants = {
    primary:
      'bg-[#E8734A] text-white hover:bg-[#D4623C] hover:shadow-[0_0_30px_rgba(232,115,74,0.4)] hover:-translate-y-1',
    secondary:
      'border-2 border-[#E8734A] text-[#E8734A] hover:bg-[#E8734A] hover:text-white hover:-translate-y-1',
  }

  const Component = external ? 'a' : Link
  const props = external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }

  return (
    <Component {...props} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </Component>
  )
}

export default function LexiconLandingPage() {
  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ backgroundColor: vhs.bg, zIndex: 10 }}
    >
      {/* Subtle VHS scanline effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,115,74,0.1) 2px, rgba(232,115,74,0.1) 4px)',
        }}
      />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full text-center space-y-8">
          {/* Logo/Icon */}
          <ScrollReveal delay={0.1} immediate>
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E8734A] to-[#D4623C] flex items-center justify-center shadow-[0_0_40px_rgba(232,115,74,0.3)]">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-4 bg-[#E8734A]/20 rounded-3xl blur-xl -z-10" />
              </div>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={0.3} immediate>
            <GlowText
              as="h1"
              glow="high"
              color="orange"
              className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none"
            >
              YOUR UNIVERSE.
            </GlowText>
          </ScrollReveal>

          <ScrollReveal delay={0.5} immediate>
            <GlowText
              as="p"
              glow="medium"
              color="orange"
              className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase"
            >
              Searchable.
            </GlowText>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delay={0.6} immediate>
            <p className="text-xl md:text-2xl text-[#a8a6a3] max-w-2xl mx-auto leading-relaxed">
              Wikipedia + Perplexity for story worlds. Search your narrative universe like a wiki.
              Get AI-synthesized answers from your knowledge graph.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.7} immediate>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <CTAButton href="https://lexicon-phi.vercel.app" external>
                <Zap className="w-5 h-5" />
                Launch Lexicon
              </CTAButton>
              <CTAButton href="#features" variant="secondary">
                See Features
              </CTAButton>
            </div>
          </ScrollReveal>

          {/* Metadata */}
          <ScrollReveal delay={0.9} immediate>
            <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm text-[#737373] uppercase tracking-wider">
              <span>Free Beta</span>
              <span>•</span>
              <span>Neo4j + Claude AI</span>
              <span>•</span>
              <span>Web App</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl w-full space-y-8">
          <ScrollReveal delay={0.1} direction="up">
            <p className="text-2xl md:text-4xl text-center leading-relaxed text-[#F59E0B]/60">
              "Who was at the tavern in episode 47?"
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <p className="text-2xl md:text-4xl text-center leading-relaxed text-[#F59E0B]/60">
              "Wait, are they related?"
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5} direction="up">
            <p className="text-2xl md:text-4xl text-center leading-relaxed text-[#F59E0B]/60">
              "Let me check my Excel spreadsheet..."
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.7} direction="up">
            <GlowText
              as="p"
              glow="medium"
              color="orange"
              className="text-3xl md:text-5xl text-center leading-relaxed pt-8"
            >
              What if your story universe could answer back?
            </GlowText>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: PRODUCT DEMO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full space-y-16">
          {/* Headline */}
          <ScrollReveal delay={0.2} direction="up">
            <div className="text-center space-y-4">
              <GlowText
                as="h2"
                glow="high"
                color="orange"
                className="text-4xl md:text-6xl font-bold uppercase leading-tight"
              >
                Every character. Every connection.
              </GlowText>
              <GlowText
                as="h2"
                glow="high"
                color="orange"
                className="text-4xl md:text-6xl font-bold uppercase leading-tight"
              >
                Instantly searchable.
              </GlowText>
            </div>
          </ScrollReveal>

          {/* Demo Screenshot - Graph View */}
          <ScrollReveal delay={0.3} direction="up">
            <div className="flex justify-center">
              <div className="relative group max-w-4xl w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8734A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative border-2 border-[#2a2a35] group-hover:border-[#E8734A] transition-all duration-300 rounded-xl overflow-hidden bg-[#12121a] p-8 min-h-[400px] flex items-center justify-center">
                  {/* Placeholder for graph visualization */}
                  <div className="text-center space-y-6">
                    <div className="relative w-64 h-64 mx-auto">
                      {/* Animated graph nodes */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#E8734A] flex items-center justify-center text-white font-bold shadow-[0_0_30px_rgba(232,115,74,0.5)]">
                        D&apos;Artagnan
                      </div>
                      <div className="absolute top-0 left-1/4 w-12 h-12 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-xs shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                        Athos
                      </div>
                      <div className="absolute top-1/4 right-0 w-12 h-12 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-xs shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                        Porthos
                      </div>
                      <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-xs shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                        Aramis
                      </div>
                      <div className="absolute bottom-0 left-1/3 w-12 h-12 rounded-full bg-[#EF4444] flex items-center justify-center text-white text-xs shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                        Rochefort
                      </div>
                      {/* Connection lines */}
                      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                        <line x1="50%" y1="50%" x2="25%" y2="0%" stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
                        <line x1="50%" y1="50%" x2="100%" y2="25%" stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
                        <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
                        <line x1="50%" y1="50%" x2="33%" y2="100%" stroke="#EF4444" strokeWidth="2" opacity="0.5" strokeDasharray="5,5" />
                      </svg>
                    </div>
                    <p className="text-[#a8a6a3] text-lg">Interactive knowledge graph visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.4} direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-[#a8a6a3] leading-relaxed">
                Built on Neo4j graph database for lightning-fast traversal. Every entity connects
                to every other entity. Query relationships in milliseconds. See your entire
                narrative world come alive.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3.5: AI SEARCH */}
      <section className="relative min-h-[75vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Search Demo */}
            <ScrollReveal delay={0.2} direction="left">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8734A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative border-2 border-[#2a2a35] group-hover:border-[#E8734A] transition-all duration-300 rounded-xl overflow-hidden bg-[#12121a] p-6">
                  {/* Mock search interface */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-[#0a0a0f] rounded-lg border border-[#2a2a35]">
                      <Search className="w-5 h-5 text-[#E8734A]" />
                      <span className="text-[#a8a6a3]">
                        Find all betrayals involving the Cardinal...
                      </span>
                    </div>
                    <div className="p-4 bg-[#0a0a0f] rounded-lg border border-[#E8734A]/30 space-y-3">
                      <div className="flex items-center gap-2 text-[#E8734A] text-sm font-semibold">
                        <Sparkles className="w-4 h-4" />
                        AI-Synthesized Answer
                      </div>
                      <p className="text-white text-sm leading-relaxed">
                        The Cardinal orchestrated 3 major betrayals: Milady&apos;s mission to
                        eliminate Buckingham, the conspiracy with Rochefort against the Queen, and
                        the false accusation of D&apos;Artagnan...
                      </p>
                      <div className="flex gap-2 pt-2">
                        <span className="px-2 py-1 bg-[#E8734A]/10 text-[#E8734A] text-xs rounded">
                          Cardinal Richelieu
                        </span>
                        <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-xs rounded">
                          Milady
                        </span>
                        <span className="px-2 py-1 bg-[#EF4444]/10 text-[#EF4444] text-xs rounded">
                          Rochefort
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal delay={0.4} direction="right">
              <div className="space-y-6">
                <GlowText
                  as="h2"
                  glow="high"
                  color="orange"
                  className="text-3xl md:text-5xl font-bold uppercase leading-tight"
                >
                  Ask. Get answers.
                </GlowText>
                <p className="text-lg md:text-xl text-[#a8a6a3] leading-relaxed">
                  Powered by Claude AI. Ask questions in plain English. Get answers synthesized
                  from your actual canon—not hallucinated guesses. Every response grounded in
                  your knowledge graph.
                </p>
                <p className="text-[#F59E0B] leading-relaxed">
                  Toggle "Web Enhanced" to pull real-world context for historical characters.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURES */}
      <section
        id="features"
        className="relative min-h-[75vh] flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-6xl w-full">
          <ScrollReveal delay={0.1}>
            <GlowText
              as="h2"
              glow="medium"
              color="orange"
              className="text-3xl md:text-5xl font-bold uppercase text-center mb-16"
            >
              Built for World-Builders
            </GlowText>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.2}>
              <FeatureCard
                icon={<Network className="w-12 h-12" />}
                title="Graph-Powered"
                description="Neo4j under the hood. Every relationship is a first-class citizen. Query character connections, faction alliances, and plot threads instantly."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <FeatureCard
                icon={<Search className="w-12 h-12" />}
                title="Semantic Search"
                description="Ask in natural language. 'Find all secrets known by House Stark' or 'Who has betrayed the protagonist?' Your universe understands you."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <FeatureCard
                icon={<Sparkles className="w-12 h-12" />}
                title="AI Synthesis"
                description="Claude reads your graph, synthesizes connections, and gives you coherent answers. Not keyword matching—actual understanding."
              />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <ScrollReveal delay={0.8}>
              <FeatureCard
                icon={<BookOpen className="w-12 h-12" />}
                title="Wiki View"
                description="Browse your universe like Wikipedia. Each entity gets a beautiful page with relationships, history, and AI-generated context."
              />
            </ScrollReveal>

            <ScrollReveal delay={1.0}>
              <FeatureCard
                icon={<ExternalLink className="w-12 h-12" />}
                title="Web Enhanced"
                description="For historical or real-world characters, toggle web data to enrich descriptions with real facts. AI pulls relevant context automatically."
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: USE CASES */}
      <section className="relative px-6 py-20 bg-[#12121a]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.2}>
            <GlowText
              as="h2"
              glow="medium"
              color="orange"
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Perfect For
            </GlowText>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.3}>
              <div className="p-6 border border-[#2a2a35] rounded-xl">
                <h3 className="text-xl font-bold text-[#E8734A] mb-3">
                  TV Writers Rooms
                </h3>
                <p className="text-[#a8a6a3]">
                  100 episodes deep? Never lose track of who knows what, who loves who, or what
                  happened in season 2 episode 7.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="p-6 border border-[#2a2a35] rounded-xl">
                <h3 className="text-xl font-bold text-[#E8734A] mb-3">
                  Novel Series Authors
                </h3>
                <p className="text-[#a8a6a3]">
                  Maintain continuity across multiple books. Your story bible, but actually
                  searchable and intelligent.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="p-6 border border-[#2a2a35] rounded-xl">
                <h3 className="text-xl font-bold text-[#E8734A] mb-3">Game Designers</h3>
                <p className="text-[#a8a6a3]">
                  Track lore, factions, quests, and character arcs for expansive RPG worlds.
                  Graph visualization shows everything.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="p-6 border border-[#2a2a35] rounded-xl">
                <h3 className="text-xl font-bold text-[#E8734A] mb-3">
                  Franchise Managers
                </h3>
                <p className="text-[#a8a6a3]">
                  Comics, movies, shows—all connected. Query across media to ensure consistency
                  in your expanded universe.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl w-full text-center space-y-12">
          <ScrollReveal delay={0.2}>
            <GlowText
              as="h2"
              glow="high"
              color="orange"
              className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight"
            >
              Stop searching. Start finding.
            </GlowText>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-xl md:text-2xl text-[#a8a6a3]">
              Lexicon is live. Free during beta. Start building your knowledge graph today.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton href="https://lexicon-phi.vercel.app" external>
                <Zap className="w-5 h-5" />
                Launch Lexicon
                <ExternalLink className="w-4 h-4 ml-1" />
              </CTAButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.7}>
            <p className="text-lg text-[#F59E0B] italic">
              For creators who refuse to lose track of their world.
            </p>
          </ScrollReveal>

          {/* Metadata */}
          <ScrollReveal delay={0.8}>
            <div className="flex flex-wrap justify-center gap-4 pt-8 text-sm text-[#737373] uppercase tracking-wider">
              <span>Web App</span>
              <span>•</span>
              <span>Neo4j + Claude AI</span>
              <span>•</span>
              <span>Part of ID8Labs Creator Stack</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-6 py-12 border-t border-[#2a2a35]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-sm text-[#737373] uppercase tracking-wider">
              Built by ID8Labs • Miami, FL
            </p>

            <div className="flex gap-6">
              <Link href="/products" className="group">
                <span className="text-sm text-[#737373] uppercase tracking-wider group-hover:text-[#E8734A] transition-colors duration-300">
                  All Products
                </span>
              </Link>
              <Link href="/privacy" className="group">
                <span className="text-sm text-[#737373] uppercase tracking-wider group-hover:text-[#E8734A] transition-colors duration-300">
                  Privacy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
