import SearchButton from '@/components/layouts/header/(components)/SearchButton'
import { PAGES } from '@/configs/pages.config'
import { CatalogIcon, NewsIcon } from '@/components/icons/HeaderIcons'
import { getServerSession } from '@/lib/get-server-session'
import AccentLink from '@/components/ui/accent-link/AccentLink'
import HeaderUserMenu from '@/components/layouts/header/(components)/HeaderMenu'
import Logo from '@/components/ui/logo/Logo'
import MiniLogo from '@/components/ui/logo/MiniLogo'
import HeaderLink from './(components)/HeaderLink'
import HeaderAvatarLink from '@/components/layouts/header/(components)/HeaderAvatarLink'

export default async function Header() {
  const session = await getServerSession()
  return (
    <header
      className={
        'bg-pink-50 dark:bg-gray-750 sticky w-full top-0 z-30 px-3 shadow-sm'
      }
    >
      <div
        className={
          'max-w-370 flex justify-between lg:grid lg:grid-cols-[15rem_1fr_15rem] mx-auto items-center'
        }
      >
        <div className={'flex'}>
          <Logo className={'hidden lg:block py-1.5 md:py-2.5 px-1'} />
          <MiniLogo className={'lg:hidden py-1.5 md:py-2.5 px-1'} />
        </div>
        <div className={'flex justify-center ml-auto lg:ml-0'}>
          <HeaderLink
            className={'py-1.5 md:py-2.5 px-1'}
            href={PAGES.CATALOG}
            text={'Catalog'}
          >
            <CatalogIcon />
          </HeaderLink>
          <SearchButton className={'py-1.5 md:py-2.5 px-1'} />
          <HeaderLink
            className={' py-1.5 md:py-2.5 px-1'}
            href={PAGES.NEWS}
            text={'News'}
          >
            <NewsIcon />
          </HeaderLink>
        </div>
        <div className={'flex justify-end'}>
          {session && (
            <>
              <HeaderAvatarLink
                className={'py-1.5 md:py-2.5 px-1'}
                userId={session.user.id}
                userImage={session.user.image}
                userName={session.user.name}
              />
              <HeaderUserMenu
                userId={session.user.id}
                userName={session.user.name}
                isPrivate={session.user.role !== 'USER'}
                className={'py-1.5 md:py-2.5 px-1'}
              />
            </>
          )}
          {!session && (
            <>
              <AccentLink
                href={PAGES.LOGIN}
                text={'Login'}
                linkClassName={'py-1.5 md:py-2.5 px-1'}
              />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
