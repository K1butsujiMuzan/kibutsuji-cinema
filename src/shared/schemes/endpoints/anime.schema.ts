import { z } from 'zod'
import { ERRORS } from '@/constants/errors'
import { ISO_DATE_REGEXP, SLUG_REGEXP } from '@/constants/regexp'
import { MAX_INT } from '@/constants/views_limit'

export const updateAnimeSchema = z.object({
  id: z
    .string({ message: ERRORS.INVALID('id') })
    .trim()
    .min(24, { message: ERRORS.MIN_LENGTH('Id', 24) }),
  ageLimit: z.enum(['AGE_6', 'AGE_12', 'AGE_16', 'AGE_18'], {
    message: ERRORS.INVALID('age limit'),
  }),
  description: z
    .string({ message: ERRORS.INVALID('description') })
    .trim()
    .nullable(),
  image: z
    .string({ message: ERRORS.INVALID('image') })
    .trim()
    .nullable(),
  originalTitle: z
    .string({ message: ERRORS.INVALID('original title') })
    .trim()
    .nullable(),
  episodesCount: z
    .number({ message: ERRORS.INVALID('episodes count') })
    .int({ message: ERRORS.INVALID_INT('Episodes count') })
    .nonnegative({ message: ERRORS.NEGATIVE_VALUE('Episodes count') })
    .max(MAX_INT, { message: ERRORS.MAX_VALUE('Episodes count', MAX_INT) }),
  episodesLength: z
    .number({ message: ERRORS.INVALID('episodes length') })
    .int({ message: ERRORS.INVALID_INT('Episodes length') })
    .nonnegative({ message: ERRORS.NEGATIVE_VALUE('Episodes length') })
    .max(MAX_INT, { message: ERRORS.MAX_VALUE('Episodes length', MAX_INT) }),
  releaseDate: z
    .string({ message: ERRORS.INVALID('release date') })
    .trim()
    .regex(ISO_DATE_REGEXP, { message: ERRORS.INVALID('release date') })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: ERRORS.INVALID('release date'),
    })
    .transform((value) => new Date(value)),
  slug: z
    .string({ message: ERRORS.INVALID('slug') })
    .trim()
    .min(3, { message: ERRORS.MIN_LENGTH('Slug', 3) })
    .regex(SLUG_REGEXP, { message: ERRORS.INVALID('slug format') }),
  status: z.enum(['ONGOING', 'COMPLETED', 'ANNOUNCEMENT'], {
    message: ERRORS.INVALID('status'),
  }),
  title: z
    .string({ message: ERRORS.INVALID('title') })
    .trim()
    .min(3, { message: ERRORS.MIN_LENGTH('Title', 3) }),
  type: z.enum(
    ['TVSERIES', 'MOVIE', 'SHORTFILM', 'SPECIAL', 'OVA', 'ONA', 'CLIP'],
    { message: ERRORS.INVALID('type') },
  ),
  genres: z.string({ message: ERRORS.INVALID('genres') }),
})

export const createAnimeSchema = updateAnimeSchema.omit({ id: true })
