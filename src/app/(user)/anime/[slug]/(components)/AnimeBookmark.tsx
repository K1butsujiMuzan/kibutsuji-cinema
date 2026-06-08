'use client'

import Select from '@/components/ui/select/Select'
import {
  type QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import {
  getAnimeBookmark,
  upsertAnimeBookmark,
} from '@/server-actions/anime-bookmark'
import { List, type UserList } from '@/generated/prisma'
import BookmarkIcon from '@/components/icons/BookmarkIcon'
import { AddIcon } from '@/components/icons/HeaderUserMenuModalIcons'
import PageChangerIcon from '@/components/icons/PageChangerIcon'
import { useMemo } from 'react'
import { useOnSuccess } from '@/hooks/useOnSuccess'

interface Props {
  animeId: string
}

export default function AnimeBookmark({ animeId }: Props) {
  const { onSuccess } = useOnSuccess()
  const queryClient = useQueryClient()
  const queryKey: QueryKey = useMemo(
    (): QueryKey => [QUERY_KEYS.ANIME_BOOKMARK, animeId],
    [animeId],
  )

  const { data, isFetching, isPending } = useQuery({
    queryFn: async () => getAnimeBookmark(animeId),
    queryKey,
  })

  const list = useMemo(() => {
    if (data && !('error' in data)) {
      return data.list
    }
    return null
  }, [data])

  const upsertMutation = useMutation({
    mutationFn: async (value: List) => upsertAnimeBookmark(value, animeId),
    onMutate: async (value) => {
      await queryClient.cancelQueries({ queryKey })
      const previousData = queryClient.getQueryData<
        UserList | null | { error: string }
      >(queryKey)
      const optimisticData: UserList =
        previousData && !('error' in previousData)
          ? { ...previousData, list: value }
          : {
              id: crypto?.randomUUID() ?? Date.now().toString(),
              animeId,
              userId: crypto?.randomUUID() ?? Date.now().toString(),
              list: value,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
      queryClient.setQueryData(queryKey, optimisticData)
      return { previousData }
    },
    onSuccess: async (data, _, context) => {
      if (data.error) {
        queryClient.setQueryData(queryKey, context.previousData)
      }
      await onSuccess(data, queryKey)
    },
  })

  const onSelect = (value: List) => {
    if (value !== list) {
      upsertMutation.mutate(value)
    }
  }

  if (data === undefined || isPending)
    return (
      <div
        className={
          'bg-pink-50 dark:bg-gray-750 rounded-md h-9 w-full flex items-center justify-end border border-pink-50 dark:border-gray-200 animate-pulse'
        }
      >
        <div
          className={
            'px-2.5 py-2.75 border-l border-pink-50 dark:border-gray-200'
          }
        >
          <PageChangerIcon className={'w-3 h-3 rotate-90'} />
        </div>
      </div>
    )

  if (data && 'error' in data) {
    return null
  }

  return (
    <Select
      label={'add anime to list'}
      disabled={isFetching || upsertMutation.isPending}
      onSelect={onSelect}
      options={[
        {
          value: List.WATCHING,
          color: 'text-orange-400',
        },
        {
          value: List.PLANNED,
          color: 'text-blue-500',
        },
        {
          value: List.ABANDONED,
          color: 'text-red-400',
        },
        {
          value: List.COMPLETED,
          color: 'text-green-400',
        },
        {
          value: List.FAVORITE,
          color: 'text-red-250',
        },
      ]}
      Icon={list === null ? <AddIcon /> : <BookmarkIcon />}
      defaultValue={list === null ? 'Add to plans' : list}
    />
  )
}
