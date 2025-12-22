import type { Metadata } from 'next'
import PipelineContent from './PipelineContent'

export const metadata: Metadata = {
  title: 'Pipeline - ID8Labs',
  description: 'Complete idea-to-exit lifecycle management for solo builders. 8 interconnected AI agents handle validation, architecture, launch, growth, ops, and exit prep with decay mechanics and stage gates.',
}

export default function PipelinePage() {
  return <PipelineContent />
}
