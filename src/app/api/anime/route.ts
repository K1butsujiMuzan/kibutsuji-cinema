import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { genresCheck } from '@/lib/routes-helpers/genres-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { nullTransform } from '@/lib/routes-helpers/null-transform'
import {
  createAnimeSchema,
  updateAnimeSchema,
} from '@/shared/schemes/endpoints/anime.schema'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit] = getPageParams(request)

    const anime = await prisma.anime.findMany({
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        genres: true,
      },
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
    const idsCheck = await deleteCheck(request)

    if (!idsCheck.success) {
      return idsCheck.error
    }

    await prisma.anime.deleteMany({
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

    const parsedData = createAnimeSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const {
      ageLimit,
      status,
      type,
      episodesCount,
      episodesLength,
      title,
      slug,
      releaseDate,
      description,
      image,
      originalTitle,
      genreNames,
    } = parsedData.data

    const existingSlug = await prisma.anime.findUnique({
      where: { slug },
    })

    if (existingSlug) {
      return cors(
        NextResponse.json({ error: ERRORS.EXISTS('Slug') }, { status: 409 }),
      )
    }

    const genresArray = await genresCheck(genreNames)

    if (!genresArray.success) {
      return genresArray.error
    }

    await prisma.anime.create({
      data: {
        status,
        ageLimit,
        type,
        episodesCount,
        episodesLength,
        title,
        slug,
        releaseDate,
        episodesReleased: 0,
        description: nullTransform(description),
        image: nullTransform(image),
        originalTitle: nullTransform(originalTitle),
        genres: {
          connect: genresArray.data,
        },
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

    const parsedData = updateAnimeSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const {
      id,
      ageLimit,
      status,
      type,
      episodesCount,
      episodesLength,
      title,
      slug,
      releaseDate,
      description,
      image,
      originalTitle,
      genreNames,
    } = parsedData.data

    const animeById = await prisma.anime.findUnique({ where: { id } })

    if (!animeById) {
      return cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Anime') },
          { status: 404 },
        ),
      )
    }

    const existingSlug = await prisma.anime.findUnique({
      where: { slug },
    })

    if (existingSlug && existingSlug.id !== id) {
      return cors(
        NextResponse.json({ error: ERRORS.EXISTS('Slug') }, { status: 409 }),
      )
    }

    const genresArray = await genresCheck(genreNames)

    if (!genresArray.success) {
      return genresArray.error
    }

    await prisma.anime.update({
      where: {
        id: id,
      },
      data: {
        ageLimit,
        status,
        type,
        episodesCount,
        episodesLength,
        releaseDate,
        slug,
        title,
        description: nullTransform(description),
        image: nullTransform(image),
        originalTitle: nullTransform(originalTitle),
        genres: {
          set: genresArray.data,
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

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
