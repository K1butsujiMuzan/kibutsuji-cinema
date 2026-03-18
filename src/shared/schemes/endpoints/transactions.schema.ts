import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH, MAX_INT } from '@/constants/limits'
import { SubscriptionType } from '@/generated/prisma'

export const updateTransactionsSchema = z.object(
  {
    id: z
      .string({ error: ERRORS.INVALID('id') })
      .trim()
      .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
    subscription: z.enum([SubscriptionType.FAN, SubscriptionType.MEGAFAN], {
      error: ERRORS.INVALID('subscription'),
    }),
    sum: z
      .number({ error: ERRORS.INVALID('sum') })
      .nonnegative({ error: ERRORS.NEGATIVE_VALUE('sum') })
      .max(MAX_INT, { error: ERRORS.MAX_VALUE('Sum', MAX_INT) }),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)

export const createTransactionsSchema = z.object(
  {
    subscription: z.enum([SubscriptionType.FAN, SubscriptionType.MEGAFAN], {
      error: ERRORS.INVALID('subscription'),
    }),
    userId: z
      .string({ error: ERRORS.INVALID('user id') })
      .trim()
      .min(ID_MIN_LENGTH, {
        error: ERRORS.MIN_LENGTH('User id', ID_MIN_LENGTH),
      }),
    sum: z
      .number({ error: ERRORS.INVALID('sum') })
      .nonnegative({ error: ERRORS.NEGATIVE_VALUE('sum') })
      .max(MAX_INT, { error: ERRORS.MAX_VALUE('Sum', MAX_INT) }),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)
