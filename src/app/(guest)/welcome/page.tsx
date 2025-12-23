import WelcomeHero from '@/app/(guest)/welcome/(components)/WelcomeHero'
import WelcomePopular from '@/app/(guest)/welcome/(components)/WelcomePopular'
import WelcomePremium from '@/app/(guest)/welcome/(components)/WelcomePremium'

export default function Welcome() {
  return (
    <main className={'mb-4 flex flex-col gap-12 md:gap-24'}>
      <WelcomeHero />
      <WelcomePremium />
      <WelcomePopular />
    </main>
  )
}
