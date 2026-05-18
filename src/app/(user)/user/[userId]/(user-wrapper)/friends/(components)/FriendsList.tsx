'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getFriendList } from '@/server-actions/friends-list'
import PeopleCard from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/PeopleCard'
import FriendsSmallButton from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/FriendsSmallButton'
import { RemoveFriendIcon } from '@/components/icons/UserFriendsIcons'
import { unfriendUserFriend } from '@/server-actions/user-friends'
import useOnSuccessFriend from '@/hooks/useOnSuccessFriend'
import RefetchErrorData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/RefetchErrorData'
import NoData from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/NoData'
import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/(loaders)/FriendListLoader'

interface Props {
  userId: string
  isProfile: boolean
}

export default function FriendsList({ userId, isProfile }: Props) {
  const onSuccess = useOnSuccessFriend([QUERY_KEYS.FRIEND_LIST, userId])

  const { data, isPending, isFetching, refetch } = useQuery({
    queryFn: async () => getFriendList(userId),
    queryKey: [QUERY_KEYS.FRIEND_LIST, userId],
    staleTime: 0,
  })

  const unfriendMutation = useMutation({
    mutationFn: async (id: string) => unfriendUserFriend(id),
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
  if (data.length === 0) return <NoData text={'No friends'} />

  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
      {data.map(({ id, userTo, userFrom, updatedAt }) => {
        const isUserFrom = userFrom.id === userId
        const currentId = isUserFrom ? userTo.id : userFrom.id
        return (
          <PeopleCard
            key={id}
            id={currentId}
            image={isUserFrom ? userTo.image : userFrom.image}
            name={isUserFrom ? userTo.name : userFrom.name}
            createdAt={updatedAt}
          >
            {isProfile && (
              <FriendsSmallButton
                className={'text-red-400'}
                ariaLabel={'delete friend'}
                icon={<RemoveFriendIcon />}
                onClick={() => unfriendMutation.mutate(currentId)}
                disabled={unfriendMutation.isPending}
              />
            )}
          </PeopleCard>
        )
      })}
    </div>
  )
}
