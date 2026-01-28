import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import { cors } from '@/lib/cors'
import { tokenCheck } from '@/lib/token-check'

export async function GET(request: NextRequest) {
  try {
    tokenCheck(request)
    return cors(
      NextResponse.json(
        {
          error: null,
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
