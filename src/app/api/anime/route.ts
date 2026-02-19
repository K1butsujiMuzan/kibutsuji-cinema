import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import type { Anime } from '@/generated/prisma'
import { slugCheck } from '@/lib/routes-helpers/slug-check'
import { genresCheck } from '@/lib/routes-helpers/genres-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { idsCheck } from '@/lib/routes-helpers/ids-check'
import { spacesCheck } from '@/lib/routes-helpers/spaces-check'
import { nullTransform } from '@/lib/routes-helpers/null-transform'

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
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const checkedData = await idsCheck<string>(request, 'string')

    if (!checkedData.success) {
      return checkedData.error
    }

    await prisma.anime.deleteMany({
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

    const { genres }: { genres: string } = data
    const {
      ageLimit,
      description,
      episodesCount,
      episodesLength,
      image,
      originalTitle,
      releaseDate,
      slug,
      status,
      title,
      type,
    }: Omit<
      Anime,
      'id' | 'createdAt' | 'updatedAt' | 'views' | 'episodesReleased'
    > = data

    const trimCheck = spacesCheck([slug, title])

    if (!trimCheck.success) {
      return trimCheck.error
    }

    const [trimmedSlug, trimmedTitle] = trimCheck.data

    const slugError = slugCheck(trimmedSlug)

    if (slugError) {
      return slugError
    }

    const existingSlug = await prisma.anime.findUnique({
      where: { slug: trimmedSlug },
    })

    if (existingSlug) {
      return cors(
        NextResponse.json({ error: ERRORS.EXISTS('Slug') }, { status: 409 }),
      )
    }

    const genresArray = await genresCheck(genres)

    if (!genresArray.success) {
      return genresArray.error
    }

    await prisma.anime.create({
      data: {
        ageLimit,
        episodesCount,
        episodesLength,
        releaseDate,
        status,
        type,
        title: trimmedTitle,
        slug: trimmedSlug,
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

    const { genres }: { genres: string } = data
    const {
      id,
      ageLimit,
      description,
      episodesCount,
      episodesLength,
      image,
      originalTitle,
      releaseDate,
      slug,
      status,
      title,
      type,
    }: Omit<Anime, 'createdAt' | 'updatedAt' | 'views' | 'episodesReleased'> =
      data

    const trimCheck = spacesCheck([slug, title])

    if (!trimCheck.success) {
      return trimCheck.error
    }

    const [trimmedSlug, trimmedTitle] = trimCheck.data

    const slugError = slugCheck(trimmedSlug)

    if (slugError) {
      return slugError
    }

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
      where: { slug: trimmedSlug },
    })

    if (existingSlug && existingSlug.id !== id) {
      return cors(
        NextResponse.json({ error: ERRORS.EXISTS('Slug') }, { status: 409 }),
      )
    }

    const genresArray = await genresCheck(genres)

    if (!genresArray.success) {
      return genresArray.error
    }

    await prisma.anime.update({
      where: {
        id,
      },
      data: {
        ageLimit,
        episodesCount,
        episodesLength,
        releaseDate,
        status,
        type,
        slug: trimmedSlug,
        title: trimmedTitle,
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
