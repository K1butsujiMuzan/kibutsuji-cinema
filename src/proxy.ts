import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { FRIENDS_DATA, FRIENDS_PARAMS } from '@/configs/friends.config'
import { PAGES } from '@/configs/pages.config'

const notAllowedAfterVerification: string[] = [
  PAGES.WELCOME,
  PAGES.LOGIN,
  PAGES.REGISTER,
  PAGES.RESET,
  PAGES.NEW_PASSWORD,
]

const adminURLs: string[] = [PAGES.NEW_ANIME]

const forAuthorized: string[] = []

export async function proxy(request: NextRequest) {
  const pathName: string = request.nextUrl.pathname
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isEmailVerified: boolean = session?.user?.emailVerified ?? false
  const role: string = session?.user?.role ?? 'USER'

  if (!isEmailVerified) {
    if (pathName.startsWith('/user')) {
      return NextResponse.redirect(new URL(PAGES.LOGIN, request.url))
    }

    if (pathName === PAGES.MAIN) {
      return NextResponse.redirect(new URL(PAGES.WELCOME, request.url))
    }

    const isForAuthorizedURL = forAuthorized.some((link) => {
      return pathName.startsWith(link)
    })

    if (isForAuthorizedURL) {
      return NextResponse.redirect(new URL(PAGES.WELCOME, request.url))
    }
  }

  const segments = request.nextUrl.pathname.split('/').filter(Boolean)

  if (
    segments.length === 3 &&
    segments[0] === 'user' &&
    segments[2] === 'friends'
  ) {
    const type = request.nextUrl.searchParams.get('type')
    if(type !== FRIENDS_PARAMS.FRIENDS) {
      const isExistingType = (Object.values(FRIENDS_PARAMS) as string[]).includes(
        type ?? '',
      )
      const accessType =
        FRIENDS_DATA.find((item) => item.value === type)?.type ?? 'public'
      const isProfile = session?.user?.id ? session.user.id === segments[1] : false

      console.log(segments)
      console.log('type: ', type)
      console.log('isExistingType: ', isExistingType)
      console.log('isProfile: ', isProfile)
      console.log(accessType === 'user' && isProfile)
      console.log(accessType === 'profile' && !isProfile)

      if (
        !type ||
        !isExistingType ||
        (accessType === 'user' && isProfile) ||
        (accessType === 'profile' && !isProfile)
      ) {
        const url = new URL(request.url)
        url.searchParams.set('type', 'friends')
        return NextResponse.redirect(url)
      }
    }
  }

  if (isEmailVerified) {
    const isGuestURL = notAllowedAfterVerification.some((link) =>
      pathName.startsWith(link),
    )
    if (isGuestURL) {
      return NextResponse.redirect(new URL(PAGES.MAIN, request.url))
    }
  }

  if (role === 'USER') {
    const isAdminURL = adminURLs.some((link) => {
      return pathName.startsWith(link)
    })
    if (isAdminURL) {
      return NextResponse.redirect(
        new URL(isEmailVerified ? PAGES.MAIN : PAGES.WELCOME, request.url),
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/user/:path*',
    '/welcome',
    '/login',
    '/register',
    '/reset-password',
    '/new-password',
    '/new-anime',
  ],
}
