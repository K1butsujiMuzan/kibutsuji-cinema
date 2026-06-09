import type { Anime } from '@/generated/prisma'
import AnimeCatalogLink from '@/app/(user)/anime/[slug]/(components)/(left-panel)/AnimeCatalogLink'
import { ANIME_TYPE_TEXT } from '@/constants/anime-type-text'
import { dateMonthYearTransformer } from '@/utils/date-utils'
import AnimeEpisodesCount from '@/app/(user)/anime/[slug]/(components)/(left-panel)/AnimeEpisodesCount'
import { ANIME_STATUS_TEXT } from '@/constants/anime-status-text'
import AnimeInformationContainer from '@/app/(user)/anime/[slug]/(components)/(left-panel)/AnimeInformationContainer'

interface Props {
  anime: Anime
}

export default function AnimeLeftInformation({ anime }: Props) {
  return (
    <div className={'rounded-lg bg-white dark:bg-gray-800 flex flex-col p-2'}>
      <AnimeCatalogLink
        href={'#'}
        text={ANIME_TYPE_TEXT[anime.type]}
        title={'Type'}
      />
      <AnimeCatalogLink
        href={'#'}
        text={dateMonthYearTransformer(anime.releaseDate)}
        title={'Release'}
      />
      <AnimeEpisodesCount
        episodesReleased={anime.episodesReleased}
        episodesCount={anime.episodesCount}
        episodesLength={anime.episodesLength}
      />
      <AnimeCatalogLink
        href={'#'}
        text={ANIME_STATUS_TEXT[anime.status]}
        title={'Status'}
      />
      <AnimeInformationContainer
        text={anime.views.toLocaleString('en-EN')}
        title={'Views'}
      />
      {anime.authorName && (
        <AnimeCatalogLink href={'#'} text={anime.authorName} title={'Author'} />
      )}
    </div>
  )
}
