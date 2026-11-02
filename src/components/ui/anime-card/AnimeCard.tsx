import type { Anime } from '@/generated/prisma'
import Link from 'next/link'
import { PAGES } from '@/shared/configs/pages.config'
import { ANIME_TYPE_TEXT } from '@/shared/constants/anime-type-text'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = {
  sizes: string
} & Pick<Anime, 'type' | 'image' | 'title' | 'rating' | 'slug'>

export default function AnimeCard({
  type,
  image,
  title,
  rating,
  slug,
  sizes,
}: Props) {
  return (
    <article className={'h-full'}>
      <Link
        href={PAGES.ANIME(slug)}
        className={
          'h-full p-1.5 rounded-md flex flex-col relative hover:bg-base-second-bg active:bg-base-second-bg transition duration-300'
        }
      >
        <div className={'flex flex-col gap-2 h-full'}>
          <div className={'rounded-md relative w-full flex-1 overflow-hidden'}>
            <Image
              src={image ?? '/images/global/base-avatar.jpg'}
              alt={title}
              fill={true}
              sizes={sizes}
              className={'object-cover'}
            />
          </div>
          <div className={'flex flex-col'}>
            <span className={'font-medium text-18 truncate'}>{title}</span>
            <span className={'text-base-text/80 text-sm'}>
              {ANIME_TYPE_TEXT[type]}
            </span>
          </div>
        </div>
        <span
          className={cn(
            'absolute top-1.5 left-1.5 text-xs font-semibold text-light h-5 w-8 flex justify-center items-center rounded-br-md',
            {
              'bg-dark-gray': rating === 0,
              'bg-red': rating < 4 && rating !== 0,
              'bg-orange': rating >= 4 && rating < 7,
              'bg-green': rating >= 7,
            },
          )}
        >
          {rating}
        </span>
      </Link>
    </article>
  )
}
