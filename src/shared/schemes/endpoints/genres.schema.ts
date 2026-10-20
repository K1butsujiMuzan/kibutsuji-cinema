import { z } from 'zod'
import { ERRORS } from '@/shared/configs/errors.config'
import { ID_MIN_LENGTH } from '@/shared/constants/limits'

export const updateGenresSchema = z.object(
  {
    id: z
      .string({ error: ERRORS.INVALID('id') })
      .trim()
      .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
    name: z
      .string({ error: ERRORS.INVALID('name') })
      .trim()
      .min(3, { error: ERRORS.MIN_LENGTH('Name', 3) })
      .toLowerCase(),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)

export const createGenresSchema = updateGenresSchema.pick({ name: true })
