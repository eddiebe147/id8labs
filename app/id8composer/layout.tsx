import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ID8Composer | ID8Labs',
  description:
    'The Final Cut Pro for AI-assisted text creation. Story composition platform with dual-panel editing for TV producers, content creators, and marketers.',
  keywords: [
    'ID8Composer',
    'Story Composition',
    'AI Writing',
    'Content Creation',
    'TV Production',
    'Narrative Structure',
  ],
  openGraph: {
    title: 'ID8Composer | ID8Labs',
    description:
      'The Final Cut Pro for AI-assisted text creation. Professional story composition platform.',
    type: 'website',
    url: 'https://id8labs.com/id8composer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ID8Composer | ID8Labs',
    description:
      'The Final Cut Pro for AI-assisted text creation. Professional story composition platform.',
  },
}

export default function ID8ComposerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
