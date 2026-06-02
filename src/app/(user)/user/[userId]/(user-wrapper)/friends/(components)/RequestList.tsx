'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getRequestList } from '@/server-actions/friends-list'
import PeopleCard from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/PeopleCard'
import {
  AcceptFriendIcon,
  RemoveFriendIcon,
} from '@/components/icons/UserFriendsIcons'
import {
  acceptUserFriend,
  declineUserFriend,
} from '@/server-actions/user-friends'
import RefetchErrorData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/RefetchErrorData'
import NoData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/NoData'
import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/(loaders)/FriendListLoader'
import Button from '@/components/ui/button/Button'
import PageChanger from '@/components/ui/page-changer/PageChanger'
import Search from '@/components/ui/search/Search'
import useFriend from '@/hooks/useFriend'

export default function RequestList() {
  const {
    search,
    onSubmit,
    submitSearch,
    QUERY_KEY,
    onSearch,
    clearSearch,
    onPreviousPage,
    page,
    onNextPage,
    onSuccess,
  } = useFriend([QUERY_KEYS.REQUEST_LIST])

  const { data, isPending, isFetching, refetch } = useQuery({
    queryFn: async () => getRequestList(page, submitSearch),
    queryKey: QUERY_KEY,
    staleTime: 0,
  })

  const declineMutation = useMutation({
    mutationFn: async (id: string) => declineUserFriend(id),
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

  const acceptMutation = useMutation({
    mutationFn: async (id: string) => acceptUserFriend(id),
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

  if (data && 'error' in data)
    return (
      <RefetchErrorData
        error={data.error}
        onClick={refetch}
        disabled={isFetching}
      />
    )

  return (
    <>
      <Search
        onFormSubmit={onSubmit}
        searchValue={search}
        onChange={onSearch}
        inputId={'request-list'}
        onClear={clearSearch}
        placeholder={'Search by name'}
      />
      {(isPending || !data) && <FriendListLoader />}
      {data && data.data.length === 0 && <NoData text={'No requests'} />}
      {data && data.data.length > 0 && (
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
                className={'text-green-400'}
                aria-label={'accept friend'}
                onClick={() => acceptMutation.mutate(id)}
                disabled={acceptMutation.isPending || declineMutation.isPending}
              >
                <AcceptFriendIcon />
              </Button>
              <Button
                className={'text-red-400'}
                aria-label={'decline friend'}
                onClick={() => declineMutation.mutate(id)}
                disabled={acceptMutation.isPending || declineMutation.isPending}
              >
                <RemoveFriendIcon />
              </Button>
            </PeopleCard>
          ))}
        </div>
      )}
      {data && (data.hasNext || page !== 1) && (
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
