import Image from 'next/image'
import { HERO_IMAGES_DESKTOP } from './welcome.data'

export default function WelcomeDesktopImages() {
  return (
    <div
      className={'hidden overflow-hidden xl:grid gap-6 grid-cols-2 max-h-166'}
    >
      {HERO_IMAGES_DESKTOP.map((container, index) => (
        <div key={`container-${index}`} className={container.divClassName}>
          {[...Array(2)].map((_) =>
            container.images.map((image, index) => (
              <Image
                className={'rounded-2xl mb-6'}
                key={`${image.alt}-${index}`}
                src={image.src}
                alt={image.alt}
                width={312}
                height={464}
              />
            )),
          )}
        </div>
      ))}
    </div>
  )
}
