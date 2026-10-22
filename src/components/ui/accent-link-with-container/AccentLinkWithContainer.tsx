import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  href: string
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}

export default function AccentLinkWithContainer({
  href,
  children,
  className,
  containerClassName,
}: Props) {
  return (
    <Link href={href} className={cn('group', className)}>
      <span
        className={
          'py-2.5 px-4 flex justify-center items-center text-white rounded-md font-medium bg-pink-400 group-hover:bg-pink-450 group-active:bg-pink-500 group-active:scale-97 transition duration-300'
        }
      >
        {children}
      </span>
    </Link>
  )
}
