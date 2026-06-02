'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getMutualList } from '@/server-actions/friends-list'
import PeopleCard from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/PeopleCard'
import RefetchErrorData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/RefetchErrorData'
import NoData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/NoData'
import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/(loaders)/FriendListLoader'
import PageChanger from '@/components/ui/page-changer/PageChanger'
import Search from '@/components/ui/search/Search'
import useFriend from '@/hooks/useFriend'

interface Props {
  userId: string
}

export default function MutualList({ userId }: Props) {
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
  } = useFriend([QUERY_KEYS.MUTUAL_LIST, userId])

  const { data, isPending, isFetching, refetch } = useQuery({
    queryFn: async () => getMutualList(userId, page, submitSearch),
    queryKey: QUERY_KEY,
    staleTime: 0,
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
        inputId={'mutual-list'}
        onClear={clearSearch}
        placeholder={'Search by name'}
      />
      {(isPending || !data) && <FriendListLoader />}
      {data && data.data.length === 0 && <NoData text={'No mutual friends'} />}
      {data && data.data.length > 0 && (
        <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
          {data.data.map(({ id, image, name }) => (
            <PeopleCard key={id} id={id} image={image} name={name} />
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
