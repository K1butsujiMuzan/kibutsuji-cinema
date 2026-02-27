import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ID_MIN_LENGTH, MAX_INT } from '@/constants/limits'

export const updateEpisodesSchema = z.object({
  id: z
    .string({ error: ERRORS.INVALID('id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
  title: z
    .string({ error: ERRORS.INVALID('title') })
    .trim()
    .min(3, { error: ERRORS.MIN_LENGTH('Title', 3) }),
  animeId: z
    .string({ error: ERRORS.INVALID('anime id') })
    .trim()
    .min(ID_MIN_LENGTH, {
      error: ERRORS.MIN_LENGTH('Anime id', ID_MIN_LENGTH),
    }),
  episodeNumber: z
    .number({ error: ERRORS.INVALID('episodes number') })
    .int({ error: ERRORS.INVALID_INT('Episodes number') })
    .positive({ error: ERRORS.NEGATIVE_VALUE('Episodes number', 1) })
    .max(MAX_INT, { error: ERRORS.MAX_VALUE('Episodes number', MAX_INT) }),
  views: z
    .number({ error: ERRORS.INVALID('views') })
    .int({ error: ERRORS.INVALID_INT('Views') })
    .nonnegative({ error: ERRORS.NEGATIVE_VALUE('views') })
    .max(MAX_INT, { error: ERRORS.MAX_VALUE('Views', MAX_INT) }),
})

export const createEpisodesSchema = updateEpisodesSchema.omit({ id: true })
