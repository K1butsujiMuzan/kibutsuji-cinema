'use client'

import FriendsButton from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/FriendsButton'
import {
  FRIENDS_PARAMS,
  friendsData,
} from '@/app/(user)/user/[userId]/(user-wrapper)/friends/(components)/friends.data'
import { useRouter, useSearchParams } from 'next/navigation'
import { PAGES } from '@/configs/pages.config'

interface Props {
  userId: string
  sessionId: string
  isProfile: boolean
}

export default function FriendsPanel({ userId, sessionId, isProfile }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const onHandleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('type', value)
    router.push(`${PAGES.FRIENDS(userId)}?${params.toString()}`)
  }

  return (
    <section
      className={
        'py-3 px-4 rounded-lg overflow-hidden flex flex-col bg-white dark:bg-gray-800 w-full'
      }
    >
      <ul
        className={
          'flex gap-2 overflow-auto no-scrollbar snap-x snap-mandatory'
        }
      >
        {friendsData.map(({ text, type, value }) => {
          if (
            (type === 'profile' && userId === sessionId) ||
            (type === 'user' && userId !== sessionId) ||
            type === 'public'
          ) {
            return (
              <li key={value} className={'snap-start'}>
                <FriendsButton
                  text={text}
                  onClick={() => onHandleClick(value)}
                  isActive={
                    value ===
                    (searchParams.get('type') ?? FRIENDS_PARAMS.FRIENDS)
                  }
                />
              </li>
            )
          }
        })}
      </ul>
    </section>
  )
}
