'use client'

import Button from '@/components/ui/button/Button'
import {
  SubscribeIcon,
  UnsubscribeIcon,
} from '@/components/icons/SubscribeIcons'
import {
  type QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import {
  authorSubscriptionAction,
  getAuthorSubscription,
} from '@/server-actions/author/author-subscription'
import Loader from '@/components/ui/loader/Loader'
import { useMemo } from 'react'
import { useAddToast } from '@/stores/useToastsStore'

interface Props {
  authorSlug: string
}

export default function AuthorSubscribeButton({ authorSlug }: Props) {
  const queryKey: QueryKey = useMemo(
    (): QueryKey => [QUERY_KEYS.AUTHOR_SUBSCRIPTION, authorSlug],
    [authorSlug],
  )
  const subscribersQueryKey: QueryKey = useMemo(
    (): QueryKey => [QUERY_KEYS.AUTHOR_SUBSCRIBERS, authorSlug],
    [authorSlug],
  )

  const { data, isFetching } = useQuery({
    queryFn: async () => getAuthorSubscription(authorSlug),
    queryKey,
  })

  const queryClient = useQueryClient()
  const addToast = useAddToast()

  const subscriptionMutation = useMutation({
    mutationFn: async (isSubscribe: boolean) =>
      authorSubscriptionAction(authorSlug, isSubscribe),
    onMutate: async (
      data,
    ): Promise<{ subscription: boolean; subscribers?: number }> => {
      await queryClient.cancelQueries({ queryKey })
      await queryClient.cancelQueries({ queryKey: subscribersQueryKey })
      const previousSubscribers =
        queryClient.getQueryData<number>(subscribersQueryKey)
      queryClient.setQueryData(queryKey, data)
      if (typeof previousSubscribers !== 'number') {
        return { subscription: !data }
      }
      const optimisticSubscribers = data
        ? previousSubscribers + 1
        : previousSubscribers === 0
          ? 0
          : previousSubscribers - 1
      queryClient.setQueryData(subscribersQueryKey, optimisticSubscribers)
      return { subscription: !data, subscribers: previousSubscribers }
    },
    onSuccess: async (data, _, context) => {
      if (data.error) {
        queryClient.setQueryData(queryKey, context.subscription)
        if ('subscribers' in context) {
          queryClient.setQueryData(subscribersQueryKey, context.subscribers)
        }
        return addToast({
          title: data.error,
          isSuccess: false,
          message: '',
        })
      }
      await queryClient.invalidateQueries({ queryKey: queryKey })
      await queryClient.invalidateQueries({ queryKey: subscribersQueryKey })
    },
  })

  if (typeof data === 'undefined') {
    return (
      <div
        className={
          'bg-pink-50 dark:bg-gray-750 w-30 h-9 rounded-md animate-pulse'
        }
      />
    )
  }

  return (
    <Button
      onClick={() => subscriptionMutation.mutate(!data)}
      className={'px-3 py-1.5'}
      disabled={isFetching || subscriptionMutation.isPending}
    >
      <span>{data ? 'Unsubscribe' : 'Subscribe'}</span>
      {isFetching || subscriptionMutation.isPending ? (
        <Loader className={'w-4 h-4'} />
      ) : data ? (
        <UnsubscribeIcon />
      ) : (
        <SubscribeIcon />
      )}
    </Button>
  )
}
