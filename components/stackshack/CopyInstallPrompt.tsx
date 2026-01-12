'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyInstallPromptProps {
  prompt: string
}

export function CopyInstallPrompt({ prompt }: CopyInstallPromptProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative group">
      <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            Claude Code Install Prompt
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--id8-orange)]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm text-[var(--text-primary)] whitespace-pre-wrap">
          {prompt}
        </pre>
      </div>

      <button
        onClick={handleCopy}
        className="mt-4 w-full btn btn-primary"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            Copied to Clipboard!
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            Copy Install Prompt
          </>
        )}
      </button>
    </div>
  )
}
