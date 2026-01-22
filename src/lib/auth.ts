import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/nodemailer'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  baseURL: process.env.BETTER_AUTH_URL,

  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }, request) => {
      try {
        await sendEmail(user.email, 'Password Reset', url, 'password-reset')
      } catch (error) {
        console.error(error)
      }
    },
    resetPasswordTokenExpiresIn: 3600,
    minPasswordLength: 6,
    maxPasswordLength: 50,
  },

  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendEmail(
          user.email,
          'Email Verification',
          url,
          'email-verification',
        )
      } catch (error) {
        console.error(error)
      }
    },
    expiresIn: 86400,
  },

  user: {
    additionalFields: {
      isReceiveNotifications: {
        type: 'boolean',
        input: true,
        required: false,
        defaultValue: false,
      },
      role: {
        type: 'string',
        input: false,
        required: false,
      },
    },
  },

  trustedOrigins: [
    'http://localhost:3000',
    'https://kibutsuji-cinema.vercel.app',
  ],
})

export type User = typeof auth.$Infer.Session.user
export type Session = typeof auth.$Infer.Session
