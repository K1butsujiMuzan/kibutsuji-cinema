'use server'

import prisma from '@/lib/prisma'
import type {
  TAnimePage,
  TAnimePageFirstEpisode,
} from '@/shared/types/anime-page.type'

export const findAnimeBySlug = async (
  slug: string,
): Promise<{ anime: TAnimePage | null } & TAnimePageFirstEpisode> => {
  const anime = await prisma.anime.findUnique({
    where: { slug },
    include: { author: { select: { englishName: true } } },
  })
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
