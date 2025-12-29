'use client'

import Link from 'next/link'
import { ArrowLeft, Github, Terminal, Zap, Brain, ListTodo, Clock, Target, CheckCircle2, Copy, Check } from 'lucide-react'
import { useState } from 'react'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-neutral-400" />
      )}
    </button>
  )
}

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  return (
    <div className="relative group">
      <pre className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 overflow-x-auto">
        <code className="text-sm text-neutral-300 font-mono">{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

export default function MILOPage() {
  const mcpConfig = `{
  "mcpServers": {
    "milo": {
      "command": "node",
      "args": ["/path/to/milo/dist/index.js"],
      "env": {}
    }
  }
}`

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-full border border-green-500/20">
              Open Source • Free
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            MILO
          </h1>

          <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
            Signal-to-noise task manager with Claude Code integration. Develop Jobs/Musk-level
            filtering to ship at scale. 17 MCP tools for natural language task management.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/eddiebe147/milo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition-colors"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
            <Link
              href="/essays/why-i-built-milo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white font-medium rounded-xl hover:bg-neutral-700 transition-colors border border-neutral-700"
            >
              Read the Essay
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Why MILO?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800">
              <Brain className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Signal-Based Prioritization</h3>
              <p className="text-neutral-400">
                Inspired by Jobs and Musk's legendary ability to filter signal from noise.
                MILO helps you develop that same filtering superpower.
              </p>
            </div>

            <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800">
              <Terminal className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Claude Code Integration</h3>
              <p className="text-neutral-400">
                17 MCP tools that let you manage tasks with natural language.
                Just talk to Claude about what you need to do.
              </p>
            </div>

            <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Urgency × Importance Matrix</h3>
              <p className="text-neutral-400">
                Tasks are scored on a 2D grid. High signal surfaces automatically.
                Low signal fades. No more drowning in noise.
              </p>
            </div>

            <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800">
              <Target className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ship at Scale</h3>
              <p className="text-neutral-400">
                Built for builders who need to execute fast. Focus on what moves
                the mission forward. Ignore everything else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-6 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Terminal className="w-6 h-6" />
            Quick Start
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-neutral-300">1. Clone the repository</h3>
              <CodeBlock code="git clone https://github.com/eddiebe147/milo.git" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-neutral-300">2. Install dependencies</h3>
              <CodeBlock code="cd milo && npm install" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-neutral-300">3. Build the project</h3>
              <CodeBlock code="npm run build" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-neutral-300">4. Start MILO</h3>
              <CodeBlock code="npm start" />
            </div>
          </div>
        </div>
      </section>

      {/* Claude Code Integration */}
      <section className="py-16 px-6 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Brain className="w-6 h-6" />
            Claude Code Integration
          </h2>

          <p className="text-neutral-400 mb-6">
            Add MILO to your Claude Code MCP configuration to enable natural language task management:
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-neutral-300">Add to ~/.claude.json</h3>
            <CodeBlock code={mcpConfig} language="json" />
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/20">
            <p className="text-neutral-300">
              <strong className="text-white">Pro tip:</strong> Replace <code className="bg-neutral-800 px-2 py-1 rounded">/path/to/milo</code> with
              the actual path where you cloned the repository.
            </p>
          </div>
        </div>
      </section>

      {/* MCP Tools */}
      <section className="py-16 px-6 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <ListTodo className="w-6 h-6" />
            17 MCP Tools
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'milo_add_task', desc: 'Add a new task with priority scoring' },
              { name: 'milo_list_tasks', desc: 'List tasks sorted by signal strength' },
              { name: 'milo_complete_task', desc: 'Mark a task as complete' },
              { name: 'milo_update_task', desc: 'Update task details or priority' },
              { name: 'milo_delete_task', desc: 'Remove a task permanently' },
              { name: 'milo_get_next', desc: 'Get the highest signal task' },
              { name: 'milo_focus_mode', desc: 'Enter deep work mode' },
              { name: 'milo_bulk_add', desc: 'Add multiple tasks at once' },
              { name: 'milo_search', desc: 'Search tasks by keyword' },
              { name: 'milo_archive', desc: 'Archive completed tasks' },
              { name: 'milo_set_urgency', desc: 'Adjust task urgency (1-10)' },
              { name: 'milo_set_importance', desc: 'Adjust task importance (1-10)' },
              { name: 'milo_categories', desc: 'Organize tasks by category' },
              { name: 'milo_daily_plan', desc: 'Generate a daily focus plan' },
              { name: 'milo_review', desc: 'Weekly signal/noise analysis' },
              { name: 'milo_export', desc: 'Export tasks to JSON/Markdown' },
              { name: 'milo_stats', desc: 'View productivity statistics' },
            ].map((tool) => (
              <div key={tool.name} className="p-4 bg-neutral-900/50 rounded-xl border border-neutral-800">
                <code className="text-green-400 text-sm font-mono">{tool.name}</code>
                <p className="text-neutral-400 text-sm mt-1">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Usage */}
      <section className="py-16 px-6 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Clock className="w-6 h-6" />
            Example Usage
          </h2>

          <div className="space-y-6">
            <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800">
              <p className="text-neutral-400 mb-4">Just talk to Claude naturally:</p>
              <div className="space-y-3">
                <p className="text-white">"Add a task to fix the auth bug - it's urgent and important"</p>
                <p className="text-white">"What should I work on next?"</p>
                <p className="text-white">"Show me all my high-signal tasks"</p>
                <p className="text-white">"Mark the auth bug as complete"</p>
                <p className="text-white">"Give me a daily plan for today"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to filter the noise?</h2>
          <p className="text-neutral-400 mb-8">
            Clone MILO and start shipping with Jobs/Musk-level signal clarity.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/eddiebe147/milo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition-colors"
            >
              <Github className="w-5 h-5" />
              Get Started on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto text-center text-neutral-500 text-sm">
          <p>Built by ID8Labs • Open Source • MIT License</p>
        </div>
      </footer>
    </div>
  )
}
