import { ERRORS } from '@/constants/errors'
import {
  ID_MIN_LENGTH,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
} from '@/constants/limits'
import { z } from 'zod'

export const updateCommentsSchema = z.object({
  id: z
    .string({ error: ERRORS.INVALID('id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
  text: z
    .string({ error: ERRORS.INVALID('text') })
    .trim()
    .min(MIN_COMMENT_LENGTH, {
      error: ERRORS.MIN_LENGTH('Text', MIN_COMMENT_LENGTH),
    })
    .max(MAX_COMMENT_LENGTH, {
      error: ERRORS.MAX_VALUE('Text', MAX_COMMENT_LENGTH),
    }),
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
