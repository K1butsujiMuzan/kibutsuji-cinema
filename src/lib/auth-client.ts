import { createAuthClient } from 'better-auth/react'
import { nextCookies } from 'better-auth/next-js'
import {
  inferAdditionalFields
} from "better-auth/client/plugins";
import type {auth} from "@/lib/auth";

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  requestPasswordReset,
  sendVerificationEmail,
  resetPassword,
} = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), nextCookies()],
})
