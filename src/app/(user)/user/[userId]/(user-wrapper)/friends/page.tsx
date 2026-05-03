import { getServerSession } from '@/lib/get-server-session'
import type { Metadata } from 'next'
import { findUserById } from '@/server-actions/find-user-by-id'
import FriendsPanel from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/FriendsPanel'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { PAGES } from '@/configs/pages.config'
import {
  FRIENDS_PARAMS,
  friendsData,
} from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/friends.data'

export const metadata: Metadata = {
  title: 'friends',
}

interface Props {
  params: Promise<{ userId: string }>
  searchParams: Promise<{ type?: string }>
}

export default async function Friends({ params, searchParams }: Props) {
  const { userId } = await params
  const { type } = await searchParams
  const userData = await findUserById(userId)
  const session = await getServerSession()

  if (!userData || !session) {
    return null
  }

  const isExistingType = (Object.values(FRIENDS_PARAMS) as string[]).includes(
    type ?? '',
  )
  const accessType =
    friendsData.find((item) => item.value === type)?.type ?? 'public'

  if (
    !type ||
    !isExistingType ||
    (accessType === 'user' && userId === session.user.id) ||
    (accessType === 'profile' && userId !== session.user.id)
  ) {
    redirect(`${PAGES.FRIENDS(userId)}?type=${FRIENDS_PARAMS.FRIENDS}`)
  }

  return (
    <>
      <h1 className={'sr-only'}>{userData.name}'s comments</h1>
      <Suspense>
        <FriendsPanel
          userId={userId}
          isProfile={session.user.id === userId}
          sessionId={session.user.id}
        />
      </Suspense>
    </>
  )
}
