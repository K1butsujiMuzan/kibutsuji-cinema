import AnimeCardLoader from '@/components/ui/anime-card/AnimeCardLoader'

type Props = {
  count: number
}

export default function AnimeCardLoaderList({ count }: Props) {
  return (
    <div
      className={
        'w-full grid xxs:grid-cols-2 sn:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2'
      }
    >
      {[...Array(count)].map((_, index) => (
        <AnimeCardLoader key={`loader-${index}`} />
      ))}
    </div>
  )
}
