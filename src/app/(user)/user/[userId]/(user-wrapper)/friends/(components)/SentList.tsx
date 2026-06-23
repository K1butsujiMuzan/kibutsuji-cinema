'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getSentList } from '@/server-actions/friends-list'
import PeopleCard from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/PeopleCard'
import { RemoveFriendIcon } from '@/components/icons/UserFriendsIcons'
import { cancelUserFriend } from '@/server-actions/user-friends'
import RefetchErrorData from '@/components/ui/refetch-error-data/RefetchErrorData'
import NoData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/NoData'
import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(loaders)/FriendListLoader'
import Button from '@/components/ui/button/Button'
import PageChanger from '@/components/ui/page-changer/PageChanger'
import Search from '@/components/ui/search/Search'
import useSearchAndPagination from '@/hooks/useSearchAndPagination'
import { useOnSuccess } from '@/hooks/useOnSuccess'

export default function SentList() {
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
  } = useSearchAndPagination([QUERY_KEYS.SENT_LIST])
  const { onSuccess } = useOnSuccess()

  const { data, isPending, isFetching, refetch } = useQuery({
    queryFn: async () => getSentList(page, submitSearch),
    queryKey: QUERY_KEY,
    staleTime: 0,
  })

  const cancelSentMutation = useMutation({
    mutationFn: async (id: string) => cancelUserFriend(id),
    onSuccess: async (result) => {
      await onSuccess(result, QUERY_KEY)
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
        inputId={'sent-list'}
        onClear={clearSearch}
        placeholder={'Search by name'}
      />
      {(isPending || !data) && <FriendListLoader />}
      {data && data.data.length === 0 && <NoData text={'No sent requests'} />}
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
