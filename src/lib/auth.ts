import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    minPasswordLength: 6,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false
      }
    }
  },
  trustedOrigins: [
    'http://localhost:3000',
    'https://kibutsuji-cinema.vercel.app'
  ]
})

export type User = typeof auth.$Infer.Session.user
export type Session = typeof auth.$Infer.Session