import type { Metadata } from 'next'
import RegisterForm from '@/components/widgets/register/RegisterForm'

export const metadata: Metadata = {
  title: 'Register',
}

export default function Register() {
  return (
    <main className={'pb-8 pt-4 md:pt-24'}>
      <div className={'items-center gap-4 container-flex'}>
        <RegisterForm />
      </div>
    </main>
  )
}
