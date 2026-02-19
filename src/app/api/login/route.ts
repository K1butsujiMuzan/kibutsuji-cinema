import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { $Enums } from '@/generated/prisma'
import Role = $Enums.Role
import { ERRORS } from '@/constants/errors'
import { sign } from 'jsonwebtoken'
import { cors } from '@/lib/routes-helpers/cors'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  try {
    const response = await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
      headers: await headers(),
    })

    if (
      response.user.role === Role.ADMIN ||
      response.user.role === Role.MODERATOR
    ) {
      const jwtToken = sign(
        {
          userId: response.user.id,
          email: response.user.email,
          role: response.user.role,
          name: response.user.name,
        },
        process.env.JWT_SECRET || 'wails-secret-123',
        {
          expiresIn: '30d',
          issuer: 'kibutsuji-cinema',
          audience: 'wails',
        },
      )

      return cors(
        NextResponse.json(
          {
            token: jwtToken,
            user: {
              id: response.user.id,
              email: response.user.email,
              name: response.user.name,
              role: response.user.role,
              image: response.user.image,
            },
          },
          { status: 200 },
        ),
      )
    } else {
      return cors(
        NextResponse.json(
          { error: ERRORS.INSUFFICIENT_RIGHTS },
          { status: 403 },
        ),
      )
    }
  } catch (error: any) {
    const authErrors = [
      ERRORS.INVALID_EMAIL,
      ERRORS.INVALID_PASSWORD,
      ERRORS.EMAIL_NOT_VERIFIED,
    ]
    if (error?.body?.message && authErrors.includes(error?.body?.message)) {
      return cors(
        NextResponse.json(
          { error: error?.body?.message || ERRORS.SOMETHING_WRONG },
          { status: 401 },
        ),
      )
    }

    return cors(
      NextResponse.json(
        { error: error?.body?.message || ERRORS.SOMETHING_WRONG },
        { status: 500 },
      ),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
