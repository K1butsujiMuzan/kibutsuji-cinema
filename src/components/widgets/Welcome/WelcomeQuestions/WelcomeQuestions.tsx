import { LINKS } from '@/shared/configs/links.config'

export default function WelcomeQuestions() {
  return (
    <section
      className={'text-center flex flex-col items-center gap-3 main-container'}
    >
      <h2 className={'font-bold text-2xl md:text-34'}>Any questions?</h2>
      <span
        className={
          'font-medium md:text-18 flex flex-wrap items-center justify-center gap-1.5'
        }
      >
        <span>Contact us</span>
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
