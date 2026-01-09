import { redirect } from 'next/navigation'

export default function NewsletterArchivePage() {
  // Redirect to the unified writing page where newsletters are shown in the "Newsletter" tab
  redirect('/writing')
}
