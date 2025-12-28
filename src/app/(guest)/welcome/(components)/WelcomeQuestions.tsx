export default function WelcomeQuestions() {
  return (
    <section className={'mx-auto text-center px-5'}>
      <div className={'flex flex-col gap-3'}>
        <h2 className={'font-bold text-2xl md:text-34 leading-8 md:leading-11'}>
          Any questions?
        </h2>
        <div className={'text-18 leading-6.5 font-medium'}>
          Contact us{' '}
          <a
            className={
              'text-pink-400 dark:text-pink-200 hover:text-gray-700 dark:hover:text-gray-100 hover:underline active:text-gray-700 dark:active:text-gray-100 active:underline transition duration-300'
            }
            href="mailto:information@kibutsuji.me"
          >
            information@kibutsuji.me
          </a>
        </div>
      </div>
    </section>
  )
}
