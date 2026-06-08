'use server'

import { getServerSession } from '@/lib/get-server-session'
import prisma from '@/lib/prisma'
import type { List, UserList } from '@/generated/prisma'
import { ERRORS } from '@/constants/errors'
import type { TErrorResponse } from '@/shared/types/error-response.type'

export const getAnimeBookmark = async (
  animeId: string,
): Promise<{ error: string } | UserList | null> => {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }

    return prisma.userList.findUnique({
      where: {
        animeId_userId: {
          animeId,
          userId: session.user.id,
        },
      },
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export const upsertAnimeBookmark = async (
  list: List,
  animeId: string,
): Promise<TErrorResponse> => {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }
    await prisma.userList.upsert({
      create: {
        animeId,
        userId: session.user.id,
        list,
      },
      update: {
        list,
      },
      where: {
        animeId_userId: {
          animeId,
          userId: session.user.id,
        },
      },
    })
    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}
