'use client'
import { cn } from '@/lib/utils'

interface Props {
  isLeft: boolean
  onClick: () => void
  className?: string
  ariaLabel: string
}

export default function WelcomeSliderButton({
  isLeft,
  onClick,
  className,
  ariaLabel,
}: Props) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        'absolute top-1/3 z-10 text-black dark:text-white hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 transition duration-300',
        className,
        {
          'left-0 -translate-x-full': isLeft,
          'right-0 translate-x-full scale-x-[-1]': !isLeft,
        },
      )}
      type="button"
    >
      <svg
        role={'img'}
        className={'h-10 w-10'}
        aria-hidden={true}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.3984 16.6L13.9984 18L7.99844 12L13.9984 6L15.3984 7.4L10.7984 12L15.3984 16.6Z"
          fill="black"
        />
      </svg>
    </button>
  )
}
