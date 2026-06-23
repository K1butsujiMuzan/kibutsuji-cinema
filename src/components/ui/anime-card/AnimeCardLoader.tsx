import { MAX_AUTHOR_ANIME } from '@/constants/limits'
import BlockLoader from '@/components/ui/block-loader/BlockLoader'

export default function AnimeCardLoader() {
  return (
    <div
      className={
        'w-full grid xxs:grid-cols-2 sn:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2'
      }
    >
      {[...Array(MAX_AUTHOR_ANIME)].map((_, index) => (
        <div className={'p-1.5'} key={`loader-${index}`}>
          <BlockLoader className={'w-full aspect-5/7 rounded-md'} />
          <BlockLoader className={'h-4 mt-3 w-full'} />
          <BlockLoader className={'h-3.5 mt-2 w-[60%]'} />
        </div>
      ))}
    </div>
  )
}
