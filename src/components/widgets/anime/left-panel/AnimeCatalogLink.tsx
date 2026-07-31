import Link from 'next/link'

interface Props {
  href: string
  text: string
  title: string
}

export default function AnimeCatalogLink({ href, title, text }: Props) {
  return (
    <Link
      className={
        'group truncate rounded-md px-2.5 py-1.5 flex flex-col hover:bg-pink-70 dark:hover:bg-gray-750 active:bg-pink-70 dark:active:bg-gray-750 transition duration-300'
      }
      href={href}
    >
      <span className={'text-sm truncate'}>{title}</span>
      <span
        className={
          'truncate group-hover:underline group-hover:text-pink-200 group-active:underline group-active:text-pink-200 transition duration-300'
        }
      >
        {text}
      </span>
    </Link>
  )
}
