'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import CourseProgress from '@/components/CourseProgress'

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

export default function Module1Page() {
  return (
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
                currentModule={1}
                totalModules={8}
                courseTitle="AI Partner Mastery"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 1
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                45 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Your First Real Conversation
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "I've used AI before. But I've never really had a conversation with it."
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Scenario */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Scenario
              </h2>
              <h3 className="text-2xl font-bold mb-4">Meet Sarah Chen</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Sarah runs Spark Creative, a 12-person marketing agency in Austin. She built it from nothing over eight years. Tonight, she's staring at her laptop at 9 PM, trying to write a proposal for her biggest potential client yet — a Series C fintech startup looking to completely overhaul their brand.
                </p>
                <p>
                  The pitch meeting is Friday. She has three days.
                </p>
                <p>
                  She knows what she wants to say. Sort of. The ideas are swirling, half-formed. She's got notes from the discovery call, competitor research scattered across tabs, and a vague sense of the direction. But turning all of that into a polished 20-page proposal? That's 15 hours of work she doesn't have.
                </p>
                <p>
                  "Maybe AI can help," she thinks. She opens ChatGPT.
                </p>
                <p>
                  She types: <em>"Write a brand strategy proposal for a fintech company."</em>
                </p>
                <p>
                  The response is... fine? It's generic brand-strategy-sounding words. Nothing wrong with it. Nothing <em>her</em> about it. Nothing that connects to the specific challenges this client mentioned on the call.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This is where most people stop. But Sarah doesn't have to.
                </p>
              </div>
            </div>

            {/* What Most People Do */}
            <h2>What Most People Do</h2>
            <p>
              When people first use AI for real work, they treat it like a vending machine:
            </p>
            <ul>
              <li>Insert request → Get output</li>
              <li>Hope it's good</li>
              <li>If it's not, try again with slightly different words</li>
              <li>Eventually give up or use something mediocre</li>
            </ul>

            <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-mono text-sm text-red-400 mb-2">The prompt that fails:</p>
              <p className="text-[var(--text-secondary)]">
                "Write a brand strategy proposal for a fintech company targeting small business owners."
              </p>
            </div>

            <p>
              <strong>Why it fails:</strong> The AI has no idea what makes this client unique, what Sarah's agency brings that others don't, what specific pain points came up in the discovery call, or what a "Spark Creative proposal" even looks like.
            </p>
            <p>
              This isn't AI being dumb. It's AI responding appropriately to vague input.
            </p>

            {/* The ID8 Way */}
            <h2>The ID8 Way: The 4D Framework</h2>
            <p>
              Here's what separates people who get magic from people who get mush:
            </p>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              They don't ask AI for answers. They think with AI.
            </p>
            <p>
              The 4D Framework gives you a structure for every AI conversation:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
              {[
                { letter: "D", title: "DEFINE", desc: "What's the real task? Not 'write a proposal.' The actual goal." },
                { letter: "D", title: "DESCRIBE", desc: "What context does AI need? Background, specifics, your perspective." },
                { letter: "D", title: "DIRECT", desc: "What specifically should AI do? The exact output, format, and approach." },
                { letter: "D", title: "DEVELOP", desc: "How do we iterate together? Review, redirect, refine." },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <span className="text-2xl font-bold text-id8-orange">{item.letter}</span>
                  <h4 className="font-bold mt-2">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* See It In Action */}
            <h2>See It In Action</h2>
            <p>
              Sarah doesn't start with "write a proposal." She starts with a conversation:
            </p>

            <div className="not-prose my-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg font-mono text-sm">
              <p className="text-green-400 mb-4">Sarah's prompt using 4D:</p>
              <div className="text-[var(--text-secondary)] space-y-4 whitespace-pre-wrap">
{`I need help developing a brand strategy proposal for a potential client.

CONTEXT:
I run a marketing agency called Spark Creative. Our specialty is helping B2B tech companies find a distinctive voice in crowded markets. We focus on "strategic clarity before creative execution."

THE CLIENT:
Series C fintech startup called "Fundbridge." They help small businesses get bridge loans quickly. The CEO's main frustrations from our discovery call:
- "We look like every other fintech. Blue colors, stock photos of smiling business owners."
- "Our current messaging says everything and nothing. We're 'fast, simple, transparent' — but so is everyone else."
- "I know we're different. We actually understand small business cash flow because I ran one for 15 years. But that doesn't come through."

MY INSTINCTS:
I think their differentiator is the founder's actual small business experience — they're not bankers playing at understanding small business, they ARE small business people.

WHAT I NEED FROM YOU:
Let's think through this together before drafting anything:
1. What's the core strategic tension they're facing?
2. What are 2-3 positioning directions we could explore?
3. What questions should I be asking that I haven't thought of?`}
              </div>
            </div>

            <p>
              <strong>The result:</strong> AI now has something to work with. It understands who Sarah is, the specific client situation, the CEO's actual words, and that she wants to think together, not just get content.
            </p>

            {/* The Transformation */}
            <h2>The Transformation</h2>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-red-400">Before (Vending Machine)</th>
                    <th className="text-left py-3 px-4 text-green-400">After (Thinking Partner)</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">"Write a proposal"</td>
                    <td className="py-3 px-4">"Let's think through this together"</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">AI invents generic content</td>
                    <td className="py-3 px-4">AI builds on your specific knowledge</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">One-shot attempt</td>
                    <td className="py-3 px-4">Iterative development</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">AI as output machine</td>
                    <td className="py-3 px-4">AI as collaborative thinker</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: A First Draft Using 4D</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 45 minutes<br />
                <strong>You'll need:</strong> A real project you're working on (proposal, strategy doc, plan, etc.)
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">DEFINE (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">What am I really trying to accomplish? What does success look like?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">DESCRIBE (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Gather context: background, specifics, your instincts.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">DIRECT (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Write out specifically what you want AI to do first.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Compose & DEVELOP (25 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Have the conversation. Build on what works, redirect what doesn't.</p>
                  </div>
                </div>
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
                  "AI is not a vending machine. It's a thinking partner. Treat it like one.",
                  "Vague input = vague output. The 4D Framework gives you structure for every conversation.",
                  "Start with thinking, not content. Ask AI to explore with you before producing for you.",
                  "Your context is gold. AI can only work with what you give it — and you know more than you think.",
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
              Sarah finished her proposal outline in 40 minutes that night. The draft took another 3 hours — not 15. She got the client. But more importantly, she got a system.
            </p>

          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/ai-partner-mastery"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
              <Link
                href="/academy/ai-partner-mastery/module-2"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: The Art of Context
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
