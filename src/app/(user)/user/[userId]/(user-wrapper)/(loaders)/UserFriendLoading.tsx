import BlockLoader from '@/components/ui/block-loader/BlockLoader'

export default function UserFriendLoading() {
  return (
    <div
      className={
        'grid grid-cols-1 w-full sm:flex sm:flex-row gap-2 sm:gap-4 sm:w-auto'
      }
    >
      <BlockLoader className={'h-9 w-full sm:w-30 rounded-md'} />
    </div>
  )
}
