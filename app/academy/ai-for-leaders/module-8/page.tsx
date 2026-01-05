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

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const AlertIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

const TargetIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
)

export default function Module8Page() {
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
                href="/academy/ai-for-leaders"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI for Leaders
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={8}
                totalModules={8}
                courseTitle="AI for Leaders"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 8
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                60 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Leading the Change
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "We built the perfect AI system. Then nobody used it."
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* Why Adoption Fails */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Hard Truth
              </h2>
              <h3 className="text-2xl font-bold mb-4">Why AI Adoption Fails</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  According to Gartner, 85% of AI projects fail to deliver business value. McKinsey reports that only 8% of companies achieve widespread AI adoption. MIT found that 71% of AI initiatives stall in the pilot phase.
                </p>
                <p>
                  The reason isn't technical. It's rarely the model, the data quality, or the infrastructure. The number one cause of AI project failure is human: resistance, confusion, lack of training, poor communication, and change fatigue.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module is about the hardest part of AI leadership: getting people to actually use what you've built.
                </p>
              </div>
            </div>

            <h2>The Real Barriers to AI Adoption</h2>
            <p>
              Before you can lead change, you need to understand what you're up against. These are the six most common barriers:
            </p>

            <div className="not-prose my-8 space-y-3">
              {[
                {
                  title: "Fear of Job Loss",
                  desc: "The biggest unspoken concern. If you don't address it directly, it will derail everything.",
                },
                {
                  title: "Lack of Understanding",
                  desc: "People reject what they don't understand. If AI feels like magic, it feels unsafe.",
                },
                {
                  title: "Change Fatigue",
                  desc: "Your team has survived five 'transformation initiatives' already. Why is this one different?",
                },
                {
                  title: "Skill Gaps",
                  desc: "Knowing AI exists is different from knowing how to use it. Training isn't optional.",
                },
                {
                  title: "Trust Issues",
                  desc: "AI makes mistakes. If your team doesn't trust the output, they'll ignore it.",
                },
                {
                  title: "Incentive Misalignment",
                  desc: "If the old way is faster for hitting quarterly goals, AI won't get adopted.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">{item.title}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p>
              <strong>Key insight:</strong> None of these are solved with better technology. They're solved with leadership, communication, and intentional change management.
            </p>

            {/* Stakeholder Mapping */}
            <h2>Stakeholder Mapping: Know Your Allies and Resisters</h2>
            <p>
              Not everyone will react to AI the same way. Your first step is to map your stakeholders across two dimensions: <strong>Influence</strong> and <strong>Support</strong>.
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="grid grid-cols-2 gap-px bg-[var(--border)]">
                {/* Top row headers */}
                <div className="bg-[var(--bg-secondary)] p-4">
                  <p className="text-xs text-[var(--text-tertiary)] mb-2">High Support, Low Influence</p>
                  <p className="font-bold text-green-400 mb-2">INFORM</p>
                  <p className="text-sm text-[var(--text-secondary)]">Keep them updated. They're your cheerleaders but can't drive change.</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">Example: Junior analyst excited about AI</p>
                </div>
                <div className="bg-[var(--bg-secondary)] p-4">
                  <p className="text-xs text-[var(--text-tertiary)] mb-2">High Support, High Influence</p>
                  <p className="font-bold text-id8-orange mb-2">PARTNER</p>
                  <p className="text-sm text-[var(--text-secondary)]">Your champions. Involve them deeply. Give them ownership.</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">Example: VP who championed the AI budget</p>
                </div>
                {/* Bottom row */}
                <div className="bg-[var(--bg-secondary)] p-4">
                  <p className="text-xs text-[var(--text-tertiary)] mb-2">Low Support, Low Influence</p>
                  <p className="font-bold text-gray-400 mb-2">WATCH</p>
                  <p className="text-sm text-[var(--text-secondary)]">Monitor but don't over-invest. They won't make or break this.</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">Example: Skeptical team member in unrelated dept</p>
                </div>
                <div className="bg-[var(--bg-secondary)] p-4">
                  <p className="text-xs text-[var(--text-tertiary)] mb-2">Low Support, High Influence</p>
                  <p className="font-bold text-red-400 mb-2">ENGAGE</p>
                  <p className="text-sm text-[var(--text-secondary)]">Critical. Understand their concerns. Address them directly.</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">Example: Department head blocking adoption</p>
                </div>
              </div>
            </div>

            <p>
              <strong>Action:</strong> List your key stakeholders by name. Place them in quadrants. For each person in "ENGAGE," schedule a 1:1 conversation to understand their resistance. Don't skip this.
            </p>

            {/* The Fear Factor */}
            <h2>The Fear Factor: Addressing Job Displacement</h2>
            <p>
              Let's talk about the thing everyone is thinking but not saying: <em>"Will AI take my job?"</em>
            </p>

            <p>
              If you don't address this directly, it will poison every adoption effort. Here's how to handle it with honesty and clarity:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-red-400">DON'T Say</th>
                    <th className="text-left py-3 px-4 text-green-400">DO Say</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">"AI won't replace anyone."</td>
                    <td className="py-3 px-4">"AI will change what we do. Some roles will evolve. We're investing in training."</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">"This is just a tool."</td>
                    <td className="py-3 px-4">"This is a capability shift. We'll need new skills to use it effectively."</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">"Everyone's job is safe."</td>
                    <td className="py-3 px-4">"Our goal is to augment expertise, not replace people. That said, the work itself will change."</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">"You'll have more time for strategic work."</td>
                    <td className="py-3 px-4">"AI handles repetitive tasks. We're redefining what strategic work means in this new context."</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">"Adapt or get left behind."</td>
                    <td className="py-3 px-4">"We're building a support system to help everyone develop the skills they'll need."</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>The reframe:</strong> AI is not a replacement for people. It's a replacement for tasks. The question isn't "Will I have a job?" but "What will my job become?"
            </p>

            <p>
              Your role as a leader is to provide a clear path from the old role to the new one. That requires training, support, and honest timelines.
            </p>

            {/* Communication Framework */}
            <h2>Communication Framework: What to Say at Each Stage</h2>
            <p>
              AI adoption isn't a single announcement. It's a series of conversations across four stages. Here's what to communicate at each one:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Stage</th>
                    <th className="text-left py-3 px-4">What to Communicate</th>
                    <th className="text-left py-3 px-4">Key Message</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">1. Awareness</td>
                    <td className="py-3 px-4">Why we're exploring AI, what problems we're trying to solve, timeline</td>
                    <td className="py-3 px-4 text-[var(--text-primary)]">"We're investigating AI to [solve problem]. Here's what we're learning."</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">2. Understanding</td>
                    <td className="py-3 px-4">How AI works (simplified), what it will and won't do, who it affects</td>
                    <td className="py-3 px-4 text-[var(--text-primary)]">"Here's what AI can do for us, and what it can't. This is how it works."</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">3. Adoption</td>
                    <td className="py-3 px-4">Training available, support channels, pilot groups, feedback loops</td>
                    <td className="py-3 px-4 text-[var(--text-primary)]">"We're starting with [team]. Here's how to get trained and supported."</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">4. Optimization</td>
                    <td className="py-3 px-4">Early wins, lessons learned, adjustments made, expansion plans</td>
                    <td className="py-3 px-4 text-[var(--text-primary)]">"Here's what's working, what we fixed, and what's next."</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Frequency matters:</strong> Communicate more than feels necessary. Silence creates anxiety. Over-communicate progress, challenges, and next steps.
            </p>

            {/* Training & Enablement */}
            <h2>Training & Enablement: Building AI Literacy</h2>
            <p>
              You can't expect adoption without training. But training isn't one-size-fits-all. Different roles need different depth:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Executives & Leaders</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">What they need: Strategic understanding of AI capabilities, risks, and ROI.</p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Format:</strong> 2-hour executive briefing + quarterly updates<br/>
                  <strong>Focus:</strong> Business impact, governance, change leadership
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Managers & Team Leads</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">What they need: How to integrate AI into workflows and support their teams.</p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Format:</strong> Half-day workshop + monthly office hours<br/>
                  <strong>Focus:</strong> Workflow redesign, performance expectations, coaching
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Individual Contributors</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">What they need: Hands-on training with the specific tools they'll use daily.</p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Format:</strong> 4-hour hands-on workshop + ongoing support<br/>
                  <strong>Focus:</strong> Practical use cases, troubleshooting, best practices
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Technical Teams</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">What they need: Deep technical knowledge to build, deploy, and maintain AI systems.</p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Format:</strong> Multi-week technical training + certification path<br/>
                  <strong>Focus:</strong> Model selection, integration, monitoring, security
                </p>
              </div>
            </div>

            <p>
              <strong>Success metrics for training:</strong>
            </p>
            <ul className="text-[var(--text-secondary)]">
              <li>% of target users who completed training within 30 days</li>
              <li>Post-training confidence survey scores (1-10 scale)</li>
              <li>Time to first productive AI use after training</li>
              <li>Support ticket volume and resolution time</li>
            </ul>

            {/* Resistance Patterns */}
            <h2>Five Resistance Patterns (And How to Handle Each)</h2>
            <p>
              Resistance isn't monolithic. Different people resist for different reasons. Here are the five most common patterns and proven approaches for each:
            </p>

            <div className="not-prose my-8 grid gap-4">
              {[
                {
                  title: "The Skeptic",
                  quote: "This won't work here.",
                  identify: "Questions every claim. Points out past failed initiatives. Demands proof.",
                  handle: [
                    "Show, don't tell. Provide concrete pilot results with their team's data.",
                    "Acknowledge past failures. Explain what's different this time.",
                    "Involve them in pilot design. Their skepticism can improve the approach.",
                  ],
                },
                {
                  title: "The Threatened",
                  quote: "AI will take my job.",
                  identify: "Defensive posture. Emphasizes irreplaceable human skills. Avoids AI training.",
                  handle: [
                    "Address fear directly and honestly. Don't dismiss it.",
                    "Show career path evolution, not elimination. How does their role grow?",
                    "Provide early access and training. Competence reduces fear.",
                  ],
                },
                {
                  title: "The Perfectionist",
                  quote: "It's not good enough yet.",
                  identify: "Focuses on AI errors. Holds AI to impossibly high standards. Waits for 'perfect' solution.",
                  handle: [
                    "Reframe expectations. AI augments, doesn't replace judgment.",
                    "Show cost of waiting. What's the opportunity cost of perfect?",
                    "Create safe testing environments. Let them see iterative improvement.",
                  ],
                },
                {
                  title: "The Overloader",
                  quote: "I don't have time for this.",
                  identify: "Already stretched thin. Sees AI as more work, not less. Delays training.",
                  handle: [
                    "Make training minimal and practical. No fluff.",
                    "Show immediate time savings in their actual workflow.",
                    "Provide dedicated time for learning. Don't add it on top of existing workload.",
                  ],
                },
                {
                  title: "The Shadow User",
                  quote: "(Using ChatGPT without approval)",
                  identify: "Already using AI tools outside official channels. May not follow security protocols.",
                  handle: [
                    "Don't punish initiative. Channel it productively.",
                    "Formalize safe usage paths. Make compliance easier than shadow IT.",
                    "Learn from what they're doing. They might be ahead of your roadmap.",
                  ],
                },
              ].map((pattern, i) => (
                <div key={i} className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">{i + 1}</span>
                    <div>
                      <p className="font-bold text-lg text-[var(--text-primary)]">{pattern.title}</p>
                      <p className="text-sm italic text-[var(--text-tertiary)]">"{pattern.quote}"</p>
                    </div>
                  </div>
                  <div className="ml-11">
                    <p className="text-sm font-mono text-id8-orange uppercase mb-1">How to Identify</p>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">{pattern.identify}</p>
                    <p className="text-sm font-mono text-green-400 uppercase mb-1">How to Handle</p>
                    <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                      {pattern.handle.map((item, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* The 90-Day Playbook */}
            <h2>The 90-Day Adoption Playbook</h2>
            <p>
              Here's a week-by-week plan for rolling out AI adoption in your organization. Adapt the timeline to your context, but keep the sequence:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Phase</th>
                    <th className="text-left py-3 px-4">Timeline</th>
                    <th className="text-left py-3 px-4">Key Activities</th>
                    <th className="text-left py-3 px-4">Success Criteria</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Foundation</td>
                    <td className="py-3 px-4">Weeks 1-2</td>
                    <td className="py-3 px-4">
                      • Stakeholder mapping<br/>
                      • Communication plan<br/>
                      • Pilot team selection<br/>
                      • Training curriculum design
                    </td>
                    <td className="py-3 px-4">
                      • All stakeholders mapped<br/>
                      • Pilot team committed<br/>
                      • Training materials ready
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Pilot Launch</td>
                    <td className="py-3 px-4">Weeks 3-4</td>
                    <td className="py-3 px-4">
                      • Pilot training sessions<br/>
                      • Daily check-ins<br/>
                      • Rapid issue resolution<br/>
                      • Early win documentation
                    </td>
                    <td className="py-3 px-4">
                      • 80% pilot attendance<br/>
                      • First productive use within 3 days<br/>
                      • At least one documented win
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Expand & Learn</td>
                    <td className="py-3 px-4">Weeks 5-8</td>
                    <td className="py-3 px-4">
                      • Weekly pilot retrospectives<br/>
                      • Process refinement<br/>
                      • Success story sharing<br/>
                      • Second wave planning
                    </td>
                    <td className="py-3 px-4">
                      • 50% of pilot team using daily<br/>
                      • Measurable productivity gain<br/>
                      • Resistance patterns identified
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Scale</td>
                    <td className="py-3 px-4">Weeks 9-12</td>
                    <td className="py-3 px-4">
                      • Organization-wide training<br/>
                      • Support infrastructure<br/>
                      • Champions network<br/>
                      • Usage analytics
                    </td>
                    <td className="py-3 px-4">
                      • 60% org trained<br/>
                      • 30% active users<br/>
                      • Support satisfaction &gt;80%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Critical checkpoints:</strong>
            </p>
            <ul className="text-[var(--text-secondary)]">
              <li><strong>Week 2:</strong> If you don't have pilot volunteers, your communication isn't working. Pause and reset.</li>
              <li><strong>Week 4:</strong> If pilot users aren't seeing value, your use case is wrong. Iterate before expanding.</li>
              <li><strong>Week 8:</strong> If resistance hasn't decreased, you're not addressing the real concerns. Go deeper.</li>
              <li><strong>Week 12:</strong> If adoption isn't at 30%, something structural is broken. Don't force scale.</li>
            </ul>

            {/* Exercise Box */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/20 flex items-center justify-center">
                  <TargetIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-id8-orange mb-1">BUILD: Your Change Management Plan</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Your final deliverable for this course</p>
                </div>
              </div>

              <div className="space-y-4 text-[var(--text-secondary)]">
                <div>
                  <p className="font-bold text-[var(--text-primary)] mb-2">Part 1: Stakeholder Map</p>
                  <p className="text-sm">List 10-15 key people by name. Place each in the influence/support matrix. For each person in the "ENGAGE" quadrant, write one sentence about their likely concern.</p>
                </div>

                <div>
                  <p className="font-bold text-[var(--text-primary)] mb-2">Part 2: Resistance Assessment</p>
                  <p className="text-sm">Identify which of the five resistance patterns you expect to encounter most. Write a brief response strategy for each one.</p>
                </div>

                <div>
                  <p className="font-bold text-[var(--text-primary)] mb-2">Part 3: Communication Timeline</p>
                  <p className="text-sm">Create a 12-week communication calendar. What gets announced when? Who delivers the message? What's the format? (Email, town hall, 1:1, etc.)</p>
                </div>

                <div>
                  <p className="font-bold text-[var(--text-primary)] mb-2">Part 4: Training Plan</p>
                  <p className="text-sm">Define training approach for each role group. How long? What format? Who delivers it? When does it happen in your 90-day timeline?</p>
                </div>

                <div>
                  <p className="font-bold text-[var(--text-primary)] mb-2">Part 5: Success Metrics</p>
                  <p className="text-sm">Define 5 metrics you'll track to know if adoption is working. Be specific. Include targets and measurement frequency.</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-id8-orange/30">
                <p className="text-sm text-[var(--text-tertiary)] italic">
                  This plan is your roadmap for the next 90 days. It should be a living document that evolves as you learn. The goal isn't perfection—it's intentionality.
                </p>
              </div>
            </div>

            {/* Course Conclusion */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/20 rounded-2xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Course Conclusion
              </h2>
              <h3 className="text-3xl font-bold mb-6">You've Built Your AI Leadership Framework</h3>

              <div className="space-y-4 text-[var(--text-secondary)] mb-6">
                <p>
                  Over the past eight modules, you've built something rare: a complete, practical framework for leading AI transformation in your organization.
                </p>
                <p>
                  You didn't just learn theory. You created deliverables:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {[
                  "AI Readiness Assessment",
                  "Use Case Evaluation Matrix",
                  "Vendor Evaluation Scorecard",
                  "Team Capability Map",
                  "Pilot Project Plan",
                  "Risk Mitigation Framework",
                  "ROI Measurement Dashboard",
                  "Change Management Plan",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                    <CheckIcon />
                    <span className="text-sm font-medium text-[var(--text-primary)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  <strong className="text-[var(--text-primary)]">What happens next?</strong>
                </p>
                <p>
                  The real work begins now. You have the frameworks. You understand the risks. You know how to evaluate tools, build teams, measure results, and lead change.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">The temptation will be to wait for perfect conditions.</strong> Don't. The perfect dataset, the perfect use case, the perfect vendor—none of these exist. Start with something small, concrete, and measurable. Run a 30-day pilot. Learn. Iterate.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">The leaders who win with AI aren't the ones who wait.</strong> They're the ones who move deliberately, learn quickly, and build trust with their teams through transparency and results.
                </p>
                <p className="text-lg font-bold text-id8-orange pt-4">
                  You're ready. Now go build something real.
                </p>
              </div>
            </div>

            {/* Key Takeaways */}
            <h2>Key Takeaways</h2>
            <div className="not-prose my-8 space-y-3">
              {[
                {
                  title: "85% of AI failures are human failures",
                  desc: "Technology is rarely the bottleneck. Resistance, poor communication, and lack of training kill more projects than bad models.",
                },
                {
                  title: "Map your stakeholders before you do anything else",
                  desc: "Know who has influence, who's supportive, and who's resistant. Tailor your approach to each quadrant.",
                },
                {
                  title: "Address job displacement fears directly and honestly",
                  desc: "Don't promise jobs are safe. Explain how roles will evolve and provide a path for skill development.",
                },
                {
                  title: "Different roles need different training",
                  desc: "Executives need strategic context. Managers need workflow redesign. ICs need hands-on practice. One training doesn't fit all.",
                },
                {
                  title: "The 90-day playbook is your implementation guide",
                  desc: "Foundation, Pilot, Expand, Scale. Each phase has checkpoints. If you're not hitting them, pause and diagnose before continuing.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded-r-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">{i + 1}</div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)] mb-1">{item.title}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between gap-4">
            <Link
              href="/academy/ai-for-leaders/module-7"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeftIcon />
              Module 7: Measuring AI ROI
            </Link>
            <Link
              href="/academy/ai-for-leaders"
              className="btn btn-primary group inline-flex items-center gap-2"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
