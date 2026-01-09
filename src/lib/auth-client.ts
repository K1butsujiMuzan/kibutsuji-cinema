import { createAuthClient } from 'better-auth/react'
import { nextCookies } from 'better-auth/next-js'

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  requestPasswordReset,
  sendVerificationEmail,
  resetPassword,
} = createAuthClient({
  plugins: [nextCookies()],
})
