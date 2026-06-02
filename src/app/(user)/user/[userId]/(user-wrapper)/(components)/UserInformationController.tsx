import { getServerSession } from '@/lib/get-server-session'
import UserSettings from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserSettings'
import UserFriendsWrapper from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserFriendsWrapper'
import { notFound, redirect } from 'next/navigation'
import { PAGES } from '@/configs/pages.config'

interface Props {
  userId: string
}

export default async function UserInformationController({ userId }: Props) {
  const session = await getServerSession()

  if (!session) {
    redirect(PAGES.LOGIN)
  }

  const isProfile = userId === session.user.id

  if (isProfile) {
    return <UserSettings userId={userId} />
  }

  if (!isProfile) {
    return <UserFriendsWrapper userId={userId} />
  }
}
