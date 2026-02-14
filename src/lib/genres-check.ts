import { cors } from '@/lib/cors'
import { NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'

export const genresCheck = async (
  genres: string,
): Promise<{ error?: NextResponse; data?: { id: number }[] }> => {
  const trimmedGenres = genres.trim()
  if (!trimmedGenres) {
    return { data: [] }
  }

  const genresArray: number[] = trimmedGenres
    .split(' ')
    .map((item) => Number(item))

  if (genresArray.some(isNaN) || genresArray.includes(0)) {
    return {
      error: cors(
        NextResponse.json({ error: ERRORS.INVALID_GENRES }, { status: 400 }),
      ),
    }
  }

  const existingGenres = await prisma.animeGenre.findMany({
    where: {
      id: {
        in: genresArray,
      },
    },
  })

  if (existingGenres.length !== genresArray.length) {
    return {
      error: cors(
        NextResponse.json({ error: ERRORS.INVALID_GENRES }, { status: 400 }),
      ),
    }
  }

  return { data: genresArray.map((id) => ({ id })) }
}
