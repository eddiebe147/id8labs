'use client'

import { motion } from '@/components/motion'
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

const LayoutIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
)

const RepeatIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 014-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 01-4 4H3"/>
  </svg>
)

const LayersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

const ZapIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

// Module 5 content
const outcomes = [
  "Transform one-off delegations into reusable templates with blanks to fill",
  "Build chains — multiple delegations connected together",
  "Create context files that reduce explaining",
  "Design and implement six essential workflows every knowledge worker needs",
  "Master advanced patterns: context stacks, quality loops, escalation paths",
  "Build your personal operating system that compounds over time",
]

const buildingBlocks = [
  { name: "Templates", description: "Reusable delegation patterns with blanks to fill in. Same structure every time, different inputs.", icon: <LayoutIcon /> },
  { name: "Triggers", description: "What starts a workflow — time-based, event-based, or manual habits.", icon: <ZapIcon /> },
  { name: "Chains", description: "Multiple delegations connected together. Output of one becomes input of the next.", icon: <RepeatIcon /> },
  { name: "Context Files", description: "Persistent information Claude can reference. Your voice, your business, your preferences.", icon: <LayersIcon /> },
]

const essentialWorkflows = [
  {
    name: "Weekly Review",
    frequency: "Every Friday",
    pattern: '"Run my weekly review. Read all files created/modified this week. Create summary: what I accomplished, what\'s in progress, what\'s blocked, focus for next week. Save to ~/Documents/Reviews/weekly-[DATE].md"',
  },
  {
    name: "Meeting Prep",
    frequency: "Before meetings",
    pattern: '"Prepare me for meeting with [PERSON] about [TOPIC]. Find relevant notes and previous meetings. Create prep doc: background, key points, questions to ask, my goals. Save to ~/Documents/Meetings/prep-[DATE].md"',
  },
  {
    name: "Email Batch",
    frequency: "Twice daily",
    pattern: '"Here are emails I need to respond to: [paste]. For each: identify if needs response, action, or archive. Draft replies for those needing responses. Keep tone professional but warm."',
  },
  {
    name: "Content Repurposing",
    frequency: "After publishing",
    pattern: '"Read content at [FILE]. Create repurposing package: Twitter thread, LinkedIn post, newsletter version, 3 quote graphics, shorter blog version. Save all to ~/Documents/Content/[NAME]-repurposed/"',
  },
  {
    name: "Project Status",
    frequency: "Weekly",
    pattern: '"Generate status update for [PROJECT]. Read all files in project folder. Create: overall status, accomplishments, blockers, next milestones, help needed. Keep under 1 page."',
  },
  {
    name: "End-of-Day Capture",
    frequency: "Daily",
    pattern: '"Run end-of-day capture. Read files created/modified today. Create daily log: what I worked on, what\'s finished, what\'s open, tomorrow\'s priorities. Save to ~/Documents/DailyLogs/[DATE].md"',
  },
]

const advancedPatterns = [
  {
    name: "The Context Stack",
    description: "Layer multiple context files for complex tasks",
    example: '"Read these context files first: ~/Context/my-business.md, ~/Context/my-voice.md, ~/Context/current-project.md. Now, given this context, [complex delegation]"',
  },
  {
    name: "The Quality Loop",
    description: "Build verification into your workflows",
    example: '"[Do main task]. Now review your output: check for claims needing sources, identify uncertainties, note assumptions. Add confidence notes section. Flag anything I should verify."',
  },
  {
    name: "The Escalation Path",
    description: "Build in decision points for different scenarios",
    example: '"Process these emails. Simple questions: draft response. Needs account access: create ticket. Complaints: flag for my review with briefing. Compliments: add to testimonials. Only show me complaints."',
  },
  {
    name: "The Learning Loop",
    description: "Workflows that improve themselves over time",
    example: '"Read my previous 5 weekly reviews. Identify patterns: recurring blockers, consistent accomplishments, things I say but don\'t do. Add patterns section with insights."',
  },
]

