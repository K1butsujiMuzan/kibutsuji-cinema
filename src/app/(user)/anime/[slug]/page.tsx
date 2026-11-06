import { findAnimeBySlug } from '@/server-actions/find-anime-by-slug'
import { notFound } from 'next/navigation'
import AnimeLeftPanel from '@/components/widgets/anime/left-panel/AnimeLeftPanel'
import AnimeRightPanel from '@/components/widgets/anime/right-panel/AnimeRightPanel'
import { getServerSession } from '@/lib/get-server-session'
import Image from 'next/image'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function AnimePage({ params }: Props) {
  const { slug } = await params
  const animeData = await findAnimeBySlug(slug)
  const session = await getServerSession()

  if (!animeData.anime) {
    notFound()
  }

  return (
    <main className={'p-4 pb-8'}>
      <div className={'max-w-370 mx-auto'}>
        {!!animeData.anime.backgroundImage && (
          <div
            className={
              'relative h-90 rounded-xl overflow-hidden after:content-[""] after:block after:inset-0 after:absolute  after:bg-linear-to-t  after:from-black/90 after:from-10% after:to-black/0 after:to-50%'
            }
          >
            <Image
              src={animeData.anime.backgroundImage}
              alt={''}
              className={'object-cover'}
              fill={true}
              sizes={'100vw'}
              preload={true}
            />
          </div>
        )}
        <section className={'grid grid-cols-[16.25rem_1fr] px-4 gap-8'}>
          <AnimeLeftPanel
            hasBanner={!!animeData.anime.backgroundImage}
            isAuthorized={!!session}
            anime={animeData.anime}
            firstEpisode={animeData.firstEpisode}
          />
          <AnimeRightPanel
            hasBanner={!!animeData.anime.backgroundImage}
            anime={animeData.anime}
          />
        </section>
      </div>
    </main>
  )
}
