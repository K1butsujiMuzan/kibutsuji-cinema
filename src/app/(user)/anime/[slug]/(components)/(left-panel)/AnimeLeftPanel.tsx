import AnimeWatchLink from '@/app/(user)/anime/[slug]/(components)/(left-panel)/AnimeWatchLink'
import AnimeNoEpisodes from '@/app/(user)/anime/[slug]/(components)/(left-panel)/AnimeNoEpisodes'
import AnimeBookmark from '@/app/(user)/anime/[slug]/(components)/(left-panel)/AnimeBookmark'
import AnimeLeftInformation from '@/app/(user)/anime/[slug]/(components)/(left-panel)/AnimeLeftInformation'
import type {
  TAnimePage,
  TAnimePageFirstEpisode,
} from '@/shared/types/anime-page.type'
import CloudinaryImageButton from '@/components/ui/cloudinary-image-button/CloudinaryImageButton'

interface Props extends TAnimePageFirstEpisode {
  anime: TAnimePage
  isAuthorized: boolean
}

export default function AnimeLeftPanel({
  anime,
  firstEpisode,
  isAuthorized,
}: Props) {
  return (
    <div className={'flex flex-col gap-4'}>
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
