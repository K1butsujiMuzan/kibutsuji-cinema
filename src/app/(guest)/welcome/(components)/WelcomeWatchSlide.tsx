import Image from 'next/image'
import {
  type IImageSlide,
  sliderImages,
} from '@/app/(guest)/welcome/(components)/welcome.data'

interface Props {
  slide: IImageSlide
  index: number
}

export default function WelcomeWatchSlide({ slide, index }: Props) {
  return (
    <li
      aria-roledescription={'slide'}
      role={'group'}
      aria-label={`${index + 1} of ${sliderImages.length}`}
      className={
        'min-w-36.25 w-[calc(50%-0.5rem)] sn:w-[calc((100%/3)-0.5rem)] sm:w-1/4 lg:w-1/6 shrink-0 snap-start px-1.25 py-1.5 sm:px-2.25'
      }
    >
      <a
        className={
          'flex w-full flex-col md:p-1.5 hover:bg-pink-100 dark:hover:bg-gray-600 sm:active:bg-pink-100 sm:dark:active:bg-gray-600 transition duration-300'
        }
        href={slide.href}
      >
        <figure>
          <Image
            className={'w-full'}
            width={180}
            height={255}
            src={slide.image}
            alt={''}
          />
          <figcaption className={'leading-4.5 text-sm pt-3 font-medium'}>
            {slide.title}
          </figcaption>
        </figure>
      </a>
    </li>
  )
}
