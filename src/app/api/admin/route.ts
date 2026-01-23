import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { $Enums } from '@/generated/prisma'
import Role = $Enums.Role
import { ERRORS } from '@/constants/errors'
import { sign } from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:34115',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { headers: corsHeaders })
  }

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

      return NextResponse.json(
        {
          token: jwtToken,
          user: response.user,
        },
        { status: 200, headers: corsHeaders },
      )
    } else {
      return NextResponse.json(
        { error: ERRORS.INSUFFICIENT_RIGHTS },
        { status: 403, headers: corsHeaders },
      )
    }
  } catch (error: any) {
    const authErrors = [
      ERRORS.INVALID_EMAIL,
      ERRORS.INVALID_PASSWORD,
      ERRORS.EMAIL_NOT_VERIFIED,
    ]
    if (error?.body?.message && authErrors.includes(error?.body?.message)) {
      return NextResponse.json(
        { error: error?.body?.message || ERRORS.SOMETHING_WRONG },
        { status: 401, headers: corsHeaders },
      )
    }

    return NextResponse.json(
      { error: error?.body?.message || error || ERRORS.SOMETHING_WRONG },
      { status: 500, headers: corsHeaders },
    )
  }
}
