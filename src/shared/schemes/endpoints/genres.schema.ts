import { z } from 'zod'
import { ERRORS } from '@/constants/errors'

export const updateGenresSchema = z.object({
  id: z
    .number({ message: ERRORS.INVALID('id') })
    .int({ message: ERRORS.INVALID_INT('Id') })
    .positive({ message: ERRORS.NEGATIVE_VALUE('Id', 1) }),
  name: z
    .string({ message: ERRORS.INVALID('name') })
    .trim()
    .min(3, { message: ERRORS.MIN_LENGTH('Name', 3) }),
})

export const createGenresSchema = updateGenresSchema.pick({ name: true })
