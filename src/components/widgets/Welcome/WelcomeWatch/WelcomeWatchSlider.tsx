'use client'

import Slider from '@/components/ui/slider/Slider'
import AnimeCard from '@/components/ui/anime-card/AnimeCard'
import AnimeCardLoader from '@/components/ui/anime-card/AnimeCardLoader'
import { useWelcomeWatchSliderQuery } from '@/hooks/queries/useWelcomeWatchSliderQuery'
import RefetchErrorData from '@/components/ui/refetch-error-data/RefetchErrorData'
import { ERRORS } from '@/shared/configs/errors.config'
import { POPULAR_ANIME_LIMIT } from '@/shared/constants/limits'

export default function WelcomeWatchSlider() {
  const {
    data: response,
    isError,
    refetch,
    isPending,
    isFetching,
  } = useWelcomeWatchSliderQuery()

  if (isPending) {
    return (
      <div
        className={
          'grid grid-cols-[12.5rem] auto-cols-[12.5rem] grid-rows-[20rem] gap-2 grid-flow-col w-full max-w-full overflow-x-clip'
        }
      >
        <span className={'sr-only'}>loading</span>
        {[...Array(POPULAR_ANIME_LIMIT)].map((_, index) => (
          <AnimeCardLoader key={`anime-loader-${index}`} />
        ))}
      </div>
    )
  }

  if (isError || !response) {
    return (
      <div className={'h-80 flex items-center'}>
        <RefetchErrorData
          error={ERRORS.INTERNAL_ERROR}
          onClick={refetch}
          disabled={isFetching}
        />
      </div>
    )
  }

  if (!response.success) {
    return (
      <div className={'h-80 flex items-center'}>
        <RefetchErrorData
          error={response.error.message}
          onClick={refetch}
          disabled={isFetching}
        />
      </div>
    )
  }

  const data = response.data

  if (data.length === 0) {
    return (
      <div className={'text-xl h-80 flex items-center text-center'}>
        Nothing found
      </div>
    )
  }

  return (
    <Slider
      className={
        'grid grid-cols-[12.5rem] auto-cols-[12.5rem] grid-rows-[20rem] gap-2 grid-flow-col'
      }
      sliderAriaLabel={'Top anime'}
    >
      {data.map(({ id, slug, type, rating, image, title }, index) => (
        <li
          className={'snap-start snap-always'}
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
