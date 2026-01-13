import { z } from 'zod'

export const registerScheme = z.object({
  email: z.email(),
  password: z.string().min(6).max(50),
  isReceiveNotifications: z.boolean(),
})

export const newPasswordSchema = z
  .object({
    password: z.string().min(6).max(50),
    passwordRepeat: z.string().min(6).max(50),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords don't match",
  })

export const resetScheme = registerScheme.pick({ email: true })
export const loginScheme = registerScheme.pick({ email: true, password: true })

export type TRegister = z.infer<typeof registerScheme>
export type TReset = z.infer<typeof resetScheme>
export type TLogin = z.infer<typeof loginScheme>
export type TNewPassword = z.infer<typeof newPasswordSchema>
