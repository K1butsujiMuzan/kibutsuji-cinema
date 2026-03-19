import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import { getReportParams } from '@/lib/routes-helpers/get-report-params'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const paramsCheck = getReportParams(request)

    if (!paramsCheck.success) {
      return paramsCheck.error
    }

    const { fromDate, toDate, limit } = paramsCheck.data

    const anime = await prisma.anime.findMany({
      where: {
        releaseDate: {
          gte: fromDate,
          lte: toDate,
        },
      },
      orderBy: { views: 'desc' },
      take: limit,
      select: { title: true, views: true },
    })

    const viewsSum = anime.reduce((sum, item) => sum + item.views, 0)

    return cors(NextResponse.json({ data: anime, viewsSum }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
