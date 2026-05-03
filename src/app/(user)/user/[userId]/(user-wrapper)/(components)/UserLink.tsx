import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  text: string
  href: string
  isActive: boolean
}

export default function UserLink({ href, isActive, text }: Props) {
  return (
    <Link
      className={cn(
        'relative block py-3 hover:text-pink-300 active:text-pink-300 font-medium transition duration-300',
        {
          'after:content-[""] after:absolute after:h-0.75 after:w-full after:bg-pink-300 after:block after:bottom-0 after:rounded-t-sm':
            isActive,
          'text-gray-700/75 dark:text-gray-100/75': !isActive,
        },
      )}
      href={href}
    >
      {text}
    </Link>
  )
}
