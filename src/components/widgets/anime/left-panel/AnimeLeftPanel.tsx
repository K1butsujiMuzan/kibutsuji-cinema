import AnimeWatchLink from '@/components/widgets/anime/left-panel/AnimeWatchLink'
import AnimeNoEpisodes from '@/components/widgets/anime/left-panel/AnimeNoEpisodes'
import AnimeBookmark from '@/components/ui/anime-bookmark/AnimeBookmark'
import AnimeLeftInformation from '@/components/widgets/anime/left-panel/AnimeLeftInformation'
import type {
  TAnimePage,
  TAnimePageFirstEpisode,
} from '@/shared/types/anime-page.type'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props extends TAnimePageFirstEpisode {
  anime: TAnimePage
  hasBanner: boolean
  isAuthorized: boolean
}

export default function AnimeLeftPanel({
  anime,
  firstEpisode,
  hasBanner,
  isAuthorized,
}: Props) {
  return (
    <div
      className={cn('flex flex-col gap-4', {
        ' -mt-20': hasBanner,
      })}
    >
      <span className={'relative rounded-md overflow-hidden h-91 w-full'}>
        <Image
          src={anime.image ?? '/images/global/base-avatar.jpg'}
          alt={anime.title}
          className={'object-cover'}
          fill={true}
          sizes={'260px'}
        />
      </span>
      {firstEpisode > 0 ? (
        <AnimeWatchLink animeSlug={anime.slug} firstEpisode={firstEpisode} />
      ) : (
        <AnimeNoEpisodes />
      )}
      {isAuthorized && <AnimeBookmark animeId={anime.id} />}
      <AnimeLeftInformation anime={anime} />
    </div>
  )
}
