import { cors } from '@/lib/routes-helpers/cors'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'

export const animeCheck = async (
  animeId: string,
): Promise<NextResponse | null> => {
  const existingAnime = await prisma.anime.findUnique({
    where: { id: animeId },
  })

  if (!existingAnime) {
    return cors(
      NextResponse.json({ error: ERRORS.NOT_FOUND('Anime') }, { status: 404 }),
    )
  }

  return null
}
