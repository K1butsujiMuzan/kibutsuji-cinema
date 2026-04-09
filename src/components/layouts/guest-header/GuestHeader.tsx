import AccentLink from '@/components/ui/accent-link/AccentLink'
import ThemeSwitch from '@/components/ui/theme-switch/ThemeSwitch'
import { PAGES } from '@/configs/pages.config'
import { Logo } from '@/components/ui/logo/Logo'

export default function GuestHeader() {
  return (
    <header
      className={
        'bg-pink-50/60 dark:bg-gray-750/60 fixed w-full top-0 z-30 px-3 shadow-sm'
      }
    >
      <div
        className={
          'max-w-370 flex justify-between mx-auto flex-wrap gap-2 items-center'
        }
      >
        <Logo className={'py-1.5 md:py-2.5 px-1'} />
        <div className={'flex gap-2 items-center'}>
          <ThemeSwitch className={'py-1.5 md:py-2.5 px-1'} />
          <AccentLink
            href={PAGES.PROFILE}
            text={'Login'}
            linkClassName={'py-1.5 md:py-2.5 px-1'}
          />
        </div>
      </div>
    </header>
  )
}
