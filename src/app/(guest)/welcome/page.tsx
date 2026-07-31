import WelcomeHero from '@/components/widgets/welcome/welcome-hero/WelcomeHero'
import WelcomeWatch from '@/components/widgets/welcome/welcome-watch/WelcomeWatch'
import WelcomePremium from '@/components/widgets/welcome/welcome-premium/WelcomePremium'
import WelcomeSubscription from '@/components/widgets/welcome/welcome-subscription/WelcomeSubscription'
import WelcomeMore from '@/components/widgets/welcome/welcome-more/WelcomeMore'
import WelcomeQuestions from '@/components/widgets/welcome/welcome-questions/WelcomeQuestions'
import type { Metadata } from 'next'
import GuestHeader from '@/components/layouts/guest-header/GuestHeader'

export const metadata: Metadata = {
  title: 'Welcome',
}

export default function Welcome() {
  return (
    <>
      <GuestHeader />
      <main className={'mb-4 flex flex-col gap-12 md:gap-24'}>
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
