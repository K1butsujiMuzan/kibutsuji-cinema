import { cors } from '@/lib/routes-helpers/cors'
import { NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'

export const genresCheck = async (
  genreNames: string[],
): Promise<
  | { success: false; error: NextResponse }
  | { success: true; data: { name: string }[] }
> => {
  if (genreNames.length === 0) {
    return { success: true, data: [] }
  }

  const existingGenres = await prisma.animeGenre.findMany({
    where: {
      name: {
        in: genreNames,
        mode: 'insensitive',
      },
    },
  })

  if (existingGenres.length !== genreNames.length) {
    return {
      success: false,
      error: cors(
        NextResponse.json({ error: ERRORS.INVALID_GENRES }, { status: 400 }),
      ),
    }
  }

  return { success: true, data: genreNames.map((name) => ({ name })) }
}
