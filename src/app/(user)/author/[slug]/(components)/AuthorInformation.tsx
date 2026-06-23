import AuthorSubscribeButton from '@/app/(user)/author/[slug]/(components)/AuthorSubscribeButton'
import AuthorSubscribers from '@/app/(user)/author/[slug]/(components)/AuthorSubscribers'
import AuthorTitles from '@/app/(user)/author/[slug]/(components)/AuthorTitles'

interface Props {
  englishName: string
  originalName: string | null
  titles: number
  authorSlug: string
}

export default function AuthorInformation({
  englishName,
  originalName,
  titles,
  authorSlug,
}: Props) {
  return (
    <section
      className={
        'lg:bg-white lg:dark:bg-gray-800 lg:rounded-lg flex flex-col gap-4 px-4 py-3'
      }
    >
      <div
        className={
          'flex flex-col lg:flex-row justify-between gap-3 lg:gap-1 items-center lg:items-start'
        }
      >
        <div className={'flex flex-col gap-1 items-center lg:items-start'}>
          <h1 className={'text-2xl font-semibold'}>{englishName}</h1>
          {originalName && (
            <h2 className={'text-gray-650 dark:text-gray-150'}>
              {originalName}
            </h2>
          )}
        </div>
        <AuthorSubscribeButton authorSlug={authorSlug} />
      </div>
      <span
        className={'flex gap-3 items-center justify-center lg:justify-start'}
      >
        <AuthorTitles authorSlug={authorSlug} />
        <AuthorSubscribers authorSlug={authorSlug} />
      </span>
    </section>
  )
}
