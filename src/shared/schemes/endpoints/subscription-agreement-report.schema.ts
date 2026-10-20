import { z } from 'zod'
import { ERRORS } from '@/shared/configs/errors.config'
import { ID_MIN_LENGTH } from '@/shared/constants/limits'

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
