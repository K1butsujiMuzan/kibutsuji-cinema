import type { Metadata } from 'next'
import { findAnimeBySlug } from '@/server-actions/find-anime-by-slug'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const animeData = await findAnimeBySlug(slug)
  if (!animeData.anime) {
    return {
      title: {
        template: 'Anime not found - Kibutsuji',
        default: 'Anime not found',
      },
    }
  }

  return {
    title: {
      template: `Anime: ${animeData.anime.title}%s - Kibutsuji`,
      default: `Anime: ${animeData.anime.title}`,
    },
  }
}

export default function AnimeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
