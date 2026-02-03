'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyPageButtonProps {
  targetSelector?: string
  label?: string
  copiedLabel?: string
}

function getCopyText(root: HTMLElement): string {
  const clone = root.cloneNode(true) as HTMLElement
  clone.querySelectorAll('[data-copy-exclude="true"]').forEach((el) => el.remove())
  return clone.innerText.replace(/\n{3,}/g, '\n\n').trim()
}

async function copyText(text: string): Promise<boolean> {
  if (!text) return false

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', 'true')
    textarea.style.position = 'fixed'
    textarea.style.top = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch (error) {
    console.error('Copy fallback failed:', error)
    return false
  }
}

export function CopyPageButton({
  targetSelector = '[data-copy-root="article"]',
  label = 'Copy Page',
  copiedLabel = 'Copied',
}: CopyPageButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied'>('idle')
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    const target = document.querySelector<HTMLElement>(targetSelector)
    if (!target) {
      console.warn('CopyPageButton: target not found', targetSelector)
      return
    }

    const text = getCopyText(target)
    if (!text) {
      return
    }

    const success = await copyText(text)
    if (!success) {
      return
    }

    setStatus('copied')
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => setStatus('idle'), 2000)
  }

  const isCopied = status === 'copied'

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-copy-exclude="true"
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border transition-colors ${
        isCopied
          ? 'border-[var(--accent-green)] text-[var(--accent-green)]'
          : 'border-[var(--border)] text-[var(--text-secondary)] hover:text-id8-orange hover:border-id8-orange'
      }`}
      aria-live="polite"
    >
      {isCopied ? (
        <>
          <Check className="w-4 h-4" />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  )
}
