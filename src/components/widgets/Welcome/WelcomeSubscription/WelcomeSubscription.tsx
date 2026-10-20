import AccentLink from '@/components/ui/accent-link/AccentLink'
import { PAGES } from '@/shared/configs/pages.config'

export default function WelcomeSubscription() {
  return (
    <section className={'flex flex-col items-center gap-4.5 main-container'}>
      <h2
        className={
          'text-28 md:text-54 leading-9 md:leading-16 text-center font-bold'
        }
      >
        Already have a subscription?
      </h2>
      <AccentLink
        href={PAGES.LOGIN}
        text={'Login'}
        divClassName={'px-22 md:py-3'}
      />
    </section>
  )
}
