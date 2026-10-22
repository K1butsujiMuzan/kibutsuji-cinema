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
        'py-2.5 px-4 flex justify-center items-center text-white rounded-md font-medium bg-pink-400 hover:bg-pink-450 active:bg-pink-500 active:scale-97 transition duration-300',
        className,
      )}
    >
      <span>{children}</span>
    </Link>
  )
}
