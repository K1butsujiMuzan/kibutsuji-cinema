import AnimeTopInformation from '@/app/(user)/anime/[slug]/(components)/AnimeTopInformation'
import type { TAnimePage } from '@/shared/types/anime-page.type'

interface Props {
  anime: TAnimePage
}

export default function AnimeRightPanel({ anime }: Props) {
  return (
    <div>
      <AnimeTopInformation
        title={anime.title}
        originalTitle={anime.originalTitle}
      />
    </div>
  )
}
