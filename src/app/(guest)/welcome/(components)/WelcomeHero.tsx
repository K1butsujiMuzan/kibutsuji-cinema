import WelcomeRegistration from '@/app/(guest)/welcome/(components)/WelcomeRegistration'
import authbackground_jpg from '../../../../../public/images/auth/authbackground.jpg'
import Image from "next/image";

export default function WelcomeHero() {
  return (
    <section
      className={
        'overflow-hidden relative px-3 md:pb-55 w-full before:content-[""] before:absolute before:inset-0 before:block before:bg-gray-50/50 dark:before:bg-gray-950/75 md:before:bg-black/0 md:before:bg-linear-to-l before:from-[-15%] before:from-black/0 before:via-40% before:via-gray-50/75 dark:before:via-black/75 before:to-75% before:to-gray-50 dark:before:to-gray-950 before:z-10'
      }
    >
      <Image
        className={'absolute inset-0 w-full min-h-[200%] md:min-h-full object-cover'}
        src={authbackground_jpg}
        priority={true}
        alt={''}
      />
      <div className={'z-20 relative py-30 flex flex-col gap-5 mx-auto items-center text-center md:text-left md:items-start max-w-140 md:max-w-200'}>
        <h1 className={'text-40 md:text-80 font-semibold'}>
          The largest collection of anime
        </h1>
        <p className={'text-xl md:text-32 font-semibold'}>
          Join Kibutsuji and discover a world of anime
        </p>
        <WelcomeRegistration />
      </div>
    </section>
  )
}