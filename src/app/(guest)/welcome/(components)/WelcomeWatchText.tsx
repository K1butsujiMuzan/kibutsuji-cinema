import { cn } from '../../../../../lib/utils'

interface Props {
  title: string
  paragraph: string
  isLeft: boolean
}

export default function WelcomeWatchText({ title, paragraph, isLeft }: Props) {
  return (
    <div
      className={cn('flex flex-col justify-center gap-1 md:gap-3', {
        'xl:pl-24': isLeft,
        'xl:pr-24': !isLeft,
      })}
    >
      <h2
        className={'text-18 leading-6 md:text-56 md:leading-16 font-semibold'}
      >
        {title}
      </h2>
      <p className={'text-sm leading-5.5 md:text-32 md:leading-12'}>
        {paragraph}
      </p>
    </div>
  )
}
