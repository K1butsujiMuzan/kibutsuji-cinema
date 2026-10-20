import { z } from 'zod'
import { ERRORS } from '@/shared/configs/errors.config'
import { REPORT_LIMIT } from '@/shared/constants/limits'

export const excelReportSchema = z.object(
  {
    fromDate: z.iso
      .datetime({ error: ERRORS.INVALID('from date') })
      .transform((value) => new Date(value)),
    toDate: z.iso
      .datetime({ error: ERRORS.INVALID('to date') })
      .transform((value) => new Date(value)),
    limit: z
      .number({ error: ERRORS.INVALID('limit') })
      .int({ error: ERRORS.INVALID_INT('Limit') })
      .positive({ error: ERRORS.NEGATIVE_VALUE('Limit') })
      .max(REPORT_LIMIT, { error: ERRORS.MAX_VALUE('Limit', REPORT_LIMIT) }),
  },
  { error: ERRORS.TRANSMITTED_DATA },
)
