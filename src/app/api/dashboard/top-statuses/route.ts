import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const groupedStatuses = await prisma.anime.groupBy({
      by: 'status',
      _count: true,
    })

    const topStatuses = groupedStatuses.map((item) => ({
      status: item.status,
      count: item._count,
    }))

    return cors(NextResponse.json({ topStatuses }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
