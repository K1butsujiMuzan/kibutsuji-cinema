'use client'

import { userLinksData } from '@/components/ui/user-links/user-links.data'
import { usePathname } from 'next/navigation'
import UserLink from '@/components/ui/user-links/UserLink'

interface Props {
  userId: string
}

export default function UserLinks({ userId }: Props) {
  const pathName = usePathname()

  return (
    <section className={'px-4'}>
      <nav>
        <ul className={'flex gap-4'}>
          {userLinksData.map(({ href, text }) => (
            <li key={text} className={''}>
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
