'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackEvent } from '@/components/Analytics'

type FunnelStep = 'assessment' | 'results' | 'checklist' | 'success'

interface AssessmentAnswer {
  question: number
  score: number
}

const assessmentQuestions = [
  {
    id: 1,
    question: "How are you currently using AI in your development workflow?",
    options: [
      { label: "Not using AI yet", score: 1 },
      { label: "Basic autocomplete (Copilot, etc.)", score: 2 },
      { label: "Chat-based assistance (ChatGPT, Claude)", score: 3 },
      { label: "Agentic tools (Claude Code, Cursor Agent)", score: 4 },
    ]
  },
  {
    id: 2,
    question: "How familiar are you with MCP (Model Context Protocol)?",
    options: [
      { label: "Never heard of it", score: 1 },
      { label: "Heard of it, haven't used it", score: 2 },
      { label: "Used existing MCP servers", score: 3 },
      { label: "Built custom MCP servers", score: 4 },
    ]
  },
  {
    id: 3,
    question: "What's your biggest AI integration challenge?",
    options: [
      { label: "Don't know where to start", score: 1 },
      { label: "Security and data privacy concerns", score: 2 },
      { label: "Connecting AI to our existing tools", score: 3 },
      { label: "Scaling AI agents in production", score: 4 },
    ]
  },
  {
    id: 4,
    question: "How does your team handle AI tool governance?",
    options: [
      { label: "No formal policy", score: 1 },
      { label: "Basic guidelines exist", score: 2 },
      { label: "Centralized AI enablement team", score: 3 },
      { label: "Full governance with audit trails", score: 4 },
    ]
  },
  {
    id: 5,
    question: "What's your 2026 AI development priority?",
    options: [
      { label: "Exploring what's possible", score: 1 },
      { label: "Improving developer productivity", score: 2 },
      { label: "Building AI-powered features", score: 3 },
      { label: "Deploying autonomous AI agents", score: 4 },
    ]
  },
]

const getReadinessLevel = (score: number): { level: string; description: string; color: string; recommendations: string[] } => {
  if (score <= 8) {
    return {
      level: "Explorer",
      description: "You're at the beginning of your AI journey. The good news? You can skip the mistakes others made and adopt 2025 best practices from day one.",
      color: "var(--accent-blue)",
      recommendations: [
        "Start with Claude Code fundamentals training",
        "Learn the basics of MCP architecture",
        "Set up your first AI-assisted workflow"
      ]
    }
  } else if (score <= 13) {
    return {
      level: "Adopter",
      description: "You're using AI tools but haven't unlocked their full potential. MCP integration and proper governance will accelerate your progress.",
      color: "var(--accent-amber)",
      recommendations: [
        "Implement MCP servers for your key tools",
        "Establish AI governance policies",
        "Move from chat-based to agentic workflows"
      ]
    }
  } else if (score <= 17) {
    return {
      level: "Practitioner",
      description: "You're ahead of most teams. Focus on production-grade deployments and scaling your AI agent infrastructure.",
      color: "var(--accent-green)",
      recommendations: [
        "Advanced MCP security hardening",
        "Multi-agent orchestration patterns",
        "Production monitoring and observability"
      ]
    }
  } else {
    return {
      level: "Pioneer",
      description: "You're operating at the cutting edge. Let's connect to discuss enterprise consulting and custom agent development.",
      color: "var(--id8-orange)",
      recommendations: [
        "Custom agent architecture consulting",
        "Enterprise MCP infrastructure design",
        "Team training and enablement programs"
      ]
    }
  }
}

