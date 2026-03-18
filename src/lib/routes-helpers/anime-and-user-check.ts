import { animeCheck } from '@/lib/routes-helpers/anime-check'
import { userCheck } from '@/lib/routes-helpers/user-check'
import type { NextResponse } from 'next/server'

export const animeAndUserCheck = async (
  animeId: string,
  userId: string,
): Promise<NextResponse | null> => {
  const animeError = await animeCheck(animeId)

  if (animeError) {
    return animeError
  }

  const userError = await userCheck(userId)

  if (userError) {
    return userError
  }

  return null
}
