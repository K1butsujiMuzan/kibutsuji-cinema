import type { Anime } from '@/generated/prisma'

export type TAnimePage = Anime & { author: { englishName: string } | null }
export type TAnimePageFirstEpisode = { firstEpisode: number }
