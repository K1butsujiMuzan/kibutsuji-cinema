import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH, MIN_PASSWORD_LENGTH } from '@/constants/limits'
import { $Enums } from '@/generated/prisma'
import Role = $Enums.Role

export const updateUsersSchema = z.object({
  id: z
    .string({ error: ERRORS.INVALID('id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
  email: z.email({ error: ERRORS.INVALID('email') }).trim(),
  name: z
    .string({ error: ERRORS.INVALID('name') })
    .trim()
    .min(3, { error: ERRORS.MIN_LENGTH('Name', 3) }),
  role: z.enum([Role.USER, Role.ADMIN, Role.MODERATOR], {
    error: ERRORS.INVALID('role'),
  }),
  image: z
    .string({ error: ERRORS.INVALID('image') })
    .trim()
    .nullable(),
  isReceiveNotifications: z.boolean({
    error: ERRORS.INVALID('is receive notifications'),
  }),
  emailVerified: z.boolean({ error: ERRORS.INVALID('email verified') }),
})

export const createUsersSchema = z.object({
  email: z.email({ error: ERRORS.INVALID('email') }).trim(),
  name: z
    .string({ error: ERRORS.INVALID('name') })
    .trim()
    .min(3, { error: ERRORS.MIN_LENGTH('Name', 3) }),
  password: z
    .string({ error: ERRORS.INVALID('password') })
    .trim()
    .min(6, { error: ERRORS.MIN_LENGTH('Password', MIN_PASSWORD_LENGTH) }),
  isReceiveNotifications: z.boolean({
    error: ERRORS.INVALID('is receive notifications'),
  }),
})

export const loginSchema = createUsersSchema.pick({
  email: true,
  password: true,
})
