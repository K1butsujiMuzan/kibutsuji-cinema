import type { StaticImageData } from 'next/image'
import dandadan from '../../../../../public/images/welcome/dandadan.png'
import demonslayer from '../../../../../public/images/welcome/demonslayer.png'
import jujutsukaisen from '../../../../../public/images/welcome/jujutsukaisen.png'
import kusuria from '../../../../../public/images/welcome/kusuria.png'
import michael from '../../../../../public/images/welcome/michael.png'
import neverland from '../../../../../public/images/welcome/neverland.png'
import oshinoko from '../../../../../public/images/welcome/oshinoko.png'
import wednesday from '../../../../../public/images/welcome/wednesday.png'

import watchEverywhere from '../../../../../public/images/welcome/watchEverywhere.png'
import downloadAndWatch from '../../../../../public/images/welcome/downloadAndWatch.png'
import accountForKids from '../../../../../public/images/welcome/accountForKids.png'
import onlineCinemaTV from '../../../../../public/images/welcome/onlineCinemaTV.png'
import familyAccount from '../../../../../public/images/welcome/familyAccount.png'
import tanjiro from '../../../../../public/images/welcome/tanjiro.png'

interface IImage {
  src: StaticImageData
  alt: string
}

interface ISlide {
  divClassName: string
  images: IImage[]
}

interface IContainer {
  title: string
  paragraph: string
  isLeft: boolean
  image: StaticImageData
  width: number
  height: number
}

export const HERO_IMAGES_MOBILE: IImage[] = [
  {
    src: dandadan,
    alt: 'dandadan',
  },
  {
    src: michael,
    alt: 'michael',
  },
  {
    src: demonslayer,
    alt: 'demonslayer',
  },
  {
    src: wednesday,
    alt: 'wednesday',
  },
  {
    src: kusuria,
    alt: 'kusuria',
  },
  {
    src: oshinoko,
    alt: 'oshinoko',
  },
  {
    src: jujutsukaisen,
    alt: 'jujutsukaisen',
  },
  {
    src: neverland,
    alt: 'neverland',
  },
]

export const HERO_IMAGES_DESKTOP: ISlide[] = [
  {
    divClassName:
      'flex flex-col animate-hero-slider hover:[animation-play-state:paused]',
    images: [
      {
        src: dandadan,
        alt: 'dandadan',
      },
      {
        src: michael,
        alt: 'michael',
      },
      {
        src: demonslayer,
        alt: 'demonslayer',
      },
      {
        src: wednesday,
        alt: 'wednesday',
      },
    ],
  },
  {
    divClassName:
      'flex flex-col animate-hero-slider-reverse hover:[animation-play-state:paused]',
    images: [
      {
        src: kusuria,
        alt: 'kusuria',
      },
      {
        src: oshinoko,
        alt: 'oshinoko',
      },
      {
        src: jujutsukaisen,
        alt: 'jujutsukaisen',
      },
      {
        src: neverland,
        alt: 'neverland',
      },
    ],
  },
]

export const welcomeContainer: IContainer[] = [
  {
    title: 'Watch everywhere',
    paragraph:
      'Play movies and series on all your devices: laptop, tablet, phone',
    isLeft: true,
    image: watchEverywhere,
    width: 858,
    height: 642,
  },
  {
    title: 'Download and watch offline',
    paragraph: 'Available with a subscription',
    isLeft: false,
    image: downloadAndWatch,
    width: 546,
    height: 410,
  },
  {
    title: 'Account for kids',
    paragraph: 'Content restriction for children. Player blocking function',
    isLeft: true,
    image: accountForKids,
    width: 688,
    height: 581,
  },
  {
    title: 'Online cinema on TV',
    paragraph: 'Watch on Smart TV, Playstation, Apple TV, and more',
    isLeft: false,
    image: onlineCinemaTV,
    width: 748,
    height: 569,
  },
  {
    title: 'Family account',
    paragraph: 'Connect up to 3 accounts in one subscription',
    isLeft: true,
    image: familyAccount,
    width: 760,
    height: 383,
  },
  {
    title: 'Please do not disturb',
    paragraph: 'Missing commercials while watching',
    isLeft: false,
    image: tanjiro,
    width: 700,
    height: 496,
  },
]
