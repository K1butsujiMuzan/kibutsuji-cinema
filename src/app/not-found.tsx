import type { Metadata } from 'next'
import NotFoundWrapper from '@/components/ui/not-found-wrapper/NotFoundWrapper'

export const metadata: Metadata = {
  title: 'Not found',
}

export default function NotFound() {
  return <NotFoundWrapper />
}
