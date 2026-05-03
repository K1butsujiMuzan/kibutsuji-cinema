import { getServerSession } from '@/lib/get-server-session'
import UserSettings from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserSettings'
import UserFriendsControls from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserFriendsControls'

interface Props {
  userId: string
}

export default async function UserInformationController({ userId }: Props) {
  const session = await getServerSession()

  if (!session) {
    return null
  }

  if (userId === session.user.id) {
    return <UserSettings userId={userId} />
  }

  if (userId !== session.user.id) {
    return <UserFriendsControls userId={userId} />
  }
}
