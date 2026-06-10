export const FRIENDS_PARAMS = {
  FRIENDS: 'friends',
  MUTUAL: 'mutual',
  RECEIVED: 'received',
  SENT: 'sent',
} as const

export type TFriendsType = (typeof FRIENDS_PARAMS)[keyof typeof FRIENDS_PARAMS]

type TFriends = {
  text: string
  value: TFriendsType
  type: 'profile' | 'another-user' | 'public'
}

export const FRIENDS_DATA: TFriends[] = [
  {
    text: 'Friends list',
    value: FRIENDS_PARAMS.FRIENDS,
    type: 'public',
  },
  {
    text: 'Mutual friends',
    value: FRIENDS_PARAMS.MUTUAL,
    type: 'another-user',
  },
  {
    text: 'Friend requests',
    value: FRIENDS_PARAMS.RECEIVED,
    type: 'profile',
  },
  {
    text: 'Sent requests',
    value: FRIENDS_PARAMS.SENT,
    type: 'profile',
  },
]
