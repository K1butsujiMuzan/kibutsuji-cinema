import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH } from '@/constants/limits'

export const subscriptionAgreementReportSchema = z.object(
  {
    userId: z
      .string({ error: ERRORS.INVALID('user id') })
      .trim()
      .min(ID_MIN_LENGTH, {
        error: ERRORS.MIN_LENGTH('User id', ID_MIN_LENGTH),
      }),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)
