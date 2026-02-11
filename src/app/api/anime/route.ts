import { cors } from '@/lib/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { userAccessCheck } from '@/lib/user-access-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (access.error) {
      return access.error
    }

    const pages = Number(request.nextUrl.searchParams.get('page')) || 1
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 10

    const anime = await prisma.anime.findMany({
      skip: (pages - 1) * 10,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.anime.count()

    return cors(NextResponse.json({ anime, count }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (access.error) {
      return access.error
    }

    const ids = await request.json()

    if (Array.isArray(ids) && ids.length > 0) {
      await prisma.anime.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      })

      return cors(NextResponse.json({ error: null }, { status: 200 }))
    } else {
      return cors(
        NextResponse.json({ error: ERRORS.TRANSMITTED_DATA }, { status: 400 }),
      )
    }
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function CREATE(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (access.error) {
      return access.error
    }
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
