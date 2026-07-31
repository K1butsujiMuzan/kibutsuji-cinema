'use client'

import { userData } from '@/components/widgets/user/user.data'
import { usePathname } from 'next/navigation'
import UserLink from '@/components/widgets/user/UserLink'

interface Props {
  userId: string
}

export default function UserLinks({ userId }: Props) {
  const pathName = usePathname()

  return (
    <div className={'px-4'}>
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
    </div>
  )
}
