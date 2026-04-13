import Link from 'next/link'
import { PAGES } from '@/configs/pages.config'
import { cn } from '@/lib/utils'
import { memo } from 'react'

interface Props {
  className?: string
}

export default memo(function MiniLogo({ className }: Props) {
  return (
    <Link
      href={PAGES.MAIN}
      aria-label={'to the main page'}
      className={cn('group', className)}
    >
      <svg
        aria-hidden={true}
        className={' text-pink-300 h-10 w-auto'}
        width="65"
        height="65"
        viewBox="0 0 65 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={
            'fill-gray-700 dark:fill-gray-100 group-hover:fill-pink-300 group-active:fill-pink-300 transition duration-300'
          }
          d="M19.456 49V15.592H27.28V28.552L39.232 15.592H48.448L33.616 31.528L49.216 49H39.328L27.28 35.368V49H19.456Z"
        />
        <rect
          x="58"
          y="65"
          width="30"
          height="7"
          transform="rotate(-90 58 65)"
          fill="#7E57C2"
        />
        <rect
          x="65"
          y="65"
          width="30"
          height="7"
          transform="rotate(-180 65 65)"
          fill="#7E57C2"
        />
        <rect
          x="7"
          width="30"
          height="7"
          transform="rotate(90 7 0)"
          fill="#7E57C2"
        />
        <rect width="30" height="7" fill="#7E57C2" />
      </svg>
    </Link>
  )
})
