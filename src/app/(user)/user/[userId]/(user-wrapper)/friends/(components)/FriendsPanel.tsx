'use client'

import FriendsButton from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/FriendsButton'
import { FRIENDS_DATA, FRIENDS_PARAMS } from '@/configs/friends.config'
import { useRouter, useSearchParams } from 'next/navigation'
import { PAGES } from '@/configs/pages.config'

interface Props {
  userId: string
  isProfile: boolean
}

export default function FriendsPanel({ userId, isProfile }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const onHandleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('type', value)
    router.push(`${PAGES.FRIENDS(userId)}?${params.toString()}`)
  }

  return (
    <ul
      className={'flex gap-2 overflow-auto no-scrollbar snap-x snap-mandatory'}
    >
      {FRIENDS_DATA.map(({ text, type, value }) => {
        if (
          (type === 'profile' && isProfile) ||
          (type === 'user' && !isProfile) ||
          type === 'public'
        ) {
          return (
            <li key={value} className={'snap-start'}>
              <FriendsButton
                text={text}
                onClick={() => onHandleClick(value)}
                isActive={
                  value === (searchParams.get('type') ?? FRIENDS_PARAMS.FRIENDS)
                }
              />
            </li>
          )
        }
      })}
    </ul>
  )
}
