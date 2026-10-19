'use server'

import type { Anime } from '@/generated/prisma'
import prisma from '@/lib/prisma'
import { createImageUrl } from '@/utils/createImageUrl'

type TAnimeInformation = Pick<
  Anime,
  'id' | 'slug' | 'type' | 'rating' | 'image' | 'title'
>

export const getPopularAnime = async (): Promise<TAnimeInformation[]> => {
  try {
    const anime = await prisma.anime.findMany({
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

    return anime.map((item) => ({
      ...item,
      image: item.image ? createImageUrl(item.image) : null,
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}
