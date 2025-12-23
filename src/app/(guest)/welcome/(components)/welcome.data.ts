import type {StaticImageData} from "next/image";
import soloLeveling from '../../../../../public/images/welcome/soloLeveling.png'
import theApothecaryDiaries from '../../../../../public/images/welcome/theApothecaryDiaries.png'
import jujutsuKaisen from '../../../../../public/images/welcome/jujutsuKaisen.png'
import chainsawMan from '../../../../../public/images/welcome/chainsawMan.png'
import kimetsuNoYaiba from '../../../../../public/images/welcome/kimetsuNoYaiba.png'
import oshiNoKo from '../../../../../public/images/welcome/oshiNoKo.png'
import frieren from '../../../../../public/images/welcome/frieren.png'
import naruto from '../../../../../public/images/welcome/naruto.png'
import onePunchMan from '../../../../../public/images/welcome/onePunchMan.png'
import thePromisedNeverland from '../../../../../public/images/welcome/thePromisedNeverland.png'
import hellsParadise from '../../../../../public/images/welcome/hellsParadise.png'
import parasyte from '../../../../../public/images/welcome/parasyte.png'
import kaijuNo8 from '../../../../../public/images/welcome/kaijuNo8.png'
import violetEvergarden from '../../../../../public/images/welcome/violetEvergarden.png'
import deathParade from '../../../../../public/images/welcome/deathParade.png'
import madeInAbyss from '../../../../../public/images/welcome/madeInAbyss.png'
import steinGate from '../../../../../public/images/welcome/steinGate.png'
import kimetsuNoYaibaEntertainmentDistrictArc from '../../../../../public/images/welcome/kimetsuNoYaibaEntertainmentDistrictArc.png'
import mashle from '../../../../../public/images/welcome/mashle.png'
import swordArtOnline from '../../../../../public/images/welcome/swordArtOnline.png'

export interface ISlide {
  image: StaticImageData
  title: string
  href: string
}

export const sliderImages: ISlide[] = [
  {
    image: soloLeveling,
    title: 'Solo Leveling',
    href: '#'
  },
  {
    image: chainsawMan,
    title: 'Chainsaw Man',
    href: '#'
  },
  {
    image: kimetsuNoYaiba,
    title: 'Demon Slayer',
    href: '#'
  },
  {
    image: jujutsuKaisen,
    title: 'Magic Battle',
    href: '#'
  },
  {
    image: theApothecaryDiaries,
    title: 'The Apothecary Diaries',
    href: '#'
  },
  {
    image: naruto,
    title: 'Naruto',
    href: '#'
  },
  {
    image: onePunchMan,
    title: 'One Punch Man',
    href: '#'
  },
  {
    image: oshiNoKo,
    title: 'Star Child',
    href: '#'
  },
  {
    image: mashle,
    title: 'Mashle: Magic and Muscles',
    href: '#'
  },
  {
    image: violetEvergarden,
    title: 'Violet Evergarden',
    href: '#'
  },
  {
    image: parasyte,
    title: 'Parasyte: The Maxim',
    href: '#'
  },
  {
    image: kaijuNo8,
    title: 'Kaiju No. 8',
    href: '#'
  },
  {
    image: frieren,
    title: 'Frieren: Beyond Journey\'s End',
    href: '#'
  },
  {
    image: hellsParadise,
    title: 'Hell\'s Paradise',
    href: '#'
  },
  {
    image: thePromisedNeverland,
    title: 'The Promised Neverland',
    href: '#'
  },
  {
    image: deathParade,
    title: 'Death Parade',
    href: '#'
  },
  {
    image: kimetsuNoYaibaEntertainmentDistrictArc,
    title: 'Demon Slayer: The Entertainment District',
    href: '#'
  },
  {
    image: steinGate,
    title: 'Steins;Gate',
    href: '#'
  },
  {
    image: swordArtOnline,
    title: 'Sword Art Online',
    href: '#'
  },
  {
    image: madeInAbyss,
    title: 'Made in Abyss',
    href: '#'
  },
]