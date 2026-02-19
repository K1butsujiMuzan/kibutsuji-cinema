import { NextResponse } from 'next/server'
import { cors } from '@/lib/routes-helpers/cors'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import type { Anime, AnimeEpisode } from '@/generated/prisma'

export const episodesCheck = async (
  episodeNumber: number,
  animeId: string,
): Promise<
  | { success: false; error: NextResponse }
  | { success: true; anime: Anime & { episodes: AnimeEpisode[] } }
> => {
  if (episodeNumber < 1) {
    return {
      success: false,
      error: cors(
        NextResponse.json(
          { error: ERRORS.INVALID_EPISODE_NUMBER },
          { status: 400 },
        ),
      ),
    }
  }

  const existingAnime = await prisma.anime.findUnique({
    where: {
      id: animeId,
    },
    include: {
      episodes: true,
    },
  })

  if (!existingAnime) {
    return {
      success: false,
      error: cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Anime') },
          { status: 404 },
        ),
      ),
    }
  }

  return { success: true, anime: existingAnime }
}
