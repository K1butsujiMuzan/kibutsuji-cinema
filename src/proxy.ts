import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const publicUrls: string[] = [
  '/welcome',
  '/login',
  '/register',
  '/reset-password',
  '/new-password',
  '/tos',
  '/faq',
  '/privacy-policy',
]

const notAllowedAfterVerification: string[] = [
  '/welcome',
  '/login',
  '/register',
  '/reset-password',
  '/new-password',
]

export async function proxy(request: NextRequest) {
  const pathName: string = request.nextUrl.pathname
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isEmailVerified: boolean = session?.user?.emailVerified || false

  if (pathName.startsWith('/profile') && !isEmailVerified) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (notAllowedAfterVerification.includes(pathName) && isEmailVerified) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!publicUrls.includes(pathName) && !isEmailVerified) {
    return NextResponse.redirect(new URL('/welcome', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/welcome',
    '/',
    '/profile/:path*',
    '/login',
    '/register',
    '/reset-password',
    '/new-password',
  ],
}
