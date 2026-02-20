import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'
import type { AnimeEpisode } from '@/generated/prisma'
import { VIEWS_LIMIT } from '@/constants/views_limit'
import { episodesCheck } from '@/lib/routes-helpers/episodes-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { idsCheck } from '@/lib/routes-helpers/ids-check'
import { spacesCheck } from '@/lib/routes-helpers/spaces-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit] = getPageParams(request)

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

    if (!access.success) {
      return access.error
    }

    const checkedData = await idsCheck<string>(request, 'string')

    if (!checkedData.success) {
      return checkedData.error
    }

    const { ids } = checkedData

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

    const {
      episodeNumber,
      title,
      views,
      animeId,
    }: Omit<AnimeEpisode, 'id' | 'createdAt' | 'updatedAt'> =
      await request.json()

    const trimCheck = spacesCheck([animeId, title])

    if (!trimCheck.success) {
      return trimCheck.error
    }

    const [trimmedAnimeId, trimmedTitle] = trimCheck.data

    const existingAnime = await episodesCheck(episodeNumber, trimmedAnimeId)

    if (!existingAnime.success) {
      return existingAnime.error
    }

    const { anime } = existingAnime

    if (anime.episodesCount === anime.episodes.length) {
      return cors(
        NextResponse.json(
          { error: ERRORS.MAX_ANIME_COUNT(anime.episodesCount) },
          { status: 409 },
        ),
      )
    }

    const existingEpisode = await prisma.animeEpisode.findUnique({
      where: {
        animeId_episodeNumber: {
          animeId: trimmedAnimeId,
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
          views,
          title: trimmedTitle,
          animeId: trimmedAnimeId,
        },
      })
      await tx.anime.update({
        where: {
          id: trimmedAnimeId,
        },
        data: {
          episodesReleased: {
            increment: 1,
          },
          views:
            anime.views + views > VIEWS_LIMIT
              ? VIEWS_LIMIT
              : anime.views + views,
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

    const {
      id,
      episodeNumber,
      title,
      views,
      animeId,
    }: Omit<AnimeEpisode, 'createdAt' | 'updatedAt'> = await request.json()

    const trimCheck = spacesCheck([title, animeId])

    if (!trimCheck.success) {
      return trimCheck.error
    }

    const [trimmedTitle, trimmedAnimeId] = trimCheck.data

    const episodeById = await prisma.animeEpisode.findUnique({ where: { id } })

    if (!episodeById) {
      return cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Episode') },
          { status: 404 },
        ),
      )
    }

    const existingAnime = await episodesCheck(episodeNumber, trimmedAnimeId)

    if (!existingAnime.success) {
      return existingAnime.error
    }

    const { anime } = existingAnime

    const existingEpisode = await prisma.animeEpisode.findUnique({
      where: {
        animeId_episodeNumber: {
          episodeNumber,
          animeId: trimmedAnimeId,
        },
      },
    })

    if (existingEpisode && existingEpisode.id !== id) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('An episode with this anime ID and number') },
          { status: 409 },
        ),
      )
    }

    if (
      anime.episodesCount === anime.episodes.length &&
      episodeById.animeId !== trimmedAnimeId
    ) {
      return cors(
        NextResponse.json(
          { error: ERRORS.MAX_ANIME_COUNT(anime.episodesCount) },
          { status: 409 },
        ),
      )
    }

    await prisma.$transaction(async (tx) => {
      await tx.animeEpisode.update({
        where: {
          id,
        },
        data: {
          episodeNumber,
          views,
          title: trimmedTitle,
          animeId: trimmedAnimeId,
        },
      })

      const currentAnimeStats = await tx.animeEpisode.aggregate({
        where: {
          animeId: episodeById.animeId,
        },
        _count: true,
        _sum: { views: true },
      })

      await tx.anime.update({
        where: {
          id: episodeById.animeId,
        },
        data: {
          episodesReleased: currentAnimeStats._count,
          views: currentAnimeStats._sum.views ?? 0,
        },
      })

      if (episodeById.animeId !== trimmedAnimeId) {
        const newAnimeStats = await tx.animeEpisode.aggregate({
          where: {
            animeId: trimmedAnimeId,
          },
          _count: true,
          _sum: { views: true },
        })

        await tx.anime.update({
          where: {
            id: trimmedAnimeId,
          },
          data: {
            episodesReleased: newAnimeStats._count,
            views: newAnimeStats._sum.views ?? 0,
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
