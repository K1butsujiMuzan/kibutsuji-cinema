import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'
import {
  createRatingsSchema,
  updateRatingsSchema,
} from '@/shared/schemes/endpoints/ratings.schema'
import { ratingsCheck } from '@/lib/routes-helpers/ratings-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit] = getPageParams(request)

    const ratings = await prisma.animeRating.findMany({
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.animeRating.count()

    return cors(NextResponse.json({ ratings, count }, { status: 200 }))
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

    const animeWithDeleteRatings = await prisma.animeRating.findMany({
      where: {
        id: {
          in: idsCheck.ids,
        },
      },
      select: {
        animeId: true,
      },
      distinct: ['animeId'],
    })

    const animeIds = animeWithDeleteRatings.map((item) => item.animeId)

    await prisma.$transaction(async (tx) => {
      await tx.animeRating.deleteMany({
        where: {
          id: {
            in: idsCheck.ids,
          },
        },
      })

      const groupedRatingsByAnimeId = await tx.animeRating.groupBy({
        by: ['animeId'],
        where: {
          animeId: {
            in: animeIds,
          },
        },
        _avg: { rating: true },
      })

      for (const animeId of animeIds) {
        const currentAnime = groupedRatingsByAnimeId.find(
          (item) => item.animeId === animeId,
        ) ?? { _avg: { rating: 0 } }

        await tx.anime.update({
          where: {
            id: animeId,
          },
          data: {
            rating: currentAnime._avg.rating ?? 0,
          },
        })
      }
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

    const parsedData = createRatingsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { animeId, rating, userId } = parsedData.data

    const existingError = await ratingsCheck(animeId, userId)

    if (existingError) {
      return existingError
    }

    const ratingWithCurrentAnimeAndUser = await prisma.animeRating.findUnique({
      where: {
        animeId_userId: { animeId, userId },
      },
    })

    if (ratingWithCurrentAnimeAndUser) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('Rating with this anime id and user id') },
          { status: 400 },
        ),
      )
    }

    await prisma.$transaction(async (tx) => {
      await tx.animeRating.create({
        data: {
          animeId,
          rating,
          userId,
        },
      })

      const updatedAnimeStats = await tx.animeRating.aggregate({
        where: { animeId },
        _avg: { rating: true },
      })

      await tx.anime.update({
        where: { id: animeId },
        data: {
          rating: updatedAnimeStats._avg.rating ?? 0,
        },
      })
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

    const parsedData = updateRatingsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { id, animeId, rating, userId } = parsedData.data

    const ratingById = await prisma.animeRating.findUnique({ where: { id } })

    if (!ratingById) {
      return cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Rating') },
          { status: 404 },
        ),
      )
    }

    const existingError = await ratingsCheck(animeId, userId)

    if (existingError) {
      return existingError
    }

    const ratingWithCurrentAnimeAndUser = await prisma.animeRating.findUnique({
      where: {
        animeId_userId: { animeId, userId },
      },
    })

    if (
      ratingWithCurrentAnimeAndUser &&
      ratingWithCurrentAnimeAndUser.id !== id
    ) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('Rating with this anime id and user id') },
          { status: 400 },
        ),
      )
    }

    await prisma.$transaction(async (tx) => {
      await tx.animeRating.update({
        where: { id },
        data: {
          animeId,
          userId,
          rating,
        },
      })

      const updatedAnimeStats = await tx.animeRating.aggregate({
        where: { animeId },
        _avg: { rating: true },
      })

      await tx.anime.update({
        where: { id: animeId },
        data: {
          rating: updatedAnimeStats._avg.rating ?? 0,
        },
      })

      if (ratingById.animeId !== animeId) {
        const previousAnimeStats = await tx.animeRating.aggregate({
          where: { animeId: ratingById.animeId },
          _avg: { rating: true },
        })

        await tx.anime.update({
          where: { id: ratingById.animeId },
          data: {
            rating: previousAnimeStats._avg.rating ?? 0,
          },
        })
      }
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