export default function LeadMagnetFunnel() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<FunnelStep>('assessment')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalScore = answers.reduce((sum, a) => sum + a.score, 0)
  const readiness = getReadinessLevel(totalScore)

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, { question: currentQuestion, score }]
    setAnswers(newAnswers)

    trackEvent('assessment_answer', 'lead_funnel', `Q${currentQuestion + 1}`, score)

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setStep('results')
      const finalScore = newAnswers.reduce((sum, a) => sum + a.score, 0)
      trackEvent('assessment_complete', 'lead_funnel', getReadinessLevel(finalScore).level, finalScore)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    trackEvent('lead_captured', 'conversion', readiness.level, totalScore)

    // Simulate API call - replace with actual email service
    await new Promise(resolve => setTimeout(resolve, 1000))

    setStep('success')
    setIsSubmitting(false)
  }

  const resetAssessment = () => {
    setStep('assessment')
    setCurrentQuestion(0)
    setAnswers([])
    setEmail('')
    setName('')
  }

  return (
    <>
      {/* Floating CTA Button */}
      <motion.button
        onClick={() => {
          setIsOpen(true)
          trackEvent('assessment_opened', 'lead_funnel', 'floating_button')
        }}
        className="fixed bottom-6 right-6 z-40 bg-[var(--id8-orange)] text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <span className="font-semibold">Free AI Readiness Check</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform group-hover:translate-x-1"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[var(--bg-primary)] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    {step === 'assessment' && 'AI Agent Readiness Assessment'}
                    {step === 'results' && 'Your Results'}
                    {step === 'checklist' && 'Get Your Resources'}
                    {step === 'success' && 'Check Your Inbox'}
                  </h2>
                  {step === 'assessment' && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Question {currentQuestion + 1} of {assessmentQuestions.length}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                  aria-label="Close assessment"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* Assessment Questions */}
                  {step === 'assessment' && (
                    <motion.div
                      key={`question-${currentQuestion}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* Progress Bar */}
                      <div className="h-1 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--id8-orange)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {assessmentQuestions[currentQuestion].question}
                      </h3>

                      <div className="space-y-3">
                        {assessmentQuestions[currentQuestion].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(option.score)}
                            className="w-full p-4 text-left border border-[var(--border)] rounded-xl hover:border-[var(--id8-orange)] hover:bg-[var(--id8-orange-light)] transition-all duration-200 group"
                          >
                            <span className="text-[var(--text-primary)] group-hover:text-[var(--id8-orange)]">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Results */}
                  {step === 'results' && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Score Display */}
                      <div className="text-center p-6 bg-[var(--bg-secondary)] rounded-xl">
                        <div
                          className="text-5xl font-bold mb-2"
                          style={{ color: readiness.color }}
                        >
                          {readiness.level}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          Score: {totalScore} / 20
                        </div>
                      </div>

                      <p className="text-[var(--text-secondary)]">
                        {readiness.description}
                      </p>

                      {/* Recommendations Preview */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-[var(--text-primary)]">
                          Your Personalized Recommendations:
                        </h4>
                        <ul className="space-y-2">
                          {readiness.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                              <svg className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setStep('checklist')}
                        className="w-full btn btn-primary"
                      >
                        Get Free Resources
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </motion.div>
                  )}

                  {/* Email Capture */}
                  {step === 'checklist' && (
                    <motion.div
                      key="checklist"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--text-primary)]">
                          You'll receive:
                        </h3>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg">
                            <div className="w-10 h-10 bg-[var(--id8-orange-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-[var(--id8-orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-[var(--text-primary)]">MCP Security Checklist</div>
                              <div className="text-sm text-[var(--text-secondary)]">PDF guide to avoid the "Wild West" of AI integration</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg">
                            <div className="w-10 h-10 bg-[var(--accent-blue)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-[var(--accent-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-[var(--text-primary)]">Claude Code Hooks Starter Kit</div>
                              <div className="text-sm text-[var(--text-secondary)]">GitHub repo with production-ready hook templates</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg">
                            <div className="w-10 h-10 bg-[var(--accent-green)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-[var(--text-primary)]">Personalized Action Plan</div>
                              <div className="text-sm text-[var(--text-secondary)]">Based on your "{readiness.level}" readiness level</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] focus:border-transparent transition-all"
                            placeholder="Eddie"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                            Work Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] focus:border-transparent transition-all"
                            placeholder="you@company.com"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <>
                              Send My Free Resources
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </>
                          )}
                        </button>
                        <p className="text-xs text-center text-[var(--text-tertiary)]">
                          No spam. Unsubscribe anytime. We respect your privacy.
                        </p>
                      </form>
                    </motion.div>
                  )}

                  {/* Success */}
                  {step === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6 py-6"
                    >
                      <div className="w-16 h-16 bg-[var(--accent-green)]/10 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-[var(--accent-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                          You're all set, {name}!
                        </h3>
                        <p className="text-[var(--text-secondary)]">
                          Check your inbox for the MCP Security Checklist and Claude Code Hooks Starter Kit.
                        </p>
                      </div>

                      <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                        <p className="text-sm text-[var(--text-secondary)] mb-3">
                          While you wait, explore our training programs:
                        </p>
                        <a
                          href="/services"
                          className="btn btn-secondary w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          View Claude Code Training
                        </a>
                      </div>

                      <button
                        onClick={() => {
                          setIsOpen(false)
                          resetAssessment()
                        }}
                        className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                      >
                        Close this window
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
