import type { FC, SVGProps } from 'react'
import {
  WelcomeMoreIconAccess,
  WelcomeMoreIconDevices,
  WelcomeMoreIconDownload,
  WelcomeMoreIconEpisodes,
  WelcomeMoreIconOffers,
  WelcomeMoreIconStore,
  WelcomeMoreIconVault,
  WelcomeMoreIconView,
} from '@/app/(guest)/welcome/(components)/WelcomeMoreIcons'

export interface IImageSlide {
  image: string
  title: string
  href: string
}

interface IIconSlide {
  icon: FC<SVGProps<SVGSVGElement>>
  text: string
}

export const WELCOME_PREMIUM_ANCHOR: string = 'welcome-premium'
export const WELCOME_PREMIUM_TITLE: string = 'premium-title'

export const sliderImages: IImageSlide[] = [
  {
    image: '/images/welcome/solo-leveling.png',
    title: 'Solo Leveling',
    href: '#',
  },
  {
    image: '/images/welcome/chainsaw-man.png',
    title: 'Chainsaw Man',
    href: '#',
  },
  {
    image: '/images/welcome/kimetsu-no-yaiba.png',
    title: 'Demon Slayer',
    href: '#',
  },
  {
    image: '/images/welcome/jujutsu-kaisen.png',
    title: 'Magic Battle',
    href: '#',
  },
  {
    image: '/images/welcome/the-apothecary-diaries.png',
    title: 'The Apothecary Diaries',
    href: '#',
  },
  {
    image: '/images/welcome/naruto.png',
    title: 'Naruto',
    href: '#',
  },
  {
    image: '/images/welcome/one-punch-man.png',
    title: 'One Punch Man',
    href: '#',
  },
  {
    image: '/images/welcome/oshi-no-ko.png',
    title: 'Star Child',
    href: '#',
  },
  {
    image: '/images/welcome/mashle.png',
    title: 'Mashle: Magic and Muscles',
    href: '#',
  },
  {
    image: '/images/welcome/violet-evergarden.png',
    title: 'Violet Evergarden',
    href: '#',
  },
  {
    image: '/images/welcome/parasyte.png',
    title: 'Parasyte: The Maxim',
    href: '#',
  },
  {
    image: '/images/welcome/kaiju-no8.png',
    title: 'Kaiju No. 8',
    href: '#',
  },
  {
    image: '/images/welcome/frieren.png',
    title: "Frieren: Beyond Journey's End",
    href: '#',
  },
  {
    image: '/images/welcome/hells-paradise.png',
    title: "Hell's Paradise",
    href: '#',
  },
  {
    image: '/images/welcome/the-promised-neverland.png',
    title: 'The Promised Neverland',
    href: '#',
  },
  {
    image: '/images/welcome/death-parade.png',
    title: 'Death Parade',
    href: '#',
  },
  {
    image: '/images/welcome/kimetsu-no-yaiba-entertainment-districtArc.png',
    title: 'Demon Slayer: The Entertainment District',
    href: '#',
  },
  {
    image: '/images/welcome/steins-gate.png',
    title: 'Steins;Gate',
    href: '#',
  },
  {
    image: '/images/welcome/sword-art-online.png',
    title: 'Sword Art Online',
    href: '#',
  },
  {
    image: '/images/welcome/made-in-abyss.png',
    title: 'Made in Abyss',
    href: '#',
  },
]

export const sliderIcons: IIconSlide[] = [
  {
    icon: WelcomeMoreIconView,
    text: 'View without ads',
  },
  {
    icon: WelcomeMoreIconAccess,
    text: 'Full access to the Kibutsuji library',
  },
  {
    icon: WelcomeMoreIconEpisodes,
    text: 'New episodes coming soon after release in Japan',
  },
  {
    icon: WelcomeMoreIconStore,
    text: 'Get 15% off select items at the Kibutsuji Store',
  },
  {
    icon: WelcomeMoreIconVault,
    text: 'Access to the Kibutsuji Vault',
  },
  {
    icon: WelcomeMoreIconOffers,
    text: 'Exclusive offers and early access to sales',
  },
  {
    icon: WelcomeMoreIconDevices,
    text: 'View on 6 devices simultaneously',
  },
  {
    icon: WelcomeMoreIconDownload,
    text: 'Download HD video',
  },
]
