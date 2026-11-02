import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  type: 'link' | 'a'
  href: string
  children: React.ReactNode
  className?: string
}

export default function TextLink({ type, href, children, className }: Props) {
  if (type === 'a') {
    return (
      <a
        className={cn(
          'text-base-accent hover:text-base-text hover:underline active:text-base-text active:underline transition duration-300 whitespace-nowrap',
          className,
        )}
        href={href}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      className={cn(
        'text-base-accent hover:text-base-text hover:underline active:text-base-text active:underline transition duration-300 whitespace-nowrap',
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
