import Link from 'next/link'
import { memo } from 'react'

interface Props {
  href: string
  text: string
  onClick: () => void
  children: React.ReactNode
}

export default memo(function HeaderUserMenuModalLink({
  href,
  text,
  children,
  onClick,
}: Props) {
  return (
    <Link
      onClick={onClick}
      className={
        'flex items-center overflow-hidden gap-2 px-3.5 py-2 rounded-sm hover:bg-pink-70 dark:hover:bg-gray-500 active:bg-pink-70 dark:active:bg-gray-500 transition duration-300'
      }
      href={href}
    >
      {children}
      <span className={'overflow-hidden text-nowrap text-ellipsis font-medium'}>
        {text}
      </span>
    </Link>
  )
})
