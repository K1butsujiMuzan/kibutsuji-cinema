import { welcomeContainer } from '@/app/(guest)/welcome/(components)/welcome.data'
import Image from 'next/image'
import WelcomeWatchText from '@/app/(guest)/welcome/(components)/WelcomeWatchText'
import { cn } from '../../../../../lib/utils'
import Link from 'next/link'
import { PAGES } from '@/configs/links'
import AccentLink from '@/ui/accent-link/AccentLink'

export default function WelcomeContainer() {
  return (
    <section
      className={
        'container bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center gap-4 p-2 lg:p-4'
      }
    >
      {welcomeContainer.map((container) => (
        <div
          className={'grid grid-cols-2 gap-2 items-center'}
          key={container.title}
        >
          <Image
            className={cn('', {
              'order-2': container.isLeft,
            })}
            src={container.image}
            alt={''}
            width={container.width}
            height={container.height}
          />
          <WelcomeWatchText
            title={container.title}
            paragraph={container.paragraph}
            isLeft={container.isLeft}
          />
        </div>
      ))}
      <AccentLink href={PAGES.AUTH} text={'Buy for 50$'} />
    </section>
  )
}
