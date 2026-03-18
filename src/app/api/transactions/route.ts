import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { Prisma } from '@/generated/prisma'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'
import {
  createTransactionsSchema,
  updateTransactionsSchema,
} from '@/shared/schemes/endpoints/transactions.schema'
import { userCheck } from '@/lib/routes-helpers/user-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit, search, isSearching] = getPageParams(request)

    const where: Prisma.TransactionWhereInput = isSearching
      ? { userId: { contains: search, mode: 'insensitive' } }
      : {}

    const transactions = await prisma.transaction.findMany({
      where,
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.transaction.count({ where })

    return cors(
      NextResponse.json({ data: transactions, count }, { status: 200 }),
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

    await prisma.transaction.deleteMany({
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

    const parsedData = createTransactionsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { sum, userId, subscription } = parsedData.data

    const userError = await userCheck(userId)

    if (userError) {
      return userError
    }

    await prisma.transaction.create({
      data: {
        sum,
        userId,
        subscription,
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

    const parsedData = updateTransactionsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { id, subscription, sum } = parsedData.data

    const transactionById = await prisma.transaction.findUnique({
      where: { id },
    })

    if (!transactionById) {
      return cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Transaction') },
          { status: 404 },
        ),
      )
    }

    await prisma.transaction.update({
      where: { id },
      data: { subscription, sum },
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
