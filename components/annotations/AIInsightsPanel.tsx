'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from '@/components/motion'

type AIAction = 'summarize' | 'connections' | 'expand' | 'study-guide'

interface AIInsightsPanelProps {
  courseSlug?: string
  moduleSlug?: string
  highlightId?: string
  onClose?: () => void
  action?: AIAction
  title?: string
  className?: string
}

export function AIInsightsPanel({
  courseSlug,
  moduleSlug,
  highlightId,
  onClose,
  action = 'summarize',
  title,
  className = '',
}: AIInsightsPanelProps) {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  const actionConfig: Record<AIAction, { endpoint: string; buttonText: string; title: string; description: string }> = {
    summarize: {
      endpoint: '/api/annotations/ai/summarize',
      buttonText: 'Summarize My Notes',
      title: 'AI Summary',
      description: 'Get an AI-powered summary of your highlights and notes.',
    },
    connections: {
      endpoint: '/api/annotations/ai/connections',
      buttonText: 'Find Connections',
      title: 'Connections & Patterns',
      description: 'Discover patterns and themes across your annotations.',
    },
    expand: {
      endpoint: '/api/annotations/ai/expand',
      buttonText: 'Expand This',
      title: 'Expanded Insight',
      description: 'Turn this highlight into a richer, more detailed note.',
    },
    'study-guide': {
      endpoint: '/api/annotations/ai/study-guide',
      buttonText: 'Generate Study Guide',
      title: 'Your Study Guide',
      description: 'Create a personalized study guide from your annotations.',
    },
  }

  const config = actionConfig[action]

  const generateInsight = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setContent('')
    setHasGenerated(true)

    try {
      const body: Record<string, string | undefined> = {}

      if (action === 'expand' && highlightId) {
        body.highlightId = highlightId
      } else {
        if (courseSlug) body.courseSlug = courseSlug
        if (moduleSlug) body.moduleSlug = moduleSlug
      }

      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to generate insight')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let result = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        setContent(result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [action, courseSlug, moduleSlug, highlightId, config.endpoint])

  return (
    <div className={`bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-gradient-to-r from-id8-orange/10 to-transparent">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-id8-orange" />
          <h3 className="font-semibold text-sm">{title || config.title}</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
            aria-label="Close"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {!hasGenerated ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6"
            >
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {config.description}
              </p>
              <button
                onClick={generateInsight}
                disabled={isLoading}
                className="px-4 py-2 bg-id8-orange text-white rounded-lg hover:bg-id8-orange/90 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
              >
                <SparklesIcon className="w-4 h-4" />
                {config.buttonText}
              </button>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6"
            >
              <div className="text-red-500 mb-4">
                <ErrorIcon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={generateInsight}
                className="px-4 py-2 text-sm text-id8-orange hover:underline"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {isLoading && !content && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin w-5 h-5 border-2 border-id8-orange border-t-transparent rounded-full" />
                    <span className="text-sm text-[var(--text-secondary)]">
                      Analyzing your notes...
                    </span>
                  </div>
                </div>
              )}

              {content && (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {content}
                    {isLoading && (
                      <span className="inline-block w-2 h-4 bg-id8-orange/70 animate-pulse ml-0.5" />
                    )}
                  </div>
                </div>
              )}

              {!isLoading && content && (
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-between items-center">
                  <button
                    onClick={generateInsight}
                    className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] flex items-center gap-1"
                  >
                    <RefreshIcon className="w-3 h-3" />
                    Regenerate
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(content)}
                    className="text-xs text-id8-orange hover:underline flex items-center gap-1"
                  >
                    <CopyIcon className="w-3 h-3" />
                    Copy
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Compact button variant for triggering AI actions
interface AIActionButtonProps {
  action: AIAction
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function AIActionButton({ action, onClick, disabled, className = '' }: AIActionButtonProps) {
  const labels: Record<AIAction, string> = {
    summarize: 'Summarize',
    connections: 'Find Connections',
    expand: 'Expand',
    'study-guide': 'Study Guide',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-id8-orange/10 text-id8-orange rounded-full hover:bg-id8-orange/20 transition-colors disabled:opacity-50 ${className}`}
    >
      <SparklesIcon className="w-3.5 h-3.5" />
      {labels[action]}
    </button>
  )
}

// Icons
function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  )
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )
}
