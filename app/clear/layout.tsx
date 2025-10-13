import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clear | ID8Labs',
  description:
    'Extract dialogue, remove the noise. AI-powered background music removal tool for podcasters, video editors, and content creators who need clean audio stems.',
  keywords: [
    'Clear',
    'Audio Processing',
    'Background Music Removal',
    'Dialogue Extraction',
    'Podcast Editing',
    'Video Editing',
    'Audio Cleanup',
  ],
  openGraph: {
    title: 'Clear | ID8Labs',
    description:
      'Extract dialogue, remove the noise. AI-powered background music removal tool.',
    type: 'website',
    url: 'https://id8labs.com/clear',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clear | ID8Labs',
    description:
      'Extract dialogue, remove the noise. AI-powered background music removal tool.',
  },
}

export default function ClearLayout({ children }: { children: React.ReactNode }) {
  return children
}
