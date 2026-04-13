import { getServerSession } from '@/lib/get-server-session'
import { findUserById } from '@/server-actions/find-user-by-id'

export default async function User({
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
      <h1 className={'sr-only'}>{userData.name}'s profile</h1>
      {userData.name}'s profile
    </>
  )
}
