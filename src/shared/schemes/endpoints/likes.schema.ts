import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH } from '@/constants/limits'
import { LikeValue } from '@/generated/prisma'

export const updateLikesSchema = z.object(
  {
    id: z
      .string({ error: ERRORS.INVALID('id') })
      .trim()
      .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
    value: z.enum([LikeValue.LIKE, LikeValue.DISLIKE], {
      error: ERRORS.INVALID('value'),
    }),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)

export const createLikesSchema = z.object(
  {
    value: z.enum([LikeValue.LIKE, LikeValue.DISLIKE], {
      error: ERRORS.INVALID('value'),
    }),
    commentId: z
      .string({ error: ERRORS.INVALID('comment id') })
      .trim()
      .min(ID_MIN_LENGTH, {
        error: ERRORS.MIN_LENGTH('Comment id', ID_MIN_LENGTH),
      }),
    userId: z
      .string({ error: ERRORS.INVALID('user id') })
      .trim()
      .min(ID_MIN_LENGTH, {
        error: ERRORS.MIN_LENGTH('User id', ID_MIN_LENGTH),
      }),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)
