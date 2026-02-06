import StarterKitsPage, { revalidate as stackshackRevalidate } from '../../stackshack/starter-kits/page'

export const revalidate = stackshackRevalidate

export default async function SkillsStarterKitsPage() {
  return StarterKitsPage()
}
