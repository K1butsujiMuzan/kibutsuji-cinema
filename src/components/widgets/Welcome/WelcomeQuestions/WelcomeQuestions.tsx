import { LINKS } from '@/shared/configs/links.config'
import WelcomeTitleH2 from '@/components/widgets/Welcome/WelcomeTitleH2/WelcomeTitleH2'

export default function WelcomeQuestions() {
  return (
    <section className={'items-center gap-5 container-flex'}>
      <WelcomeTitleH2 title={'Any questions?'} />
      <span className={'md:text-18 text-center'}>
        <span>Contact us </span>
        <a
          className={
            'text-pink-400 dark:text-pink-200 hover:text-gray-700 dark:hover:text-gray-100 hover:underline active:text-gray-700 dark:active:text-gray-100 active:underline transition duration-300'
          }
          href={LINKS.EMAIL_INFO.href}
        >
          {LINKS.EMAIL_INFO.label}
        </a>
      </span>
    </section>
  )
}