export default function Module5Page() {
  return (
    <PurchaseGate productId="claude-for-knowledge-workers" moduleName="Module 5: Future-Proofing">
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
              <span>Module 5</span>
              <span className="text-id8-orange/50">•</span>
              <span>60 min</span>
              <span className="text-id8-orange/50">•</span>
              <span>Final Module</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Building Workflows
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              From one-off delegations to a personal operating system. Build reusable templates, chain delegations together, and create systems that compound over time. This is where everything comes together.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="/courses/module-5/module-5-building-workflows.pdf"
                download="Module-5-Building-Workflows.pdf"
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
                  src="/courses/module-5/media/module-5-building-workflows.mp4"
                  title="Building Workflows (Video)"
                  downloadName="Module-5-Building-Workflows.mp4"
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
                  src="/courses/module-5/media/module-5-building-workflows.m4a"
                  title="Building Workflows (Podcast)"
                  downloadName="Module-5-Building-Workflows.m4a"
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
                Welcome to the final module. You've come a long way.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                In Module 0, you learned the mental model — delegation, not conversation. In Module 1, you built confidence with quick wins. Module 2 taught you file processing at scale. Module 3 turned you into a writing collaborator. Module 4 made you a research machine.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Now we tie it all together. This module is about <strong className="text-[var(--text-primary)]">systems</strong>. Not one-off delegations, but repeatable workflows. The goal: build your personal operating system with Claude — a set of patterns, templates, and habits that compound over time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">The Problem With One-Off Delegations</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Every time you delegate, you're crafting a new prompt. Remembering the formula. Thinking about context, outcome, location. That's fine for occasional tasks. But for things you do regularly? It's inefficient.
            </p>

            <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl mb-6">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-4">Eddie's Realization:</p>
              <p className="text-[var(--text-secondary)]">
                "I was delegating the same tasks repeatedly, slightly differently each time. Monday: 'Summarize these meeting notes.' Wednesday: 'Summarize these other meeting notes.' Friday: 'Summarize these meeting notes too.' Same pattern, different inputs. I was wasting time re-explaining what I wanted. That's when I realized: I need templates, not just delegations."
              </p>
            </div>

            <p className="text-[var(--text-secondary)]">
              The shift in this module is from <strong className="text-[var(--text-primary)]">"I can delegate tasks"</strong> to <strong className="text-[var(--text-primary)]">"I have systems that run automatically."</strong>
            </p>
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

      {/* Workflow Building Blocks */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Workflow Building Blocks</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Before we build workflows, understand the four components.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {buildingBlocks.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-id8-orange">{block.icon}</span>
                    <h3 className="font-bold text-[var(--text-primary)]">{block.name}</h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{block.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Six Essential Workflows */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <RepeatIcon />
              </span>
              <h2 className="text-2xl font-bold">Six Workflows Every Knowledge Worker Needs</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              High-value workflows to build and customize for your situation.
            </p>

            <div className="space-y-4">
              {essentialWorkflows.map((workflow, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-[var(--text-primary)]">{workflow.name}</p>
                    <span className="text-xs font-mono text-id8-orange bg-id8-orange/10 px-2 py-1 rounded">
                      {workflow.frequency}
                    </span>
                  </div>
                  <code className="block text-sm text-[var(--text-secondary)] bg-[var(--bg-primary)] p-3 rounded">
                    {workflow.pattern}
                  </code>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Patterns */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <LayersIcon />
              </span>
              <h2 className="text-2xl font-bold">Advanced Workflow Patterns</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              Once you're comfortable with basic workflows, try these advanced patterns.
            </p>

            <div className="space-y-4">
              {advancedPatterns.map((pattern, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
                >
                  <p className="font-bold text-[var(--text-primary)] mb-1">{pattern.name}</p>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">{pattern.description}</p>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-secondary)] p-3 rounded">
                    {pattern.example}
                  </code>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Operating System */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Building Your Personal Operating System</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Individual workflows are useful. A connected system is powerful. Here's what a complete system looks like:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { name: "Context Layer", desc: "Files that define who you are, what you do, how you work" },
                { name: "Workflow Library", desc: "Your collection of reusable templates (daily, weekly, monthly, situational)" },
                { name: "Trigger Schedule", desc: "When each workflow runs — calendar reminders and habit triggers" },
                { name: "Output Structure", desc: "Consistent folder structure and naming conventions" },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <p className="font-bold text-[var(--text-primary)] mb-1">{item.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's System:</p>
              <p className="text-[var(--text-secondary)]">
                "My personal operating system has about 15 workflows. Monday morning: weekly planning. Friday afternoon: weekly review. First of the month: invoice processing and LLC admin. Before any major meeting: meeting prep. After any content: repurposing. What used to be 20 hours of monthly admin is now about 3 hours — and most of that is review, not creation. The real magic? Because everything is saved consistently, Claude gets better at understanding my context over time. It compounds."
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
              <h2 className="text-2xl font-bold">Your Challenge: Build Three Workflows</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              Create your personal operating system foundation:
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Workflow 1: Something You Do Weekly</p>
                <p className="text-sm text-[var(--text-secondary)]">Examples: Weekly review, report generation, email batch processing, project status update</p>
              </div>
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Workflow 2: Something You Do Monthly</p>
                <p className="text-sm text-[var(--text-secondary)]">Examples: Invoice processing, performance review, goal progress check, content calendar planning</p>
              </div>
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Workflow 3: Something You Do Situationally</p>
                <p className="text-sm text-[var(--text-secondary)]">Examples: Meeting prep (before meetings), content repurposing (after publishing), outreach (when prospecting)</p>
              </div>
            </div>

            <div className="p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Success looks like:</p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• You have 3 documented, tested workflows</li>
                <li>• Each one saves you at least 30 minutes per occurrence</li>
                <li>• You know when to run each one</li>
                <li>• Claude produces consistently useful output</li>
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
                { num: 1, text: "Templates beat prompts. Stop crafting new delegations each time. Build reusable templates with blanks to fill in." },
                { num: 2, text: "Chains multiply power. Connect delegations together. The output of one becomes the input of the next." },
                { num: 3, text: "Context files reduce explaining. Put persistent information in files Claude can reference. Your voice, your business, your preferences." },
                { num: 4, text: "Habits are triggers. Even without automation, building consistent habits (\"Every Friday at 4pm\") makes workflows reliable." },
                { num: 5, text: "Systems compound. A connected operating system gets smarter over time. Past outputs inform future inputs. That's the real magic." },
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

      {/* Course Completion */}
      <section className="section-spacing bg-id8-orange/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
            <p className="text-xl text-[var(--text-secondary)] mb-6">
              You've completed <strong className="text-[var(--text-primary)]">Claude Code for Knowledge Workers</strong>.
            </p>
            <p className="text-[var(--text-secondary)] mb-8">
              You started as someone who chatted with AI. Now you're someone who delegates to an agent. You can process files, write collaboratively, research like a team, and build systems that run your operations. The goal was never to learn Claude Code — it was to reclaim your time for the work that matters.
            </p>
            <p className="text-2xl font-bold text-id8-orange mb-8">
              Welcome to the delegation economy.
            </p>
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
                src="/courses/module-5/media/module-5-mindmap.png"
                alt="Module 5 Mindmap - Building Workflows"
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
                href="/courses/claude-for-knowledge-workers/module-4"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: Research & Analysis
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Back to Course Overview
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
