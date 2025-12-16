import WelcomeHero from '@/app/(guest)/welcome/(components)/WelcomeHero'
import WelcomeContainer from './(components)/WelcomeContainer'

export default function Welcome() {
  return (
    <main className={'my-2 md:my-4'}>
      <div className={'px-4 flex flex-col items-center gap-5'}>
        <WelcomeHero />
        <WelcomeContainer />
      </div>
    </main>
  )
}
