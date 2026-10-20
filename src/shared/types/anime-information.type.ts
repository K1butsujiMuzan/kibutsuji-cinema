import type { Anime } from '@/generated/prisma'

export type TAnimeInformation = Pick<
  Anime,
  'id' | 'slug' | 'type' | 'rating' | 'image' | 'title'
>
