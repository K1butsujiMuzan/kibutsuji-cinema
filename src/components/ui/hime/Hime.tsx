import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  text: string
  type: 'sad' | 'happy'
  className?: string
}

export default function Hime({ text, type, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-3 items-center', className)}>
      <div className={'flex flex-col items-center relative'}>
        <span
          className={
            'text-center text-22 leading-7 font-semibold text-pink-400 dark:text-pink-200 px-4 py-2.5 border-3'
          }
        >
          {text}
        </span>
        <span
          className={`
            relative -top-0.5
            before:content-[""] before:block before:border-l-11 before:border-l-transparent before:border-r-11 before:border-r-transparent before:border-t-16 before:border-t-pink-400 dark:before:border-t-pink-200
            after:content-[""] after:block after:absolute after:-top-1.5 after:border-l-11 after:border-l-transparent after:border-r-11 after:border-r-transparent after:border-t-16 after:border-t-gray-50 dark:after:border-t-gray-950
          `}
        />
      </div>
      {type === 'happy' && (
        <Image
          src={'/images/hime/happy-hime.png'}
          alt={''}
          width={350}
          height={348}
          className={'max-w-47'}
        />
      )}
      {type === 'sad' && (
        <Image
          src={'/images/hime/sad-hime.png'}
          alt={''}
          width={386}
          height={348}
          className={'max-w-47'}
        />
      )}
    </div>
  )
}
