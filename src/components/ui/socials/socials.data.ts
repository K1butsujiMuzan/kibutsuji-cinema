import type { FC, SVGProps } from 'react'
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
} from '@/components/ui/socials/SocialsIcons'

interface ISocial {
  href: string
  icon: FC<SVGProps<SVGSVGElement>>
  label: string
}

export const socials: ISocial[] = [
  {
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1',
    icon: InstagramIcon,
    label: 'instagram',
  },
  {
    href: 'https://www.youtube.com/watch?v=bv__9O5CZok&list=RDbv__9O5CZok&start_radio=1',
    icon: TwitterIcon,
    label: 'twitter',
  },
  {
    href: 'https://discord.gg/aWhJNJ6Q',
    icon: FacebookIcon,
    label: 'facebook',
  },
  {
    href: 'https://t.me/K1butsujiMuzan',
    icon: TelegramIcon,
    label: 'telegram',
  },
]
