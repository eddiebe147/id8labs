'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import MiniAudioPlayer from '@/components/MiniAudioPlayer'
import MiniVideoPlayer from '@/components/MiniVideoPlayer'
import { PurchaseGate } from '@/components/PurchaseGate'

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

const LightbulbIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z"/>
  </svg>
)

// Updated content to match new Module 1
const outcomes = [
  "Build confidence through low-stakes practice delegations",
  "Master the Delegation Formula: Context + Outcome + Location",
  "Access 10 Quick Wins you can run this week",
  "Handle common issues like permissions and unexpected results",
  "Develop the delegation mindset that separates daily users from one-timers",
]

const delegationFormula = [
  { component: "Context", description: "What Claude can see or needs to know", example: '"Look at my Desktop" or "These are screenshots from last month"' },
  { component: "Outcome", description: 'What "done" looks like — be specific!', example: '"Group by file type. Create folders. Move files. List anything uncategorized."' },
  { component: "Location", description: "Where the result should go", example: '"Save to ~/Documents/Organized/" or "Create report in cleanup-log.txt"' },
]

const quickWins = [
  { number: 1, name: "Desktop Triage", risk: "None (report)", description: "Count files, group by type, show what's taking space. Don't move anything yet." },
  { number: 2, name: "Screenshot Archaeology", risk: "None (report)", description: "Find all screenshots on your computer. Show count, locations, and space used by year." },
  { number: 3, name: "Duplicate Hunt", risk: "None (report)", description: "Find duplicate files in Downloads. List them and calculate space savings." },
  { number: 4, name: "Rename Batch", risk: "Low (reversible)", description: "Rename files in a folder to YYYY-MM-DD_descriptive-name pattern." },
  { number: 5, name: "Space Audit", risk: "None (report)", description: "Show 10 largest files and 5 largest folders. Format as table." },
  { number: 6, name: "Old File Report", risk: "None (report)", description: "Find files untouched for 2+ years. Group by type. Show total size." },
  { number: 7, name: "Extension Sort", risk: "None (report)", description: "Count files by type (.pdf, .jpg, .dmg, etc.). Format as sorted table." },
  { number: 8, name: "Project Inventory", risk: "None (report)", description: "List all folders with last modified date, file count, and size." },
  { number: 9, name: "Empty Folder Sweep", risk: "Low (with confirmation)", description: "Find empty folders. List them. Ask before deleting." },
  { number: 10, name: "Temp File Purge Report", risk: "None (report)", description: "Find .tmp files, .dmg installers, extracted .zips. Calculate reclaimable space." },
]

const troubleshooting = [
  { situation: "Claude asks for clarification", claudeSays: '"Should I organize by date created or date modified?"', whatToDo: "Answer specifically: \"Use date modified. Format as YYYY-MM-DD.\"", why: "Your delegation was slightly ambiguous. Now you know to specify next time." },
  { situation: "Claude asks for permission", claudeSays: '"I\'m about to move 200 files. Should I proceed?"', whatToDo: "This is good! Say \"yes\" or \"show me the list first.\"", why: "Claude has safety rails. Large operations trigger confirmation." },
  { situation: "Unexpected result", claudeSays: "[Folder structure isn't what you imagined]", whatToDo: "Say \"Undo that\" or \"Move everything back.\" Then re-delegate with clearer outcome.", why: "\"Organize\" means different things. Be more specific next time." },
  { situation: "Permission denied", claudeSays: '"I don\'t have permission to access that folder."', whatToDo: "Check System Preferences (Mac) or Security settings (Windows).", why: "Your OS protects certain folders. Work within Documents, Downloads, Desktop." },
]

