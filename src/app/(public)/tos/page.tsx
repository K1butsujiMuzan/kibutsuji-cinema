import type { Metadata } from 'next'
import { tosData, tosPreface } from '@/app/(public)/tos/tos.data'
import TextPage from '@/components/ui/text-page/TextPage'

export const metadata: Metadata = {
  title: 'Tos',
}

export default function Tos() {
  return (
    <TextPage
      title={'Terms of Service'}
      preface={tosPreface}
      textPageData={tosData}
    />
  )
}
