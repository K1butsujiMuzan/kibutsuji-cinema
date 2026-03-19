import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { ERRORS } from '@/constants/errors'
import { getReportParams } from '@/lib/routes-helpers/get-report-params'
import prisma from '@/lib/prisma'

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

    const { fromDate, toDate } = paramsCheck.data

    const groupedSubscriptions = await prisma.subscription.groupBy({
      by: ['type'],
      where: {
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      },
      _count: true,
      orderBy: {
        _count: {
          type: 'desc',
        },
      },
    })

    const transactionsSum = await prisma.transaction.aggregate({
      where: {
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      },
      _sum: { sum: true },
    })

    const result = groupedSubscriptions.map((item) => ({
      count: item._count,
      type: item.type,
    }))

    return cors(
      NextResponse.json(
        {
          data: result,
          sum: transactionsSum._sum.sum ?? 0,
          mostPopularSubscription:
            groupedSubscriptions.length > 0
              ? groupedSubscriptions[0].type
              : null,
        },
        { status: 200 },
      ),
    )
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
