import FriendListLoader from '@/app/(user)/user/[userId]/(user-wrapper)/(loaders)/FriendListLoader'

export default function Loading() {
  return (
    <section
      className={
        'py-3 px-4 rounded-lg overflow-hidden flex flex-col gap-4 bg-white dark:bg-gray-800 w-full'
      }
    >
      <ul
        className={
          'flex gap-2 overflow-auto no-scrollbar snap-x snap-mandatory'
        }
      >
        {[...Array(3)].map((_, index) => (
          <li
            key={`friend-button-loader-${index}`}
            className={
              'rounded-md bg-pink-70 dark:bg-gray-750 animate-pulse h-10 w-30 shrink-0 snap-start'
            }
          />
        ))}
      </ul>
      <div
        className={
          'border border-pink-50 dark:border-gray-200 rounded-md w-full h-10.5'
        }
      />
      <FriendListLoader />
    </section>
  )
}
