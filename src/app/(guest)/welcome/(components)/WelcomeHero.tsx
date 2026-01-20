import Image from 'next/image'
import WelcomeHeroButton from '@/app/(guest)/welcome/(components)/WelcomeHeroButton'

export default function WelcomeHero() {
  return (
    <section
      className={
        'overflow-hidden relative px-5 md:pb-60 w-full before:content-[""] before:absolute before:inset-0 before:block before:bg-gray-50/50 dark:before:bg-gray-950/75 md:before:bg-black/0 md:before:bg-linear-to-l before:from-[-15%] before:from-black/0 before:via-40% before:via-white/50 dark:before:via-black/50 before:to-75% before:to-white/80 dark:before:to-black/80 before:z-10'
      }
    >
      <Image
        className={
          'w-full min-h-[200%] md:min-h-full object-cover absolute inset-0'
        }
        width={3441}
        height={2344}
        src={'/images/auth/authbackground.jpg'}
        priority={true}
        alt={''}
      />
      <div
        className={
          'z-20 relative py-44 md:py-37 flex flex-col gap-6.5 sn:gap-11 mx-auto items-center text-center md:text-left md:items-start max-w-142.5 md:max-w-208'
        }
      >
        <h1
          className={
            'text-40 leading-12 md:leading-20 md:text-80 font-bold tracking-tight'
          }
        >
          The largest collection of anime
        </h1>
        <p
          className={
            'text-xl leading-6 md:leading-9 md:text-4xl font-semibold order-3 md:order-2'
          }
        >
          Join Kibutsuji and discover a world of anime
        </p>
        <WelcomeHeroButton />
      </div>
    </section>
  )
}
