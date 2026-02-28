import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'
import {
  createListsSchema,
  updateListsSchema,
} from '@/shared/schemes/endpoints/lists.schema'
import { animeAndUserCheck } from '@/lib/routes-helpers/anime-and-user-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit] = getPageParams(request)

    const lists = await prisma.userList.findMany({
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.userList.count()

    return cors(NextResponse.json({ lists, count }, { status: 200 }))
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

    await prisma.userList.deleteMany({
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

    const parsedData = createListsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { animeId, userId, list } = parsedData.data

    const existingError = await animeAndUserCheck(animeId, userId)

    if (existingError) {
      return existingError
    }

    const listWithCurrentAnimeAndUser = await prisma.userList.findUnique({
      where: {
        animeId_userId: { animeId, userId },
      },
    })

    if (listWithCurrentAnimeAndUser) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('List with this anime id and user id') },
          { status: 409 },
        ),
      )
    }

    await prisma.userList.create({
      data: {
        animeId,
        userId,
        list,
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

    const parsedData = updateListsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { id, animeId, userId, list } = parsedData.data

    const listById = await prisma.userList.findUnique({ where: { id } })

    if (!listById) {
      return cors(
        NextResponse.json({ error: ERRORS.NOT_FOUND('List') }, { status: 404 }),
      )
    }

    const existingError = await animeAndUserCheck(animeId, userId)

    if (existingError) {
      return existingError
    }

    const listWithCurrentAnimeAndUser = await prisma.userList.findUnique({
      where: {
        animeId_userId: { animeId, userId },
      },
    })

    if (listWithCurrentAnimeAndUser && listWithCurrentAnimeAndUser.id !== id) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('List with this anime id and user id') },
          { status: 409 },
        ),
      )
    }

    await prisma.userList.update({
      where: { id },
      data: { animeId, userId, list },
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
