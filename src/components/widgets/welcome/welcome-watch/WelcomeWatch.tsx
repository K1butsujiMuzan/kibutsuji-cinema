import WelcomeWatchSlider from '@/components/widgets/welcome/welcome-watch/WelcomeWatchSlider'

export default function WelcomeWatch() {
  return (
    <section
      className={'flex flex-col items-center gap-8 md:gap-14 main-container'}
    >
      <div className={'text-center flex flex-col gap-3'}>
        <h2
          className={
            'text-28 md:text-54 leading-9 md:leading-16 text-center font-bold'
          }
        >
          Watch first
        </h2>
        <p
          className={
            'max-w-88 md:max-w-128 text-base leading-6 md:leading-6.5 md:text-18 font-medium'
          }
        >
          Watch full seasons of the best anime, ongoing series, Kibutsuji
          Originals, and more!
        </p>
      </div>
      <WelcomeWatchSlider />
    </section>
  )
}
