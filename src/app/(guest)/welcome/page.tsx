import WelcomeHero from '@/app/(guest)/welcome/(components)/WelcomeHero'
import WelcomeWatch from '@/app/(guest)/welcome/(components)/WelcomeWatch'
import WelcomePremium from '@/app/(guest)/welcome/(components)/WelcomePremium'
import WelcomeSubscription from '@/app/(guest)/welcome/(components)/WelcomeSubscription'

export default function Welcome() {
  return (
    <main className={'mb-4 flex flex-col gap-12 md:gap-24'}>
      <WelcomeHero />
      <WelcomePremium />
      <WelcomeWatch />
      <WelcomeSubscription />
    </main>
  )
}
