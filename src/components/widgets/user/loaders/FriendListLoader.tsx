import { MAX_PROFILE_RECORDS } from '@/constants/limits'
import BlockLoader from '@/components/ui/block-loader/BlockLoader'

export default function FriendListLoader() {
  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
      {[...new Array(MAX_PROFILE_RECORDS)].map((_, index) => (
        <div
          className={
            'border border-pink-50 dark:border-gray-200 h-14.5 w-full rounded-md overflow-hidden flex items-center gap-3'
          }
          key={`loader-${index}`}
        >
          <BlockLoader className={'h-14 aspect-square'} />
          <div className={'flex flex-col gap-1.5'}>
            <BlockLoader className={'h-4.5 w-30'} />
            <BlockLoader className={'h-3.5 w-15'} />
          </div>
        </div>
      ))}
    </div>
  )
}
