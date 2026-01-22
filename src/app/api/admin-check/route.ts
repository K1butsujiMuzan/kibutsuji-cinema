import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import { verify } from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      {
        error: ERRORS.UNAUTHORIZED,
      },
      { status: 401 },
    )
  }

  const token = authHeader?.substring(7)

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'wails-secret-123',
      {
        issuer: 'kibutsuji-cinema',
        audience: 'wails',
      },
    )

    return NextResponse.json(
      {
        error: null,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: ERRORS.UNAUTHORIZED,
      },
      { status: 401 },
    )
  }
}
