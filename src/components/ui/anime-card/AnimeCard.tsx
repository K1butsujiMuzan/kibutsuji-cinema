import type { Anime } from '@/generated/prisma'
import CloudinaryImage from '@/components/ui/cloudinary-image/CloudinaryImage'
import Link from 'next/link'
import { PAGES } from '@/configs/pages.config'
import { ANIME_TYPE_TEXT } from '@/constants/anime-type-text'
import { cn } from '@/lib/utils'

export default function AnimeCard({
  type,
  image,
  title,
  rating,
  slug,
}: Pick<Anime, 'type' | 'image' | 'title' | 'rating' | 'slug'>) {
  return (
    <article>
      <Link
        href={PAGES.ANIME(slug)}
        className={
          'p-1.5 flex flex-col relative hover:bg-pink-100 dark:hover:bg-gray-600 sm:active:bg-pink-100 sm:dark:active:bg-gray-600 transition duration-300 rounded-md'
        }
      >
        <figure>
          <CloudinaryImage
            image={image}
            title={title}
            sizes={
              '(max-width: 300px) 100vw, (max-width: 480px) 50vw, (max-width: 800px) 33vw, (max-width: 1280px) 25vw, 16vw'
            }
            className={'w-full aspect-5/7'}
            imageClassName={'rounded-md'}
          />
          <figcaption className={'pt-2'}>
            <span className={'font-medium text-18 line-clamp-2 leading-[1.25]'}>
              {title}
            </span>
            <span
              className={
                'text-gray-650 dark:text-gray-150 leading-[1.25] block'
              }
            >
              {ANIME_TYPE_TEXT[type]}
            </span>
          </figcaption>
        </figure>
        <span
          className={cn(
            'absolute top-1.5 left-1.5 text-xs font-semibold text-white h-5 w-8 flex justify-center items-center rounded-br-md',
            {
              'bg-gray-800': rating === 0,
              'bg-red-400': rating < 4 && rating !== 0,
              'bg-orange-400': rating >= 4 && rating < 7,
              'bg-green-600': rating >= 7,
            },
          )}
        >
          {rating}
        </span>
      </Link>
    </article>
  )
}
