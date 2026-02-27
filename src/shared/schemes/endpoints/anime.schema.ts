import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ISO_DATE_REGEXP, SLUG_REGEXP } from '@/constants/regexp'
import { ID_MIN_LENGTH, MAX_INT } from '@/constants/limits'

export const updateAnimeSchema = z.object({
  id: z
    .string({ error: ERRORS.INVALID('id') })
    .trim()
    .min(ID_MIN_LENGTH, { error: ERRORS.MIN_LENGTH('Id', ID_MIN_LENGTH) }),
  ageLimit: z.enum(['AGE_6', 'AGE_12', 'AGE_16', 'AGE_18'], {
    error: ERRORS.INVALID('age limit'),
  }),
  description: z
    .string({ error: ERRORS.INVALID('description') })
    .trim()
    .nullable(),
  image: z
    .string({ error: ERRORS.INVALID('image') })
    .trim()
    .nullable(),
  originalTitle: z
    .string({ error: ERRORS.INVALID('original title') })
    .trim()
    .nullable(),
  episodesCount: z
    .number({ error: ERRORS.INVALID('episodes count') })
    .int({ error: ERRORS.INVALID_INT('Episodes count') })
    .nonnegative({ error: ERRORS.NEGATIVE_VALUE('Episodes count') })
    .max(MAX_INT, { error: ERRORS.MAX_VALUE('Episodes count', MAX_INT) }),
  episodesLength: z
    .number({ error: ERRORS.INVALID('episodes length') })
    .int({ error: ERRORS.INVALID_INT('Episodes length') })
    .nonnegative({ error: ERRORS.NEGATIVE_VALUE('Episodes length') })
    .max(MAX_INT, { error: ERRORS.MAX_VALUE('Episodes length', MAX_INT) }),
  releaseDate: z
    .string({ error: ERRORS.INVALID('release date') })
    .trim()
    .regex(ISO_DATE_REGEXP, { error: ERRORS.INVALID('release date') })
    .refine((value) => !isNaN(Date.parse(value)), {
      error: ERRORS.INVALID('release date'),
    })
    .transform((value) => new Date(value)),
  slug: z
    .string({ error: ERRORS.INVALID('slug') })
    .trim()
    .min(3, { error: ERRORS.MIN_LENGTH('Slug', 3) })
    .regex(SLUG_REGEXP, { error: ERRORS.INVALID('slug format') }),
  status: z.enum(['ONGOING', 'COMPLETED', 'ANNOUNCEMENT'], {
    error: ERRORS.INVALID('status'),
  }),
  title: z
    .string({ error: ERRORS.INVALID('title') })
    .trim()
    .min(3, { error: ERRORS.MIN_LENGTH('Title', 3) }),
  type: z.enum(
    ['TVSERIES', 'MOVIE', 'SHORTFILM', 'SPECIAL', 'OVA', 'ONA', 'CLIP'],
    { error: ERRORS.INVALID('type') },
  ),
  genreNames: z.array(
    z.string({ error: ERRORS.INVALID('genre names') }).toLowerCase(),
    { error: ERRORS.INVALID('genre names') },
  ),
})

export const createAnimeSchema = updateAnimeSchema.omit({ id: true })
