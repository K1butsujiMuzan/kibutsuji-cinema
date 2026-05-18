'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getSentList } from '@/server-actions/friends-list'
import PeopleCard from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/PeopleCard'
import { RemoveFriendIcon } from '@/components/icons/UserFriendsIcons'
import FriendsSmallButton from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/FriendsSmallButton'
import { cancelUserFriend } from '@/server-actions/user-friends'
import useOnSuccessFriend from '@/hooks/useOnSuccessFriend'
import RefetchErrorData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/RefetchErrorData'
import NoData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/NoData'
import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/(loaders)/FriendListLoader'

export default function SentList() {
  const onSuccess = useOnSuccessFriend([QUERY_KEYS.SENT_LIST])

  const { data, isPending, isFetching, refetch } = useQuery({
    queryFn: getSentList,
    queryKey: [QUERY_KEYS.SENT_LIST],
    staleTime: 0,
  })

  const cancelSentMutation = useMutation({
    mutationFn: async (id: string) => cancelUserFriend(id),
    onSuccess,
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
  if (data.length === 0) return <NoData text={'No sent requests'} />

  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
      {data.map(({ id, userTo, createdAt }) => (
        <PeopleCard
          key={id}
          id={userTo.id}
          image={userTo.image}
          name={userTo.name}
          createdAt={createdAt}
        >
          <FriendsSmallButton
            className={'text-red-400'}
            ariaLabel={'cancel friend request'}
            icon={<RemoveFriendIcon />}
            onClick={() => cancelSentMutation.mutate(userTo.id)}
            disabled={cancelSentMutation.isPending}
          />
        </PeopleCard>
      ))}
    </div>
  )
}
