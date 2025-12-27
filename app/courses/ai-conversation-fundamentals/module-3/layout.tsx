import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Module 3: The Iteration Loop | AI Conversation Fundamentals',
  description: 'Learn when to refine, redirect, or restart your AI conversations. Master the art of iterating on AI output instead of starting from scratch.',
  openGraph: {
    title: 'Module 3: The Iteration Loop | AI Conversation Fundamentals',
    description: 'Learn when to refine, redirect, or restart your AI conversations. Master the art of iterating on AI output instead of starting from scratch.',
    type: 'article',
  },
}

export default function Module3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
