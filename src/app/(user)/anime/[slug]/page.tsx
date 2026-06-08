import { findAnimeBySlug } from '@/server-actions/find-anime-by-slug'
import { notFound } from 'next/navigation'
import AnimeLeftPanel from '@/app/(user)/anime/[slug]/(components)/AnimeLeftPanel'
import AnimeRightPanel from '@/app/(user)/anime/[slug]/(components)/AnimeRightPanel'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function AnimePage({ params }: Props) {
  const { slug } = await params
  const animeData = await findAnimeBySlug(slug)

  if (!animeData.anime) {
    notFound()
  }

  return (
    <main className={'p-4 pb-8'}>
      <div className={'max-w-370 mx-auto'}>
        <div className={'h-90 bg-gray-400 rounded-xl'}></div>
        <div className={'grid grid-cols-[16.25rem_1fr] px-4'}>
          <AnimeLeftPanel
            anime={animeData.anime}
            firstEpisode={animeData.firstEpisode}
          />
          <AnimeRightPanel anime={animeData.anime} />
        </div>
      </div>
    </main>
  )
}
