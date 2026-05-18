'use server'

import prisma from '@/lib/prisma'
import { getServerSession } from '@/lib/get-server-session'
import { ERRORS } from '@/constants/errors'

export async function getFriendList(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }
    return await prisma.friendLists.findMany({
      where: {
        OR: [
          { userToId: userId, status: 'FRIEND' },
          { userFromId: userId, status: 'FRIEND' },
        ],
      },
      include: {
        userFrom: { select: { id: true, name: true, image: true } },
        userTo: { select: { id: true, name: true, image: true } },
      },
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function getRequestList() {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }

    return await prisma.friendLists.findMany({
      where: {
        userToId: session.user.id,
        status: 'PENDING',
      },
      include: {
        userFrom: { select: { id: true, name: true, image: true } },
      },
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function getSentList() {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }

    return await prisma.friendLists.findMany({
      where: {
        userFromId: session.user.id,
        status: 'PENDING',
      },
      include: {
        userTo: { select: { id: true, name: true, image: true } },
      },
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function getMutualList(userId: string) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }

    if (userId === session.user.id) {
      return []
    }

    return prisma.$transaction(async (tx) => {
      const myFriends = await tx.friendLists.findMany({
        where: {
          OR: [
            { userToId: session.user.id, status: 'FRIEND' },
            { userFromId: session.user.id, status: 'FRIEND' },
          ],
        },
        select: {
          userFromId: true,
          userToId: true,
        },
      })

      const usersFriends = await tx.friendLists.findMany({
        where: {
          OR: [
            { userToId: userId, status: 'FRIEND' },
            { userFromId: userId, status: 'FRIEND' },
          ],
        },
        select: {
          userFromId: true,
          userToId: true,
        },
      })

      if (usersFriends.length === 0 || myFriends.length === 0) {
        return []
      }

      const myFriendsIds = myFriends.map((item) => {
        return item.userToId === session.user.id
          ? item.userFromId
          : item.userToId
      })

      const usersFriendsIds = usersFriends.map((item) => {
        return item.userToId === userId ? item.userFromId : item.userToId
      })

      const mutualIds = myFriendsIds.filter((id) =>
        usersFriendsIds.includes(id),
      )

      if (mutualIds.length === 0) {
        return []
      }

      return tx.user.findMany({
        where: {
          id: {
            in: mutualIds,
          },
        },
        select: {
          name: true,
          id: true,
          image: true,
        },
      })
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}
