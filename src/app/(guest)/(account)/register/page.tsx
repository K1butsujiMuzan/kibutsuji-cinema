import type { Metadata } from 'next'
import RegisterForm from '@/app/(guest)/(account)/register/(components)/RegisterForm'
import RegisterLinks from '@/app/(guest)/(account)/register/(components)/RegisterLinks'

export const metadata: Metadata = {
  title: 'Register',
}

export default function Register() {
  return (
    <main className={'py-10 md:pb-15 md:pt-35 flex justify-center'}>
      <div className={'px-10 w-full flex flex-col items-center gap-4'}>
        <h1
          className={
            'text-2xl leading-8 md:text-34 md:leading-11 font-medium text-center'
          }
        >
          Create an account
        </h1>
        <RegisterForm />
        <RegisterLinks />
      </div>
    </main>
  )
}
