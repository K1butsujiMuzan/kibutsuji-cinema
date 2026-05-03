import Image from 'next/image'
import { dateTransformer } from '@/utils/date-check'
import { findUserById } from '@/server-actions/find-user-by-id'
import NotFoundPage from '@/components/ui/not-found-page/NotFoundPage'

interface Props {
  userId: string
}

export default async function UserInformation({ userId }: Props) {
  const userData = await findUserById(userId)

  if (!userData) {
    return <NotFoundPage text={'User not found'} />
  }

  const { image, name, createdAt } = userData

  return (
    <div
      className={
        'w-full flex flex-col lg:flex-row items-center gap-2 lg:gap-4 min-w-0'
      }
    >
      <div
        className={'relative w-22.5 h-22.5 lg:w-12.5 lg:h-12.5 aspect-square'}
      >
        <Image
          className={'rounded-sm object-cover'}
          src={image ? image : '/images/global/base-avatar.jpg'}
          alt={name}
          fill={true}
          sizes={'(max-width: 1024px) 90px, 50px'}
        />
      </div>
      <div
        className={
          'overflow-x-hidden flex flex-col gap-0.5 text-center lg:text-left min-w-0 max-w-full'
        }
      >
        <span
          className={
            'font-semibold text-nowrap overflow-x-hidden text-ellipsis'
          }
        >
          {name}
        </span>
        <span className={'text-xs'}>
          On the site since {dateTransformer(createdAt)}
        </span>
      </div>
    </div>
  )
}
