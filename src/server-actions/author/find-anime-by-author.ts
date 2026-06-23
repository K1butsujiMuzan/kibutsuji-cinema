'use server'

import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { type Anime, Prisma } from '@/generated/prisma'
import { MAX_AUTHOR_ANIME } from '@/constants/limits'

export const findAnimeByAuthor = async (
  search: string,
  authorSlug: string,
  lastCursor?: { rating: number; id: string },
): Promise<{
  anime: Anime[]
  nextCursor: { rating: number; id: string } | null
}> => {
  try {
    const trimmedSearch = search.trim()

    const where: Prisma.AnimeWhereInput =
      trimmedSearch.length > 0
        ? {
            title: { contains: trimmedSearch, mode: 'insensitive' },
            authorSlug,
          }
        : { authorSlug }

    const cursor: Prisma.AnimeFindManyArgs = !!lastCursor
      ? {
          cursor: {
            rating_id: {
              rating: lastCursor.rating,
              id: lastCursor.id,
            },
          },
          skip: 1,
        }
      : {}

    const anime = await prisma.anime.findMany({
      where,
      take: MAX_AUTHOR_ANIME + 1,
      orderBy: [{ rating: 'desc' }, { id: 'asc' }],
      ...cursor,
    })

    const hasNextPage = anime.length > MAX_AUTHOR_ANIME

    const slicedAnime = hasNextPage ? anime.slice(0, MAX_AUTHOR_ANIME) : anime

    const nextCursor =
      hasNextPage && slicedAnime.length > 0
        ? {
            rating: slicedAnime[slicedAnime.length - 1].rating,
            id: slicedAnime[slicedAnime.length - 1].id,
          }
        : null

    return { anime: slicedAnime, nextCursor }
  } catch (error) {
    console.error(error)
    throw new Error(ERRORS.SOMETHING_WRONG)
  }
}
