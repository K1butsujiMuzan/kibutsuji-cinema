import AnimeInformation from '@/app/(user)/anime/[slug]/(components)/AnimeInformation'
import type { TAnimePage } from '@/shared/types/anime-page.type'
import { cn } from '@/lib/utils'

interface Props {
  anime: TAnimePage
  hasBanner: boolean
}

export default function AnimeRightPanel({ anime, hasBanner }: Props) {
  return (
    <div
      className={cn('', {
        'py-4': hasBanner,
      })}
    >
      <AnimeInformation
        title={anime.title}
        originalTitle={anime.originalTitle}
      />
    </div>
  )
}
