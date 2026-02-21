import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { MAX_INT } from '@/constants/views_limit'

export const updateEpisodesSchema = z.object({
  id: z
    .string({ message: ERRORS.INVALID('id') })
    .trim()
    .min(24, { message: ERRORS.MIN_LENGTH('Id', 24) }),
  title: z
    .string({ message: ERRORS.INVALID('title') })
    .trim()
    .min(3, { message: ERRORS.MIN_LENGTH('Title', 3) }),
  animeId: z
    .string({ message: ERRORS.INVALID('anime id') })
    .trim()
    .min(24, { message: ERRORS.MIN_LENGTH('Anime id', 24) }),
  episodeNumber: z
    .number({ message: ERRORS.INVALID('episodes number') })
    .int({ message: ERRORS.INVALID_INT('Episodes number') })
    .positive({ message: ERRORS.NEGATIVE_VALUE('Episodes number', 1) })
    .max(MAX_INT, { message: ERRORS.MAX_VALUE('Episodes number', MAX_INT) }),
  views: z
    .number({ message: ERRORS.INVALID('views') })
    .int({ message: ERRORS.INVALID_INT('Views') })
    .nonnegative({ message: ERRORS.NEGATIVE_VALUE('views') })
    .max(MAX_INT, { message: ERRORS.MAX_VALUE('Views', MAX_INT) }),
})

export const createEpisodesSchema = updateEpisodesSchema.omit({ id: true })
