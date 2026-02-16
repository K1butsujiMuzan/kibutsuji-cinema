import { cors } from '@/lib/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/user-access-check'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import type { AnimeEpisode } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (access.error) {
      return access.error
    }

    const pages = Number(request.nextUrl.searchParams.get('page')) || 1
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 10

    const episodes = await prisma.animeEpisode.findMany({
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.animeEpisode.count()

    return cors(NextResponse.json({ episodes, count }, { status: 200 }))
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
      const animeWithDeleteEpisodes = await prisma.animeEpisode.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        select: {
          animeId: true,
        },
        distinct: ['animeId'],
      })

      const animeIds = animeWithDeleteEpisodes.map((item) => item.animeId)

      await prisma.$transaction(async (tx) => {
        await tx.animeEpisode.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        })

        const groupedEpisodesByAnimeId = await tx.animeEpisode.groupBy({
          by: ['animeId'],
          where: {
            animeId: {
              in: animeIds,
            },
          },
          _sum: { views: true },
          _count: true,
        })

        for (const animeId of animeIds) {
          const currentAnime = groupedEpisodesByAnimeId.find(
            (item) => item.animeId === animeId,
          ) ?? { _count: 0, _sum: { views: 0 } }

          await tx.anime.update({
            where: {
              id: animeId,
            },
            data: {
              views: currentAnime._sum.views ?? 0,
              episodesReleased: currentAnime._count,
            },
          })
        }
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

    const {
      episodeNumber,
      title,
      views,
      animeId,
    }: Omit<AnimeEpisode, 'id' | 'createdAt' | 'updatedAt'> =
      await request.json()

    const existingAnime = await prisma.anime.findUnique({
      where: {
        id: animeId,
      },
    })

    if (!existingAnime) {
      return cors(
        NextResponse.json({ error: ERRORS.ANIME_NOT_FOUND }, { status: 409 }),
      )
    }

    const existingEpisode = await prisma.animeEpisode.findUnique({
      where: {
        animeId_episodeNumber: {
          animeId,
          episodeNumber,
        },
      },
    })

    if (existingEpisode) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('An episode with this anime ID and number') },
          { status: 409 },
        ),
      )
    }

    await prisma.$transaction(async (tx) => {
      await tx.animeEpisode.create({
        data: {
          episodeNumber,
          title,
          views,
          animeId,
        },
      })
      await tx.anime.update({
        where: {
          id: animeId,
        },
        data: {
          episodesCount: {
            increment: 1,
          },
          views:
            existingAnime.views + views > 999999
              ? 999999
              : existingAnime.views + views,
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

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
