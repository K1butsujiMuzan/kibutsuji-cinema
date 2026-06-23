import { MAX_AUTHOR_ANIME } from '@/constants/limits'

export default function AnimeCardLoader() {
  return (
    <div
      className={'w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2'}
    >
      {[...Array(MAX_AUTHOR_ANIME)].map((_, index) => (
        <div className={'p-1.5'} key={`loader-${index}`}>
          <span
            className={
              'bg-pink-50 dark:bg-gray-750 w-full aspect-5/7 block rounded-md animate-pulse'
            }
          />
          <span
            className={
              'h-4 block mt-3 rounded-sm bg-pink-50 dark:bg-gray-750 animate-pulse'
            }
          ></span>
          <span
            className={
              'h-3.5 block w-[60%] mt-2 rounded-sm bg-pink-50 dark:bg-gray-750 animate-pulse'
            }
          ></span>
        </div>
      ))}
    </div>
  )
}
