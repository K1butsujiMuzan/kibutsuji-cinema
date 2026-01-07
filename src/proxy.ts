import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

const publicUrls: string[] = [
  '/welcome', '/login', '/register', '/reset-password', '/tos', '/faq',
  '/privacy-policy'
]

export async function proxy(request: NextRequest) {
  const pathName: string = request.nextUrl.pathname
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const isEmailVerified: boolean = session?.user?.emailVerified || false

  if(pathName.startsWith('/profile') && !isEmailVerified) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(!publicUrls.includes(pathName) && !isEmailVerified) {
    return NextResponse.redirect(new URL('/welcome', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/profile/:path*']
}
