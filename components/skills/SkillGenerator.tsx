'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Loader2, AlertCircle, CheckCircle, Copy, Check } from 'lucide-react'
import { useSkillGeneratorStore } from '@/lib/stores/skill-generator-store'
import { SKILL_CATEGORIES, COMPLEXITY_LEVELS, type SkillCategory, type ComplexityLevel } from '@/lib/skill-generator-prompt'
import { SkillPreview } from './SkillPreview'

interface SkillGeneratorProps {
  onClose?: () => void
  onSaved?: (skillId: string) => void
}

export function SkillGenerator({ onClose, onSaved }: SkillGeneratorProps) {
  const {
    description,
    setDescription,
    categoryHint,
    setCategoryHint,
    complexityHint,
    setComplexityHint,
    state,
    setState,
    streamedContent,
    setStreamedContent,
    appendStreamedContent,
    error,
    setError,
    generatedSkill,
    parseGeneratedContent,
    reset,
  } = useSkillGeneratorStore()

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copied, setCopied] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(false)

  const handleCopy = useCallback(async () => {
    if (!streamedContent) return
    try {
      await navigator.clipboard.writeText(streamedContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }, [streamedContent])

  const handleGenerate = useCallback(async () => {
    if (!description.trim() || description.length < 10) {
      setError('Please provide a more detailed description (at least 10 characters)')
      return
    }

    setError(null)
    setStreamedContent('')
    setState('generating')
    setGenerationComplete(false)
    setCopied(false)

    try {
      const response = await fetch('/api/skills/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description.trim(),
          category: categoryHint,
          complexity: complexityHint,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate skill')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        appendStreamedContent(chunk)
      }

      // Mark generation as complete
      setGenerationComplete(true)
    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate skill')
      setState('error')
    }
  }, [
    description,
    categoryHint,
    complexityHint,
    setError,
    setStreamedContent,
    setState,
    appendStreamedContent,
  ])

  const handleContinueToPreview = useCallback(() => {
    parseGeneratedContent()
  }, [parseGeneratedContent])

  const handleReset = useCallback(() => {
    reset()
    setGenerationComplete(false)
    setCopied(false)
  }, [reset])

  // Show preview if we have a generated skill
  if (state === 'preview' && generatedSkill) {
    return (
      <SkillPreview
        onBack={handleReset}
        onClose={onClose}
        onSaved={onSaved}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[var(--id8-orange)]/10 rounded-lg">
          <Sparkles className="w-5 h-5 text-[var(--id8-orange)]" />
        </div>
        <div>
          <h3 className="font-bold text-[var(--text-primary)]">
            AI Skill Generator
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Describe what you need, and AI will create a custom skill
          </p>
        </div>
      </div>

      {/* Input Form */}
      <AnimatePresence mode="wait">
        {state === 'idle' || state === 'error' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                What skill do you need?
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., A skill that helps me write cold outreach emails for SaaS founders, with personalization and follow-up sequences..."
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl
                           bg-[var(--bg-secondary)] text-[var(--text-primary)]
                           placeholder:text-[var(--text-tertiary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]
                           focus:border-transparent resize-none transition-all"
                rows={4}
              />
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                {description.length}/1000 characters
              </p>
            </div>

            {/* Advanced Options Toggle */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-[var(--id8-orange)] hover:underline"
            >
              {showAdvanced ? 'Hide' : 'Show'} advanced options
            </button>

            {/* Advanced Options */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Category (optional)
                    </label>
                    <select
                      value={categoryHint || ''}
                      onChange={(e) =>
                        setCategoryHint(
                          e.target.value ? (e.target.value as SkillCategory) : null
                        )
                      }
                      className="w-full px-4 py-2 border border-[var(--border)] rounded-lg
                                 bg-[var(--bg-secondary)] text-[var(--text-primary)]
                                 focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
                    >
                      <option value="">Auto-detect</option>
                      {SKILL_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Complexity */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Complexity (optional)
                    </label>
                    <select
                      value={complexityHint || ''}
                      onChange={(e) =>
                        setComplexityHint(
                          e.target.value ? (e.target.value as ComplexityLevel) : null
                        )
                      }
                      className="w-full px-4 py-2 border border-[var(--border)] rounded-lg
                                 bg-[var(--bg-secondary)] text-[var(--text-primary)]
                                 focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
                    >
                      <option value="">Auto-detect</option>
                      {COMPLEXITY_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                      Simple = single task, Complex = multi-step, Multi-agent = orchestration
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!description.trim() || description.length < 10}
              className="w-full py-3 bg-[var(--id8-orange)] text-white rounded-xl
                         font-semibold hover:bg-[var(--id8-orange-hover)]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Generate Skill
            </button>
          </motion.div>
        ) : state === 'generating' ? (
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Status Header */}
            {generationComplete ? (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Generation complete! Ready to copy or preview.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-[var(--id8-orange)]/10 rounded-xl">
                <Loader2 className="w-5 h-5 text-[var(--id8-orange)] animate-spin" />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Generating your skill...
                </span>
              </div>
            )}

            {/* Streaming Preview */}
            <div className="relative">
              <pre className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl
                              text-xs text-[var(--text-secondary)] font-mono
                              max-h-[300px] overflow-y-auto whitespace-pre-wrap">
                {streamedContent || 'Waiting for AI response...'}
                {!generationComplete && <span className="animate-pulse">▊</span>}
              </pre>

              {/* Copy Button */}
              {generationComplete && streamedContent && (
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5
                             bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg
                             text-xs font-medium text-[var(--text-secondary)]
                             hover:border-[var(--id8-orange)] hover:text-[var(--id8-orange)]
                             transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-2 border border-[var(--border)] rounded-lg
                           text-[var(--text-secondary)] hover:border-[var(--id8-orange)]
                           hover:text-[var(--text-primary)] transition-colors"
              >
                {generationComplete ? 'Start Over' : 'Cancel'}
              </button>
              {generationComplete && (
                <button
                  onClick={handleContinueToPreview}
                  className="flex-1 py-2 bg-[var(--id8-orange)] text-white rounded-lg
                             font-semibold hover:bg-[var(--id8-orange-hover)] transition-colors"
                >
                  Continue to Preview
                </button>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
