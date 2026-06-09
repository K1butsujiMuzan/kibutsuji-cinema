import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { Prisma } from '@/generated/prisma'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'
import {
  createAnimeSchema,
  updateAnimeSchema,
} from '@/shared/schemes/endpoints/anime.schema'
import { genresCheck } from '@/lib/routes-helpers/genres-check'
import { nullTransform } from '@/lib/routes-helpers/null-transform'
import {
  createAuthorSchema,
  updateAuthorSchema,
} from '@/shared/schemes/endpoints/author.schema'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit, search, isSearching] = getPageParams(request)

    const where: Prisma.AuthorWhereInput = isSearching
      ? { englishName: { contains: search, mode: 'insensitive' } }
      : {}

    const authors = await prisma.author.findMany({
      where,
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.author.count({ where })

    return cors(NextResponse.json({ data: authors, count }, { status: 200 }))
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

    await prisma.author.deleteMany({
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

    const parsedData = createAuthorSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { image, englishName, originalName } = parsedData.data

    const existingAuthor = await prisma.author.findUnique({
      where: { englishName },
    })

    if (existingAuthor) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('Author with this english name') },
          { status: 409 },
        ),
      )
    }

    await prisma.author.create({
      data: {
        image,
        englishName,
        originalName,
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

    const parsedData = updateAuthorSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { id, image, englishName, originalName } = parsedData.data

    const currentAuthor = await prisma.author.findUnique({
      where: {
        id,
      },
    })

    if (!currentAuthor) {
      return cors(
        NextResponse.json({ error: ERRORS.NO_DATA('Author') }, { status: 404 }),
      )
    }

    const existingAuthor = await prisma.author.findUnique({
      where: { englishName },
    })

    if (existingAuthor && existingAuthor.id !== id) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('Author with this english name') },
          { status: 409 },
        ),
      )
    }

    await prisma.author.update({
      where: {
        id,
      },
      data: {
        image,
        englishName,
        originalName,
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
