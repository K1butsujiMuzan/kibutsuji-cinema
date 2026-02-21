import { z } from 'zod'
import { ERRORS } from '@/constants/errors'

export const updateGenresSchema = z.object({
  id: z
    .string({ message: ERRORS.INVALID('id') })
    .trim()
    .min(24, { message: ERRORS.MIN_LENGTH('Id', 24) }),
  name: z
    .string({ message: ERRORS.INVALID('name') })
    .trim()
    .min(3, { message: ERRORS.MIN_LENGTH('Name', 3) }),
})

export const createGenresSchema = updateGenresSchema.pick({ name: true })
