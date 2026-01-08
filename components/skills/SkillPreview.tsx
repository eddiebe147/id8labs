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
  FileText,
  Zap,
} from 'lucide-react'
import { useSkillGeneratorStore } from '@/lib/stores/skill-generator-store'
import { SKILL_CATEGORIES, type SkillCategory } from '@/lib/skill-generator-prompt'

interface SkillPreviewProps {
  onBack: () => void
  onClose?: () => void
  onSaved?: (skillId: string) => void
}

export function SkillPreview({ onBack, onClose, onSaved }: SkillPreviewProps) {
  const {
    generatedSkill,
    updateSkillField,
    state,
    setState,
    setError,
    setSavedSkillId,
  } = useSkillGeneratorStore()

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = useCallback(async () => {
    if (!generatedSkill) return

    setState('saving')
    setError(null)

    try {
      const response = await fetch('/api/skills/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: generatedSkill.name,
          slug: generatedSkill.slug,
          description: generatedSkill.description,
          category: generatedSkill.category,
          complexity: generatedSkill.complexity,
          version: generatedSkill.version,
          author: generatedSkill.author,
          license: generatedSkill.license,
          triggers: generatedSkill.triggers,
          tags: generatedSkill.tags,
          content: generatedSkill.content,
          rawContent: generatedSkill.rawContent,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save skill')
      }

      const { skillId } = await response.json()
      setSavedSkillId(skillId)
      setState('success')
      onSaved?.(skillId)
    } catch (err) {
      console.error('Save error:', err)
      setError(err instanceof Error ? err.message : 'Failed to save skill')
      setState('error')
    }
  }, [generatedSkill, setState, setError, setSavedSkillId, onSaved])

  if (!generatedSkill) {
    return null
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
          Skill Saved!
        </h3>
        <p className="text-[var(--text-secondary)]">
          Your skill "{generatedSkill.name}" has been saved to your account.
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
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-[var(--id8-orange)] hover:underline"
        >
          {isEditing ? 'Done Editing' : 'Edit Fields'}
        </button>
      </div>

      {/* Skill Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-[var(--border)] rounded-xl overflow-hidden"
      >
        {/* Card Header */}
        <div className="p-4 bg-gradient-to-r from-[var(--id8-orange)]/10 to-transparent border-b border-[var(--border)]">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[var(--id8-orange)]/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-[var(--id8-orange)]" />
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={generatedSkill.name}
                  onChange={(e) => updateSkillField('name', e.target.value)}
                  className="w-full px-2 py-1 text-lg font-bold bg-[var(--bg-secondary)] border border-[var(--border)] rounded text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
                />
              ) : (
                <h3 className="text-lg font-bold text-[var(--text-primary)] truncate">
                  {generatedSkill.name}
                </h3>
              )}
              <p className="text-sm text-[var(--text-tertiary)]">
                {generatedSkill.slug}
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
            {isEditing ? (
              <textarea
                value={generatedSkill.description}
                onChange={(e) => updateSkillField('description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] resize-none"
              />
            ) : (
              <p className="text-sm text-[var(--text-secondary)]">
                {generatedSkill.description}
              </p>
            )}
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-1">
                Category
              </label>
              {isEditing ? (
                <select
                  value={generatedSkill.category}
                  onChange={(e) =>
                    updateSkillField('category', e.target.value as SkillCategory)
                  }
                  className="w-full px-3 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
                >
                  {SKILL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-sm text-[var(--text-secondary)] capitalize">
                    {generatedSkill.category.replace('-', ' ')}
                  </span>
                </div>
              )}
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-1">
                Complexity
              </label>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="text-sm text-[var(--text-secondary)] capitalize">
                  {generatedSkill.complexity}
                </span>
              </div>
            </div>
          </div>

          {/* Triggers */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-2">
              Triggers
            </label>
            <div className="flex flex-wrap gap-2">
              {generatedSkill.triggers.map((trigger, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full text-[var(--text-secondary)]"
                >
                  "{trigger}"
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {generatedSkill.tags.map((tag, idx) => (
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

          {/* Content Preview */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-2">
              Content Preview
            </label>
            <div className="max-h-[200px] overflow-y-auto p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <pre className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap font-mono">
                {generatedSkill.content.slice(0, 500)}
                {generatedSkill.content.length > 500 && '...'}
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
              Save to My Skills
            </>
          )}
        </button>
      </div>
    </div>
  )
}
