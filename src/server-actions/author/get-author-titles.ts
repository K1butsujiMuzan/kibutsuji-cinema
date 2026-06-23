'use server'

import prisma from '@/lib/prisma'

export const getAuthorTitles = async (slug: string): Promise<number> => {
  try {
    return prisma.anime.count({
      where: {
        authorSlug: slug,
      },
    })
  } catch (error) {
    console.error(error)
    return 0
  }
}
