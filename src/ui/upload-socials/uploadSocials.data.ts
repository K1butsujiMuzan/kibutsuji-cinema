import type { FC, SVGAttributes } from 'react'
import { AppStore, GooglePlay } from '@/ui/upload-socials/uploadSocialsIcons'

interface ISocial {
  href: string
  icon: FC<SVGAttributes<SVGSVGElement>>
  text: string
}

export const uploadSocials: ISocial[] = [
  {
    href: 'https://apps.apple.com/us/app/netflix/id363590051',
    icon: AppStore,
    text: 'App Store',
  },
  {
    href: 'https://play.google.com/store/apps/details?id=com.netflix.mediaclient',
    icon: GooglePlay,
    text: 'Google Play',
  },
]
