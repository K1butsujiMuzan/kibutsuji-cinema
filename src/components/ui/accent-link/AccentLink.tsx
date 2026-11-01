import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children?: React.ReactNode
  className?: string
}

export default function AccentLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'py-2.5 px-4 flex justify-center items-center rounded-md font-medium text-light bg-accent hover:bg-accent-dark active:bg-accent-dark active:scale-97 transition duration-300',
        className,
      )}
    >
      <span>{children}</span>
    </Link>
  )
}
