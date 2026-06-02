'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getFriendList } from '@/server-actions/friends-list'
import PeopleCard from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/PeopleCard'
import { RemoveFriendIcon } from '@/components/icons/UserFriendsIcons'
import { unfriendUserFriend } from '@/server-actions/user-friends'
import RefetchErrorData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/RefetchErrorData'
import NoData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/NoData'
import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/(loaders)/FriendListLoader'
import PageChanger from '@/components/ui/page-changer/PageChanger'
import Button from '@/components/ui/button/Button'
import Search from '@/components/ui/search/Search'
import useFriend from '@/hooks/useFriend'

interface Props {
  userId: string
  isProfile: boolean
}

export default function FriendsList({ userId, isProfile }: Props) {
  const {
    search,
    QUERY_KEY,
    submitSearch,
    onSearch,
    clearSearch,
    onPreviousPage,
    page,
    onSubmit,
    onNextPage,
    onSuccess,
  } = useFriend([QUERY_KEYS.FRIEND_LIST, userId])

  const { data, isPending, isFetching, refetch } = useQuery({
    queryFn: async () => getFriendList(userId, page, submitSearch),
    queryKey: QUERY_KEY,
    staleTime: 0,
  })

  const unfriendMutation = useMutation({
    mutationFn: async (id: string) => unfriendUserFriend(id),
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
        inputId={'friend-list'}
        onClear={clearSearch}
        placeholder={'Search by name'}
      />
      {(isPending || !data) && <FriendListLoader />}
      {data && data.data.length === 0 && <NoData text={'No friends'} />}
      {data && data.data.length > 0 && (
        <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
          {data.data.map(({ id, name, image, createdAt }) => {
            return (
              <PeopleCard
                key={id}
                id={id}
                image={image}
                name={name}
                createdAt={createdAt}
              >
                {isProfile && (
                  <Button
                    className={'text-red-400'}
                    aria-label={'delete friend'}
                    onClick={() => unfriendMutation.mutate(id)}
                    disabled={unfriendMutation.isPending}
                  >
                    <RemoveFriendIcon />
                  </Button>
                )}
              </PeopleCard>
            )
          })}
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
