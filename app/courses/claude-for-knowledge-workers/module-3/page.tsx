'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import MiniAudioPlayer from '@/components/MiniAudioPlayer'
import MiniVideoPlayer from '@/components/MiniVideoPlayer'

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
const DownloadIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
)

const PlayIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const TerminalIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
)

const MicIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
  </svg>
)

const EditIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

// Module 3 content
const outcomes = [
  "Understand the writing partnership model — Claude as collaborator, not replacement",
  "Turn voice notes into structured drafts using the voice-to-draft workflow",
  "Run targeted editing passes: clarity, audience, tone, and structure",
  "Train Claude on your voice using a voice profile document",
  "Beat blank page syndrome with brainstorming and ugly first drafts",
  "Master email workflows: replies, difficult messages, and batch processing",
]

const writingPartnership = [
  { category: "Claude Does Well", items: ["Expanding rough notes into full drafts", "Editing for clarity and flow", "Matching your existing voice (when given examples)", "Brainstorming and ideation", "Overcoming blank page syndrome"] },
  { category: "Claude Does Poorly", items: ["Original insights (Claude recombines; breakthroughs are yours)", "Personal stories (only you know what happened)", "Your unique perspective (your worldview is yours)", "Emotional authenticity (if it needs to feel personal, it is personal)"] },
]

const editingPatterns = [
  { type: "Clarity Pass", pattern: '"Edit for clarity: simplify complex sentences, cut unnecessary words, make the structure more logical. Preserve my voice. Show me what you changed and why."' },
  { type: "Audience Shift", pattern: '"Rewrite this for [new audience]. Same information, different framing. Keep it under [X] words."' },
  { type: "Tone Adjustment", pattern: '"Adjust the tone to be more [conversational/professional/direct/warm]. Keep the same message."' },
  { type: "Structure Fix", pattern: '"Reorganize into clear sections with headers. Put the most important information first. Cut any repetition."' },
]

const emailPatterns = [
  {
    type: "Reply Assist",
    delegation: '"Here\'s an email I received: [paste email]. Draft a reply that: [your key points]. Tone should be [professional/friendly/firm]. Keep it under [X] sentences."',
  },
  {
    type: "Difficult Email",
    delegation: '"I need to email [person/role] about [situation]. This is uncomfortable because [why]. Help me write something that is [direct but kind/firm but fair/apologetic but not groveling]. The key message is [what]."',
  },
  {
    type: "Batch Processing",
    delegation: '"Here are 5 emails I need to respond to: [paste all]. For each one, draft a brief reply. Consistent professional tone. I\'ll review and send."',
  },
]

