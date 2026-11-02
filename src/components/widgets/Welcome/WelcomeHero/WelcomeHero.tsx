import Image from 'next/image'
import WelcomeHeroButton from '@/components/widgets/Welcome/WelcomeHero/WelcomeHeroButton'
import { cn } from '@/lib/utils'

export default function WelcomeHero() {
  return (
    <section
      className={cn(
        'overflow-hidden relative px-3 w-full',
        'before:content-[""] before:absolute before:inset-0 before:block before:z-10 md:before:bg-linear-to-l before:from-[-15%] before:via-40% before:to-75%',
        'before:bg-white/50 md:before:bg-black/0 before:from-black/0 before:via-white/50 before:to-white/80',
        'dark:before:bg-black/75 dark:before:via-black/50 dark:before:to-black/80',
      )}
    >
      <Image
        className={'object-cover scale-125 md:scale-100'}
        fill={true}
        src={'/images/global/welcome-bg.jpg'}
        preload={true}
        alt={''}
        sizes={'100vw'}
      />
      <div
        className={
          'z-20 relative py-44 md:pt-37 md:pb-97 flex flex-col gap-6.5 sn:gap-11 mx-auto items-center text-center md:text-left md:items-start max-w-142.5 md:max-w-208'
        }
      >
        <h1
          className={
            'text-40 leading-[1.1] md:text-80 font-bold tracking-tight'
          }
        >
          The largest collection of anime
        </h1>
        <p className={'text-xl md:text-4xl font-semibold order-3 md:order-2'}>
          Join Kibutsuji and discover a world of anime
        </p>
        <WelcomeHeroButton />
      </div>
    </section>
  )
}
