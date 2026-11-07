import type { Metadata } from 'next'
import FaqPage from '@/components/widgets/Faq/FaqPage'

export const metadata: Metadata = {
  title: 'Faq',
}

export default function Faq() {
  return <FaqPage />
}
