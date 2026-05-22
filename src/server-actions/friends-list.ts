'use server'

import prisma from '@/lib/prisma'
import { getServerSession } from '@/lib/get-server-session'
import { ERRORS } from '@/constants/errors'
import { MAX_PROFILE_RECORDS } from '@/constants/limits'
import type { FriendLists, User } from '@/generated/prisma'

type TFriend = Promise<
  | { error: string }
  | {
      data: (Pick<FriendLists, 'createdAt'> &
        Pick<User, 'id' | 'name' | 'image'>)[]
      hasNext: boolean
    }
>

export async function getFriendList(userId: string, page: number): TFriend {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }
    const friends = await prisma.friendLists.findMany({
      where: {
        OR: [
          { userToId: userId, status: 'FRIEND' },
          { userFromId: userId, status: 'FRIEND' },
        ],
      },
      take: MAX_PROFILE_RECORDS,
      skip: MAX_PROFILE_RECORDS * (page - 1),
      include: {
        userFrom: { select: { id: true, name: true, image: true } },
        userTo: { select: { id: true, name: true, image: true } },
      },
    })
    const count = await prisma.friendLists.count({
      where: {
        OR: [
          { userToId: userId, status: 'FRIEND' },
          { userFromId: userId, status: 'FRIEND' },
        ],
      },
    })
    const transformedFriends = friends.map((item) => ({
      id: item.userTo.id === userId ? item.userFrom.id : item.userTo.id,
      name: item.userTo.id === userId ? item.userFrom.name : item.userTo.name,
      image:
        item.userTo.id === userId ? item.userFrom.image : item.userTo.image,
      createdAt: item.updatedAt,
    }))

    return {
      data: transformedFriends,
      hasNext: count - page * MAX_PROFILE_RECORDS > 0,
    }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function getRequestList(page: number): TFriend {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }

    const data = await prisma.friendLists.findMany({
      where: {
        userToId: session.user.id,
        status: 'PENDING',
      },
      take: MAX_PROFILE_RECORDS,
      skip: MAX_PROFILE_RECORDS * (page - 1),
      include: {
        userFrom: { select: { id: true, name: true, image: true } },
      },
    })
    const transformedData = data.map((item) => ({
      id: item.userFrom.id,
      image: item.userFrom.image,
      name: item.userFrom.name,
      createdAt: item.createdAt,
    }))

    const count = await prisma.friendLists.count({
      where: {
        userToId: session.user.id,
        status: 'PENDING',
      },
    })

    return {
      data: transformedData,
      hasNext: count - page * MAX_PROFILE_RECORDS > 0,
    }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function getSentList(page: number): TFriend {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }

    const data = await prisma.friendLists.findMany({
      where: {
        userFromId: session.user.id,
        status: 'PENDING',
      },
      take: MAX_PROFILE_RECORDS,
      skip: MAX_PROFILE_RECORDS * (page - 1),
      include: {
        userTo: { select: { id: true, name: true, image: true } },
      },
    })

    const transformedData = data.map((item) => ({
      id: item.userTo.id,
      name: item.userTo.name,
      image: item.userTo.image,
      createdAt: item.createdAt,
    }))

    const count = await prisma.friendLists.count({
      where: {
        userFromId: session.user.id,
        status: 'PENDING',
      },
    })

    return {
      data: transformedData,
      hasNext: count - page * MAX_PROFILE_RECORDS > 0,
    }
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}

export async function getMutualList(userId: string, page: number): TFriend {
  try {
    const session = await getServerSession()
    if (!session) {
      return { error: ERRORS.UNAUTHORIZED }
    }

    if (userId === session.user.id) {
      return {
        data: [],
        hasNext: false,
      }
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
        return {
          data: [],
          hasNext: false,
        }
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
        return {
          data: [],
          hasNext: false,
        }
      }

      const data = await tx.user.findMany({
        where: {
          id: {
            in: mutualIds,
          },
        },
        take: MAX_PROFILE_RECORDS,
        skip: MAX_PROFILE_RECORDS * (page - 1),
        select: {
          name: true,
          id: true,
          image: true,
          createdAt: true,
        },
      })

      const count = await tx.user.count({
        where: {
          id: {
            in: mutualIds,
          },
        },
      })

      return { data, hasNext: count - page * MAX_PROFILE_RECORDS > 0 }
    })
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}
