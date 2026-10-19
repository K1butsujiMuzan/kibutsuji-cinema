'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getPopularAnime } from '@/server-actions/welcome/get-popular-anime'
import Slider from '@/components/ui/slider/Slider'
import AnimeCard from '@/components/ui/anime-card/AnimeCard'
import AnimeCardLoader from '@/components/ui/anime-card/AnimeCardLoader'

export default function WelcomeWatchSlider() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.WELCOME_ANIME],
    queryFn: getPopularAnime,
  })

  if (!data) {
    return (
      <div
        className={
          'grid grid-cols-[12.5rem] auto-cols-[12.5rem] gap-2 grid-flow-col w-full max-w-full overflow-x-clip'
        }
      >
        {[...Array(20)].map((_, index) => (
          <AnimeCardLoader key={`anime-loader-${index}`} />
        ))}
      </div>
    )
  }

  return (
    <Slider
      className={
        'grid grid-cols-[12.5rem] auto-cols-[12.5rem] gap-2 grid-flow-col'
      }
      sliderAriaLabel={'Top anime'}
    >
      {data.map(({ id, slug, type, rating, image, title }, index) => (
        <li
          className={'snap-start'}
          key={id}
          aria-label={`${index + 1} of ${data.length}`}
        >
          <AnimeCard
            slug={slug}
            rating={rating}
            type={type}
            image={image}
            title={title}
            sizes={'200px'}
          />
        </li>
      ))}
    </Slider>
  )
}
