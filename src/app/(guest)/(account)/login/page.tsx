import type { Metadata } from 'next'
import LoginForm from '@/components/widgets/login/LoginForm'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <main className={'pb-8 pt-4 md:pt-35'}>
      <div className={'flex flex-col items-center gap-4 main-container'}>
        <LoginForm />
      </div>
    </main>
  )
}
