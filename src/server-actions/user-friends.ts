'use server'

import { getServerSession } from '@/lib/get-server-session'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'

export async function getUserFriend(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return []
    }
    return await prisma.friendLists.findMany({
      where: {
        OR: [
          { userToId: userId, userFromId: session.user.id },
          { userToId: session.user.id, userFromId: userId },
        ],
      },
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function addUserFriend(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.SOMETHING_WRONG }
    }

    return await prisma.$transaction(async (tx) => {
      const userFriendRequest = await tx.friendLists.findFirst({
        where: {
          OR: [
            { userToId: userId, userFromId: session.user.id },
            { userToId: session.user.id, userFromId: userId },
          ],
        },
      })

      if (userFriendRequest) {
        if (userFriendRequest.status === 'FRIEND') {
          return { error: ERRORS.ALREADY_FRIENDS }
        }

        if (userFriendRequest.status === 'BLOCKED') {
          return { error: ERRORS.USER_BLOCKED_YOU }
        }

        if (userFriendRequest.userToId === userId) {
          return tx.friendLists.update({
            where: {
              userFromId_userToId: {
                userToId: userId,
                userFromId: session.user.id,
              },
            },
            data: {
              status: 'FRIEND',
            },
          })
        }
        return tx.friendLists.update({
          where: {
            userFromId_userToId: {
              userToId: session.user.id,
              userFromId: userId,
            },
          },
          data: {
            status: 'FRIEND',
          },
        })
      }

      return tx.friendLists.create({
        data: {
          userFromId: session.user.id,
          userToId: userId,
          status: 'PENDING',
        },
      })
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function cancelUserFriend(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.SOMETHING_WRONG }
    }

    return await prisma.friendLists.delete({
      where: {
        userFromId_userToId: { userToId: userId, userFromId: session.user.id },
      },
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function blockUser(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.SOMETHING_WRONG }
    }

    return await prisma.$transaction(async (tx) => {
      await tx.friendLists.deleteMany({
        where: {
          OR: [
            { status: 'FRIEND', userToId: userId, userFromId: session.user.id },
            { status: 'FRIEND', userToId: session.user.id, userFromId: userId },
            {
              status: 'PENDING',
              userToId: userId,
              userFromId: session.user.id,
            },
            {
              status: 'PENDING',
              userToId: session.user.id,
              userFromId: userId,
            },
          ],
        },
      })

      return tx.friendLists.upsert({
        where: {
          userFromId_userToId: {
            userToId: userId,
            userFromId: session.user.id,
          },
        },
        update: {
          status: 'BLOCKED',
        },
        create: {
          userToId: userId,
          userFromId: session.user.id,
          status: 'BLOCKED',
        },
      })
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function unblockUser(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.SOMETHING_WRONG }
    }

    return await prisma.friendLists.delete({
      where: {
        userFromId_userToId: {
          userToId: userId,
          userFromId: session.user.id,
        },
      },
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function acceptUserFriend(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.SOMETHING_WRONG }
    }

    return await prisma.friendLists.update({
      where: {
        userFromId_userToId: {
          userToId: session.user.id,
          userFromId: userId,
        },
      },
      data: {
        status: 'FRIEND',
      },
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function declineUserFriend(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.SOMETHING_WRONG }
    }

    return await prisma.friendLists.delete({
      where: {
        userFromId_userToId: {
          userToId: session.user.id,
          userFromId: userId,
        },
      },
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function unfriendUserFriend(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.SOMETHING_WRONG }
    }

    return await prisma.friendLists.deleteMany({
      where: {
        OR: [
          { userToId: userId, userFromId: session.user.id },
          { userToId: session.user.id, userFromId: userId },
        ],
      },
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}
