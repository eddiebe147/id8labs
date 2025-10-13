import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Lab | ID8Labs',
  description:
    'The origin story and philosophy behind ID8Labs. Where we build the future of human-AI creation through category-defining professional tools.',
  keywords: ['ID8Labs', 'Lab Story', 'AI Innovation', 'Creative Tools', 'Origin Story'],
  openGraph: {
    title: 'The Lab | ID8Labs',
    description:
      'The origin story and philosophy behind ID8Labs. Category creation over competition.',
    type: 'website',
    url: 'https://id8labs.com/lab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Lab | ID8Labs',
    description:
      'The origin story and philosophy behind ID8Labs. Category creation over competition.',
  },
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children
}
