import { z } from 'zod'
import { ERRORS } from '@/shared/configs/errors.config'
import { DELETE_LIMIT, ID_MIN_LENGTH } from '@/shared/constants/limits'

export const deleteIdsSchema = z
  .array(
    z
      .string({ error: ERRORS.INVALID('id(s)') })
      .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
    {
      error: ERRORS.TRANSMITTED_DATA,
    },
  )
  .max(DELETE_LIMIT, { error: ERRORS.DELETE_DATA_LIMIT })
