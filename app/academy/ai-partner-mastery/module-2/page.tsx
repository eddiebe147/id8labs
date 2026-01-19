'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import CourseProgress from '@/components/CourseProgress'
import { ModuleComplete } from '@/components/progress'
import { ModuleAnnotations } from '@/components/annotations'

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Icons
const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M12 2v1M12 8a4 4 0 0 0-4 4c0 1.1.45 2.1 1.17 2.83L10 16h4l.83-1.17A4 4 0 0 0 12 8z"/>
  </svg>
)

const LayersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

export default function Module2Page() {
  return (
    <ModuleAnnotations courseSlug="ai-partner-mastery" moduleSlug="module-2">
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <m.div variants={fadeUp} className="mb-8">
              <Link
                href="/academy/ai-partner-mastery"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI Partner Mastery
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={2}
                totalModules={8}
                courseTitle="AI Partner Mastery"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 2
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                60 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              The Collaboration Framework
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "The best AI conversations feel like thinking with a brilliant colleague who never forgets what you told them."
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Problem */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Problem
              </h2>
              <h3 className="text-2xl font-bold mb-4">Every Conversation Starts From Zero</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You've had the same conversation with AI five times this month. Each time, you start over:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>"I run a marketing agency..."</li>
                  <li>"Our clients are mostly B2B tech companies..."</li>
                  <li>"My writing style is conversational but professional..."</li>
                  <li>"I use this structure for proposals..."</li>
                </ul>
                <p>
                  <strong>It's exhausting.</strong> And it means every session is slower, less personalized, and more generic than it should be.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  What if AI remembered who you are?
                </p>
              </div>
            </div>

            {/* The Missing Piece */}
            <h2>The Missing Piece: Your Collaboration Protocol</h2>
            <p>
              The difference between people who get magic from AI and people who get frustrated isn't talent. It's <strong>persistent context.</strong>
            </p>
            <p>
              Top performers don't re-explain themselves every session. They build a <strong>Collaboration Protocol Document</strong> — a living artifact that captures:
            </p>
            <ul>
              <li>Who you are and what you do</li>
              <li>How you think and communicate</li>
              <li>Your goals, constraints, and preferences</li>
              <li>The patterns that make your work unique</li>
            </ul>

            <div className="not-prose my-8 p-4 bg-id8-orange/10 border border-id8-orange/30 rounded-lg">
              <p className="font-bold text-id8-orange mb-2">The Shift:</p>
              <p className="text-[var(--text-secondary)]">
                From treating AI like a stranger you meet in a coffee shop every day, to treating it like a colleague who knows your work, your style, and your standards.
              </p>
            </div>

            {/* The 4-Layer Protocol */}
            <h2>The 4-Layer Collaboration Protocol</h2>
            <p>
              Your protocol is organized into four layers, from foundation to execution:
            </p>

            <div className="not-prose my-8 space-y-4">
              {[
                {
                  num: "1",
                  title: "IDENTITY LAYER",
                  subtitle: "Who you are and what you do",
                  desc: "Your role, expertise, industry, business context. The foundation AI needs to understand your perspective.",
                  example: "I'm Sarah Chen, founder of Spark Creative, a 12-person B2B marketing agency focused on tech companies. We help startups find a distinctive voice in crowded markets."
                },
                {
                  num: "2",
                  title: "APPROACH LAYER",
                  subtitle: "How you think and work",
                  desc: "Your methodology, decision-making style, and core principles. What makes your work yours.",
                  example: "Our philosophy: strategic clarity before creative execution. We don't brainstorm visuals until we've nailed the positioning. We value substance over flash."
                },
                {
                  num: "3",
                  title: "PREFERENCES LAYER",
                  subtitle: "Your communication style and standards",
                  desc: "How you want AI to interact with you. Tone, format, level of detail, what to avoid.",
                  example: "Writing style: conversational but professional. Use active voice, short paragraphs, no corporate jargon. Challenge my thinking, don't just agree."
                },
                {
                  num: "4",
                  title: "PATTERNS LAYER",
                  subtitle: "Repeatable structures you use",
                  desc: "Templates, frameworks, formats that appear in your work regularly. The structures AI should default to.",
                  example: "Client proposals always follow: Problem → Strategic Insight → 3 Positioning Options → Recommended Direction → Scope & Timeline."
                }
              ].map((layer, i) => (
                <div key={i} className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-lg">
                      {layer.num}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{layer.title}</h4>
                      <p className="text-sm text-id8-orange mb-2">{layer.subtitle}</p>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">{layer.desc}</p>
                      <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded text-xs font-mono text-[var(--text-tertiary)]">
                        {layer.example}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See It In Action */}
            <h2>See It In Action</h2>
            <p>
              Let's compare two approaches to the same task: writing a LinkedIn post about a recent client win.
            </p>

            <div className="not-prose my-8 space-y-6">
              {/* Without Protocol */}
              <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-3">Without a Collaboration Protocol:</p>
                <div className="text-sm text-[var(--text-secondary)] space-y-3">
                  <p><strong>You:</strong> "Write a LinkedIn post about a client win. They're a fintech startup and we helped them rebrand."</p>
                  <p><strong>AI:</strong> <em>[Generates generic "thrilled to announce" corporate-speak that sounds like every other agency]</em></p>
                  <p><strong>You:</strong> "Make it less corporate."</p>
                  <p><strong>AI:</strong> <em>[Swings too casual, loses professionalism]</em></p>
                  <p><strong>You:</strong> "No, more like... ugh, forget it, I'll just write it myself."</p>
                  <p className="text-red-400 font-mono pt-2"><strong>Time wasted:</strong> 15 minutes. <strong>Outcome:</strong> Frustration.</p>
                </div>
              </div>

              {/* With Protocol */}
              <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="font-mono text-sm text-green-400 mb-3">With a Collaboration Protocol:</p>
                <div className="text-sm text-[var(--text-secondary)] space-y-3">
                  <p><strong>You:</strong> "Help me write a LinkedIn post about the Fundbridge rebrand. Use my protocol for context."</p>
                  <p><em>[You paste or reference your 1-page protocol document]</em></p>
                  <p><strong>AI:</strong> <em>[Generates post in your voice, matches your style, leads with strategic insight over logo reveal, includes the humble-but-confident tone you prefer]</em></p>
                  <p><strong>You:</strong> "Perfect. Make it 20% shorter and add a question at the end to drive comments."</p>
                  <p><strong>AI:</strong> <em>[Delivers exactly what you wanted]</em></p>
                  <p className="text-green-400 font-mono pt-2"><strong>Time saved:</strong> 12 minutes. <strong>Outcome:</strong> Published.</p>
                </div>
              </div>
            </div>

            {/* Building Your Protocol */}
            <h2>Building Your Protocol: The Template</h2>
            <p>
              Here's the exact structure to use. Fill it out once, refine it as you learn what works, and reuse it forever.
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl font-mono text-sm">
              <div className="text-id8-orange mb-4 font-bold">COLLABORATION PROTOCOL TEMPLATE</div>
              <div className="space-y-6 text-[var(--text-secondary)]">
                <div>
                  <div className="text-[var(--text-primary)] font-bold mb-2">1. IDENTITY LAYER</div>
                  <div className="pl-4 space-y-1 text-xs">
                    <p>Role & Expertise: [Your title, what you do, years of experience]</p>
                    <p>Industry & Market: [Who you serve, what sector, specific niche]</p>
                    <p>Business Context: [Company size, stage, key challenges]</p>
                    <p>Unique Positioning: [What makes you/your work different]</p>
                  </div>
                </div>

                <div>
                  <div className="text-[var(--text-primary)] font-bold mb-2">2. APPROACH LAYER</div>
                  <div className="pl-4 space-y-1 text-xs">
                    <p>Core Methodology: [Your process, philosophy, key principles]</p>
                    <p>Decision Framework: [How you evaluate options, make choices]</p>
                    <p>Quality Standards: [What "good" looks like for you]</p>
                    <p>Common Pitfalls to Avoid: [Mistakes you've learned from]</p>
                  </div>
                </div>

                <div>
                  <div className="text-[var(--text-primary)] font-bold mb-2">3. PREFERENCES LAYER</div>
                  <div className="pl-4 space-y-1 text-xs">
                    <p>Communication Style: [Tone, voice, formality level]</p>
                    <p>Interaction Mode: [Do you want AI to challenge you? Affirm? Explore?]</p>
                    <p>Format Preferences: [Bullets vs paragraphs, length, structure]</p>
                    <p>What to Avoid: [Jargon, clichés, specific phrases you hate]</p>
                  </div>
                </div>

                <div>
                  <div className="text-[var(--text-primary)] font-bold mb-2">4. PATTERNS LAYER</div>
                  <div className="pl-4 space-y-1 text-xs">
                    <p>Recurring Deliverables: [Proposals, reports, emails, presentations]</p>
                    <p>Standard Structures: [Your go-to formats for each type]</p>
                    <p>Naming Conventions: [How you title things, organize files]</p>
                    <p>Reference Examples: [Links to your best work]</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real Example */}
            <h2>A Real Protocol (Condensed)</h2>
            <p>
              Here's what Sarah's actual protocol looks like for Spark Creative:
            </p>

            <div className="not-prose my-8 p-5 bg-[var(--bg-secondary)] border border-id8-orange/30 rounded-lg font-mono text-xs">
              <div className="space-y-4 text-[var(--text-secondary)]">
                <div>
                  <p className="text-id8-orange font-bold mb-1">IDENTITY</p>
                  <p>Founder & Creative Director, Spark Creative — 12-person B2B marketing agency (Austin, TX). 8 years building brand strategies for tech startups, Series A-C. Former in-house at a SaaS company, so I get the client side. Our sweet spot: fintech, dev tools, infrastructure.</p>
                </div>
                <div>
                  <p className="text-id8-orange font-bold mb-1">APPROACH</p>
                  <p>Philosophy: Strategic clarity before creative execution. We start with positioning, not logos. Decision framework: Does it differentiate? Is it defensible? Can they own it? Quality bar: If it could work for their competitor, it's not done.</p>
                </div>
                <div>
                  <p className="text-id8-orange font-bold mb-1">PREFERENCES</p>
                  <p>Style: Conversational but not casual. Active voice. Short paragraphs. No "delighted to announce" or "thrilled to share." Challenge my assumptions. If I'm wrong, say so. I prefer 3 options over 1 recommendation.</p>
                </div>
                <div>
                  <p className="text-id8-orange font-bold mb-1">PATTERNS</p>
                  <p>Proposal structure: Context → Strategic Tension → 3 Positioning Directions → Recommendation → Scope. Discovery call notes template: Background / Current State / Frustrations / Success Metrics / Constraints. Always end client emails with a clear next action.</p>
                </div>
              </div>
            </div>

            {/* How to Use It */}
            <h2>How to Use Your Protocol</h2>
            <p>
              Once built, your protocol becomes the first thing you share in any new AI conversation:
            </p>

            <div className="not-prose my-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg font-mono text-sm">
              <p className="text-green-400 mb-3">Starting a new conversation:</p>
              <div className="text-[var(--text-secondary)] space-y-2">
                <p>"Here's my collaboration protocol. Use it to understand my context, style, and preferences."</p>
                <p><em>[Paste protocol]</em></p>
                <p>"Now, let's work on [specific task]."</p>
              </div>
            </div>

            <p>
              <strong>That's it.</strong> From that point forward, AI understands:
            </p>
            <ul>
              <li>Who you are</li>
              <li>How you work</li>
              <li>What quality looks like to you</li>
              <li>The structures you default to</li>
            </ul>
            <p>
              Every response is now personalized to you, not a generic user.
            </p>

            {/* Advanced: Version Control */}
            <h2>Advanced: Protocol Version Control</h2>
            <p>
              Your protocol isn't static. As you work with AI, you'll discover:
            </p>
            <ul>
              <li>"AI always misses X — I should add that to my protocol"</li>
              <li>"This phrasing works great — I should capture it"</li>
              <li>"My approach has evolved — time to update"</li>
            </ul>

            <div className="not-prose my-8 p-4 bg-id8-orange/10 border border-id8-orange/30 rounded-lg">
              <p className="font-bold text-id8-orange mb-2">Pro Tip: Versioning</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Add a version number and date to your protocol (e.g., "v2.3 — Updated Jan 2026"). When you make meaningful updates, bump the version. This helps you track what's working and makes it easy to A/B test changes.
              </p>
            </div>

            {/* Multiple Protocols */}
            <h2>Multiple Protocols for Multiple Contexts</h2>
            <p>
              You might need different protocols for different contexts:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
              {[
                { title: "Work Protocol", desc: "Professional identity, business context, client-facing style" },
                { title: "Personal Protocol", desc: "Personal projects, learning goals, creative pursuits" },
                { title: "Team Protocol", desc: "Shared context for your entire team, company voice, standards" },
                { title: "Role-Specific Protocol", desc: "Different hats you wear: strategist, writer, manager" }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <p>
              <strong>Start with one.</strong> Build your primary work protocol first. Add others as needed.
            </p>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <LayersIcon />
                <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange">
                  Your Turn
                </h2>
              </div>
              <h3 className="text-2xl font-bold mb-4">Build: Your Collaboration Protocol v1.0</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 60 minutes<br />
                <strong>You'll create:</strong> A 1-2 page protocol document you can use in every AI conversation
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">IDENTITY LAYER (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Write 3-5 sentences: Who you are, what you do, your industry, what makes your work unique.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">APPROACH LAYER (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Capture your methodology, core principles, and what "quality" means in your work.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">PREFERENCES LAYER (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Define your communication style, tone, format preferences, and what to avoid.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">PATTERNS LAYER (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List recurring deliverables and the structures/formats you default to.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-bold mb-2">Test it immediately:</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  After building v1.0, use it in your next AI conversation. Notice what works and what's missing. Update it. Version control matters.
                </p>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="not-prose my-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <LightbulbIcon />
                <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange">
                  Key Takeaways
                </h2>
              </div>
              <ul className="space-y-3">
                {[
                  "Context is leverage. Every conversation you have without a protocol is slower and less personalized than it should be.",
                  "Build your protocol once, refine it forever. It's a living document that evolves as you discover what works.",
                  "The 4 layers — Identity, Approach, Preferences, Patterns — give AI everything it needs to work like a colleague, not a stranger.",
                  "Version control your protocol. Track what changes and why. Small refinements compound over time.",
                  "Start every new AI session by sharing your protocol. It's the fastest way to turn a generic assistant into a personalized thought partner."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Closing Story */}
            <p className="italic text-[var(--text-secondary)] border-l-2 border-id8-orange pl-4">
              Sarah built her protocol in 45 minutes on a Sunday morning. She's been using the same document for six months. It's currently on v4.2, and every update makes AI feel more like a team member who actually knows her.
            </p>

          </div>
        </div>
      </section>

      {/* Module Complete */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ModuleComplete
              courseSlug="ai-partner-mastery"
              moduleSlug="module-2"
              nextModulePath="/academy/ai-partner-mastery/module-3"
            />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/ai-partner-mastery/module-1"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Your First Real Conversation
              </Link>
              <Link
                href="/academy/ai-partner-mastery/module-3"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Context Architecture
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </ModuleAnnotations>
  )
}
