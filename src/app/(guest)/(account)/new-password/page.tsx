import type { Metadata } from 'next'
import NewPasswordForm from '@/components/widgets/new-password/NewPasswordForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'New password',
}

export default function NewPassword() {
  return (
    <main className={'pb-8 pt-4 md:pt-35'}>
      <div className={'flex flex-col items-center gap-4 main-container'}>
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </div>
    </main>
  )
}
