import type { Metadata } from 'next'
import TosPage from '@/components/widgets/Tos/TosPage'

export const metadata: Metadata = {
  title: 'Tos',
}

export default function Tos() {
  return <TosPage />
}
