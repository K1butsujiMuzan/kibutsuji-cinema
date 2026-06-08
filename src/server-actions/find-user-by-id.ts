'use server'

import prisma from '@/lib/prisma'

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({ where: { id: userId } })
}
