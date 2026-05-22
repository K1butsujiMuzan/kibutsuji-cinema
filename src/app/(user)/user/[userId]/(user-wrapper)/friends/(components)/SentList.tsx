'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getSentList } from '@/server-actions/friends-list'
import PeopleCard from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/PeopleCard'
import { RemoveFriendIcon } from '@/components/icons/UserFriendsIcons'
import { cancelUserFriend } from '@/server-actions/user-friends'
import useOnFriendSuccess from '@/hooks/useOnFriendSuccess'
import RefetchErrorData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/RefetchErrorData'
import NoData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/NoData'
import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/(loaders)/FriendListLoader'
import Button from '@/components/ui/button/Button'
import PageChanger from '@/components/ui/page-changer/PageChanger'
import usePagination from '@/hooks/usePagination'

export default function SentList() {
  const { page, onPreviousPage, onNextPage } = usePagination()
  const onSuccess = useOnFriendSuccess([QUERY_KEYS.SENT_LIST, page])

  const { data, isPending, isFetching, refetch } = useQuery({
    queryFn: async () => getSentList(page),
    queryKey: [QUERY_KEYS.SENT_LIST, page],
    staleTime: 0,
  })

  const cancelSentMutation = useMutation({
    mutationFn: async (id: string) => cancelUserFriend(id),
    onSuccess: async (result) => {
      await onSuccess(result)
      if (
        data &&
        !('error' in data) &&
        !data.hasNext &&
        data.data.length <= 1 &&
        page > 1
      ) {
        onPreviousPage()
      }
    },
  })

  if (isPending || data === undefined) return <FriendListLoader />
  if ('error' in data)
    return (
      <RefetchErrorData
        error={data.error}
        onClick={refetch}
        disabled={isFetching}
      />
    )
  if (data.data.length === 0) return <NoData text={'No sent requests'} />

  return (
    <>
      <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
        {data.data.map(({ id, name, image, createdAt }) => (
          <PeopleCard
            key={id}
            id={id}
            image={image}
            name={name}
            createdAt={createdAt}
          >
            <Button
              className={'text-red-400'}
              aria-label={'cancel friend request'}
              onClick={() => cancelSentMutation.mutate(id)}
              disabled={cancelSentMutation.isPending}
            >
              <RemoveFriendIcon />
            </Button>
          </PeopleCard>
        ))}
      </div>
      {(data.hasNext || page !== 1) && (
        <PageChanger
          page={page}
          hasNext={data.hasNext}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          isFetching={isFetching}
        />
      )}
    </>
  )
}
