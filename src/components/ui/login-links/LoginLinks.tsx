import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  firstHref: string
  firstText: string
  secondHref: string
  secondText: string
  className?: string
}

export default function LoginLinks({
  firstHref,
  firstText,
  secondHref,
  secondText,
  className,
}: Props) {
  return (
    <div className={cn('flex gap-2 justify-center text-center', className)}>
      <Link
        className={
          'text-sm font-bold leading-4.5 uppercase text-pink-400 dark:text-pink-200 hover:text-gray-700 dark:hover:text-gray-100 active:text-gray-700 dark:active:text-gray-100 transition duration-300'
        }
        href={firstHref}
      >
        {firstText}
      </Link>
      <span className={'text-sm font-bold leading-4.5'}> | </span>
      <Link
        className={
          'text-sm font-bold leading-4.5 uppercase text-pink-400 dark:text-pink-200 hover:text-gray-700 dark:hover:text-gray-100 active:text-gray-700 dark:active:text-gray-100 transition duration-300'
        }
        href={secondHref}
      >
        {secondText}
      </Link>
    </div>
  )
}
