import WelcomeForm from '@/app/(guest)/welcome/(components)/WelcomeForm'

export default function WelcomeRegistration() {
  return (
    <div className={'flex flex-col gap-1 md:gap-4'}>
      <p className={'text-xs leading-4.5 md:text-18 md:leading-7'}>
        Ready to watch? Enter your email to register
      </p>
      <WelcomeForm />
    </div>
  )
}
