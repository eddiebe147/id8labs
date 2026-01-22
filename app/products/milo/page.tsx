'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Github } from 'lucide-react'
import CRTOverlay from '@/components/milo/CRTOverlay'
import GlowText from '@/components/milo/GlowText'
import GlowButton from '@/components/milo/GlowButton'
import TerminalCard from '@/components/milo/TerminalCard'
import WaveformGauge from '@/components/milo/WaveformGauge'
import ScrollReveal from '@/components/ui/scroll-reveal'
import WaitlistForm from '@/components/milo/WaitlistForm'

/**
 * MILO - Mission Intelligence Life Operator
 * Signal-to-Noise Life Planner with Pip-Boy Aesthetic
 *
 * High-converting landing page with:
 * - Hero with CRT effects
 * - Problem/solution narrative
 * - Product demo with screenshots
 * - Feature cards
 * - Waitlist CTA
 */

export default function MILOLandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ zIndex: 10 }}>
      {/* CRT Overlay - Fixed across entire page */}
      <CRTOverlay />

      {/* SECTION 1: HERO (100vh) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Animated Waveform Gauge */}
          <ScrollReveal delay={0.1} immediate>
            <div className="flex justify-center mb-8">
              <WaveformGauge size="hero" isActive={true} />
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={0.3} immediate>
            <GlowText
              as="h1"
              glow="high"
              color="green"
              className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none"
            >
              YOUR DAY HAS A SIGNAL.
            </GlowText>
          </ScrollReveal>

          <ScrollReveal delay={0.5} immediate>
            <GlowText
              as="p"
              glow="medium"
              color="green"
              className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase"
            >
              Tune in.
            </GlowText>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.7} immediate>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <GlowButton
                variant="primary"
                size="lg"
                href="https://github.com/eddiebe147/milo/releases/latest"
                onClick={(e) => {
                  e.preventDefault()
                  window.open('https://github.com/eddiebe147/milo/releases/latest', '_blank')
                }}
              >
                <Github className="w-5 h-5 mr-2" />
                Download for Mac
              </GlowButton>
              <GlowButton variant="secondary" size="lg" href="#waitlist">
                Get App Store Release
              </GlowButton>
            </div>
          </ScrollReveal>

          {/* Metadata */}
          <ScrollReveal delay={0.9} immediate>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <GlowText
                as="span"
                glow="low"
                color="dim"
                className="text-sm uppercase tracking-wider"
              >
                Free
              </GlowText>
              <GlowText
                as="span"
                glow="none"
                color="dim"
                className="text-sm"
              >
                •
              </GlowText>
              <GlowText
                as="span"
                glow="low"
                color="dim"
                className="text-sm uppercase tracking-wider"
              >
                Open Source
              </GlowText>
              <GlowText
                as="span"
                glow="none"
                color="dim"
                className="text-sm"
              >
                •
              </GlowText>
              <GlowText
                as="span"
                glow="low"
                color="dim"
                className="text-sm uppercase tracking-wider"
              >
                macOS
              </GlowText>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: PROBLEM (50vh) */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl w-full space-y-8">
          <ScrollReveal delay={0.1} direction="up">
            <GlowText
              as="p"
              glow="low"
              color="amber"
              className="text-2xl md:text-4xl text-center leading-relaxed opacity-60"
            >
              "Another day. Gone."
            </GlowText>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <GlowText
              as="p"
              glow="low"
              color="amber"
              className="text-2xl md:text-4xl text-center leading-relaxed opacity-60"
            >
              "Another list. Ignored."
            </GlowText>
          </ScrollReveal>

          <ScrollReveal delay={0.5} direction="up">
            <GlowText
              as="p"
              glow="low"
              color="amber"
              className="text-2xl md:text-4xl text-center leading-relaxed opacity-60"
            >
              "Another app. Another promise."
            </GlowText>
          </ScrollReveal>

          <ScrollReveal delay={0.7} direction="up">
            <GlowText
              as="p"
              glow="medium"
              color="green"
              className="text-3xl md:text-5xl text-center leading-relaxed pt-8"
            >
              What if you only saw what matters?
            </GlowText>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: PRODUCT DEMO - Welcome Image Centered */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full space-y-12">
          {/* Headline - Centered */}
          <ScrollReveal delay={0.2} direction="up">
            <div className="text-center space-y-4">
              <GlowText
                as="h2"
                glow="high"
                color="green"
                className="text-4xl md:text-6xl font-bold uppercase leading-tight"
              >
                MILO filters the noise.
              </GlowText>
              <GlowText
                as="h2"
                glow="high"
                color="green"
                className="text-4xl md:text-6xl font-bold uppercase leading-tight"
              >
                So you hear the signal.
              </GlowText>
            </div>
          </ScrollReveal>

          {/* Welcome Screen - Centered */}
          <ScrollReveal delay={0.3} direction="up">
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="relative border-2 border-[#333333] group-hover:border-[#00ff41] transition-all duration-300 rounded-lg overflow-hidden">
                  <Image
                    src="/products/milo/milo-welcome.png"
                    alt="MILO Welcome Screen"
                    width={600}
                    height={500}
                    className="w-auto h-auto max-w-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Description - Centered */}
          <ScrollReveal delay={0.4} direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <GlowText
                as="p"
                glow="low"
                color="dim"
                className="text-lg md:text-xl leading-relaxed"
              >
                You don't need another inbox. You need clarity. MILO shows you the one thing
                that matters most. Right now. Every day.
              </GlowText>
            </div>
          </ScrollReveal>

          {/* Dashboard - Centered below */}
          <ScrollReveal delay={0.5} direction="up">
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="relative border-2 border-[#333333] group-hover:border-[#00ff41] transition-all duration-300 rounded-lg overflow-hidden">
                  <Image
                    src="/products/milo/milo-dashboard.png"
                    alt="MILO Dashboard"
                    width={800}
                    height={600}
                    className="w-full h-auto max-w-3xl"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3.5: CLAUDE INTEGRATION & TASK EXECUTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full space-y-20">
          {/* Claude Integration */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.2} direction="left">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="relative border-2 border-[#333333] group-hover:border-[#00ff41] transition-all duration-300 rounded-lg overflow-hidden">
                  <Image
                    src="/products/milo/milo-api-settings.png"
                    alt="MILO Claude API Settings"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="right">
              <div className="space-y-6">
                <GlowText
                  as="h2"
                  glow="high"
                  color="green"
                  className="text-3xl md:text-5xl font-bold uppercase leading-tight"
                >
                  Intelligence built in.
                </GlowText>
                <GlowText
                  as="p"
                  glow="low"
                  color="dim"
                  className="text-lg md:text-xl leading-relaxed"
                >
                  Connect once. Every morning, MILO reads your priorities and tells you where
                  to aim. Every evening, it shows you what you actually accomplished.
                  No setup. No prompts. Just insight.
                </GlowText>
                <GlowText
                  as="p"
                  glow="low"
                  color="amber"
                  className="text-base leading-relaxed"
                >
                  Your data stays local. Runs on your Mac.
                </GlowText>
              </div>
            </ScrollReveal>
          </div>

          {/* Projects & Organization */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.2} direction="left" className="md:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="relative border-2 border-[#333333] group-hover:border-[#00ff41] transition-all duration-300 rounded-lg overflow-hidden">
                  <Image
                    src="/products/milo/milo-projects.png"
                    alt="MILO Projects View"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="right" className="md:order-1">
              <div className="space-y-6">
                <GlowText
                  as="h2"
                  glow="high"
                  color="green"
                  className="text-3xl md:text-5xl font-bold uppercase leading-tight"
                >
                  Your projects. Organized.
                </GlowText>
                <GlowText
                  as="p"
                  glow="low"
                  color="dim"
                  className="text-lg md:text-xl leading-relaxed"
                >
                  Inbox for capture. Projects for focus. MILO auto-discovers your local
                  development projects and surfaces tasks where they belong. No manual
                  filing. No lost context.
                </GlowText>
              </div>
            </ScrollReveal>
          </div>

          {/* The Star: One Button Done - Execute Task */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.2} direction="left">
              <div className="relative group flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="relative border-2 border-[#333333] group-hover:border-[#00ff41] transition-all duration-300 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.3)]">
                    <Image
                      src="/products/milo/milo-one-shot.png"
                      alt="MILO Execute Task - One Shot Done"
                      width={600}
                      height={500}
                      className="w-auto h-auto max-w-full"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="right">
              <div className="space-y-6">
                <GlowText
                  as="h2"
                  glow="high"
                  color="green"
                  className="text-3xl md:text-5xl font-bold uppercase leading-tight"
                >
                  One button. Done.
                </GlowText>
                <GlowText
                  as="p"
                  glow="low"
                  color="dim"
                  className="text-lg md:text-xl leading-relaxed"
                >
                  See a task. Hit Start. Watch it happen. The AI thinks through the work,
                  breaks it down, and does it — while you watch. You decide what matters.
                  The machine does the rest.
                </GlowText>
                <GlowText
                  as="p"
                  glow="medium"
                  color="green"
                  className="text-lg leading-relaxed"
                >
                  Not a chatbot. A worker. You point. It builds.
                </GlowText>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURES (75vh) */}
      <section className="relative min-h-[75vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          <ScrollReveal delay={0.1}>
            <GlowText
              as="h2"
              glow="medium"
              color="green"
              className="text-3xl md:text-5xl font-bold uppercase text-center mb-16"
            >
              Signal. Awareness. Reflection.
            </GlowText>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.2}>
              <TerminalCard
                icon={
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                }
                title="Signal Queue"
                description="What matters. Now. Wake up to your priorities, not your inbox."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <TerminalCard
                icon={
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                }
                title="Awareness"
                description="Know where you are. Green means go. Red means stop. Before you burn out, MILO tells you."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <TerminalCard
                icon={
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                }
                title="Reflection"
                description="Learn from today. Did you do what mattered? Every evening, the answer is waiting."
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4.5: DEVELOPER SETUP - CLAUDE CODE INTEGRATION */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full space-y-12">
          <ScrollReveal delay={0.1} direction="up">
            <div className="text-center space-y-4">
              <GlowText
                as="h2"
                glow="high"
                color="green"
                className="text-3xl md:text-5xl font-bold uppercase leading-tight"
              >
                For Developers.
              </GlowText>
              <GlowText
                as="p"
                glow="medium"
                color="green"
                className="text-2xl md:text-4xl font-bold uppercase"
              >
                Zero Setup.
              </GlowText>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <GlowText
                as="p"
                glow="low"
                color="dim"
                className="text-lg md:text-xl leading-relaxed"
              >
                Don't want to download? No problem. One command in Claude Code and MILO is running from source.
              </GlowText>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="border-2 border-[#00ff41] border-opacity-30 bg-[#000a00] rounded-lg p-8 space-y-4 font-mono text-sm md:text-base">
              <div className="text-[#00ff41]">$ bash &lt;(curl -s https://raw.githubusercontent.com/eddiebe147/milo/main/scripts/setup-claude.sh) YOUR_API_KEY</div>
              <div className="text-[#666666] text-xs md:text-sm leading-relaxed space-y-2 pt-4">
                <div>• Clones the repo</div>
                <div>• Installs dependencies</div>
                <div>• Configures your API key</div>
                <div>• Launches MILO in dev mode</div>
                <div>• Opens in your browser</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} direction="up">
            <div className="space-y-4 text-center">
              <GlowText
                as="p"
                glow="low"
                color="dim"
                className="text-lg leading-relaxed"
              >
                Or just ask Claude Code naturally:
              </GlowText>
              <div className="text-lg md:text-xl text-[#00ff41] italic font-mono">
                "Set up and run MILO with my Claude API key"
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5} direction="up">
            <div className="flex justify-center">
              <GlowButton
                variant="secondary"
                size="lg"
                href="https://github.com/eddiebe147/milo/blob/main/CLAUDE.md"
                onClick={(e) => {
                  e.preventDefault()
                  window.open('https://github.com/eddiebe147/milo/blob/main/CLAUDE.md', '_blank')
                }}
              >
                Full Integration Guide
              </GlowButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: CTA / CLOSE (50vh) */}
      <section
        id="waitlist"
        className="relative min-h-[50vh] flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-3xl w-full text-center space-y-12">
          <ScrollReveal delay={0.2}>
            <GlowText
              as="h2"
              glow="high"
              color="green"
              className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight"
            >
              The goal is not to do more.
            </GlowText>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <GlowText
              as="p"
              glow="medium"
              color="green"
              className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase"
            >
              It's to do what matters.
            </GlowText>
          </ScrollReveal>

          {/* App Store Waitlist */}
          <ScrollReveal delay={0.5}>
            <GlowText
              as="p"
              glow="low"
              color="dim"
              className="text-lg md:text-xl text-center"
            >
              Available now on GitHub. Want the one-click App Store install?
            </GlowText>
          </ScrollReveal>

          {/* Waitlist Form */}
          <ScrollReveal delay={0.6}>
            <div className="flex justify-center pt-4">
              <WaitlistForm onSuccess={() => console.log('Waitlist signup!')} />
            </div>
          </ScrollReveal>

          {/* Closing Kicker */}
          <ScrollReveal delay={0.7}>
            <GlowText
              as="p"
              glow="low"
              color="amber"
              className="text-lg md:text-xl text-center italic"
            >
              For people who are tired of being busy.
            </GlowText>
          </ScrollReveal>

          {/* Metadata */}
          <ScrollReveal delay={0.8}>
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <GlowText
                as="span"
                glow="low"
                color="dim"
                className="text-sm uppercase tracking-wider"
              >
                macOS
              </GlowText>
              <GlowText
                as="span"
                glow="none"
                color="dim"
                className="text-sm"
              >
                •
              </GlowText>
              <GlowText
                as="span"
                glow="low"
                color="dim"
                className="text-sm uppercase tracking-wider"
              >
                Requires Claude API Key
              </GlowText>
              <GlowText
                as="span"
                glow="none"
                color="dim"
                className="text-sm"
              >
                •
              </GlowText>
              <GlowText
                as="span"
                glow="low"
                color="dim"
                className="text-sm uppercase tracking-wider"
              >
                MIT License
              </GlowText>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 6: FOOTER (minimal) */}
      <footer className="relative px-6 py-12 border-t border-[#333333]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <GlowText
              as="p"
              glow="none"
              color="dim"
              className="text-sm uppercase tracking-wider"
            >
              Built by ID8Labs • Miami, FL
            </GlowText>

            <div className="flex gap-6">
              <Link
                href="https://github.com/eddiebe147/milo"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <GlowText
                  as="span"
                  glow="none"
                  color="dim"
                  className="text-sm uppercase tracking-wider group-hover:text-[#00ff41] transition-colors duration-300"
                >
                  GitHub
                </GlowText>
              </Link>
              <Link href="/privacy" className="group">
                <GlowText
                  as="span"
                  glow="none"
                  color="dim"
                  className="text-sm uppercase tracking-wider group-hover:text-[#00ff41] transition-colors duration-300"
                >
                  Privacy
                </GlowText>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
