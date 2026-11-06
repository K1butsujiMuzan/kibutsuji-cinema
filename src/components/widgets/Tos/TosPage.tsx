import { tosData, tosPreface } from '@/components/widgets/Tos/tos.data'
import TextPage from '@/components/ui/text-page/TextPage'

export default function TosPage() {
  return (
    <TextPage
      title={'Terms of Service'}
      preface={tosPreface}
      textPageData={tosData}
    />
  )
}
