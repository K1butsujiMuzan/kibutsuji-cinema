import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import AuthorInformation from '@/components/widgets/author/AuthorInformation'
import AuthorAnimeList from '@/components/widgets/author/AuthorAnimeList'
import Image from 'next/image'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = await prisma.author.findUnique({
    where: { slug },
    include: { _count: { select: { anime: true } } },
  })

  if (!author) {
    notFound()
  }

  return (
    <main className={'p-4 pb-8'}>
      <div
        className={
          'max-w-370 mx-auto flex flex-col items-center lg:items-start lg:grid lg:grid-cols-[auto_1fr] gap-1 lg:gap-4'
        }
      >
        <div className={'h-41 w-29.5 md:h-66 md:w-47 relative'}>
          <Image
            src={author.image ?? '/images/global/base-avatar.jpg'}
            alt={author.englishName}
            fill={true}
            sizes={'(max-width: 800px) 118px, 188px'}
            className={'object-cover'}
          />
        </div>
        <div className={'flex flex-col gap-4 w-full'}>
          <AuthorInformation
            englishName={author.englishName}
            originalName={author.originalName}
            authorSlug={slug}
          />
          {author._count.anime > 0 && <AuthorAnimeList authorSlug={slug} />}
        </div>
      </div>
    </main>
  )
}
