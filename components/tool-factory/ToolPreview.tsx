'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Save,
  Loader2,
  CheckCircle,
  Tag,
  Sparkles,
  Terminal,
  Bot,
  Server,
  FileText,
  Zap,
  Copy,
  Check,
} from 'lucide-react'
import { useToolFactoryStore } from '@/lib/stores/tool-factory-store'
import {
  TOOL_TYPE_LABELS,
  SKILL_CATEGORY_LABELS,
  COMMAND_CATEGORY_LABELS,
  AGENT_CATEGORY_LABELS,
  MCP_CATEGORY_LABELS,
  type ToolType,
  type SkillCategory,
  type CommandCategory,
  type AgentCategory,
  type MCPCategory,
  type GeneratedSkill,
  type GeneratedCommand,
  type GeneratedAgent,
  type GeneratedMCP,
} from '@/lib/tool-factory/types'

interface ToolPreviewProps {
  onBack: () => void
  onClose?: () => void
  onSaved?: (toolId: string, toolType: ToolType) => void
}

const TOOL_ICONS: Record<ToolType, React.ElementType> = {
  skill: Sparkles,
  command: Terminal,
  agent: Bot,
  mcp: Server,
}

export function ToolPreview({ onBack, onClose, onSaved }: ToolPreviewProps) {
  const {
    toolType,
    generatedSkill,
    generatedCommand,
    generatedAgent,
    generatedMCP,
    state,
    setState,
    setError,
    setSavedToolId,
    getCurrentTool,
  } = useToolFactoryStore()

  const [copied, setCopied] = useState(false)

  const currentTool = getCurrentTool()

  const handleCopy = useCallback(async () => {
    if (!currentTool) return
    try {
      await navigator.clipboard.writeText(currentTool.data.rawContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }, [currentTool])

  const handleSave = useCallback(async () => {
    if (!currentTool) return

    setState('saving')
    setError(null)

    try {
      const response = await fetch('/api/tools/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolType,
          ...currentTool.data,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || `Failed to save ${toolType}`)
      }

      const { toolId } = await response.json()
      setSavedToolId(toolId)
      setState('success')
      onSaved?.(toolId, toolType)
    } catch (err) {
      console.error('Save error:', err)
      setError(err instanceof Error ? err.message : `Failed to save ${toolType}`)
      setState('error')
    }
  }, [currentTool, toolType, setState, setError, setSavedToolId, onSaved])

  if (!currentTool) {
    return null
  }

  const Icon = TOOL_ICONS[toolType]
  const { data } = currentTool

  // Get category label based on tool type
  const getCategoryLabel = () => {
    switch (toolType) {
      case 'skill':
        return SKILL_CATEGORY_LABELS[(data as GeneratedSkill).category as SkillCategory]
      case 'command':
        return COMMAND_CATEGORY_LABELS[(data as GeneratedCommand).category as CommandCategory]
      case 'agent':
        return AGENT_CATEGORY_LABELS[(data as GeneratedAgent).category as AgentCategory]
      case 'mcp':
        return MCP_CATEGORY_LABELS[(data as GeneratedMCP).category as MCPCategory]
      default:
        return 'Unknown'
    }
  }

  // Success state
  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 space-y-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)]">
          {TOOL_TYPE_LABELS[toolType]} Saved!
        </h3>
        <p className="text-[var(--text-secondary)]">
          Your {toolType} "{data.name}" has been saved to your account.
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-[var(--border)] rounded-lg
                       text-[var(--text-secondary)] hover:border-[var(--id8-orange)]
                       hover:text-[var(--text-primary)] transition-colors"
          >
            Generate Another
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[var(--id8-orange)] text-white rounded-lg
                         font-medium hover:bg-[var(--id8-orange-hover)] transition-colors"
            >
              Done
            </button>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-sm text-[var(--text-tertiary)]">
          {TOOL_TYPE_LABELS[toolType]} Preview
        </span>
      </div>

      {/* Tool Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-[var(--border)] rounded-xl overflow-hidden"
      >
        {/* Card Header */}
        <div className="p-4 bg-gradient-to-r from-[var(--id8-orange)]/10 to-transparent border-b border-[var(--border)]">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[var(--id8-orange)]/20 rounded-lg">
              <Icon className="w-5 h-5 text-[var(--id8-orange)]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-[var(--text-primary)] truncate">
                {data.name}
              </h3>
              <p className="text-sm text-[var(--text-tertiary)]">
                {data.slug}
              </p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-4">
          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-1">
              Description
            </label>
            <p className="text-sm text-[var(--text-secondary)]">
              {data.description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-1">
                Category
              </label>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="text-sm text-[var(--text-secondary)]">
                  {getCategoryLabel()}
                </span>
              </div>
            </div>

            {/* Type-specific info */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-1">
                {toolType === 'skill' || toolType === 'agent' ? 'Complexity' : 'Type'}
              </label>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="text-sm text-[var(--text-secondary)] capitalize">
                  {toolType === 'skill' && generatedSkill?.complexity}
                  {toolType === 'command' && 'Command'}
                  {toolType === 'agent' && generatedAgent?.complexity}
                  {toolType === 'mcp' && generatedMCP?.transport?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Triggers (for skills and agents) */}
          {(toolType === 'skill' || toolType === 'agent') && (
            <div>
              <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-2">
                Triggers
              </label>
              <div className="flex flex-wrap gap-2">
                {((toolType === 'skill' ? generatedSkill?.triggers : generatedAgent?.triggers) || []).map((trigger, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full text-[var(--text-secondary)]"
                  >
                    "{trigger}"
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Command (for commands) */}
          {toolType === 'command' && generatedCommand?.command && (
            <div>
              <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-2">
                Command
              </label>
              <pre className="p-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-xs font-mono text-[var(--text-secondary)] overflow-x-auto">
                {generatedCommand.command}
              </pre>
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {(data.tags || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content Preview with Copy */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                Full Content
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium
                           text-[var(--text-secondary)] hover:text-[var(--id8-orange)]
                           border border-[var(--border)] hover:border-[var(--id8-orange)]
                           rounded-md transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="max-h-[200px] overflow-y-auto p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <pre className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap font-mono">
                {data.content.slice(0, 500)}
                {data.content.length > 500 && '...'}
              </pre>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={state === 'saving'}
          className="flex-1 py-3 border border-[var(--border)] rounded-xl
                     text-[var(--text-secondary)] hover:border-[var(--id8-orange)]
                     hover:text-[var(--text-primary)] transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Regenerate
        </button>
        <button
          onClick={handleSave}
          disabled={state === 'saving'}
          className="flex-1 py-3 bg-[var(--id8-orange)] text-white rounded-xl
                     font-semibold hover:bg-[var(--id8-orange-hover)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all flex items-center justify-center gap-2"
        >
          {state === 'saving' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save {TOOL_TYPE_LABELS[toolType]}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
