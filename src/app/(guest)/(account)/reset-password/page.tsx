import type { Metadata } from 'next'
import ResetForm from '@/app/(guest)/(account)/reset-password/ResetForm'
import LoginLinks from '@/ui/login-links/LoginLinks'
import { PAGES } from '@/configs/links'

export const metadata: Metadata = {
  title: 'Reset Password',
}

export default function Reset() {
  return (
    <main className={'py-10 md:pb-15 md:pt-35 flex justify-center'}>
      <div className={'px-10 w-full flex flex-col items-center gap-5'}>
        <h1
          className={
            'text-2xl leading-8 md:text-34 md:leading-11 font-medium mb-3 md:mb-5 text-center'
          }
        >
          Reset password
        </h1>
        <p
          className={
            'text-sm leading-4.5 md:leading-6 md:text-base max-w-104 text-center font-medium mb-5'
          }
        >
          A password reset link will be sent to your email. Your IP address may
          be logged for security purposes.
        </p>
        <ResetForm />
        <LoginLinks
          firstHref={PAGES.LOGIN}
          firstText={'Login'}
          secondHref={PAGES.REGISTER}
          secondText={'Create an Account'}
        />
      </div>
    </main>
  )
}
