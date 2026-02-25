import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { DELETE_LIMIT } from '@/constants/limits'

export const deleteIdsSchema = z
  .array(z.string({ message: ERRORS.INVALID('id(s)') }), {
    message: ERRORS.TRANSMITTED_DATA,
  })
  .max(DELETE_LIMIT, { message: ERRORS.DELETE_DATA_LIMIT })
