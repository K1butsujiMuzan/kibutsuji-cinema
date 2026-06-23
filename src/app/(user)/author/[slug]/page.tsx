import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import CloudinaryImageButton from '@/components/ui/cloudinary-image-button/CloudinaryImageButton'
import AuthorInformation from '@/app/(user)/author/[slug]/(components)/AuthorInformation'
import AuthorAnimeList from '@/app/(user)/author/[slug]/(components)/AuthorAnimeList'

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
        <CloudinaryImageButton
          image={author.image}
          title={author.englishName}
          className={'h-41 w-29.5 md:h-66 md:w-47'}
          sizes={'(max-width: 800px) 118px, 188px'}
        />
        <div className={'flex flex-col gap-4'}>
          <AuthorInformation
            englishName={author.englishName}
            originalName={author.originalName}
            titles={author._count.anime}
            authorSlug={slug}
          />
          {author._count.anime > 0 && <AuthorAnimeList authorSlug={slug} />}
        </div>
      </div>
    </main>
  )
}
