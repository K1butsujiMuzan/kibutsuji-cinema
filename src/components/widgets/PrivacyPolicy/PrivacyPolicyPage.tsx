import {
  privacyPolicyData,
  privacyPolicyPreface,
} from '@/components/widgets/PrivacyPolicy/privacy-policy.data'
import TextPage from '@/components/ui/text-page/TextPage'

export default function PrivacyPolicyPage() {
  return (
    <TextPage
      title={'Privacy Policy'}
      preface={privacyPolicyPreface}
      textPageData={privacyPolicyData}
    />
  )
}
