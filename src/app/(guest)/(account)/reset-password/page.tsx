import type { Metadata } from 'next'
import ResetForm from '@/components/widgets/reset-password/ResetForm'

export const metadata: Metadata = {
  title: 'Reset password',
}

export default function Reset() {
  return (
    <main className={'py-10 md:pb-15 md:pt-35 flex justify-center'}>
      <div className={'px-10 w-full flex flex-col items-center gap-5'}>
        <ResetForm />
      </div>
    </main>
  )
}
