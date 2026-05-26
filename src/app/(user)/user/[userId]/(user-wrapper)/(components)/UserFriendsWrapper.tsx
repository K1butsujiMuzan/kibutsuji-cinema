'use client'

import dynamic from 'next/dynamic'

interface Props {
  userId: string
}

const DynamicUserFriendsControls = dynamic(
  () =>
    import('@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserFriendsControls'),
  { ssr: false },
)

export default function UserFriendsWrapper({ userId }: Props) {
  return <DynamicUserFriendsControls userId={userId} />
}
