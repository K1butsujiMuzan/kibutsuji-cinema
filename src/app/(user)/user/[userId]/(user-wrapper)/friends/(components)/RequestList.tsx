'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getRequestList } from '@/server-actions/friends-list'
import PeopleCard from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/PeopleCard'
import FriendsSmallButton from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/FriendsSmallButton'
import {
  AcceptFriendIcon,
  RemoveFriendIcon,
} from '@/components/icons/UserFriendsIcons'
import {
  acceptUserFriend,
  declineUserFriend,
} from '@/server-actions/user-friends'
import useOnSuccessFriend from '@/hooks/useOnSuccessFriend'
import RefetchErrorData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/RefetchErrorData'
import NoData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/NoData'
import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/(loaders)/FriendListLoader'

export default function RequestList() {
  const onSuccess = useOnSuccessFriend([QUERY_KEYS.REQUEST_LIST])

  const { data, isPending, isFetching, refetch } = useQuery({
    queryFn: getRequestList,
    queryKey: [QUERY_KEYS.REQUEST_LIST],
    staleTime: 0,
  })

  const declineMutation = useMutation({
    mutationFn: async (id: string) => declineUserFriend(id),
    onSuccess,
  })

  const acceptMutation = useMutation({
    mutationFn: async (id: string) => acceptUserFriend(id),
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
  if (data.length === 0) return <NoData text={'No requests'} />

  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
      {data.map(({ id, userFrom, createdAt }) => (
        <PeopleCard
          key={id}
          id={userFrom.id}
          image={userFrom.image}
          name={userFrom.name}
          createdAt={createdAt}
        >
          <FriendsSmallButton
            className={'text-green-400'}
            ariaLabel={'accept friend'}
            icon={<AcceptFriendIcon />}
            onClick={() => acceptMutation.mutate(userFrom.id)}
            disabled={acceptMutation.isPending || declineMutation.isPending}
          />
          <FriendsSmallButton
            className={'text-red-400'}
            ariaLabel={'decline friend'}
            icon={<RemoveFriendIcon />}
            onClick={() => declineMutation.mutate(userFrom.id)}
            disabled={acceptMutation.isPending || declineMutation.isPending}
          />
        </PeopleCard>
      ))}
    </div>
  )
}
