import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH } from '@/constants/limits'

export const updateGenresSchema = z.object({
  id: z
    .string({ error: ERRORS.INVALID('id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
  name: z
    .string({ message: ERRORS.INVALID('name') })
    .trim()
    .min(3, { message: ERRORS.MIN_LENGTH('Name', 3) })
    .toLowerCase(),
})

export const createGenresSchema = updateGenresSchema.pick({ name: true })
