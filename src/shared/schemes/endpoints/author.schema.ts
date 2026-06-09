import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH } from '@/constants/limits'

export const updateAuthorSchema = z.object(
  {
    id: z
      .string({ error: ERRORS.INVALID('id') })
      .trim()
      .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
    englishName: z
      .string({ error: ERRORS.INVALID('english name') })
      .trim()
      .min(3, { error: ERRORS.MIN_LENGTH('English name', 3) }),
    originalName: z
      .string({ error: ERRORS.INVALID('original name') })
      .trim()
      .min(3, { error: ERRORS.MIN_LENGTH('Original name', 3) })
      .nullable(),
    image: z
      .string({ error: ERRORS.INVALID('image') })
      .trim()
      .min(3, { error: ERRORS.MIN_LENGTH('Image', 3) })
      .nullable(),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)

export const createAuthorSchema = updateAuthorSchema.omit({ id: true })
