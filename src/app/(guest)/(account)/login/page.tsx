import type { Metadata } from 'next'
import LoginForm from '@/app/(guest)/(account)/login/LoginForm'
import LoginLinks from '@/ui/login-links/LoginLinks'
import { PAGES } from '@/configs/pages.config'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <main className={'py-10 md:pb-15 md:pt-35 flex justify-center'}>
      <div className={'px-10 w-full flex flex-col items-center gap-4'}>
        <h1
          className={
            'text-2xl leading-8 md:text-34 md:leading-11 font-medium text-center'
          }
        >
          Login
        </h1>
        <LoginForm />
        <LoginLinks
          firstHref={PAGES.RESET}
          firstText={'Forgot your password?'}
          secondHref={PAGES.REGISTER}
          secondText={'Create an Account'}
          className={'pt-1'}
        />
      </div>
    </main>
  )
}
