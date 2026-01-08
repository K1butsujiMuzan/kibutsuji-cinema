import type { Metadata } from 'next'
import NewPasswordForm from '@/app/(guest)/(account)/new-password/NewPasswordForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'New Password',
}

export default function NewPassword() {
  return (
    <main className={'py-10 md:pb-15 md:pt-35 flex justify-center'}>
      <div className={'px-10 w-full flex flex-col items-center gap-5'}>
        <h1
          className={
            'text-2xl leading-8 md:text-34 md:leading-11 font-medium mb-5 text-center'
          }
        >
          Create a new password
        </h1>
        <p
          className={
            'md:leading-6.5 md:text-18 max-w-104 text-center font-medium'
          }
        >
          For security, your password must be 6 or more characters long.
        </p>
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </div>
    </main>
  )
}
