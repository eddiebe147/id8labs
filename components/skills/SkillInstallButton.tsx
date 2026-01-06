'use client'

import { useState } from 'react'
import { Copy, Check, Terminal, GitBranch, Download, X } from 'lucide-react'
import { trackSkillInstall, getInstallCommand, type Skill } from '@/lib/skill-client'

type InstallMethod = 'copy' | 'curl' | 'git'

interface SkillInstallButtonProps {
  skill: Skill
  variant?: 'primary' | 'secondary' | 'compact'
  showModal?: boolean
}

export function SkillInstallButton({
  skill,
  variant = 'primary',
  showModal = true,
}: SkillInstallButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copiedMethod, setCopiedMethod] = useState<InstallMethod | null>(null)

  const handleInstall = async (method: InstallMethod) => {
    const command = getInstallCommand(skill, method)

    try {
      await navigator.clipboard.writeText(command)
      setCopiedMethod(method)

      // Track the install
      await trackSkillInstall(skill.id, method)

      // Reset after 2 seconds
      setTimeout(() => setCopiedMethod(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Compact variant - just a copy button
  if (variant === 'compact') {
    return (
      <button
        onClick={() => handleInstall('copy')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[var(--id8-orange)] text-white rounded-lg hover:bg-[var(--id8-orange-hover)] transition-all"
      >
        {copiedMethod === 'copy' ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy
          </>
        )}
      </button>
    )
  }

  // Primary/Secondary button
  const buttonClasses =
    variant === 'primary'
      ? 'btn btn-primary'
      : 'btn btn-secondary'

  return (
    <>
      <button
        onClick={showModal ? openModal : () => handleInstall('copy')}
        className={buttonClasses}
      >
        <Download className="w-5 h-5" />
        Install Skill
      </button>

      {/* Install Modal */}
      {showModal && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div>
                <h3 className="text-xl font-bold">Install {skill.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  Choose your preferred installation method
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Install Methods */}
            <div className="p-6 space-y-4">
              {/* Copy Content */}
              <InstallOption
                icon={<Copy className="w-5 h-5" />}
                title="Copy to Clipboard"
                description="Copy the skill content and paste into your Claude Code skills directory"
                command={skill.content ? 'Content copied!' : 'No content available'}
                onCopy={() => handleInstall('copy')}
                isCopied={copiedMethod === 'copy'}
                disabled={!skill.content}
              />

              {/* Curl Command */}
              <InstallOption
                icon={<Terminal className="w-5 h-5" />}
                title="Download with curl"
                description="Download directly to your skills directory"
                command={getInstallCommand(skill, 'curl')}
                onCopy={() => handleInstall('curl')}
                isCopied={copiedMethod === 'curl'}
              />

              {/* Git Clone */}
              <InstallOption
                icon={<GitBranch className="w-5 h-5" />}
                title="Clone from GitHub"
                description="Clone the full repository and copy the skill"
                command={getInstallCommand(skill, 'git')}
                onCopy={() => handleInstall('git')}
                isCopied={copiedMethod === 'git'}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-tertiary)]">
                Skills are installed to <code className="px-1 py-0.5 bg-[var(--bg-tertiary)] rounded">~/.claude/skills/</code>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface InstallOptionProps {
  icon: React.ReactNode
  title: string
  description: string
  command: string
  onCopy: () => void
  isCopied: boolean
  disabled?: boolean
}

function InstallOption({
  icon,
  title,
  description,
  command,
  onCopy,
  isCopied,
  disabled = false,
}: InstallOptionProps) {
  return (
    <div
      className={`p-4 border border-[var(--border)] rounded-xl transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--id8-orange)]/50'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-[var(--bg-secondary)] rounded-lg text-[var(--id8-orange)]">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-[var(--text-secondary)]">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <code className="flex-1 px-3 py-2 bg-[var(--bg-tertiary)] rounded-lg text-sm font-mono truncate text-[var(--text-secondary)]">
          {command}
        </code>
        <button
          onClick={onCopy}
          disabled={disabled}
          className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            isCopied
              ? 'bg-emerald-500 text-white'
              : 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange-hover)]'
          }`}
        >
          {isCopied ? (
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Copy className="w-4 h-4" />
              Copy
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default SkillInstallButton
