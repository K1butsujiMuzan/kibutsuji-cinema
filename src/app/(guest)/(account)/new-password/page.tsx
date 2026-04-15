import type { Metadata } from 'next'
import NewPasswordForm from '@/app/(guest)/(account)/new-password/(components)/NewPasswordForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'New password',
}

export default function NewPassword() {
  return (
    <main className={'py-10 md:pb-15 md:pt-35 flex justify-center'}>
      <div className={'px-10 w-full flex flex-col items-center gap-5'}>
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </div>
    </main>
  )
}
