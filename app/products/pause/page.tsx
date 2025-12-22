import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pause - ID8Labs',
  description: 'A communication translation platform for conflict resolution. When emotions run high, people stop hearing each other. Pause cleans the signal so the message can land.',
}

const coreFeatures = [
  {
    icon: '🔊',
    title: 'Voice-First Translation',
    description: 'Speak naturally. Pause receives raw, emotionally-charged input, extracts the underlying signal, and delivers a cleaned message the other person can actually hear.',
  },
  {
    icon: '🎯',
    title: 'NVC Extraction',
    description: 'Based on Marshall Rosenberg\'s Nonviolent Communication framework—extracts the observation, feeling, need, and request from every message.',
  },
  {
    icon: '🛡️',
    title: 'Four Horsemen Filter',
    description: 'Identifies and filters criticism, contempt, defensiveness, and stonewalling—the patterns Gottman identified as predictors of relationship failure.',
  },
  {
    icon: '✓',
    title: 'Speaker Confirmation',
    description: '"Is this what you mean?" Only confirmed messages are delivered. You stay in control of what gets communicated.',
  },
  {
    icon: '🚨',
    title: 'Safety System',
    description: 'Detects crisis signals, abuse patterns, and therapy-level issues. Warm handoffs to professional resources when needed.',
  },
  {
    icon: '🎙️',
    title: 'Calm Voice Interface',
    description: 'Not text-to-speech—a voice with presence. Calm, measured, warm but neutral. Pacing communicated through intentional silence.',
  },
]

const operatingModes = [
  {
    mode: 'Couples Mode',
    description: 'Two-party mediation with turn-taking and confirmation loops.',
  },
  {
    mode: 'Family Mode',
    description: 'Multi-party dynamics with relationship mapping.',
  },
  {
    mode: 'Business Mode',
    description: 'Professional disputes with solution-focused framing.',
  },
  {
    mode: 'Self-Reflection Mode',
    description: 'Solo processing to clarify your own thoughts before a conversation.',
  },
]

const safetyFeatures = [
  'Crisis detection with 988/Crisis Text Line handoff',
  'Abuse pattern recognition with DV hotline referrals',
  'Therapy-level issue detection with BetterHelp/Talkspace referrals',
  'Legal boundary recognition with appropriate disclaimers',
  'Continuous confidence scoring—knows when it\'s out of its depth',
]

const ethicalFoundation = [
  'Model Standards of Conduct for Mediators (ABA/AAA/ACR, 2005)',
  'Nonviolent Communication framework (Marshall Rosenberg)',
  'Gottman Method research (Four Horsemen, de-escalation)',
  'APA Ethics Code principles',
]

