import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Module 1: The Mental Model Shift | AI Conversation Fundamentals',
  description: 'Learn why AI is a collaborator, not a search engine. Understand how output is diagnostic and develop the right mindset for effective AI conversations.',
  openGraph: {
    title: 'Module 1: The Mental Model Shift | AI Conversation Fundamentals',
    description: 'Learn why AI is a collaborator, not a search engine. Understand how output is diagnostic and develop the right mindset for effective AI conversations.',
    type: 'article',
  },
}

export default function Module1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
