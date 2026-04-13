import NotFoundPage from '@/components/ui/not-found-page/NotFoundPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not found',
}

export default function NotFound() {
  return (
    <main className={'p-4 flex justify-center items-center'}>
      <h1 className={'sr-only'}>'Page not found or has been moved'</h1>
      <NotFoundPage text={'Page not found or has been moved'} />
    </main>
  )
}
