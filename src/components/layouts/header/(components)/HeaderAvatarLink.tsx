import Link from 'next/link'
import { PAGES } from '@/configs/pages.config'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { memo } from 'react'

interface Props {
  userId: string
  userName: string
  userImage: string | null | undefined
  className?: string
}

export default memo(function HeaderAvatarLink({
  userId,
  userName,
  userImage,
  className,
}: Props) {
  return (
    <Link className={cn('', className)} href={PAGES.USER(userId)}>
      <div className={'relative w-10 h-10'}>
        <Image
          className={'object-cover rounded-sm'}
          src={userImage ? userImage : '/images/global/base-avatar.jpg'}
          alt={`${userName}'s profile`}
          fill={true}
          sizes={'40px'}
        />
      </div>
    </Link>
  )
})
