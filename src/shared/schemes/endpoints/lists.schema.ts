import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH } from '@/constants/limits'
import { List } from '@/generated/prisma'

export const updateListsSchema = z.object({
  id: z
    .string({ error: ERRORS.INVALID('id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
  animeId: z
    .string({ error: ERRORS.INVALID('anime id') })
    .trim()
    .min(ID_MIN_LENGTH, {
      error: ERRORS.MIN_LENGTH('Anime Id', ID_MIN_LENGTH),
    }),
  userId: z
    .string({ error: ERRORS.INVALID('user id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('User id', ID_MIN_LENGTH) }),
  list: z.enum(
    [
      List.ABANDONED,
      List.COMPLETED,
      List.FAVORITE,
      List.PLANNED,
      List.WATCHING,
    ],
    { error: ERRORS.INVALID('list') },
  ),
})

export const createListsSchema = updateListsSchema.omit({ id: true })
