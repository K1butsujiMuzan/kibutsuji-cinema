'use server'

import { cache } from 'react'
import prisma from '@/lib/prisma'

export const findUserById = cache(async (userId: string) => {
  return prisma.user.findUnique({ where: { id: userId } })
})
