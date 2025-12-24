import WelcomeWatchSlider from '@/app/(guest)/welcome/(components)/WelcomeWatchSlider'

export default function WelcomeWatch() {
  return (
    <section className={'flex flex-col items-center gap-8 md:gap-14'}>
      <div className={'text-center px-3 flex flex-col gap-3'}>
        <h2
          className={
            'text-2xl md:text-54 leading-8 md:leading-16 text-center font-bold px-3'
          }
        >
          Watch first
        </h2>
        <p className={'max-w-128 text-base md:text-18'}>
          Watch full seasons of the best anime, ongoing series, Kibutsuji
          Originals, and more!
        </p>
      </div>
      <WelcomeWatchSlider />
    </section>
  )
}
