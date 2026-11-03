import type { Metadata } from 'next'
import ResetForm from '@/components/widgets/reset-password/ResetForm'

export const metadata: Metadata = {
  title: 'Reset password',
}

export default function Reset() {
  return (
    <main className={'pb-8 pt-4 md:pt-24'}>
      <div className={'items-center gap-4 container-flex'}>
        <ResetForm />
      </div>
    </main>
  )
}
