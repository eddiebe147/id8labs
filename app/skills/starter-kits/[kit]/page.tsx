import StarterKitPage, {
  generateMetadata,
  generateStaticParams,
} from '../../../stackshack/starter-kits/[kit]/page'

export { generateMetadata, generateStaticParams }

export default async function SkillsStarterKitDetailPage(
  props: Parameters<typeof StarterKitPage>[0]
) {
  return StarterKitPage(props)
}
