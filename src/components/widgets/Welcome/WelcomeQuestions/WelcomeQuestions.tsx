import { LINKS } from '@/shared/configs/links.config'
import WelcomeTitleH2 from '@/components/widgets/Welcome/WelcomeTitleH2/WelcomeTitleH2'
import TextLink from '@/components/ui/text-link/TextLink'

export default function WelcomeQuestions() {
  return (
    <section className={'items-center gap-5 container-flex'}>
      <WelcomeTitleH2 title={'Any questions?'} />
      <span className={'md:text-18 text-center'}>
        <span>Contact us </span>
        <TextLink type={'a'} href={LINKS.EMAIL_INFO.href}>
          {LINKS.EMAIL_INFO.label}
        </TextLink>
      </span>
    </section>
  )
}
