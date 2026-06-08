import AnimeTopInformation from '@/app/(user)/anime/[slug]/(components)/AnimeTopInformation'
import type { Anime } from '@/generated/prisma'

interface Props {
  anime: Anime
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
