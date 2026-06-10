import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
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
