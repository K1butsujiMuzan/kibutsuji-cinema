import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { idsCheck } from '@/lib/routes-helpers/ids-check'
import {
  createGenresSchema,
  updateGenresSchema,
} from '@/shared/schemes/endpoints/genres.schema'

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

    const checkedData = await idsCheck(request)

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

    const data = await request.json()

    const parsedData = createGenresSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { name } = parsedData.data

    const existingGenre = await prisma.animeGenre.findFirst({
      where: {
        name: {
          equals: name,
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
        name: name,
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

    const parsedData = updateGenresSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { name, id } = parsedData.data

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
          equals: name,
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
        name,
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
