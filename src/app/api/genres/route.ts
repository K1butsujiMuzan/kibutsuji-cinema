import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { idsCheck } from '@/lib/routes-helpers/ids-check'
import type { AnimeGenre } from '@/generated/prisma'
import { spacesCheck } from '@/lib/routes-helpers/spaces-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit] = getPageParams(request)

    const genres = await prisma.animeGenre.findMany({
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.animeGenre.count()

    return cors(NextResponse.json({ genres, count }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const checkedData = await idsCheck<number>(request, 'number')

    if (!checkedData.success) {
      return checkedData.error
    }

    await prisma.animeGenre.deleteMany({
      where: {
        id: {
          in: checkedData.ids,
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

    const { name }: Pick<AnimeGenre, 'name'> = await request.json()

    const trimCheck = spacesCheck([name])

    if (!trimCheck.success) {
      return trimCheck.error
    }

    const [trimmedName] = trimCheck.data

    const existingGenre = await prisma.animeGenre.findFirst({
      where: {
        name: {
          equals: trimmedName,
          mode: 'insensitive',
        },
      },
    })

    if (existingGenre) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('Genre with this name') },
          { status: 409 },
        ),
      )
    }

    await prisma.animeGenre.create({
      data: {
        name: trimmedName,
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

    const { id, name }: Pick<AnimeGenre, 'name' | 'id'> = await request.json()

    const trimCheck = spacesCheck([name])

    if (!trimCheck.success) {
      return trimCheck.error
    }

    const [trimmedName] = trimCheck.data

    const genreById = await prisma.animeGenre.findUnique({
      where: { id },
    })

    if (!genreById) {
      return cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Genre') },
          { status: 404 },
        ),
      )
    }

    const existingGenre = await prisma.animeGenre.findFirst({
      where: {
        name: {
          equals: trimmedName,
          mode: 'insensitive',
        },
      },
    })

    if (existingGenre && existingGenre.id !== id) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('Genre with this name') },
          { status: 409 },
        ),
      )
    }

    await prisma.animeGenre.update({
      where: {
        id,
      },
      data: {
        name: trimmedName,
      },
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
