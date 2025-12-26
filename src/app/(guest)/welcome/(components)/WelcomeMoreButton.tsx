'use client'

import { onScrollToPremium } from '@/utils/scroll-to-premium'

export default function WelcomeMoreButton() {
  return (
    <button
      onClick={onScrollToPremium}
      className={
        'w-full sn:w-auto flex items-center justify-center px-3.5 py-2 gap-1 text-white fill-white rounded-md font-medium bg-pink-400 hover:bg-pink-450 active:bg-pink-500 active:scale-97 transition duration-300'
      }
    >
      <span className={'text-sm leading-4.5'}>Compare all plans</span>
      <svg
        role={'img'}
        aria-hidden={true}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.9989 19L10.9989 7.83L6.11592 12.712C6.02334 12.8046 5.91343 12.878 5.79246 12.9281C5.6715 12.9782 5.54185 13.004 5.41092 13.004C5.27998 13.004 5.15034 12.9782 5.02937 12.9281C4.90841 12.878 4.7985 12.8046 4.70592 12.712L4.70392 12.71L4.70092 12.707C4.51445 12.5192 4.41007 12.2651 4.41063 12.0004C4.41119 11.7357 4.51666 11.482 4.70392 11.295L11.2919 4.707C11.4794 4.51953 11.7338 4.41421 11.9989 4.41421C12.2641 4.41421 12.5184 4.51953 12.7059 4.707L19.2939 11.295C19.4809 11.482 19.5859 11.7356 19.5859 12C19.5859 12.2644 19.4809 12.518 19.2939 12.705C19.1069 12.892 18.8533 12.997 18.5889 12.997C18.3245 12.997 18.0709 12.892 17.8839 12.705L12.9989 7.83L12.9989 19C12.9989 19.2652 12.8936 19.5196 12.706 19.7071C12.5185 19.8946 12.2641 20 11.9989 20C11.7337 20 11.4793 19.8946 11.2918 19.7071C11.1043 19.5196 10.9989 19.2652 10.9989 19Z"
          fill="white"
        />
      </svg>
    </button>
  )
}
