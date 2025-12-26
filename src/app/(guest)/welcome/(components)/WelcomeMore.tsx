import WelcomeMoreSlider from '@/app/(guest)/welcome/(components)/WelcomeMoreSlider'
import WelcomeMoreButton from '@/app/(guest)/welcome/(components)/WelcomeMoreButton'

export default function WelcomeMore() {
  return (
    <section className={'flex flex-col items-center gap-10 px-5'}>
      <div className={'text-center flex flex-col gap-3'}>
        <h2
          className={
            'text-28 md:text-54 leading-9 md:leading-16 text-center font-bold px-3'
          }
        >
          More with Premium
        </h2>
        <p
          className={
            'max-w-180 text-base leading-6 md:leading-6.5 md:text-18 font-medium'
          }
        >
          Enjoy the entire Kibutsuji library ad-free, including episodes shortly
          after their release in Japan. Get exclusive discounts on the Kibutsuji
          Store!
        </p>
      </div>
      <WelcomeMoreButton />
      <WelcomeMoreSlider />
      <p className={'text-sm leading-4.5 text-center font-medium'}>
        Benefits may vary depending on the subscription level you choose and
        your region.
      </p>
    </section>
  )
}
