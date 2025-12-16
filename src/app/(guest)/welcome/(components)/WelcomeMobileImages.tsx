import Image from 'next/image'
import { HERO_IMAGES_MOBILE } from './welcome.data'

export default function WelcomeMobileImages() {
  return (
    <div className={'flex xl:hidden overflow-hidden'}>
      <div
        className={
          'flex hover:[animation-play-state:paused] animate-hero-slider-mobile shrink-0 h-[30dvw] min-h-50'
        }
      >
        {[...Array(2)].map((_) =>
          HERO_IMAGES_MOBILE.map((image, index) => (
            <Image
              key={`${image.alt}-${index}`}
              className={'rounded-2xl object-contain w-auto mr-3'}
              src={image.src}
              alt={image.alt}
              width={312}
              height={464}
            />
          )),
        )}
      </div>
    </div>
  )
}
