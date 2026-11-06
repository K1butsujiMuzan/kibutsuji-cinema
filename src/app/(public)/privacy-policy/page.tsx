import type { Metadata } from 'next'
import PrivacyPolicyPage from '@/components/widgets/PrivacyPolicy/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Privacy policy',
}

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />
}
