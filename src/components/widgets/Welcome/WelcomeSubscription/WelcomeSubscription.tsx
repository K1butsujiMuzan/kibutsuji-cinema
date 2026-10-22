import AccentLink from '@/components/ui/accent-link/AccentLink'
import { PAGES } from '@/shared/configs/pages.config'
import WelcomeTitleH2 from '@/components/widgets/Welcome/WelcomeTitleH2/WelcomeTitleH2'

export default function WelcomeSubscription() {
  return (
    <section className={'items-center gap-5 container-flex'}>
      <WelcomeTitleH2 title={'Already have a subscription?'} />
      <AccentLink href={PAGES.LOGIN} className={'w-[min(100%,14rem)]'}>
        Login
      </AccentLink>
    </section>
  )
}
