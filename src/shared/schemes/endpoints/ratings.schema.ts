import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH, RATING_MAX_VALUE } from '@/constants/limits'

export const updateRatingsSchema = z.object({
  id: z
    .string({ error: ERRORS.INVALID('id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
  rating: z
    .number({ error: ERRORS.INVALID('rating') })
    .int({ error: ERRORS.INVALID_INT('Rating') })
    .positive({ error: ERRORS.NEGATIVE_VALUE('Rating', 1) })
    .max(RATING_MAX_VALUE, {
      error: ERRORS.MAX_VALUE('Rating', RATING_MAX_VALUE),
    }),
})

export const createRatingsSchema = z.object({
  animeId: z
    .string({ error: ERRORS.INVALID('anime id') })
    .trim()
    .min(ID_MIN_LENGTH, {
      error: ERRORS.MIN_LENGTH('Anime id', ID_MIN_LENGTH),
    }),
  rating: z
    .number({ error: ERRORS.INVALID('rating') })
    .int({ error: ERRORS.INVALID_INT('Rating') })
    .positive({ error: ERRORS.NEGATIVE_VALUE('Rating', 1) })
    .max(RATING_MAX_VALUE, {
      error: ERRORS.MAX_VALUE('Rating', RATING_MAX_VALUE),
    }),
  userId: z
    .string({ error: ERRORS.INVALID('user id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('User id', ID_MIN_LENGTH) }),
})
