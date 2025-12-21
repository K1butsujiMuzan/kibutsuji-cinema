import WelcomeHero from '@/app/(guest)/welcome/(components)/WelcomeHero'
import WelcomePremium from "@/app/(guest)/welcome/(components)/WelcomePremium";

export default function Welcome() {
  return (
    <main className={'mb-4 flex flex-col gap-12 md:gap-24'}>
      <WelcomeHero />
      <div className={'container mx-auto'}>
        <WelcomePremium />
      </div>
    </main>
  )
}
