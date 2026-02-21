import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { $Enums } from '@/generated/prisma'
import Role = $Enums.Role
import { ERRORS } from '@/constants/errors'
import { sign } from 'jsonwebtoken'
import { cors } from '@/lib/routes-helpers/cors'
import { loginSchema } from '@/shared/schemes/endpoints/users.schema'

type TAuthError = {
  body: {
    message: string
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      return cors(
        NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
      )
    }

    const data = await request.json()

    const parsedData = loginSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { email, password } = parsedData.data

    const response = await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
      headers: await headers(),
    })

    if (response.user.role !== Role.USER) {
      const jwtToken = sign(
        {
          userId: response.user.id,
          email: response.user.email,
          role: response.user.role,
          name: response.user.name,
        },
        process.env.JWT_SECRET,
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
  } catch (error: unknown) {
    const authErrors = [
      ERRORS.INVALID('email'),
      ERRORS.INVALID('email or password'),
      ERRORS.EMAIL_NOT_VERIFIED,
    ]

    const isAuthError = authErrorCheck(error)

    if (isAuthError && authErrors.includes(error.body.message)) {
      return cors(
        NextResponse.json({ error: error.body.message }, { status: 401 }),
      )
    }

    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

function authErrorCheck(error: unknown): error is TAuthError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'body' in error &&
    typeof error.body === 'object' &&
    error.body !== null &&
    'message' in error.body &&
    typeof error.body.message === 'string'
  )
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
