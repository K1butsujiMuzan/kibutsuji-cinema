import Link from 'next/link'
import { SettingsIcon } from '@/components/icons/HeaderUserMenuModalIcons'
import { PAGES } from '@/configs/pages.config'

interface Props {
  userId: string
}

export default function UserSettings({ userId }: Props) {
  return (
    <Link
      className={
        'px-2.5 rounded-md py-1.5 flex items-center gap-2 bg-pink-50 dark:bg-gray-750 hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
      }
      href={PAGES.SETTINGS(userId)}
    >
      <SettingsIcon />
      <span>Settings</span>
    </Link>
  )
}
