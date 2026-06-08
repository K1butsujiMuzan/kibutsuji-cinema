'use server'

import prisma from '@/lib/prisma'
import type { Anime } from '@/generated/prisma'

export const findAnimeBySlug = async (
  slug: string,
): Promise<{ anime: Anime | null; firstEpisode: number }> => {
  const anime = await prisma.anime.findUnique({ where: { slug } })
  if (!anime) {
    return { anime: null, firstEpisode: 0 }
  }
  const firstEpisode = await prisma.animeEpisode.aggregate({
    where: {
      animeId: anime.id,
    },
    _min: {
      episodeNumber: true,
    },
  })
  return { anime, firstEpisode: firstEpisode._min.episodeNumber ?? 0 }
}
