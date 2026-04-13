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
import UserFriendButton from '@/components/ui/user-friends-controls/UserFriendButton'
import {
  AcceptFriendIcon,
  AddFriendIcon,
  BlockUserIcon,
  RemoveFriendIcon,
  UnblockUserIcon,
} from '@/components/icons/UserFriendsIcons'
import { $Enums } from '@/generated/prisma'
import FriendListStatus = $Enums.FriendListStatus

interface Props {
  userId: string
}

export default function UserFriendsControls({ userId }: Props) {
  const { data, isPending } = useQuery({
    queryFn: async () => getUserFriend(userId),
    queryKey: [QUERY_KEYS.FRIENDS, userId],
  })

  const queryClient = useQueryClient()

  const addUserMutation = useMutation({
    mutationFn: async () => addUserFriend(userId),
    onSuccess: async (data) => {
      if ('error' in data) {
        return console.log(data.error)
      }
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FRIENDS, userId],
      })
    },
  })

  const cancelUserMutation = useMutation({
    mutationFn: async () => cancelUserFriend(userId),
    onSuccess: async (data) => {
      if ('error' in data) {
        return console.log(data.error)
      }
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FRIENDS, userId],
      })
    },
  })

  const unblockUserMutation = useMutation({
    mutationFn: async () => unblockUser(userId),
    onSuccess: async (data) => {
      if ('error' in data) {
        return console.log(data.error)
      }
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FRIENDS, userId],
      })
    },
  })

  const blockUserMutation = useMutation({
    mutationFn: async () => blockUser(userId),
    onSuccess: async (data) => {
      if ('error' in data) {
        return console.log(data.error)
      }
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FRIENDS, userId],
      })
    },
  })

  const acceptUserMutation = useMutation({
    mutationFn: async () => acceptUserFriend(userId),
    onSuccess: async (data) => {
      if ('error' in data) {
        return console.log(data.error)
      }
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FRIENDS, userId],
      })
    },
  })

  const declineUserMutation = useMutation({
    mutationFn: async () => declineUserFriend(userId),
    onSuccess: async (data) => {
      if ('error' in data) {
        return console.log(data.error)
      }
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FRIENDS, userId],
      })
    },
  })

  const unfriendUserMutation = useMutation({
    mutationFn: async () => unfriendUserFriend(userId),
    onSuccess: async (data) => {
      if ('error' in data) {
        return console.log(data.error)
      }
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FRIENDS, userId],
      })
    },
  })

  if (isPending) {
    return (
      <UserFriendButton disabled={true} text={'Block user'} onClick={() => {}}>
        <BlockUserIcon />
      </UserFriendButton>
    )
  }

  return (
    <div className={'flex flex-col sm:flex-row gap-4'}>
      {!data && (
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
      {data && data.status === FriendListStatus.PENDING && (
        <>
          {data.userToId === userId && (
            <UserFriendButton
              disabled={cancelUserMutation.isPending}
              text={'Cancel request'}
              onClick={() => cancelUserMutation.mutate()}
            >
              <RemoveFriendIcon />
            </UserFriendButton>
          )}
          {data.userFromId === userId && (
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
      {data && data.status === FriendListStatus.FRIEND && (
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
      {data &&
        data.status === FriendListStatus.BLOCKED &&
        data.userToId === userId && (
          <UserFriendButton
            disabled={unblockUserMutation.isPending}
            text={'Unblock user'}
            onClick={() => unblockUserMutation.mutate()}
          >
            <UnblockUserIcon />
          </UserFriendButton>
        )}
      {data &&
        data.status === FriendListStatus.BLOCKED &&
        data.userFromId === userId && (
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
