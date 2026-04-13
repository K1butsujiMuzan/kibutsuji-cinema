import UserInformation from '@/components/ui/user-information/UserInformation'
import UserLinks from '@/components/ui/user-links/UserLinks'
import { getServerSession } from '@/lib/get-server-session'
import NotFoundPage from '@/components/ui/not-found-page/NotFoundPage'
import Line from '@/components/ui/line/Line'
import { findUserById } from '@/server-actions/find-user-by-id'
import type { Metadata } from 'next'

interface Props {
  children: React.ReactNode
  params: Promise<{ userId: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>
}): Promise<Metadata> {
  const { userId } = await params
  const userData = await findUserById(userId)

  if (!userData) {
    return {
      title: {
        template: 'User not found - Kibutsuji',
        default: 'User not found',
      },
    }
  }

  return {
    title: {
      template: `${userData.name}'s %s - Kibutsuji`,
      default: `${userData.name}'s profile`,
    },
  }
}

export default async function UserLayout({ children, params }: Props) {
  const { userId } = await params
  const userData = await findUserById(userId)
  const session = await getServerSession()

  if (!userData || !session) {
    return <NotFoundPage text={'User not found'} />
  }

  return (
    <main className={'p-4'}>
      <div
        className={
          'max-w-370 mx-auto flex flex-col justify-center items-center gap-4'
        }
      >
        <div
          className={
            'rounded-lg overflow-hidden flex flex-col bg-white dark:bg-gray-800 w-full'
          }
        >
          <UserInformation
            userId={userData.id}
            userName={userData.name}
            userImage={userData.image}
            isMyProfile={userData.id === session.user.id}
            userRegistration={userData.createdAt}
          />
          <Line />
          <UserLinks userId={userData.id} />
        </div>
        {children}
      </div>
    </main>
  )
}
