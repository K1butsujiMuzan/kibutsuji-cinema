import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import { cors } from '@/lib/routes-helpers/cors'
import { tokenCheck } from '@/lib/routes-helpers/token-check'

export async function POST(request: NextRequest) {
  try {
    const user = tokenCheck(request)
    return cors(
      NextResponse.json(
        {
          email: user.email,
          role: user.role,
        },
        { status: 200 },
      ),
    )
  } catch (error) {
    return cors(
      NextResponse.json(
        {
          error: ERRORS.UNAUTHORIZED,
        },
        { status: 401 },
      ),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
