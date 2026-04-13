import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const notAllowedAfterVerification: string[] = [
  '/welcome',
  '/login',
  '/register',
  '/reset-password',
  '/new-password',
]

const adminURLs: string[] = ['/new-anime']

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
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathName === '/') {
      return NextResponse.redirect(new URL('/welcome', request.url))
    }

    const isForAuthorizedURL = forAuthorized.some((link) => {
      return pathName.startsWith(link)
    })

    if (isForAuthorizedURL) {
      return NextResponse.redirect(new URL('/welcome', request.url))
    }
  }

  if (isEmailVerified) {
    const isGuestURL = notAllowedAfterVerification.some((link) =>
      pathName.startsWith(link),
    )
    if (isGuestURL) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (role === 'USER') {
    const isAdminURL = adminURLs.some((link) => {
      return pathName.startsWith(link)
    })
    if (isAdminURL) {
      return NextResponse.redirect(
        new URL(isEmailVerified ? '/' : '/welcome', request.url),
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
