interface Props {
  episodesReleased: number
  episodesCount: number
  episodesLength: number
}

export default function AnimeEpisodesCount({
  episodesReleased,
  episodesLength,
  episodesCount,
}: Props) {
  const minutes = episodesLength % 60 > 0 ? `${episodesLength % 60} min.` : ''
  const hours =
    episodesLength >= 60 ? `${Math.floor(episodesLength / 60)} hr.` : ''
  const time = [hours, minutes].filter(Boolean).join(' ')

  return (
    <div
      className={
        'truncate rounded-md px-2.5 py-1.5 flex flex-col hover:bg-pink-70 dark:hover:bg-gray-750 active:bg-pink-70 dark:active:bg-gray-750 transition duration-300'
      }
    >
      <span className={'text-sm truncate'}>Episodes</span>
      <span className={'truncate'}>
        {episodesReleased}
        <span className={'text-sm text-gray-650 dark:text-gray-150'}> of </span>
        {episodesCount}
        {episodesLength > 0 && (
          <span className={'text-sm text-gray-650 dark:text-gray-150'}>
            {' '}
            [{time}]
          </span>
        )}
      </span>
    </div>
  )
}
