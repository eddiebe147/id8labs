import type { Metadata } from 'next'
import LabStoryContent from './LabStoryContent'

export const metadata: Metadata = {
  title: 'Lab Story - ID8Labs',
  description: 'From cameraman to systems architect. Twenty years in production, now building tools for creators and infrastructure for builders.',
}

export default function LabPage() {
  return <LabStoryContent />
}
