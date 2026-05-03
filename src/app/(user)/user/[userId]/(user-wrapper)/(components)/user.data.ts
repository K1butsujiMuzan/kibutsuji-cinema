import { PAGES } from '@/configs/pages.config'

type TUserLink = {
  href: (id: string) => string
  text: string
}

export const userData: TUserLink[] = [
  {
    href: (id) => PAGES.USER(id),
    text: 'Anime',
  },
  {
    href: (id) => PAGES.COMMENTS(id),
    text: 'Comments',
  },
  {
    href: (id) => PAGES.FRIENDS(id),
    text: 'Friends',
  },
]
