import type { Metadata } from 'next'
import LoginForm from '@/components/widgets/login/LoginForm'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <main className={'pb-8 pt-4 md:pt-24'}>
      <div className={'items-center gap-4 container-flex'}>
        <LoginForm />
      </div>
    </main>
  )
}
