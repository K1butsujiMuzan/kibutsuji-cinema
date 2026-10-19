'use server'

import prisma from '@/lib/prisma'
import type {
  TAnimePage,
  TAnimePageFirstEpisode,
} from '@/shared/types/anime-page.type'
import { createImageUrl } from '@/utils/createImageUrl'

export const findAnimeBySlug = async (
  slug: string,
): Promise<{ anime: TAnimePage | null } & TAnimePageFirstEpisode> => {
  const data = await prisma.anime.findUnique({
    where: { slug },
    include: { author: { select: { englishName: true } } },
  })
  if (!data) {
    return { anime: null, firstEpisode: 0 }
  }
  const firstEpisode = await prisma.animeEpisode.aggregate({
    where: {
      animeId: data.id,
    },
    _min: {
      episodeNumber: true,
    },
  })

  const anime: TAnimePage = {
    ...data,
    image: data.image ? createImageUrl(data.image) : null,
    backgroundImage: data.backgroundImage
      ? createImageUrl(data.backgroundImage)
      : null,
  }

  return { anime, firstEpisode: firstEpisode._min.episodeNumber ?? 0 }
}
