'use server'

import prisma from '@/lib/prisma'

export const getAuthorSubscribers = async (slug: string): Promise<number> => {
  try {
    return prisma.user.count({
      where: {
        subscriptionsAuthors: {
          some: {
            slug,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    return 0
  }
}
