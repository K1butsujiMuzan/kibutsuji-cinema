'use server'

import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { getServerSession } from '@/lib/get-server-session'
import type { TErrorResponse } from '@/shared/types/error-response.type'

export const getAuthorSubscription = async (
  authorSlug: string,
): Promise<boolean> => {
  try {
    const session = await getServerSession()

    if (!session) {
      return false
    }

    const subscribe = await prisma.user.findFirst({
      where: {
        id: session.user.id,
        subscriptionsAuthors: {
          some: {
            slug: authorSlug,
          },
        },
      },
    })

    return !!subscribe
  } catch (error) {
    console.error(error)
    return false
  }
}

export const authorSubscriptionAction = async (
  authorSlug: string,
  isSubscribe: boolean,
): Promise<TErrorResponse> => {
  try {
    const session = await getServerSession()

    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }

    if (!isSubscribe) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          subscriptionsAuthors: {
            disconnect: {
              slug: authorSlug,
            },
          },
        },
      })
      return { error: null }
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        subscriptionsAuthors: {
          connect: {
            slug: authorSlug,
          },
        },
      },
    })

    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}
