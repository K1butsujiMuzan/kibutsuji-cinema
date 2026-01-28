import { type NextRequest, NextResponse } from 'next/server'
import { cors } from '@/lib/cors'
import { tokenCheck } from '@/lib/token-check'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = tokenCheck(request)

    if (user.role !== 'MODERATOR' && user.role !== 'ADMIN') {
      return cors(
        NextResponse.json(
          {
            error: ERRORS.INSUFFICIENT_RIGHTS,
          },
          { status: 403 },
        ),
      )
    }

    const users = await prisma.user.findMany()

    return cors(NextResponse.json({ users }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: 401 }),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
