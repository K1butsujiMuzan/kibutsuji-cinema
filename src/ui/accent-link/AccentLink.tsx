import Link from 'next/link'
import { memo } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  href: string
  text: string
  className: string
}

export default memo(function AccentLink({ href, text, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'text-white rounded-md font-medium bg-pink-400 hover:bg-pink-450 active:bg-pink-500 active:scale-97 transition duration-300',
        className,
      )}
    >
      {text}
    </Link>
  )
})
