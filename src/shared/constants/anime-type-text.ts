import { type AnimeType } from '@/generated/prisma'

export const ANIME_TYPE_TEXT: Record<AnimeType, string> = {
  ONA: 'ONA',
  CLIP: 'Clip',
  OVA: 'OVA',
  MOVIE: 'Movie',
  SHORT_FILM: 'Short Film',
  SPECIAL: 'Special',
  TV_SERIES: 'TV Series',
}
