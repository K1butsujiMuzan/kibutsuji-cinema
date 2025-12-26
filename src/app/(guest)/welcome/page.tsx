import WelcomeHero from '@/app/(guest)/welcome/(components)/WelcomeHero'
import WelcomeWatch from '@/app/(guest)/welcome/(components)/WelcomeWatch'
import WelcomePremium from '@/app/(guest)/welcome/(components)/WelcomePremium'
import WelcomeSubscription from '@/app/(guest)/welcome/(components)/WelcomeSubscription'
import WelcomeMore from '@/app/(guest)/welcome/(components)/WelcomeMore'
import WelcomeQuestions from '@/app/(guest)/welcome/(components)/WelcomeQuestions'

export default function Welcome() {
  return (
    <main className={'mb-4 flex flex-col gap-12 md:gap-24'}>
      <WelcomeHero />
      <WelcomePremium />
      <WelcomeWatch />
      <WelcomeSubscription />
      <WelcomeMore />
      <WelcomeQuestions />
      <p
        className={
          'font-semibold text-center leading-4.5 text-sm md:text-base md:leading-6 px-5'
        }
      >
        *Device and content availability may vary by country or region.
      </p>
    </main>
  )
}
