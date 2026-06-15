import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { genresCheck } from '@/lib/routes-helpers/genres-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import {
  createAnimeSchema,
  updateAnimeSchema,
} from '@/shared/schemes/endpoints/anime.schema'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'
import { Prisma } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit, search, isSearching] = getPageParams(request)

    const where: Prisma.AnimeWhereInput = isSearching
      ? { title: { contains: search, mode: 'insensitive' } }
      : {}

    const anime = await prisma.anime.findMany({
      where,
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        genres: true,
      },
    })
    const count = await prisma.anime.count({ where })

    return cors(NextResponse.json({ data: anime, count }, { status: 200 }))
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
      access: animeAccess,
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
      backgroundImage,
      originalTitle,
      genreNames,
      authorSlug,
    } = parsedData.data

    const existingSlug = await prisma.anime.findUnique({
      where: { slug },
    })

    if (existingSlug) {
      return cors(
        NextResponse.json({ error: ERRORS.EXISTS('Slug') }, { status: 409 }),
      )
    }

    if (authorSlug) {
      const existingAuthor = await prisma.author.findUnique({
        where: { slug: authorSlug },
      })

      if (!existingAuthor) {
        return cors(
          NextResponse.json(
            { error: ERRORS.NO_DATA('Author', 'slug') },
            { status: 404 },
          ),
        )
      }
    }

    const genresArray = await genresCheck(genreNames)

    if (!genresArray.success) {
      return genresArray.error
    }

    await prisma.anime.create({
      data: {
        status,
        access: animeAccess,
        ageLimit,
        type,
        episodesCount,
        episodesLength,
        title,
        slug,
        releaseDate,
        authorSlug,
        episodesReleased: 0,
        description,
        image,
        backgroundImage,
        originalTitle,
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
      access: animeAccess,
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
      backgroundImage,
      originalTitle,
      genreNames,
      authorSlug,
    } = parsedData.data

    const animeById = await prisma.anime.findUnique({ where: { id } })

    if (!animeById) {
      return cors(
        NextResponse.json({ error: ERRORS.NO_DATA('Anime') }, { status: 404 }),
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

    if (authorSlug) {
      const existingAuthor = await prisma.author.findUnique({
        where: { slug: authorSlug },
      })

      if (!existingAuthor) {
        return cors(
          NextResponse.json(
            { error: ERRORS.NO_DATA('Author', 'slug') },
            { status: 404 },
          ),
        )
      }
    }

    if (animeById.episodesCount !== episodesCount) {
      const animeEpisodes = await prisma.animeEpisode.count({
        where: { animeId: id },
      })

      if (animeEpisodes > episodesCount) {
        return cors(
          NextResponse.json(
            { error: ERRORS.EPISODES_COUNT(animeEpisodes) },
            { status: 409 },
          ),
        )
      }
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
        access: animeAccess,
        ageLimit,
        status,
        type,
        episodesCount,
        episodesLength,
        releaseDate,
        slug,
        title,
        description,
        image,
        authorSlug,
        backgroundImage,
        originalTitle,
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
