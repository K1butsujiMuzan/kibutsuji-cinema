import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH } from '@/constants/limits'
import { SubscriptionType } from '@/generated/prisma'
import { ISO_DATE_REGEXP } from '@/constants/regexp'

export const updateSubscriptionsSchema = z.object(
  {
    id: z
      .string({ error: ERRORS.INVALID('id') })
      .trim()
      .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
    type: z.enum([SubscriptionType.FAN, SubscriptionType.MEGAFAN], {
      error: ERRORS.INVALID('type'),
    }),
    endDate: z
      .string({ error: ERRORS.INVALID('end date') })
      .trim()
      .regex(ISO_DATE_REGEXP, { error: ERRORS.INVALID('end date') })
      .refine((value) => !isNaN(Date.parse(value)), {
        error: ERRORS.INVALID('end date'),
      })
      .refine((value) => new Date(value).getTime() > Date.now(), {
        error: ERRORS.INVALID_END_DATE,
      })
      .transform((value) => new Date(value)),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)

export const createSubscriptionsSchema = z.object(
  {
    type: z.enum([SubscriptionType.FAN, SubscriptionType.MEGAFAN], {
      error: ERRORS.INVALID('type'),
    }),
    endDate: z
      .string({ error: ERRORS.INVALID('end date') })
      .trim()
      .regex(ISO_DATE_REGEXP, { error: ERRORS.INVALID('end date') })
      .refine((value) => !isNaN(Date.parse(value)), {
        error: ERRORS.INVALID('end date'),
      })
      .refine((value) => new Date(value).getTime() > Date.now(), {
        error: ERRORS.INVALID_END_DATE,
      })
      .transform((value) => new Date(value)),
    userId: z
      .string({ error: ERRORS.INVALID('user id') })
      .trim()
      .min(ID_MIN_LENGTH, {
        error: ERRORS.MIN_LENGTH('User id', ID_MIN_LENGTH),
      }),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)
