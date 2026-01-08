'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToolFactoryStore } from '@/lib/stores/tool-factory-store'
import {
  MCP_CATEGORIES,
  MCP_TRANSPORTS,
  MCP_LANGUAGES,
  MCP_CATEGORY_LABELS,
} from '@/lib/tool-factory/types'

const MCP_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  integration: 'External service integrations (GitHub, Slack, APIs)',
  data: 'Data processing, transformation, analysis',
  automation: 'Workflow automation, batch operations',
  ai: 'AI/ML model integration, embeddings',
  infrastructure: 'DevOps, cloud resources, system management',
}

const TRANSPORT_DESCRIPTIONS: Record<string, string> = {
  stdio: 'Standard I/O (recommended for local servers)',
  http: 'HTTP/SSE transport (for remote/shared servers)',
}

export function MCPGeneratorForm() {
  const {
    description,
    setDescription,
    mcpCategoryHint,
    setMCPCategoryHint,
    transportHint,
    setTransportHint,
    languageHint,
    setLanguageHint,
  } = useToolFactoryStore()

  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="space-y-4">
      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          What MCP server do you need?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., An MCP server that connects to Notion to read and create pages, with tools for searching, updating, and organizing content..."
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
                value={mcpCategoryHint || ''}
                onChange={(e) =>
                  setMCPCategoryHint(
                    e.target.value ? (e.target.value as typeof mcpCategoryHint) : null
                  )
                }
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg
                           bg-[var(--bg-secondary)] text-[var(--text-primary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
              >
                <option value="">Auto-detect</option>
                {MCP_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {MCP_CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
              {mcpCategoryHint && (
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  {MCP_CATEGORY_DESCRIPTIONS[mcpCategoryHint]}
                </p>
              )}
            </div>

            {/* Transport */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Transport (optional)
              </label>
              <select
                value={transportHint || ''}
                onChange={(e) =>
                  setTransportHint(
                    e.target.value ? (e.target.value as typeof transportHint) : null
                  )
                }
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg
                           bg-[var(--bg-secondary)] text-[var(--text-primary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
              >
                <option value="">Auto-detect (stdio)</option>
                {MCP_TRANSPORTS.map((transport) => (
                  <option key={transport} value={transport}>
                    {transport.toUpperCase()}
                  </option>
                ))}
              </select>
              {transportHint && (
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  {TRANSPORT_DESCRIPTIONS[transportHint]}
                </p>
              )}
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Language (optional)
              </label>
              <select
                value={languageHint || ''}
                onChange={(e) =>
                  setLanguageHint(
                    e.target.value ? (e.target.value as typeof languageHint) : null
                  )
                }
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg
                           bg-[var(--bg-secondary)] text-[var(--text-primary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
              >
                <option value="">Auto-detect (TypeScript)</option>
                {MCP_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === 'typescript' ? 'TypeScript' : 'Python'}
                  </option>
                ))}
              </select>
            </div>

            {/* Tips */}
            <div className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <p className="text-xs text-[var(--text-secondary)]">
                <strong>Tips for MCP servers:</strong>
              </p>
              <ul className="mt-1 text-xs text-[var(--text-tertiary)] list-disc list-inside">
                <li>Describe the tools you want (list, create, update, etc.)</li>
                <li>Mention any external APIs or services to integrate</li>
                <li>Consider resources for data Claude should access</li>
                <li>Security is included automatically</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
