export default function UserWrapperLoader() {
  return (
    <div className={'flex flex-col lg:flex-row items-center gap-2 lg:gap-4'}>
      <div
        className={
          'w-22.5 h-22.5 lg:w-12.5 lg:h-12.5 bg-pink-50 dark:bg-gray-750 aspect-square rounded-sm animate-pulse'
        }
      />
      <div className={'flex flex-col gap-3 w-40'}>
        <span
          className={
            'rounded-sm h-4.5 w-full bg-pink-50 dark:bg-gray-750 animate-pulse'
          }
        />
        <span
          className={
            'rounded-sm h-3 w-full bg-pink-50 dark:bg-gray-750 animate-pulse'
          }
        />
      </div>
    </div>
  )
}
