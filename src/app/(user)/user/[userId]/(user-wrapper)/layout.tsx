import { findUserById } from '@/server-actions/find-user-by-id'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import UserWrapperLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserWrapperLoader'
import Line from '@/components/ui/line/Line'
import UserLinks from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserLinks'
import UserInformation from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserInformation'
import UserInformationController from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserInformationController'
import UserFriendLoading from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserFriendLoading'

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
          <section
            className={
              'flex flex-col lg:flex-row lg:justify-between items-center gap-2 lg:gap-4 px-4 py-3'
            }
          >
            <Suspense fallback={<UserWrapperLoader />}>
              <UserInformation userId={userId} />
            </Suspense>
            <Suspense fallback={<UserFriendLoading />}>
              <UserInformationController userId={userId} />
            </Suspense>
          </section>
          <Line />
          <UserLinks userId={userId} />
        </div>
        {children}
      </div>
    </main>
  )
}
