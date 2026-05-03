export const FRIENDS_PARAMS = {
  FRIENDS: 'friends',
  MUTUAL: 'mutual',
  RECEIVED: 'received',
  SENT: 'sent',
} as const

type TFriends = {
  text: string
  value: (typeof FRIENDS_PARAMS)[keyof typeof FRIENDS_PARAMS]
  type: 'profile' | 'user' | 'public'
}

export const friendsData: TFriends[] = [
  {
    text: 'Friends list',
    value: FRIENDS_PARAMS.FRIENDS,
    type: 'public',
  },
  {
    text: 'Mutual friends',
    value: FRIENDS_PARAMS.MUTUAL,
    type: 'user',
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
