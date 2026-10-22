import Premium from '@/components/ui/premium/Premium'
import { WELCOME_PREMIUM_ANCHOR } from '@/components/widgets/Welcome/welcome.data'
import WelcomeTitleH2 from '@/components/widgets/Welcome/WelcomeTitleH2/WelcomeTitleH2'
import { useId } from 'react'

export default function WelcomePremium() {
  const titleId = useId()

  return (
    <section
      id={WELCOME_PREMIUM_ANCHOR}
      className={
        'items-center gap-5 scroll-mt-13 md:scroll-mt-15 container-flex'
      }
    >
      <WelcomeTitleH2 title={'Choose your Premium'} titleId={titleId} />
      <Premium titleId={titleId} />
    </section>
  )
}
