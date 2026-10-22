import WelcomeWatchSlider from '@/components/widgets/Welcome/WelcomeWatch/WelcomeWatchSlider'
import WelcomeTitleH2 from '@/components/widgets/Welcome/WelcomeTitleH2/WelcomeTitleH2'

export default function WelcomeWatch() {
  return (
    <section className={'items-center gap-5 container-flex'}>
      <WelcomeTitleH2
        title={'Watch first'}
        paragraph={
          'Watch full seasons of the best anime, ongoing series, Kibutsuji Originals, and more!'
        }
      />
      <WelcomeWatchSlider />
    </section>
  )
}
