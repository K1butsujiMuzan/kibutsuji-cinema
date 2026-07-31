'use server'

import type { Anime } from '@/generated/prisma'
import prisma from '@/lib/prisma'

type TAnimeInformation = Pick<
  Anime,
  'id' | 'slug' | 'type' | 'rating' | 'image' | 'title'
>

export const getPopularAnime = async (): Promise<TAnimeInformation[]> => {
  try {
    return prisma.anime.findMany({
      take: 20,
      orderBy: {
        views: 'desc',
      },
      select: {
        id: true,
        slug: true,
        type: true,
        rating: true,
        image: true,
        title: true,
      },
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
