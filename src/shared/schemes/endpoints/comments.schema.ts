import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH } from '@/constants/limits'
import { z } from 'zod'

export const updateCommentsSchema = z.object({
  id: z
    .string({ error: ERRORS.INVALID('id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
  text: z
    .string({ error: ERRORS.INVALID('text') })
    .trim()
    .min(10, { error: ERRORS.MIN_LENGTH('Text', 10) }),
})

export const createCommentsSchema = z.object({
  episodeId: z
    .string({ error: ERRORS.INVALID('episode id') })
    .trim()
    .min(ID_MIN_LENGTH, {
      error: ERRORS.MIN_LENGTH('Episode id', ID_MIN_LENGTH),
    }),
  text: z
    .string({ error: ERRORS.INVALID('text') })
    .trim()
    .min(10, { error: ERRORS.MIN_LENGTH('Text', 10) }),
  userId: z
    .string({ error: ERRORS.INVALID('user id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('User id', ID_MIN_LENGTH) }),
})
