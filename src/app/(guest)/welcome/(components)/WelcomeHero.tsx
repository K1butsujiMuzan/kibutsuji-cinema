import WelcomeDesktopImages from '@/app/(guest)/welcome/(components)/WelcomeDesktopImages'
import WelcomeMobileImages from '@/app/(guest)/welcome/(components)/WelcomeMobileImages'
import WelcomeRegistration from '@/app/(guest)/welcome/(components)/WelcomeRegistration'

export default function WelcomeHero() {
  return (
    <section
      className={
        'container bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col xl:grid xl:grid-cols-2 2xl:grid-cols-[1fr_auto] gap-5.5 xl:gap-4 xl:pl-11'
      }
    >
      <div
        className={
          'max-w-202.5 flex flex-col gap-5.5 md:gap-12.5 px-2 md:pt-15 xl:px-0'
        }
      >
        <div className={'font-semibold'}>
          <h1 className={'text-32 md:text-68 leading-12 md:leading-26'}>
            Your personal cinema on your devices
          </h1>
          <p className={'text-sm leading-5.5 md:text-32 md:leading-12'}>
            All news in one place
          </p>
        </div>
        <WelcomeRegistration />
      </div>
      <WelcomeDesktopImages />
      <WelcomeMobileImages />
    </section>
  )
}
