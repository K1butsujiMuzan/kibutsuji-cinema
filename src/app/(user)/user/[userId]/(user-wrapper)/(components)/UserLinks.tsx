'use client'

import { userData } from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/user.data'
import { usePathname } from 'next/navigation'
import UserLink from '@/app/(user)/user/[userId]/(user-wrapper)/(components)/UserLink'

interface Props {
  userId: string
}

export default function UserLinks({ userId }: Props) {
  const pathName = usePathname()

  return (
    <section className={'px-4'}>
      <nav>
        <ul
          className={
            'flex gap-4 overflow-auto no-scrollbar snap-x snap-mandatory'
          }
        >
          {userData.map(({ href, text }) => (
            <li key={text} className={'snap-start'}>
              <UserLink
                text={text}
                href={href(userId)}
                isActive={pathName === href(userId)}
              />
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
