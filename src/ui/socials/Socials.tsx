import { socials } from '@/ui/socials/socials.data'

export default function Socials() {
  return (
    <nav>
      <ul
        className={
          'flex gap-y-1 gap-x-3 md:gap-6 flex-wrap justify-center items-center leading-4'
        }
      >
        {socials.map(({ href, icon: Icon }) => (
          <li key={href}>
            <a
              target={'_blank'}
              className={
                'p-1 md:p-2 rounded-md hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
              }
              href={href}
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
