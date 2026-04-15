import AccentLink from '@/components/ui/accent-link/AccentLink'
import MainThemeButton from '@/components/ui/theme-buttons/MainThemeButton'
import { PAGES } from '@/configs/pages.config'
import Logo from '@/components/ui/logo/Logo'
import MiniLogo from '@/components/ui/logo/MiniLogo'

export default function GuestHeader() {
  return (
    <header
      className={
        'bg-pink-50/60 dark:bg-gray-750/60 fixed w-full top-0 z-30 px-3 shadow-sm'
      }
    >
      <div
        className={'max-w-370 flex justify-between mx-auto gap-2 items-center'}
      >
        <Logo className={'hidden lg:block py-1.5 md:py-2.5 px-1'} />
        <MiniLogo className={'lg:hidden py-1.5 md:py-2.5 px-1'} />
        <div className={'flex gap-2 items-center'}>
          <MainThemeButton className={'py-1.5 md:py-2.5 px-1'} />
          <AccentLink
            href={PAGES.LOGIN}
            text={'Login'}
            linkClassName={'py-1.5 md:py-2.5 px-1'}
          />
        </div>
      </div>
    </header>
  )
}
