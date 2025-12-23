import WelcomeSlider from '@/app/(guest)/welcome/(components)/WelcomeSlider'

export default function WelcomePopular() {
  return (
    <section className={'flex flex-col items-center gap-8 md:gap-14'}>
      <div className={'text-center px-3 flex flex-col gap-3'}>
        <h2 className={'text-28 md:text-56 text-center font-bold'}>
          Watch first
        </h2>
        <p className={'max-w-128 text-base md:text-18'}>
          Watch full seasons of the best anime, ongoing series, Kibutsuji
          Originals, and more!
        </p>
      </div>
      <WelcomeSlider />
    </section>
  )
}
