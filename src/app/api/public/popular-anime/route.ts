import { NextResponse } from 'next/server'
import type { TServerResponse } from '@/shared/types/server-response.type'
import type { TAnimeInformation } from '@/shared/types/anime-information.type'
import { ERRORS } from '@/shared/configs/errors.config'
import { POPULAR_ANIME_LIMIT } from '@/shared/constants/limits'
import prisma from '@/lib/prisma'
import { createImageUrl } from '@/utils/createImageUrl'

export async function GET(): Promise<
  NextResponse<TServerResponse<TAnimeInformation[]>>
> {
  try {
    const anime = await prisma.anime.findMany({
      take: POPULAR_ANIME_LIMIT,
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

    const data = anime.map((item) => ({
      ...item,
      image: item.image ? createImageUrl(item.image) : null,
    }))

    return NextResponse.json({
      success: true,
      data,
    })
  } catch {
    return NextResponse.json({
      success: false,
      error: {
        message: ERRORS.INTERNAL_ERROR,
        code: 'INTERNAL_ERROR',
        status: 500,
      },
    })
  }
}
