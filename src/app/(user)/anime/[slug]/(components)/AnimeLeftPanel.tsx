import AnimeImage from '@/app/(user)/anime/[slug]/(components)/AnimeImage'
import type { Anime } from '@/generated/prisma'
import AnimeWatchLink from '@/app/(user)/anime/[slug]/(components)/AnimeWatchLink'
import AnimeNoEpisodes from '@/app/(user)/anime/[slug]/(components)/AnimeNoEpisodes'
import AnimeBookmark from '@/app/(user)/anime/[slug]/(components)/AnimeBookmark'
import AnimeLeftInformation from '@/app/(user)/anime/[slug]/(components)/AnimeLeftInformation'

interface Props {
  anime: Anime
  firstEpisode: number
}

export default function AnimeLeftPanel({ anime, firstEpisode }: Props) {
  return (
    <div className={'flex flex-col gap-4'}>
      <AnimeImage image={anime.image} title={anime.title} />
      {firstEpisode > 0 ? (
        <AnimeWatchLink animeSlug={anime.slug} firstEpisode={firstEpisode} />
      ) : (
        <AnimeNoEpisodes />
      )}
      <AnimeBookmark animeId={anime.id} />
      <AnimeLeftInformation anime={anime} />
    </div>
  )
}
