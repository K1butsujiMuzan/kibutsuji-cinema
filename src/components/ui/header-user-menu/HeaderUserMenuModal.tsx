import HeaderUserMenuModalProfileLink from '@/components/ui/header-user-menu/components/HeaderUserMenuModalProfileLink'
import {
  headerUserMenuModalPrivate,
  headerUserMenuModalPublish,
} from '@/components/ui/header-user-menu/header-user-menu-modal.data'
import HeaderUserMenuModalLink from '@/components/ui/header-user-menu/components/HeaderUserMenuModalLink'
import HeaderUserMenuModalTheme from '@/components/ui/theme-buttons/HeaderUserMenuModalTheme'
import { SettingsIcon } from '@/components/icons/HeaderUserMenuModalIcons'
import { PAGES } from '@/configs/pages.config'
import HeaderUserMenuModalLogoutButton from '@/components/ui/header-user-menu/components/HeaderUserMenuModalLogoutButton'
import Line from '@/components/ui/line/Line'

interface Props {
  userName: string
  userId: string
  isPrivate: boolean
  onClose: () => void
}

export default function HeaderUserMenuModal({
  userName,
  userId,
  isPrivate,
  onClose,
}: Props) {
  return (
    <div
      className={
        'absolute flex flex-col gap-1.5 bg-white shadow-lg dark:bg-gray-650 max-w-100 min-w-65 top-full right-0 rounded-md py-1.5'
      }
    >
      <div className={'px-1.5'}>
        <HeaderUserMenuModalProfileLink
          onClick={onClose}
          userName={userName}
          userId={userId}
        />
      </div>
      <Line />
      <ul className={'px-1.5 flex flex-col gap-1'}>
        {headerUserMenuModalPublish.map(({ href, text, icon: Icon }) => (
          <li key={text}>
            <HeaderUserMenuModalLink
              onClick={onClose}
              href={href(userId)}
              text={text}
            >
              <Icon />
            </HeaderUserMenuModalLink>
          </li>
        ))}
        {isPrivate &&
          headerUserMenuModalPrivate.map(({ href, text, icon: Icon }) => (
            <li key={text}>
              <HeaderUserMenuModalLink
                onClick={onClose}
                href={href}
                text={text}
              >
                <Icon />
              </HeaderUserMenuModalLink>
            </li>
          ))}
      </ul>
      <Line />
      <div className={'px-1.5'}>
        <HeaderUserMenuModalTheme />
      </div>
      <Line />
      <div className={'px-1.5 flex flex-col gap-1'}>
        <HeaderUserMenuModalLink
          onClick={onClose}
          href={PAGES.SETTINGS(userId)}
          text={'Settings'}
        >
          <SettingsIcon />
        </HeaderUserMenuModalLink>
        <HeaderUserMenuModalLogoutButton />
      </div>
      <Line />
      <small className={'text-center text-10 leading-4 py-0.5'}>
        version: 1.0.0
      </small>
    </div>
  )
}