export default function Module3Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-zone-text">
        <div className="container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="inline-flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors mb-6"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 3</span>
              <span className="text-id8-orange/50">•</span>
              <span>60 min</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Writing With Claude
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              From rambling voice notes to polished drafts. From blank page paralysis to words on the page. Claude becomes your writing partner — accelerating your thinking, not replacing it.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="/courses/module-3/module-3-writing-with-claude.pdf"
                download="Module-3-Writing-With-Claude.pdf"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                <DownloadIcon />
                Download Guide (PDF)
              </a>
              <a
                href="#media"
                className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <PlayIcon />
                Watch or Listen
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Media Section */}
      <section id="media" className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Watch or Listen</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Choose your format — same content, different experience.
            </p>

            <div className="space-y-6">
              {/* Video Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <MiniVideoPlayer
                  src="/courses/module-3/media/module-3-writing-with-claude.mp4"
                  title="Writing With Claude (Video)"
                  downloadName="Module-3-Writing-With-Claude.mp4"
                />
              </motion.div>

              {/* Audio Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <MiniAudioPlayer
                  src="/courses/module-3/media/module-3-writing-with-claude.m4a"
                  title="Writing With Claude (Podcast)"
                  downloadName="Module-3-Writing-With-Claude.m4a"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg"
            >
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                You've mastered file processing in Module 2. You can organize invoices, extract data from documents, and search your files by meaning. Claude is saving you hours on tedious work.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Now we're entering different territory. This module is about writing — and it requires a mindset shift.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                When Claude processes files, you're delegating mechanical work. When Claude helps you write, you're entering a <strong className="text-[var(--text-primary)]">collaboration</strong>. The goal isn't to have Claude write FOR you. It's to write WITH Claude — using AI to accelerate your thinking, not replace it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Writing Partnership Model */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <EditIcon />
              </span>
              <h2 className="text-2xl font-bold">The Writing Partnership Model</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-8">
              Think about how you'd work with a great editor or writing assistant. You wouldn't say "write me a blog post about productivity." You'd have a conversation. You'd share your rough ideas. They'd push back, ask questions, help you find clarity.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {writingPartnership.map((section, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    section.category === "Claude Does Well"
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-amber-500/5 border-amber-500/20"
                  }`}
                >
                  <p className={`text-sm font-mono uppercase tracking-wider mb-3 ${
                    section.category === "Claude Does Well" ? "text-green-500" : "text-amber-500"
                  }`}>
                    {section.category}
                  </p>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Philosophy:</p>
              <p className="text-[var(--text-secondary)]">
                "I use Claude like I used to use voice notes to myself. I ramble my ideas, then ask Claude to organize them. The thinking is mine. The structure comes from the collaboration. That's the sweet spot."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">What You'll Learn</h2>

            <div className="space-y-4">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]"
                >
                  <span className="text-id8-orange flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-[var(--text-primary)]">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Voice Notes to Drafts */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <MicIcon />
              </span>
              <h2 className="text-2xl font-bold">From Voice Notes to Drafts</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              This is one of the highest-leverage writing workflows: turning your spoken thoughts into written drafts.
            </p>

            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg mb-6">
              <ol className="text-sm text-[var(--text-secondary)] space-y-4">
                <li><strong className="text-[var(--text-primary)]">1. Record yourself rambling</strong> — Use Voice Memos. Don't try to be articulate. Just talk through your idea as if explaining it to a friend.</li>
                <li><strong className="text-[var(--text-primary)]">2. Get it transcribed</strong> — Use your phone's transcription, or a service like Otter.ai, or Claude itself.</li>
                <li><strong className="text-[var(--text-primary)]">3. Delegate the transformation:</strong>
                  <code className="block mt-2 p-3 bg-[var(--bg-primary)] rounded text-[var(--text-primary)]">
                    "Here's a rough voice transcription of my thoughts on [topic]. Turn this into a clear, structured [blog post/email/memo]. Keep my voice and examples. Organize my rambling into logical sections. The audience is [who]. Target length: [word count]. Save to ~/Documents/Drafts/[filename].md"
                  </code>
                </li>
              </ol>
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Real Example:</p>
              <p className="text-[var(--text-secondary)]">
                "I was stuck on this course's Module 0 script. Spent an hour staring at the blank page. Finally, I just opened Voice Memos and talked for 8 minutes about what I wanted people to understand. Rambling, tangents, half-sentences. Transcribed it. Told Claude: 'Turn this into a video script. Keep my conversational tone. Target 5 minutes spoken. Make it flow.' First draft in 90 seconds. I edited for 20 minutes. Done. The whole thing took less time than staring at the blank page."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editing Workflows */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Editing Workflows</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Sometimes you've already written something, but it needs work. Claude excels at different types of editing passes.
            </p>

            <div className="space-y-4">
              {editingPatterns.map((pattern, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
                >
                  <p className="text-sm font-mono text-id8-orange mb-2">{pattern.type}</p>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-secondary)] p-3 rounded">
                    {pattern.pattern}
                  </code>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Editing Tip:</p>
              <p className="text-[var(--text-secondary)]">
                "I don't ask Claude to 'make it better.' That's too vague. I tell it exactly what's wrong: 'The opening is too long.' 'This paragraph is confusing.' 'The ending trails off.' Specific problems get specific solutions."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Finding Your Voice */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Finding Your Voice (With Claude's Help)</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Here's the fear: "If I use AI, my writing won't sound like me." Here's the reality: Claude can learn your voice — if you teach it.
            </p>

            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg mb-6">
              <p className="text-sm font-mono text-id8-orange mb-3">The Voice Training Approach</p>
              <ol className="text-sm text-[var(--text-secondary)] space-y-3">
                <li><strong className="text-[var(--text-primary)]">1. Gather your best writing</strong> — Find 3-5 pieces you've written that sound like YOU.</li>
                <li><strong className="text-[var(--text-primary)]">2. Feed Claude your voice:</strong>
                  <code className="block mt-2 p-3 bg-[var(--bg-primary)] rounded text-[var(--text-primary)]">
                    "Read these 4 samples of my writing. Analyze my writing style: sentence length, vocabulary, tone, how I structure arguments, my typical openings and closings, any verbal tics or patterns. Create a 'voice profile' for me. Save it to ~/Documents/my-writing-voice.md"
                  </code>
                </li>
                <li><strong className="text-[var(--text-primary)]">3. Use the profile for future writing:</strong>
                  <code className="block mt-2 p-3 bg-[var(--bg-primary)] rounded text-[var(--text-primary)]">
                    "Read my voice profile at ~/Documents/my-writing-voice.md. Then help me write [whatever] in my natural voice."
                  </code>
                </li>
              </ol>
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Experience:</p>
              <p className="text-[var(--text-secondary)]">
                "I write casually. Short sentences. Lots of 'you' and 'I.' Sentence fragments. Questions to the reader. When I first used Claude, it gave me this polished, formal prose that sounded nothing like me. I was about to give up. Then I fed it 5 of my essays. Now it nails my voice. It still needs editing — the rhythm isn't always right — but it's 80% there. That last 20% is my job anyway."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Workflows */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Email Workflows</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Email is where most knowledge workers spend their writing time. Claude can dramatically speed up the tedious parts.
            </p>

            <div className="space-y-4">
              {emailPatterns.map((pattern, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
                >
                  <p className="text-sm font-mono text-id8-orange mb-2">{pattern.type}</p>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-secondary)] p-3 rounded">
                    {pattern.delegation}
                  </code>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Email Confession:</p>
              <p className="text-[var(--text-secondary)]">
                "I used to spend 20 minutes on emails that didn't deserve 20 minutes. Now I tell Claude: 'Reply to this. Be brief. Be professional. Three sentences max.' Then I read it, tweak one word, and send. Same result, 18 minutes saved."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <TerminalIcon />
              </span>
              <h2 className="text-2xl font-bold">Your Challenge: The Voice Note Draft</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              This week, create one piece of writing using the voice-to-draft workflow:
            </p>

            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg mb-6">
              <ol className="text-sm text-[var(--text-secondary)] space-y-3">
                <li><strong>1.</strong> Pick something you need to write — an email, a report section, a blog post, anything</li>
                <li><strong>2.</strong> Record yourself talking about it for 3-5 minutes (phone voice memo is fine)</li>
                <li><strong>3.</strong> Transcribe it (use any method you prefer)</li>
                <li><strong>4.</strong> Delegate the transformation:
                  <code className="block mt-2 p-3 bg-[var(--bg-primary)] rounded text-[var(--text-primary)]">
                    "Here's a rough voice transcription of my thoughts. Turn this into a clear, well-structured [type of writing]. Keep my voice and examples. Target length: [X words]. Save to ~/Documents/Drafts/"
                  </code>
                </li>
                <li><strong>5.</strong> Edit the result — What needs your human touch? What did Claude nail?</li>
              </ol>
            </div>

            <div className="p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Success looks like:</p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• You bypassed blank page syndrome</li>
                <li>• The draft contains your authentic ideas and examples</li>
                <li>• You spent more time thinking than typing</li>
                <li>• The final piece sounds like you (after your edits)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>

            <div className="space-y-3">
              {[
                { num: 1, text: "Claude is a writing partner, not a replacement. Your ideas, your voice, your stories — Claude helps shape them, not generate them." },
                { num: 2, text: "Voice notes beat blank pages. Record yourself rambling, then let Claude organize. Your thinking, their structure." },
                { num: 3, text: "Train Claude on your voice. Feed it examples of your writing. Create a voice profile. Use it for consistency." },
                { num: 4, text: "Specific editing requests get specific results. Don't say 'make it better.' Say exactly what's wrong." },
                { num: 5, text: "Email is a perfect use case. Drafts, replies, difficult messages — Claude handles the structure, you add the humanity." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3 p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                  <span className="w-6 h-6 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-xs font-mono flex-shrink-0">
                    {item.num}
                  </span>
                  <p className="text-sm text-[var(--text-primary)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mindmap Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Module Overview</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Visual map of everything covered in this module.
            </p>
            <div className="rounded-xl overflow-hidden border border-[var(--border)]">
              <Image
                src="/courses/module-3/media/module-3-mindmap.png"
                alt="Module 3 Mindmap - Writing With Claude"
                width={800}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/courses/claude-for-knowledge-workers/module-2"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: Working With Your Files
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Research & Analysis
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
