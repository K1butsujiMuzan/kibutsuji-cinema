import AnimeWatchLink from '@/components/widgets/anime/left-panel/AnimeWatchLink'
import AnimeNoEpisodes from '@/components/widgets/anime/left-panel/AnimeNoEpisodes'
import AnimeBookmark from '@/components/ui/anime-bookmark/AnimeBookmark'
import AnimeLeftInformation from '@/components/widgets/anime/left-panel/AnimeLeftInformation'
import type {
  TAnimePage,
  TAnimePageFirstEpisode,
} from '@/shared/types/anime-page.type'
import CloudinaryImageButton from '@/components/ui/cloudinary-image-button/CloudinaryImageButton'
import { cn } from '@/lib/utils'

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
      <CloudinaryImageButton
        image={anime.image}
        title={anime.title}
        className={'w-full h-91'}
        sizes={'260px'}
      />
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
