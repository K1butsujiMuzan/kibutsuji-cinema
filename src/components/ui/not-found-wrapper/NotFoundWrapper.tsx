'use client'

import { usePathname } from 'next/navigation'
import Hime from '@/components/ui/hime/Hime'
import AccentLink from '@/components/ui/accent-link/AccentLink'
import { PAGES } from '@/configs/pages.config'
import { useMemo } from 'react'

export default function NotFoundWrapper() {
  const pathName = usePathname()

  const pageText = useMemo(() => {
    return pathName.startsWith('/user')
      ? 'User not found'
      : pathName.startsWith('/anime')
        ? 'Anime not found'
        : 'Page not found or has been moved'
  }, [pathName])

  return (
    <main className={'p-4 flex flex-col gap-6 justify-center items-center'}>
      <h1 className={'sr-only'}>{pageText}</h1>
      <div className={'flex flex-col items-center gap-2'}>
        <Hime text={pageText} type={'sad'} />
      </div>
      <AccentLink text={'Back to main'} href={PAGES.MAIN} />
    </main>
  )
}
