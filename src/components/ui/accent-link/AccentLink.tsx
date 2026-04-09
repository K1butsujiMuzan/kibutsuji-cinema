import Link from 'next/link'
import { memo } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  href: string
  text: string
  divClassName?: string
  linkClassName?: string
}

export default memo(function AccentLink({
  href,
  text,
  divClassName,
  linkClassName,
}: Props) {
  return (
    <Link href={href} className={cn('group', linkClassName)}>
      <div
        className={cn(
          'py-2 px-4 flex justify-center items-center text-white rounded-md font-medium bg-pink-400 group-hover:bg-pink-450 group-active:bg-pink-500 group-active:scale-97 transition duration-300',
          divClassName,
        )}
      >
        {text}
      </div>
    </Link>
  )
})