export default function PausePage() {
  return (
    <div className="container py-24">
      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to products
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <h1>Pause</h1>
            <span className="text-sm px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full">
              Coming Soon
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-4">
            A Communication Translation Platform for Conflict Resolution
          </p>
          <p className="text-xl text-[var(--id8-orange)] italic mb-8">
            Slower is the point.
          </p>
          <a
            href="https://justpause.partners"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg px-8 py-4 bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange)]/90 transition-all duration-200 rounded-soft font-medium"
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </header>

        {/* Core Problem */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border-l-4 border-[var(--id8-orange)]">
          <h2 className="text-2xl font-bold mb-4">The Problem</h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            When emotions run high, people stop hearing each other. What gets said and what gets heard become
            two different things. The noise—attacks, absolutes, contempt, defensiveness—drowns out the
            signal: actual needs, legitimate concerns, underlying feelings.
          </p>
        </section>

        {/* What It Does / Doesn't */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-500/5 border-2 border-green-500/20 rounded-soft">
            <h3 className="text-xl font-bold mb-4 text-green-400">What Pause Is</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>A translator between what you said and what they heard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>A signal filter that removes emotional noise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>A neutral third party with no stake in the outcome</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Built on established mediation and NVC frameworks</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-red-500/5 border-2 border-red-500/20 rounded-soft">
            <h3 className="text-xl font-bold mb-4 text-red-400">What Pause Is NOT</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Therapy or psychological treatment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>A judge deciding who is right or wrong</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Legal advice or a substitute for professional help</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>A guarantee of resolution—only of understanding</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Description */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            There's a gap between what you say and what they hear. That gap is where relationships
            go to die. Not because people don't love each other. Not because they don't want to
            work it out. But because the noise—the history, the hurt, the patterns—drowns out the signal.
          </p>
          <p>
            Pause sits in that gap. It receives the raw, messy, emotional thing you're trying to say.
            It finds the signal underneath: the actual feeling, the actual need, the actual request.
            Then it confirms with you: "Is this what you mean?" Only then does it deliver the message
            in a form the other person can actually hear—without triggering their defenses.
          </p>
        </section>

        {/* Core Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Four Horsemen */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">The Four Horsemen Filter</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Based on Dr. John Gottman's research, these are the patterns that predict relationship
            failure. Pause identifies them and extracts the signal underneath.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
              <h4 className="font-bold text-red-400 mb-2">Criticism</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-2">"You never think about anyone but yourself"</p>
              <p className="text-sm text-green-400">→ Extracts the unmet need</p>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
              <h4 className="font-bold text-red-400 mb-2">Contempt</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-2">Mockery, eye-rolling, moral superiority</p>
              <p className="text-sm text-green-400">→ Surfaces the underlying hurt</p>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
              <h4 className="font-bold text-red-400 mb-2">Defensiveness</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-2">Counter-attacking instead of listening</p>
              <p className="text-sm text-green-400">→ Identifies the perceived threat</p>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
              <h4 className="font-bold text-red-400 mb-2">Stonewalling</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-2">Shutting down and withdrawing</p>
              <p className="text-sm text-green-400">→ Recognizes emotional flooding</p>
            </div>
          </div>
        </section>

        {/* Operating Modes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Operating Modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operatingModes.map((mode) => (
              <div
                key={mode.mode}
                className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <h4 className="font-bold mb-1">{mode.mode}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{mode.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety System */}
        <section className="mb-16 p-8 bg-amber-500/5 border-2 border-amber-500/30 rounded-soft">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">Safety System</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            The most important system in the application. Pause recognizes when it is out of its depth
            and exits gracefully—without abandoning the person in need.
          </p>
          <ul className="space-y-3">
            {safetyFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-[var(--text-secondary)]">
                <span className="text-amber-400 mt-1">●</span>
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm italic text-amber-300">
            Core philosophy: Detect early. Name gently. Refer clearly. Don't abandon.
          </p>
        </section>

        {/* Who It's For */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Who It's For</h2>
          <div className="space-y-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            <p>
              <strong className="text-[var(--text-primary)]">Couples</strong> who love each other but
              can't hear each other when things get heated.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Business partners</strong> dissolving
              decades of friendship over money they could actually work out.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Families</strong> where every holiday
              becomes a minefield of old wounds.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Anyone</strong> who's ever walked away
              from a conversation thinking: <em>"Why can't they just understand what I'm trying to tell them?"</em>
            </p>
          </div>
        </section>

        {/* Ethical Foundation */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h3 className="text-2xl font-bold mb-6">Built On</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ethicalFoundation.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[var(--id8-orange)] mt-1">◆</span>
                <span className="text-[var(--text-secondary)]">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* The Name */}
        <section className="mb-16 p-8 border-2 border-[var(--id8-orange)] bg-[var(--id8-orange)]/5 rounded-soft text-center">
          <h2 className="text-3xl font-bold mb-4">Why "Pause"?</h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Not speed. Not efficiency. Not "communicate better in 5 minutes a day."
          </p>
          <p className="text-xl mt-4">
            The space to breathe. The space to be understood before you respond.
            The space between what you said and what they heard.
          </p>
          <p className="text-lg mt-6 text-[var(--id8-orange)] italic">
            That's where we live.
          </p>
        </section>

        {/* CTA */}
        <section className="pt-12 border-t border-[var(--border)] text-center">
          <p className="text-xl text-[var(--text-secondary)] mb-6">
            Everyone deserves to be heard.
          </p>
          <a
            href="https://justpause.partners"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg px-10 py-5 bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange)]/90 transition-all duration-200 rounded-soft font-medium"
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            justpause.partners
          </p>
        </section>
      </article>
    </div>
  )
}
