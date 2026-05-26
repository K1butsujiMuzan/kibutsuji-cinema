export default function FriendListLoader() {
  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
      {[...new Array(15)].map((_, index) => (
        <div
          className={
            'border border-pink-50 dark:border-gray-200 h-14.5 w-full rounded-md overflow-hidden flex items-center gap-3 animate-pulse'
          }
          key={`loader-${index}`}
        >
          <span
            className={
              'h-14 aspect-square bg-pink-50 dark:bg-gray-750 block animate-pulse'
            }
          />
          <div className={'flex flex-col gap-1.5'}>
            <span
              className={
                'rounded-sm bg-pink-50 dark:bg-gray-750 h-4.5 w-30 block animate-pulse'
              }
            />
            <span
              className={
                'rounded-sm bg-pink-50 dark:bg-gray-750 h-3.5 w-15 block animate-pulse'
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}
