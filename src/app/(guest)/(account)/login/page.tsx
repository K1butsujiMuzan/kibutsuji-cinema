import type { Metadata } from 'next'
import LoginForm from '@/app/(guest)/(account)/login/LoginForm'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <main className={'py-10 md:pb-15 md:pt-35 flex justify-center'}>
      <div className={'px-10 w-full flex flex-col items-center gap-4'}>
        <LoginForm />
      </div>
    </main>
  )
}
