'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import {
  acceptUserFriend,
  addUserFriend,
  blockUser,
  cancelUserFriend,
  declineUserFriend,
  getUserFriend,
  unblockUser,
  unfriendUserFriend,
} from '@/server-actions/user-friends'
import UserFriendButton from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserFriendButton'
import {
  AcceptFriendIcon,
  AddFriendIcon,
  BlockUserIcon,
  RemoveFriendIcon,
  UnblockUserIcon,
} from '@/components/icons/UserFriendsIcons'
import { $Enums } from '@/generated/prisma'
import FriendListStatus = $Enums.FriendListStatus
import { useMemo } from 'react'
import { useAddToast } from '@/stores/useToastsStore'
import UserFriendLoading from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserFriendLoading'

interface Props {
  userId: string
}

type TStatus = 'none' | 'pending' | 'friend' | 'blocked' | 'both-blocked'

export default function UserFriendsControls({ userId }: Props) {
  const addToast = useAddToast()

  const { data, isPending } = useQuery({
    queryFn: async () => getUserFriend(userId),
    queryKey: [QUERY_KEYS.FRIENDS, userId],
  })

  const queryClient = useQueryClient()

  const onSuccess = async (data: { error: string | null }) => {
    if (data.error) {
      return addToast({ title: data.error, message: '', isSuccess: false })
    }
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.FRIENDS, userId],
    })
  }

  const addUserMutation = useMutation({
    mutationFn: async () => addUserFriend(userId),
    onSuccess: onSuccess,
  })

  const cancelUserMutation = useMutation({
    mutationFn: async () => cancelUserFriend(userId),
    onSuccess: onSuccess,
  })

  const unblockUserMutation = useMutation({
    mutationFn: async () => unblockUser(userId),
    onSuccess: onSuccess,
  })

  const blockUserMutation = useMutation({
    mutationFn: async () => blockUser(userId),
    onSuccess: onSuccess,
  })

  const acceptUserMutation = useMutation({
    mutationFn: async () => acceptUserFriend(userId),
    onSuccess: onSuccess,
  })

  const declineUserMutation = useMutation({
    mutationFn: async () => declineUserFriend(userId),
    onSuccess: onSuccess,
  })

  const unfriendUserMutation = useMutation({
    mutationFn: async () => unfriendUserFriend(userId),
    onSuccess: onSuccess,
  })

  const dataStatus: TStatus = useMemo(() => {
    if (!data || data.length === 0) {
      return 'none'
    }

    if (data.find(({ status }) => status === FriendListStatus.BLOCKED)) {
      if (
        data.every(({ status }) => status === FriendListStatus.BLOCKED) &&
        data.length === 2
      ) {
        return 'both-blocked'
      }
      return 'blocked'
    }

    if (data.find(({ status }) => status === FriendListStatus.FRIEND)) {
      return 'friend'
    }

    return 'pending'
  }, [data])

  if (isPending || data === undefined) {
    return <UserFriendLoading />
  }

  return (
    <div
      className={
        'grid grid-flow-col auto-cols-fr w-full sm:flex sm:flex-row gap-2 sm:gap-4 sm:w-auto'
      }
    >
      {dataStatus === 'none' && (
        <>
          <UserFriendButton
            disabled={addUserMutation.isPending}
            text={'Add as friend'}
            onClick={() => addUserMutation.mutate()}
          >
            <AddFriendIcon />
          </UserFriendButton>
          <UserFriendButton
            disabled={blockUserMutation.isPending}
            text={'Block user'}
            onClick={() => blockUserMutation.mutate()}
          >
            <BlockUserIcon />
          </UserFriendButton>
        </>
      )}
      {dataStatus === 'friend' && (
        <>
          <UserFriendButton
            disabled={unfriendUserMutation.isPending}
            text={'Unfriend'}
            onClick={() => unfriendUserMutation.mutate()}
          >
            <RemoveFriendIcon />
          </UserFriendButton>
          <UserFriendButton
            disabled={blockUserMutation.isPending}
            text={'Block user'}
            onClick={() => blockUserMutation.mutate()}
          >
            <BlockUserIcon />
          </UserFriendButton>
        </>
      )}
      {dataStatus === 'pending' && (
        <>
          {data[0].userToId === userId && (
            <UserFriendButton
              disabled={cancelUserMutation.isPending}
              text={'Cancel request'}
              onClick={() => cancelUserMutation.mutate()}
            >
              <RemoveFriendIcon />
            </UserFriendButton>
          )}
          {data[0].userFromId === userId && (
            <>
              <UserFriendButton
                disabled={acceptUserMutation.isPending}
                text={'Accept a friend request'}
                onClick={() => acceptUserMutation.mutate()}
              >
                <AcceptFriendIcon />
              </UserFriendButton>
              <UserFriendButton
                disabled={declineUserMutation.isPending}
                text={'Decline a friend request'}
                onClick={() => declineUserMutation.mutate()}
              >
                <RemoveFriendIcon />
              </UserFriendButton>
            </>
          )}
          <UserFriendButton
            disabled={blockUserMutation.isPending}
            text={'Block user'}
            onClick={() => blockUserMutation.mutate()}
          >
            <BlockUserIcon />
          </UserFriendButton>
        </>
      )}
      {dataStatus === 'both-blocked' && (
        <UserFriendButton
          disabled={unblockUserMutation.isPending}
          text={'Unblock user'}
          onClick={() => unblockUserMutation.mutate()}
        >
          <UnblockUserIcon />
        </UserFriendButton>
      )}
      {dataStatus === 'blocked' && data[0].userToId === userId && (
        <UserFriendButton
          disabled={unblockUserMutation.isPending}
          text={'Unblock user'}
          onClick={() => unblockUserMutation.mutate()}
        >
          <UnblockUserIcon />
        </UserFriendButton>
      )}

      {dataStatus === 'blocked' && data[0].userFromId === userId && (
        <UserFriendButton
          disabled={blockUserMutation.isPending}
          text={'Block user'}
          onClick={() => blockUserMutation.mutate()}
        >
          <BlockUserIcon />
        </UserFriendButton>
      )}
    </div>
  )
}
