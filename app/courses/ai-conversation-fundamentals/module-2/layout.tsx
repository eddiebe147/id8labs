import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Module 2: The Core Toolkit | AI Conversation Fundamentals',
  description: 'Master the 5 levers that control AI output quality: Clarity, Examples, Thinking, Structure, and Role. Learn when and how to use each lever for better results.',
  openGraph: {
    title: 'Module 2: The Core Toolkit | AI Conversation Fundamentals',
    description: 'Master the 5 levers that control AI output quality: Clarity, Examples, Thinking, Structure, and Role.',
    type: 'article',
  },
}

export default function Module2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
