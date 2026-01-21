import AccentLink from '@/components/ui/accent-link/AccentLink'
import ThemeSwitch from '@/components/ui/theme-switch/ThemeSwitch'
import { PAGES } from '@/configs/pages.config'
import { Logo } from '@/components/ui/logo/Logo'

export default function GuestHeader() {
  return (
    <header
      className={
        'bg-pink-50/60 dark:bg-gray-750/60 fixed w-full top-0 z-50 px-3 py-2 shadow-sm'
      }
    >
      <div
        className={
          'container flex justify-between mx-auto flex-wrap gap-2 items-center'
        }
      >
        <Logo />
        <div className={'flex gap-4 items-center'}>
          <ThemeSwitch />
          <AccentLink
            href={PAGES.PROFILE}
            text={'Login'}
            className={'px-4 md:px-5 py-1 md:py-2'}
          />
        </div>
      </div>
    </header>
  )
}
