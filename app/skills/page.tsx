import StackShackMarketplacePage, { revalidate as stackshackRevalidate } from '../stackshack/page'
import { type MarketplaceTab } from '@/components/stackshack/MarketplaceTabs'

export const revalidate = stackshackRevalidate

interface PageProps {
  searchParams: Promise<{ tab?: MarketplaceTab; type?: string; category?: string }>
}

export default async function SkillsPage({ searchParams }: PageProps) {
  return StackShackMarketplacePage({ searchParams, basePath: '/skills' })
}
