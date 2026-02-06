import StarterKitPage, {
  generateMetadata,
  generateStaticParams,
} from '../../../stackshack/starter-kits/[kit]/page'

export { generateMetadata, generateStaticParams }

interface PageProps {
  params: Promise<{ kit: string }>
}

export default async function SkillsStarterKitDetailPage(props: PageProps) {
  return StarterKitPage(props)
}
