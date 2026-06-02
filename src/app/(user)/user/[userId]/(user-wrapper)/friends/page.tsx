import { getServerSession } from '@/lib/get-server-session'
import type { Metadata } from 'next'
import { findUserById } from '@/server-actions/find-user-by-id'
import FriendsPanel from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/FriendsPanel'
import { Suspense } from 'react'
import { FRIENDS_PARAMS } from '@/configs/friends.config'
import FriendsList from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/FriendsList'
import RequestList from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/RequestList'
import SentList from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/SentList'
import MutualList from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/MutualList'
import { notFound, redirect } from 'next/navigation'
import { PAGES } from '@/configs/pages.config'

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

  if (!session) {
    redirect(PAGES.LOGIN)
  }

  if (!userData) {
    notFound()
  }

  const isProfile = session.user.id === userId

  return (
    <>
      <h1 className={'sr-only'}>{userData.name}'s friends</h1>
      <section
        className={
          'py-3 px-4 rounded-lg overflow-hidden flex flex-col gap-4 bg-white dark:bg-gray-800 w-full'
        }
      >
        <Suspense>
          <FriendsPanel userId={userId} isProfile={isProfile} />
        </Suspense>
        {type === FRIENDS_PARAMS.MUTUAL && <MutualList userId={userId} />}
        {type === FRIENDS_PARAMS.FRIENDS && (
          <FriendsList userId={userId} isProfile={isProfile} />
        )}
        {type === FRIENDS_PARAMS.SENT && <SentList />}
        {type === FRIENDS_PARAMS.RECEIVED && <RequestList />}
      </section>
    </>
  )
}
