'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getMutualList } from '@/server-actions/friends-list'
import PeopleCard from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/PeopleCard'
import RefetchErrorData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/RefetchErrorData'
import NoData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/NoData'
import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/(loaders)/FriendListLoader'
import PageChanger from '@/components/ui/page-changer/PageChanger'
import usePagination from '@/hooks/usePagination'

interface Props {
  userId: string
}

export default function MutualList({ userId }: Props) {
  const { page, onNextPage, onPreviousPage } = usePagination()

  const { data, isPending, isFetching, refetch } = useQuery({
    queryFn: async () => getMutualList(userId, page),
    queryKey: [QUERY_KEYS.MUTUAL_LIST, userId, page],
    staleTime: 0,
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
  if (data.data.length === 0) return <NoData text={'No mutual friends'} />

  return (
    <>
      <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
        {data.data.map(({ id, image, name }) => (
          <PeopleCard key={id} id={id} image={image} name={name} />
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
