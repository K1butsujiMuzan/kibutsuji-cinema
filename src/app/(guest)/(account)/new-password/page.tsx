import type { Metadata } from 'next'
import NewPasswordForm from '@/components/widgets/NewPassword/NewPasswordForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'New password',
}

export default function NewPassword() {
  return (
    <main className={'pb-8 pt-4 md:pt-24'}>
      <div className={'items-center gap-4 container-flex'}>
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </div>
    </main>
  )
}
