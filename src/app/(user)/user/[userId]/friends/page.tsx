import { getServerSession } from '@/lib/get-server-session'
import type { Metadata } from 'next'
import { findUserById } from '@/server-actions/find-user-by-id'

export const metadata: Metadata = {
  title: 'friends',
}

export default async function Friends({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const userData = await findUserById(userId)
  const session = await getServerSession()

  if (!userData || !session) {
    return null
  }

  return (
    <>
      <h1 className={'sr-only'}>{userData.name}'s comments</h1>
      {userData.name}'s friends
    </>
  )
}
