'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatPanelProps {
  userId: string
}

const WELCOME_MESSAGE = `Welcome to the Lab Assistant. I'm a lightweight version of Claude, here to answer questions about ID8Labs.

Ask me about:
- Products (MILO, Composer, DeepStack...)
- Services (Workshop, Sprint, Build...)
- Essays and insights
- The partnership with Eddie
- Anything else ID8Labs-related

> `

export default function ChatPanel({ userId }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cursorVisible, setCursorVisible] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isStreaming) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsStreaming(true)
    setError(null)

    try {
      const response = await fetch('/api/claude-corner/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      // Add empty assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        assistantMessage += decoder.decode(value)
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: assistantMessage },
        ])
      }
    } catch (err) {
      console.error('Chat error:', err)
      setError('Connection failed. Try again.')
      // Remove the empty assistant message if we added one
      setMessages(prev => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant' && last.content === '') {
          return prev.slice(0, -1)
        }
        return prev
      })
    } finally {
      setIsStreaming(false)
      inputRef.current?.focus()
    }
  }, [input, isStreaming, messages])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus input
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="font-mono text-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-[#27c93f]">
          {'> '}
          <span className="text-[#e0e0e0]">lab_assistant</span>
          <span className="text-[#808080]"> (claude-3-haiku)</span>
        </div>
        <div className="text-[#606060] text-xs">
          ⌘K to focus
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-[#252525] rounded-lg border border-[#3d3d3d] flex flex-col h-80">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#3d3d3d] hover:scrollbar-thumb-[#ff6b35]/50">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#808080] text-xs whitespace-pre-wrap"
            >
              {WELCOME_MESSAGE}
              <span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>▌</span>
            </m.div>
          )}

          {/* Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2"
              >
                <span
                  className={`flex-shrink-0 ${
                    msg.role === 'user' ? 'text-[#ff6b35]' : 'text-[#f59e0b]'
                  }`}
                >
                  {msg.role === 'user' ? 'you:' : 'claude:'}
                </span>
                <span className={`whitespace-pre-wrap break-words ${
                  msg.role === 'user' ? 'text-[#c0c0c0]' : 'text-[#fcd34d]'
                }`}>
                  {msg.content}
                  {/* Streaming cursor */}
                  {isStreaming && i === messages.length - 1 && msg.role === 'assistant' && (
                    <span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>▌</span>
                  )}
                </span>
              </m.div>
            ))}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs"
            >
              [error] {error}
            </m.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="border-t border-[#3d3d3d] p-3">
          <div className="flex items-center gap-2">
            <span className="text-[#27c93f] flex-shrink-0">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-[#c0c0c0] outline-none placeholder-[#505050]"
              placeholder={isStreaming ? 'Thinking...' : 'Ask me anything...'}
              disabled={isStreaming}
              autoComplete="off"
              spellCheck={false}
            />
            {isStreaming ? (
              <span className="text-[#27c93f] animate-pulse">●</span>
            ) : (
              <span className={`text-[#27c93f] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                ▌
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between text-[10px] text-[#404040]">
        <span>Powered by Claude 3 Haiku</span>
        <span>Conversations are not stored</span>
      </div>
    </div>
  )
}
