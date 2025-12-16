import AccentLink from '@/ui/accent-link/AccentLink'
import Logo from '@/ui/logo/Logo'
import ThemeSwitch from '@/ui/theme-switch/ThemeSwitch'
import { PAGES } from '@/configs/links'

export default function GuestHeader() {
  return (
    <header
      className={
        'bg-pink-50 dark:bg-gray-750 px-4 sticky top-0 z-50 py-2 md:py-4'
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
          <AccentLink href={PAGES.AUTH} text={'Sign in'} />
        </div>
      </div>
    </header>
  )
}
