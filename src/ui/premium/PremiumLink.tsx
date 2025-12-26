import Link from 'next/link'
import { PAGES } from '@/configs/links'
import { cn } from '../../../lib/utils'

interface Props {
  children: React.ReactNode
  isMostPopular?: boolean
  isTransparent?: boolean
}

export default function PremiumLink({
  children,
  isMostPopular = false,
  isTransparent = false,
}: Props) {
  return (
    <Link
      href={PAGES.PROFILE}
      className={cn(
        'py-1.75 border border-pink-400 rounded-md justify-center font-semibold',
        {
          'text-white bg-pink-400 hover:bg-pink-450 active:bg-pink-500':
            isMostPopular && !isTransparent,
          'dark:text-white hover:border-pink-450 active:border-pink-500':
            !isMostPopular && !isTransparent,
          'border-transparent dark:text-white': isTransparent,
        },
      )}
    >
      {children}
    </Link>
  )
}
