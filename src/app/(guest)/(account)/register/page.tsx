import type { Metadata } from 'next'
import RegisterForm from '@/components/widgets/register/RegisterForm'

export const metadata: Metadata = {
  title: 'Register',
}

export default function Register() {
  return (
    <main className={'py-10 md:pb-15 md:pt-35 flex justify-center'}>
      <div className={'px-10 w-full flex flex-col items-center gap-4'}>
        <RegisterForm />
      </div>
    </main>
  )
}
