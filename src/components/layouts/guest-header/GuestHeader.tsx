import MainThemeButton from '@/components/ui/theme-buttons/MainThemeButton'
import { PAGES } from '@/shared/configs/pages.config'
import Logo from '@/components/ui/logo/Logo'
import MiniLogo from '@/components/ui/logo/MiniLogo'
import AccentLinkWithContainer from '@/components/ui/accent-link-with-container/AccentLinkWithContainer'

export default function GuestHeader() {
  return (
    <header
      className={
        'bg-pink-50/60 dark:bg-gray-750/60 sticky w-full top-0 z-30 shadow-sm px-3 -mb-13 md:-mb-15'
      }
    >
      <div
        className={'max-w-370 flex justify-between mx-auto gap-2 items-center'}
      >
        <Logo className={'hidden lg:block py-1.5 md:py-2.5 px-1'} />
        <MiniLogo className={'lg:hidden py-1.5 md:py-2.5 px-1'} />
        <div className={'flex gap-2 items-center'}>
          <MainThemeButton className={'py-1.5 md:py-2.5 px-1'} />
          <AccentLinkWithContainer
            href={PAGES.LOGIN}
            className={'py-1.5 md:py-2.5 px-1'}
          >
            Login
          </AccentLinkWithContainer>
        </div>
      </div>
    </header>
  )
}
