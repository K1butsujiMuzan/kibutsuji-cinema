import Premium from '@/components/ui/premium/Premium'
import {
  WELCOME_PREMIUM_ANCHOR,
  WELCOME_PREMIUM_TITLE,
} from '@/app/(guest)/welcome/(components)/welcome.data'

export default function WelcomePremium() {
  return (
    <section
      id={WELCOME_PREMIUM_ANCHOR}
      className={'flex flex-col items-center gap-8 md:gap-14'}
    >
      <h2
        id={WELCOME_PREMIUM_TITLE}
        className={
          'text-28 md:text-54 leading-9 md:leading-16 text-center font-bold px-3'
        }
      >
        Choose your Premium
      </h2>
      <Premium titleId={WELCOME_PREMIUM_TITLE} />
    </section>
  )
}
