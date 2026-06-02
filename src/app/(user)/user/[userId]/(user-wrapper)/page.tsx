import { getServerSession } from '@/lib/get-server-session'
import { findUserById } from '@/server-actions/find-user-by-id'
import { notFound, redirect } from 'next/navigation'
import { PAGES } from '@/configs/pages.config'

export default async function User({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const userData = await findUserById(userId)
  const session = await getServerSession()

  if (!session) {
    redirect(PAGES.LOGIN)
  }

  if (!userData) {
    notFound()
  }

  return (
    <>
      <h1 className={'sr-only'}>{userData.name}'s anime</h1>
      {userData.name}'s anime
    </>
  )
}
