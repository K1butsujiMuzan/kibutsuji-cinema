import Premium from '@/ui/premium/Premium'
import { WELCOME_PREMIUM_ANCHOR } from '@/app/(guest)/welcome/(components)/welcome.data'

export default function WelcomePremium() {
  return (
    <section
      id={WELCOME_PREMIUM_ANCHOR}
      className={'flex flex-col items-center gap-8 md:gap-14'}
    >
      <h2
        className={
          'text-2xl md:text-54 leading-8 md:leading-16 text-center font-bold px-3'
        }
      >
        Choose your Premium
      </h2>
      <Premium />
    </section>
  )
}
