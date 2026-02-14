import { cors } from '@/lib/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { userAccessCheck } from '@/lib/user-access-check'
import type { Anime } from '@/generated/prisma'
import { slugCheck } from '@/lib/slug-check'
import { genresCheck } from '@/lib/genres-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (access.error) {
      return access.error
    }

    const pages = Number(request.nextUrl.searchParams.get('page')) || 1
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 10

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

export async function POST(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (access.error) {
      return access.error
    }

    const data = await request.json()

    const { genres }: { genres: string } = data
    const {
      ageLimit,
      description,
      episodesCount,
      episodesLength,
      episodesReleased,
      image,
      originalTitle,
      releaseDate,
      slug,
      status,
      title,
      type,
      views,
    }: Omit<Anime, 'id' | 'createdAt' | 'updatedAt'> = data

    const slugError = slugCheck(slug)

    if (slugError) {
      return slugError
    }

    const existingSlug = await prisma.anime.findUnique({ where: { slug } })

    if (existingSlug) {
      return cors(
        NextResponse.json({ error: ERRORS.EXISTS('Slug') }, { status: 409 }),
      )
    }

    const genresArray = await genresCheck(genres)

    if (genresArray.error) {
      return genresArray.error
    }

    await prisma.anime.create({
      data: {
        ageLimit,
        description,
        episodesCount,
        episodesLength,
        episodesReleased,
        image,
        originalTitle,
        releaseDate,
        slug,
        status,
        title,
        type,
        views,
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

    if (access.error) {
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
      episodesReleased,
      image,
      originalTitle,
      releaseDate,
      slug,
      status,
      title,
      type,
      views,
    }: Omit<Anime, 'createdAt' | 'updatedAt'> = data

    const slugError = slugCheck(slug)

    if (slugError) {
      return slugError
    }

    const existingSlug = await prisma.anime.findUnique({ where: { slug } })

    if (existingSlug && existingSlug.id !== id) {
      return cors(
        NextResponse.json({ error: ERRORS.EXISTS('Slug') }, { status: 409 }),
      )
    }

    const genresArray = await genresCheck(genres)

    if (genresArray.error) {
      return genresArray.error
    }

    await prisma.anime.update({
      where: {
        id,
      },
      data: {
        ageLimit,
        description,
        episodesCount,
        episodesLength,
        episodesReleased,
        image,
        originalTitle,
        releaseDate,
        slug,
        status,
        title,
        type,
        views,
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
