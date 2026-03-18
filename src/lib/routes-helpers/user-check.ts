import prisma from '@/lib/prisma'
import { cors } from '@/lib/routes-helpers/cors'
import { NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'

export const userCheck = async (
  userId: string,
): Promise<NextResponse | null> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!existingUser) {
    return cors(
      NextResponse.json({ error: ERRORS.NOT_FOUND('User') }, { status: 404 }),
    )
  }

  return null
}
