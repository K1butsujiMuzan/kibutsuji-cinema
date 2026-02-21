import { cors } from '@/lib/routes-helpers/cors'
import { NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'

export const genresCheck = async (
  genres: string,
): Promise<
  | { success: false; error: NextResponse }
  | { success: true; data: { id: string }[] }
> => {
  const trimmedGenres = genres.trim()
  if (!trimmedGenres) {
    return { success: true, data: [] }
  }

  const genresArray: string[] = trimmedGenres.split(' ')

  const existingGenres = await prisma.animeGenre.findMany({
    where: {
      id: {
        in: genresArray,
      },
    },
  })

  if (existingGenres.length !== genresArray.length) {
    return {
      success: false,
      error: cors(
        NextResponse.json({ error: ERRORS.INVALID_GENRES }, { status: 400 }),
      ),
    }
  }

  return { success: true, data: genresArray.map((id) => ({ id })) }
}
