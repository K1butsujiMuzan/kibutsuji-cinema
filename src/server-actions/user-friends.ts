'use server'

import { getServerSession } from '@/lib/get-server-session'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import type { FriendLists } from '@/generated/prisma'
import type { TErrorResponse } from '@/shared/types/error-response.type'

async function checkSessionAndId(
  userId: string,
): Promise<
  { success: false; error: string } | { success: true; sessionId: string }
> {
  const session = await getServerSession()
  if (!session) {
    return { success: false, error: ERRORS.SOMETHING_WRONG }
  }

  if (userId === session.user.id) {
    return { success: false, error: ERRORS.TRANSMITTED_DATA }
  }

  return { success: true, sessionId: session.user.id }
}

export async function getUserFriend(userId: string): Promise<FriendLists[]> {
  try {
    const sessionCheck = await checkSessionAndId(userId)

    if (!sessionCheck.success) {
      return []
    }

    const { sessionId } = sessionCheck

    return await prisma.friendLists.findMany({
      where: {
        OR: [
          { userToId: userId, userFromId: sessionId },
          { userToId: sessionId, userFromId: userId },
        ],
      },
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function addUserFriend(userId: string): Promise<TErrorResponse> {
  try {
    const sessionCheck = await checkSessionAndId(userId)

    if (!sessionCheck.success) {
      return { error: sessionCheck.error }
    }

    const { sessionId } = sessionCheck

    const result: TErrorResponse = await prisma.$transaction(
      async (tx): Promise<{ error: string | null }> => {
        const userFriendRequest = await tx.friendLists.findFirst({
          where: {
            OR: [
              { userToId: userId, userFromId: sessionId },
              { userToId: sessionId, userFromId: userId },
            ],
          },
        })

        if (userFriendRequest) {
          if (userFriendRequest.status === 'FRIEND') {
            return { error: ERRORS.ALREADY_FRIENDS }
          }

          if (userFriendRequest.status === 'BLOCKED') {
            if (userFriendRequest.userToId === userId) {
              return { error: ERRORS.YOU_BLOCKED_USER }
            }
            return { error: ERRORS.USER_BLOCKED_YOU }
          }

          await tx.friendLists.update({
            where: {
              id: userFriendRequest.id,
            },
            data: {
              status: 'FRIEND',
            },
          })
          return { error: null }
        }

        await tx.friendLists.create({
          data: {
            userFromId: sessionId,
            userToId: userId,
            status: 'PENDING',
          },
        })

        return { error: null }
      },
    )
    return { error: result.error }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function cancelUserFriend(
  userId: string,
): Promise<TErrorResponse> {
  try {
    const sessionCheck = await checkSessionAndId(userId)

    if (!sessionCheck.success) {
      return { error: sessionCheck.error }
    }

    const { sessionId } = sessionCheck

    await prisma.friendLists.deleteMany({
      where: {
        userToId: userId,
        userFromId: sessionId,
      },
    })
    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function blockUser(userId: string): Promise<TErrorResponse> {
  try {
    const sessionCheck = await checkSessionAndId(userId)

    if (!sessionCheck.success) {
      return { error: sessionCheck.error }
    }

    const { sessionId } = sessionCheck

    await prisma.$transaction(async (tx) => {
      await tx.friendLists.deleteMany({
        where: {
          OR: [
            { status: 'FRIEND', userToId: userId, userFromId: sessionId },
            { status: 'FRIEND', userToId: sessionId, userFromId: userId },
            {
              status: 'PENDING',
              userToId: userId,
              userFromId: sessionId,
            },
            {
              status: 'PENDING',
              userToId: sessionId,
              userFromId: userId,
            },
          ],
        },
      })

      await tx.friendLists.upsert({
        where: {
          userFromId_userToId: {
            userToId: userId,
            userFromId: sessionId,
          },
        },
        update: {
          status: 'BLOCKED',
        },
        create: {
          userToId: userId,
          userFromId: sessionId,
          status: 'BLOCKED',
        },
      })
    })

    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function unblockUser(userId: string): Promise<TErrorResponse> {
  try {
    const sessionCheck = await checkSessionAndId(userId)

    if (!sessionCheck.success) {
      return { error: sessionCheck.error }
    }

    const { sessionId } = sessionCheck

    await prisma.friendLists.deleteMany({
      where: {
        userToId: userId,
        userFromId: sessionId,
      },
    })
    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function acceptUserFriend(
  userId: string,
): Promise<TErrorResponse> {
  try {
    const sessionCheck = await checkSessionAndId(userId)

    if (!sessionCheck.success) {
      return { error: sessionCheck.error }
    }

    const { sessionId } = sessionCheck

    await prisma.friendLists.updateMany({
      where: {
        userToId: sessionId,
        userFromId: userId,
      },
      data: {
        status: 'FRIEND',
      },
    })
    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function declineUserFriend(
  userId: string,
): Promise<TErrorResponse> {
  try {
    const sessionCheck = await checkSessionAndId(userId)

    if (!sessionCheck.success) {
      return { error: sessionCheck.error }
    }

    const { sessionId } = sessionCheck

    await prisma.friendLists.deleteMany({
      where: {
        userToId: sessionId,
        userFromId: userId,
      },
    })

    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function unfriendUserFriend(
  userId: string,
): Promise<TErrorResponse> {
  try {
    const sessionCheck = await checkSessionAndId(userId)

    if (!sessionCheck.success) {
      return { error: sessionCheck.error }
    }

    const { sessionId } = sessionCheck

    await prisma.friendLists.deleteMany({
      where: {
        OR: [
          { userToId: userId, userFromId: sessionId, status: 'FRIEND' },
          { userToId: sessionId, userFromId: userId, status: 'FRIEND' },
        ],
      },
    })
    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}
