import Image from 'next/image'
import { dateTransformer } from '@/utils/date-utils'
import Link from 'next/link'
import { PAGES } from '@/configs/pages.config'
import { memo } from 'react'

interface Props {
  id: string
  image: string | null
  name: string
  createdAt?: Date
  children?: React.ReactNode
}

export default memo(function PeopleCard({
  image,
  id,
  name,
  createdAt,
  children,
}: Props) {
  return (
    <div
      className={
        'rounded-md overflow-hidden flex items-center border border-pink-50 dark:border-gray-200 gap-3 pr-3'
      }
    >
      <Link
        href={PAGES.USER(id)}
        className={'relative w-14 h-14 aspect-square'}
      >
        <Image
          className={'object-cover'}
          src={image ? image : '/images/global/base-avatar.jpg'}
          alt={name}
          fill={true}
          sizes={'56px'}
        />
      </Link>
      <div className={'flex flex-col gap-1.5 truncate'}>
        <Link href={PAGES.USER(id)} className={'font-medium truncate'}>
          {name}
        </Link>
        {createdAt && (
          <span className={'text-sm'}>{dateTransformer(createdAt)}</span>
        )}
      </div>
      {children && (
        <div className={'ml-auto flex items-center gap-1.5'}>{children}</div>
      )}
    </div>
  )
})
