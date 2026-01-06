import { z } from 'zod'

export const registerScheme = z.object({
  email: z.email(),
  password: z.string().min(8),
  agreement: z.boolean(),
})

export const resetScheme = registerScheme.pick({ email: true })
export const loginScheme = registerScheme.pick({ email: true, password: true })

export type TRegister = z.infer<typeof registerScheme>
export type TReset = z.infer<typeof resetScheme>
export type TLogin = z.infer<typeof loginScheme>
