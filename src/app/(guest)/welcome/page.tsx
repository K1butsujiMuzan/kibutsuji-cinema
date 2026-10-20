import WelcomeHero from '@/components/widgets/Welcome/WelcomeHero/WelcomeHero'
import WelcomeWatch from '@/components/widgets/Welcome/WelcomeWatch/WelcomeWatch'
import WelcomePremium from '@/components/widgets/Welcome/WelcomePremium/WelcomePremium'
import WelcomeSubscription from '@/components/widgets/Welcome/WelcomeSubscription/WelcomeSubscription'
import WelcomeMore from '@/components/widgets/Welcome/WelcomeMore/WelcomeMore'
import WelcomeQuestions from '@/components/widgets/Welcome/WelcomeQuestions/WelcomeQuestions'
import type { Metadata } from 'next'
import GuestHeader from '@/components/layouts/guest-header/GuestHeader'

export const metadata: Metadata = {
  title: 'Welcome',
}

export default function Welcome() {
  return (
    <>
      <GuestHeader />
      <main className={'pb-8 flex flex-col gap-12 md:gap-24'}>
        <WelcomeHero />
        <WelcomePremium />
        <WelcomeWatch />
        <WelcomeSubscription />
        <WelcomeMore />
        <WelcomeQuestions />
        <p className={'font-semibold text-center text-sm md:text-base px-3'}>
          *Device and content availability may vary by country or region.
        </p>
      </main>
    </>
  )
}
