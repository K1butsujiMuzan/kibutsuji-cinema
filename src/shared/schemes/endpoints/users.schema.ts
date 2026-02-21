import { z } from 'zod'
import { ERRORS } from '@/constants/errors'

export const updateUsersSchema = z.object({
  id: z
    .string({ message: ERRORS.INVALID('id') })
    .trim()
    .min(24, { message: ERRORS.MIN_LENGTH('Id', 24) }),
  email: z.email({ message: ERRORS.INVALID('email') }).trim(),
  name: z
    .string({ message: ERRORS.INVALID('name') })
    .trim()
    .min(3, { message: ERRORS.MIN_LENGTH('Name', 3) }),
  role: z.enum(['USER', 'MODERATOR', 'ADMIN'], {
    message: ERRORS.INVALID('role'),
  }),
  image: z
    .string({ message: ERRORS.INVALID('image') })
    .trim()
    .nullable(),
  isReceiveNotifications: z.boolean({
    message: ERRORS.INVALID('is receive notifications'),
  }),
  emailVerified: z.boolean({ message: ERRORS.INVALID('email verified') }),
})

export const createUsersSchema = z.object({
  email: z.email({ message: ERRORS.INVALID('email') }).trim(),
  name: z
    .string({ message: ERRORS.INVALID('name') })
    .trim()
    .min(3, { message: ERRORS.MIN_LENGTH('Name', 3) }),
  password: z
    .string({ message: ERRORS.INVALID('password') })
    .trim()
    .min(6, { message: ERRORS.MIN_LENGTH('Password', 6) }),
  isReceiveNotifications: z.boolean({
    message: ERRORS.INVALID('is receive notifications'),
  }),
})
