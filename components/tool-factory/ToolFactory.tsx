'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Terminal,
  Bot,
  Server,
  Loader2,
  AlertCircle,
  CheckCircle,
  Copy,
  Check,
} from 'lucide-react'
import { useToolFactoryStore } from '@/lib/stores/tool-factory-store'
import {
  TOOL_TYPES,
  TOOL_TYPE_LABELS,
  TOOL_TYPE_DESCRIPTIONS,
  type ToolType,
} from '@/lib/tool-factory/types'
import { SkillGeneratorForm } from './generators/SkillGeneratorForm'
import { CommandGeneratorForm } from './generators/CommandGeneratorForm'
import { AgentGeneratorForm } from './generators/AgentGeneratorForm'
import { MCPGeneratorForm } from './generators/MCPGeneratorForm'
import { ToolPreview } from './ToolPreview'

interface ToolFactoryProps {
  onClose?: () => void
  onSaved?: (toolId: string, toolType: ToolType) => void
}

const TOOL_ICONS: Record<ToolType, React.ElementType> = {
  skill: Sparkles,
  command: Terminal,
  agent: Bot,
  mcp: Server,
}

export function ToolFactory({ onClose, onSaved }: ToolFactoryProps) {
  const {
    toolType,
    setToolType,
    description,
    setDescription,
    state,
    setState,
    streamedContent,
    setStreamedContent,
    appendStreamedContent,
    error,
    setError,
    parseGeneratedContent,
    resetKeepType,
    getCurrentTool,
  } = useToolFactoryStore()

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
      // Build request body based on tool type
      const store = useToolFactoryStore.getState()
      const body: Record<string, unknown> = {
        toolType,
        description: description.trim(),
      }

      // Add type-specific hints
      if (toolType === 'skill') {
        if (store.skillCategoryHint) body.categoryHint = store.skillCategoryHint
        if (store.complexityHint) body.complexityHint = store.complexityHint
      } else if (toolType === 'command') {
        if (store.commandCategoryHint) body.commandCategoryHint = store.commandCategoryHint
      } else if (toolType === 'agent') {
        if (store.agentCategoryHint) body.agentCategoryHint = store.agentCategoryHint
        if (store.complexityHint) body.complexityHint = store.complexityHint
        if (store.personaHint) body.personaHint = store.personaHint
      } else if (toolType === 'mcp') {
        if (store.mcpCategoryHint) body.mcpCategoryHint = store.mcpCategoryHint
        if (store.transportHint) body.transportHint = store.transportHint
        if (store.languageHint) body.languageHint = store.languageHint
      }

      const response = await fetch('/api/tools/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || `Failed to generate ${toolType}`)
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
      setError(err instanceof Error ? err.message : `Failed to generate ${toolType}`)
      setState('error')
    }
  }, [
    description,
    toolType,
    setError,
    setStreamedContent,
    setState,
    appendStreamedContent,
  ])

  const handleContinueToPreview = useCallback(() => {
    parseGeneratedContent()
  }, [parseGeneratedContent])

  const handleReset = useCallback(() => {
    resetKeepType()
    setGenerationComplete(false)
    setCopied(false)
  }, [resetKeepType])

  // Show preview if we have a generated tool
  const currentTool = getCurrentTool()
  if (state === 'preview' && currentTool) {
    return (
      <ToolPreview
        onBack={handleReset}
        onClose={onClose}
        onSaved={onSaved}
      />
    )
  }

  const Icon = TOOL_ICONS[toolType]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-[var(--bg-secondary)] rounded-xl">
        {TOOL_TYPES.map((type) => {
          const TabIcon = TOOL_ICONS[type]
          const isActive = toolType === type
          return (
            <button
              key={type}
              onClick={() => {
                if (state === 'idle' || state === 'error') {
                  setToolType(type)
                }
              }}
              disabled={state === 'generating' || state === 'saving'}
              className={`
                flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                text-sm font-medium transition-all
                ${
                  isActive
                    ? 'bg-[var(--bg-primary)] text-[var(--id8-orange)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <TabIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{TOOL_TYPE_LABELS[type]}</span>
            </button>
          )
        })}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[var(--id8-orange)]/10 rounded-lg">
          <Icon className="w-5 h-5 text-[var(--id8-orange)]" />
        </div>
        <div>
          <h3 className="font-bold text-[var(--text-primary)]">
            Generate {TOOL_TYPE_LABELS[toolType]}
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            {TOOL_TYPE_DESCRIPTIONS[toolType]}
          </p>
        </div>
      </div>

      {/* Form / Generation States */}
      <AnimatePresence mode="wait">
        {state === 'idle' || state === 'error' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Type-Specific Form */}
            {toolType === 'skill' && <SkillGeneratorForm />}
            {toolType === 'command' && <CommandGeneratorForm />}
            {toolType === 'agent' && <AgentGeneratorForm />}
            {toolType === 'mcp' && <MCPGeneratorForm />}

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
              <Icon className="w-5 h-5" />
              Generate {TOOL_TYPE_LABELS[toolType]}
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
                  Generating your {toolType}...
                </span>
              </div>
            )}

            {/* Streaming Preview */}
            <div className="relative">
              <pre
                className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl
                              text-xs text-[var(--text-secondary)] font-mono
                              max-h-[300px] overflow-y-auto whitespace-pre-wrap"
              >
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
