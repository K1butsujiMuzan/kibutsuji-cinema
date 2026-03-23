import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import { subscriptionAgreementReportSchema } from '@/shared/schemes/endpoints/subscription-agreement-report.schema'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const parsedData = subscriptionAgreementReportSchema.safeParse({
      userId: request.nextUrl.searchParams.get('user-id'),
    })

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { userId } = parsedData.data

    const existingUser = await prisma.user.findUnique({ where: { id: userId } })

    if (!existingUser) {
      return cors(
        NextResponse.json({ error: ERRORS.NOT_FOUND('User') }, { status: 404 }),
      )
    }

    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId },
    })

    if (!existingSubscription) {
      return cors(
        NextResponse.json({ error: ERRORS.NO_SUBSCRIPTION }, { status: 404 }),
      )
    }

    return cors(
      NextResponse.json(
        {
          email: existingUser.email,
          startDate: existingSubscription.createdAt,
          endDate: existingSubscription.endDate,
          type: existingSubscription.type,
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
