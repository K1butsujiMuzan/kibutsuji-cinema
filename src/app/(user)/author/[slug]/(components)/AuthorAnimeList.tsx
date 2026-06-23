'use client'

import AnimeCard from '@/components/ui/anime-card/AnimeCard'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { findAnimeByAuthor } from '@/server-actions/author/find-anime-by-author'
import AnimeCardLoader from '@/components/ui/anime-card/AnimeCardLoader'
import useSearchAndPagination from '@/hooks/useSearchAndPagination'
import RefetchErrorData from '@/components/ui/refetch-error-data/RefetchErrorData'
import Search from '@/components/ui/search/Search'
import useSearch from '@/hooks/useSearch'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

interface Props {
  authorSlug: string
}

export default function AuthorAnimeList({ authorSlug }: Props) {
  const { search, clearSearch, submitSearch, onSubmit, onSearch } = useSearch()

  const {
    refetch,
    data,
    hasNextPage,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.AUTHOR_ANIME, authorSlug, submitSearch],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: { rating: number; id: string } | undefined
    }) => findAnimeByAuthor(submitSearch, authorSlug, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    retry: 3,
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && status !== 'error') {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage, status])

  return (
    <section
      className={
        'bg-white dark:bg-gray-800 rounded-lg flex flex-col gap-2 px-4 py-3 w-full'
      }
    >
      <Search
        onFormSubmit={onSubmit}
        searchValue={search}
        onChange={onSearch}
        inputId={'author-anime-list'}
        onClear={clearSearch}
        placeholder={'Search by title'}
      />
      <div
        className={
          'w-full grid xxs:grid-cols-2 sn:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2'
        }
      >
        {data &&
          data.pages.length > 0 &&
          data.pages
            .flatMap((page) => page.anime)
            .map(({ id, image, type, title, rating, slug }) => (
              <AnimeCard
                key={id}
                image={image}
                type={type}
                title={title}
                rating={rating}
                slug={slug}
              />
            ))}
      </div>
      {data && data.pages.flatMap((page) => page.anime).length === 0 && (
        <div className={'text-center text-2xl py-10'}>No anime :(</div>
      )}
      {(status === 'pending' || (isFetchingNextPage && hasNextPage)) && (
        <AnimeCardLoader />
      )}
      {status === 'error' && (
        <RefetchErrorData
          error={error.message}
          onClick={!data ? refetch : fetchNextPage}
          disabled={isFetching}
        />
      )}
      <div ref={ref}></div>
    </section>
  )
}
