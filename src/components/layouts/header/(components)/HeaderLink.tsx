import { cn } from '@/lib/utils'
import Link from 'next/link'
import { memo } from 'react'

interface Props {
  children: React.ReactNode
  href: string
  text: string
  className?: string
}

export default memo(function HeaderLink({
  href,
  text,
  children,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn('group', className)}
      aria-label={text.toLowerCase()}
    >
      <div
        className={
          'flex gap-2 items-center font-medium p-2 rounded-md group-hover:bg-pink-100 dark:group-hover:bg-gray-600 group-active:bg-pink-100 dark:group-active:bg-gray-600 group-active:scale-97 transition duration-300'
        }
      >
        {children}
        <span className={'hidden sm:block'}>{text}</span>
      </div>
    </Link>
  )
})
