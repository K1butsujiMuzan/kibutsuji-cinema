import AccentLink from '@/ui/accent-link/AccentLink'
import { PAGES } from '@/configs/links'

export default function WelcomeSubscription() {
  return (
    <section className={'flex flex-col items-center gap-4.5'}>
      <h2
        className={
          'text-2xl md:text-54 leading-8 md:leading-16 text-center font-bold px-3'
        }
      >
        Already have a subscription?
      </h2>
      <AccentLink
        href={PAGES.PROFILE}
        text={'Login'}
        className={'px-22 py-3'}
      />
    </section>
  )
}
