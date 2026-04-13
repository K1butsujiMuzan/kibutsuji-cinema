import Image from 'next/image'
import UserSettings from '@/components/ui/user-settings/UserSettings'
import { PAGES } from '@/configs/pages.config'
import { dateTransformer } from '@/utils/date-check'
import UserFriendsControls from '@/components/ui/user-friends-controls/UserFriendsControls'

interface Props {
  userName: string
  userId: string
  userImage: string | null
  isMyProfile: boolean
  userRegistration: Date
}

export default async function UserInformation({
  userId,
  userName,
  userImage,
  isMyProfile,
  userRegistration,
}: Props) {
  return (
    <section
      className={
        'flex flex-col lg:flex-row lg:justify-between items-center gap-4 px-4 py-3'
      }
    >
      <div className={'flex flex-col lg:flex-row items-center gap-4'}>
        <div
          className={'relative w-22.5 h-22.5 lg:w-12.5 lg:h-12.5 aspect-square'}
        >
          <Image
            className={'rounded-sm object-cover'}
            src={userImage ? userImage : '/images/global/base-avatar.jpg'}
            alt={userName}
            fill={true}
            sizes={'(max-width: 1024px) 90px, 50px'}
          />
        </div>
        <div className={'flex flex-col gap-0.5 text-center lg:text-left'}>
          <span
            className={
              'font-semibold text-nowrap overflow-x-hidden text-ellipsis'
            }
          >
            {userName}
          </span>
          <span className={'text-xs'}>
            On the site since {dateTransformer(userRegistration)}
          </span>
        </div>
      </div>
      {isMyProfile && <UserSettings href={PAGES.SETTINGS(userId)} />}
      {!isMyProfile && <UserFriendsControls userId={userId} />}
    </section>
  )
}
