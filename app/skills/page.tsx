import StackShackMarketplacePage, { revalidate as stackshackRevalidate } from '../stackshack/page'

export const revalidate = stackshackRevalidate

export default async function SkillsPage(
  props: Parameters<typeof StackShackMarketplacePage>[0]
) {
  return StackShackMarketplacePage({ ...props, basePath: '/skills' })
}
