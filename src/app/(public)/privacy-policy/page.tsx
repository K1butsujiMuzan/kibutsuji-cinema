import TextPage from '@/components/ui/text-page/TextPage'
import {
  privacyPolicyData,
  privacyPolicyPreface,
} from '@/app/(public)/privacy-policy/privacy-policy.data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy policy',
}

export default function PrivacyPolicy() {
  return (
    <TextPage
      title={'Privacy Policy'}
      preface={privacyPolicyPreface}
      textPageData={privacyPolicyData}
    />
  )
}
