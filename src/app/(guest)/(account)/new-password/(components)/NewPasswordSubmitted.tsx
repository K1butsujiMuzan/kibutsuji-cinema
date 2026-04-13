import AccentLink from '@/components/ui/accent-link/AccentLink'
import { PAGES } from '@/configs/pages.config'

export default function NewPasswordSubmitted() {
  return (
    <>
      <h1
        className={
          'text-2xl leading-8 md:text-34 md:leading-11 font-medium mb-5 text-center'
        }
      >
        New password has been set!
      </h1>
      <p
        className={
          'md:leading-6.5 md:text-18 max-w-104 text-center font-medium'
        }
      >
        You can now log into your account with your new password.
      </p>
      <AccentLink
        text={'Login'}
        href={PAGES.LOGIN}
        divClassName={'py-1 md:py-2 w-full text-center max-w-104 mt-2'}
      />
    </>
  )
}
