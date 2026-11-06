import AccentLink from '@/components/ui/accent-link/AccentLink'
import { PAGES } from '@/shared/configs/pages.config'

export default function NewPasswordSubmitted() {
  return (
    <div className={'flex flex-col gap-5 items-center text-center'}>
      <h1 className={'text-2xl md:text-34 font-semibold'}>
        New password has been set!
      </h1>
      <p className={'md:text-18 max-w-104'}>
        You can now log into your account with your new password.
      </p>
      <AccentLink href={PAGES.LOGIN} className={'w-[min(100%,14rem)]'}>
        Login
      </AccentLink>
    </div>
  )
}
