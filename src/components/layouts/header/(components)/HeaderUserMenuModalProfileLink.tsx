import { PAGES } from '@/configs/pages.config'
import Link from 'next/link'
import { memo } from 'react'

interface Props {
  userName: string
  userId: string
  onClick: () => void
}

export default memo(function HeaderUserMenuModalProfileLink({
  userName,
  userId,
  onClick,
}: Props) {
  return (
    <Link
      onClick={onClick}
      href={PAGES.USER(userId)}
      className={
        'flex items-center gap-2 bg-pink-70 dark:bg-gray-500 hover:bg-pink-60 dark:hover:bg-gray-400 active:bg-pink-60 dark:active:bg-gray-400 px-3.5 py-2 rounded-sm transition duration-300'
      }
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
        <g clipPath="url(#clip0_2899_1335)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 9.6C11.028 9.6 13.5664 11.3712 14.2272 14.4H1.7728C2.4336 11.3712 4.972 9.6 8 9.6ZM4.8 4.8C4.8 3.0352 6.2352 1.6 8 1.6C9.7648 1.6 11.2 3.0352 11.2 4.8C11.2 6.5648 9.7648 8 8 8C6.2352 8 4.8 6.5648 4.8 4.8ZM11.0064 8.53838C12.0992 7.65918 12.8 6.312 12.8 4.8C12.8 2.1488 10.6512 0 8 0C5.3488 0 3.2 2.1488 3.2 4.8C3.2 6.312 3.9008 7.65918 4.9936 8.53838C2.0664 9.63838 0 12.356 0 16H16C16 12.356 13.9336 9.63838 11.0064 8.53838Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_2899_1335">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div
        className={'flex flex-col text-nowrap overflow-hidden text-ellipsis'}
      >
        <div className={'flex items-center gap-0.5'}>
          <span className={'text-xs'}>My profile</span>
          <svg
            role={'img'}
            aria-hidden={true}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.61172 2.27903C5.73377 2.15699 5.9316 2.15699 6.05364 2.27903L8.55364 4.77904C8.67568 4.90108 8.67568 5.09892 8.55364 5.22096L6.05364 7.72096C5.9316 7.843 5.73377 7.843 5.61172 7.72096C5.48968 7.59892 5.48968 7.40108 5.61172 7.27904L7.57822 5.3125H1.66602C1.49343 5.3125 1.35352 5.17258 1.35352 5C1.35352 4.82742 1.49343 4.6875 1.66602 4.6875H7.57822L5.61172 2.72097C5.48968 2.59893 5.48968 2.40107 5.61172 2.27903Z"
              fill="black"
            />
          </svg>
        </div>
        <div className={'leading-5 font-medium overflow-hidden text-ellipsis'}>
          {userName}
        </div>
      </div>
    </Link>
  )
})
