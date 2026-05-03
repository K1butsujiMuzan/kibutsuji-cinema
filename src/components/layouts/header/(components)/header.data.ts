import type { FC, SVGProps } from 'react'
import { PAGES } from '@/configs/pages.config'
import {
  AddIcon,
  CommentIcon,
  FriendsListIcon,
} from '@/components/icons/HeaderUserMenuModalIcons'

type THeaderUserMenuModalLink = {
  href: (id: string) => string
  text: string
  icon: FC<SVGProps<SVGSVGElement>>
}

type THeaderUserMenuModalPrivateLink = {
  href: string
  text: string
  icon: FC<SVGProps<SVGSVGElement>>
}

export const headerUserMenuModalPublish: THeaderUserMenuModalLink[] = [
  {
    href: (id) => PAGES.COMMENTS(id),
    text: 'Comments',
    icon: CommentIcon,
  },
  {
    href: (id) => PAGES.FRIENDS(id),
    text: 'Friends list',
    icon: FriendsListIcon,
  },
]

export const headerUserMenuModalPrivate: THeaderUserMenuModalPrivateLink[] = [
  {
    href: PAGES.NEW_ANIME,
    text: 'New anime',
    icon: AddIcon,
  },
]
