import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import { verify } from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:34115',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { headers: corsHeaders })
  }

  const authHeader = request.headers.get('Authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      {
        error: ERRORS.UNAUTHORIZED,
      },
      { status: 401, headers: corsHeaders },
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
      { status: 200, headers: corsHeaders },
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: ERRORS.UNAUTHORIZED,
      },
      { status: 401, headers: corsHeaders },
    )
  }
}
