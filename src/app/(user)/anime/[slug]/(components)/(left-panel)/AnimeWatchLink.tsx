import Link from 'next/link'
import { PAGES } from '@/configs/pages.config'

interface Props {
  animeSlug: string
  firstEpisode: number
}

export default function AnimeWatchLink({ animeSlug, firstEpisode }: Props) {
  return (
    <Link
      className={
        'w-full font-medium flex gap-1.5 justify-center px-2.5 py-1.5 rounded-md items-center text-white bg-pink-400 hover:bg-pink-450 active:bg-pink-500 active:scale-97 transition duration-300'
      }
      href={PAGES.EPISODE(animeSlug, firstEpisode.toString())}
    >
      <svg
        className={'shrink-0'}
        role={'img'}
        aria-hidden={true}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.2722 6.23522C15.6868 7.0045 15.6868 8.99583 14.2722 9.7651L5.73092 14.4098C4.35607 15.1575 2.6665 14.1844 2.6665 12.6449V3.35543C2.6665 1.81595 4.35607 0.842843 5.73091 1.59048L14.2722 6.23522Z"
          fill="black"
        />
      </svg>
      <span className={'truncate'}>Start watching</span>
    </Link>
  )
}
