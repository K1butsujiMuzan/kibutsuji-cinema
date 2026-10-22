import WelcomeMoreSlider from '@/components/widgets/Welcome/WelcomeMore/WelcomeMoreSlider'
import WelcomeMoreButton from '@/components/widgets/Welcome/WelcomeMore/WelcomeMoreButton'
import WelcomeTitleH2 from '@/components/widgets/Welcome/WelcomeTitleH2/WelcomeTitleH2'

export default function WelcomeMore() {
  return (
    <section className={'items-center gap-5 container-flex'}>
      <WelcomeTitleH2
        title={'More with Premium'}
        paragraph={
          'Enjoy the entire Kibutsuji library ad-free, including episodes shortly after their release in Japan. Get exclusive discounts on the Kibutsuji Store!'
        }
      />
      <WelcomeMoreButton />
      <WelcomeMoreSlider />
      <p className={'text-sm text-center'}>
        Benefits may vary depending on the subscription level you choose and
        your region.
      </p>
    </section>
  )
}
