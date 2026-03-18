import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { Prisma } from '@/generated/prisma'
import prisma from '@/lib/prisma'
import { cors } from '@/lib/routes-helpers/cors'
import { ERRORS } from '@/constants/errors'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'
import {
  createSubscriptionsSchema,
  updateSubscriptionsSchema,
} from '@/shared/schemes/endpoints/subscriptions.schema'
import { userCheck } from '@/lib/routes-helpers/user-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit, search, isSearching] = getPageParams(request)

    const where: Prisma.SubscriptionWhereInput = isSearching
      ? { userId: { contains: search, mode: 'insensitive' } }
      : {}

    const subscriptions = await prisma.subscription.findMany({
      where,
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.subscription.count({ where })

    return cors(
      NextResponse.json({ data: subscriptions, count }, { status: 200 }),
    )
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const idsCheck = await deleteCheck(request)

    if (!idsCheck.success) {
      return idsCheck.error
    }

    await prisma.subscription.deleteMany({
      where: {
        id: {
          in: idsCheck.ids,
        },
      },
    })

    return cors(NextResponse.json({ error: null }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const data = await request.json()

    const parsedData = createSubscriptionsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { type, userId, endDate } = parsedData.data

    const userError = await userCheck(userId)

    if (userError) {
      return userError
    }

    const existingSubscription = await prisma.subscription.findUnique({
      where: {
        userId,
      },
    })

    if (existingSubscription) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('Subscription') },
          { status: 409 },
        ),
      )
    }

    await prisma.subscription.create({
      data: {
        type,
        userId,
        endDate,
      },
    })

    return cors(NextResponse.json({ error: null }, { status: 201 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const data = await request.json()

    const parsedData = updateSubscriptionsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { id, endDate, type } = parsedData.data

    const subscriptionById = await prisma.subscription.findUnique({
      where: { id },
    })

    if (!subscriptionById) {
      return cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Subscription') },
          { status: 404 },
        ),
      )
    }

    await prisma.subscription.update({
      where: { id },
      data: { endDate, type },
    })

    return cors(NextResponse.json({ error: null }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