export default function Module1Page() {
  return (
    <PurchaseGate productId="claude-for-knowledge-workers" moduleName="Module 1: Your First Delegation">
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
              <span>Module 1</span>
              <span className="text-id8-orange/50">•</span>
              <span>45 min</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Your First Delegation
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              Build confidence through practice. 10 quick wins to master the delegation formula and develop the reflex that separates daily users from one-timers.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="/courses/module-1/module-1-your-first-delegation.pdf"
                download="Module-1-Your-First-Delegation.pdf"
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
                  src="/courses/module-1/media/module-1-your-first-delegation.mp4"
                  title="Your First Delegation (Video)"
                  downloadName="Module-1-Your-First-Delegation.mp4"
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
                  src="/courses/module-1/media/module-1-your-first-delegation.m4a"
                  title="Your First Delegation (Podcast)"
                  downloadName="Module-1-Your-First-Delegation.m4a"
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
                Welcome back. If you completed Module 0, you've already installed Claude Code and cleaned up your Downloads folder. You felt that first "holy shit" moment when Claude did in seconds what would've taken you 20 minutes.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Now we're going to build on that. This module gives you a menu of quick wins—different delegation targets to practice with—and deepens your understanding of why the delegation formula works. By the end, you'll have the confidence to delegate anything.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Confidence Problem */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <LightbulbIcon />
              </span>
              <h2 className="text-2xl font-bold">The Confidence Problem</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              You cleaned up your Downloads folder in Module 0. That felt good. But here's what happens next for most people: they freeze. They don't know what else to try. Days pass. Claude Code sits unused.
            </p>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Rule:</p>
              <p className="text-[var(--text-primary)]">
                "Your first 10 delegations should be things you could undo in 30 seconds."
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-3">
                Fear kills learning. When you're scared of breaking something, you don't experiment. The goal of this module is reps — building the muscle memory of delegation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-spacing border-t border-[var(--border)]">
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
                  className="flex items-start gap-4 p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]"
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

      {/* The Delegation Formula */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">The Delegation Formula: Going Deeper</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              You learned this in Module 0. Now let's make it intuitive.
            </p>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl mb-8">
              <p className="text-2xl font-mono text-center text-[var(--text-primary)]">
                <span className="text-id8-orange">Context</span>
                {' + '}
                <span className="text-id8-orange">Outcome</span>
                {' + '}
                <span className="text-id8-orange">Location</span>
              </p>
            </div>

            <div className="space-y-4">
              {delegationFormula.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-id8-orange/10 border border-id8-orange/30 rounded text-id8-orange text-sm font-mono">
                      {item.component}
                    </span>
                    <span className="text-[var(--text-secondary)] text-sm">{item.description}</span>
                  </div>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-secondary)] p-3 rounded">
                    {item.example}
                  </code>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
              <p className="text-sm text-[var(--text-primary)]">
                <strong>Common mistake:</strong> People skip Location. They say "organize my files" and Claude asks "where should I put them?" Now you're having a conversation instead of delegating work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Wins Menu */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">The Quick Wins Menu</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              10 delegations you can run this week. None will break anything. Pick the ones that spark an "oh, I've been meaning to do that" feeling.
            </p>

            <div className="space-y-3">
              {quickWins.map((win, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-id8-orange/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono">
                        {win.number}
                      </span>
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{win.name}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{win.description}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                      win.risk.includes('None')
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {win.risk}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Eddie's Recommendation:</p>
              <p className="text-sm text-[var(--text-secondary)]">
                "Start with #1 (Desktop Triage) or #5 (Space Audit). They're pure information — Claude looks and reports, nothing moves. Then try #4 (Rename Batch) on a folder you don't care about. By your third delegation, you'll be ready to let Claude actually move files."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">When Things Go Wrong</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Claude will ask questions sometimes. It will ask permission. Sometimes it misunderstands. This isn't failure — it's collaboration.
            </p>

            <div className="space-y-4">
              {troubleshooting.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
                >
                  <p className="text-sm font-mono text-id8-orange mb-2">{item.situation}</p>
                  <div className="mb-3 p-2 bg-[var(--bg-secondary)] rounded text-sm">
                    <span className="text-[var(--text-tertiary)]">Claude says: </span>
                    <span className="text-[var(--text-primary)]">{item.claudeSays}</span>
                  </div>
                  <p className="text-sm text-[var(--text-primary)] mb-1"><strong>What to do:</strong> {item.whatToDo}</p>
                  <p className="text-sm text-[var(--text-secondary)]"><strong>Why:</strong> {item.why}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Delegation Mindset */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">The Delegation Mindset</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              The shift happens when you stop asking "Can Claude do this?" and start asking "Why am I doing this myself?"
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-3">Old Mindset</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                  <li>"I need to organize my files" → Open Finder, start clicking</li>
                  <li>"I should clean up my Desktop" → Drag things manually</li>
                  <li>"What's taking up space?" → Right-click, check sizes one by one</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-primary)] rounded-lg border border-id8-orange/30">
                <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-3">New Mindset</p>
                <ul className="text-sm text-[var(--text-primary)] space-y-2">
                  <li>"I need to organize my files" → Context + Outcome + Location?</li>
                  <li>"I should clean up my Desktop" → Let me delegate that</li>
                  <li>"What's taking up space?" → Claude can tell me in 10 seconds</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm text-[var(--text-secondary)]">
                The goal isn't to use Claude for everything. The goal is to <strong className="text-[var(--text-primary)]">PAUSE</strong> before manual work and ask: "Is this delegation-able?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <TerminalIcon />
              </span>
              <h2 className="text-2xl font-bold">Your Challenge: The Confidence Builder</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              This week, run <strong className="text-[var(--text-primary)]">three delegations</strong> from the Quick Wins Menu.
            </p>

            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg mb-6">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Recommended path:</p>
              <ol className="text-sm text-[var(--text-secondary)] space-y-2">
                <li><strong>1.</strong> Start with a report (#1, #5, or #6) — Claude looks and tells you what it sees</li>
                <li><strong>2.</strong> Try a batch operation (#4) — Claude makes changes you could reverse</li>
                <li><strong>3.</strong> Finish with a hunt (#2 or #3) — Claude searches across your system</li>
              </ol>
            </div>

            <div className="p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Success looks like:</p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• You ran three delegations without getting stuck</li>
                <li>• You handled at least one clarification question from Claude</li>
                <li>• You feel less hesitant about what to try next</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>

            <div className="space-y-3">
              {[
                { num: 1, text: "Volume beats perfection. Your first 10 delegations should be low-stakes practice." },
                { num: 2, text: "The formula is Context + Outcome + Location. Skip any piece and you'll end up in a conversation." },
                { num: 3, text: "\"Organize\" is not an outcome. Specify HOW: by date, by type, by project, by size." },
                { num: 4, text: "Mistakes are cheap. \"Undo that\" and re-delegate. Nothing is permanent." },
                { num: 5, text: "Build the reflex. Before manual work, ask: \"Is this delegation-able?\"" },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
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
                src="/courses/module-1/media/module-1-mindmap.png"
                alt="Module 1 Mindmap - Your First Delegation"
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
                href="/courses/claude-for-knowledge-workers/module-0"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: The Mental Model Shift
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Working With Your Files
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </PurchaseGate>
  )
}
