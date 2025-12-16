import Link from 'next/link'
import { memo } from 'react'

interface Props {
  href: string
  text: string
}

export default memo(function AccentLink({ href, text }: Props) {
  return (
    <Link
      href={href}
      className={
        'text-white px-4 md:px-5 py-1 md:py-2 rounded-md font-medium bg-pink-400 hover:bg-pink-450 active:bg-pink-500 active:scale-97 transition duration-300'
      }
    >
      {text}
    </Link>
  )
})
