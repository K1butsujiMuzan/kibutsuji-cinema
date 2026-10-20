'use client'

import { onScrollToPremium } from '@/utils/scroll-to-premium'

export default function WelcomeHeroButton() {
  return (
    <button
      onClick={onScrollToPremium}
      className={
        'w-[min(100%,15rem)] md:w-auto px-2 md:px-8 py-3 md:py-4 order-2 md:order-3 rounded-md bg-pink-400 hover:bg-pink-450 active:bg-pink-500 active:scale-97 transition duration-300'
      }
    >
      <span className={'uppercase text-white font-bold md:text-xl'}>
        Start a free trial
      </span>
    </button>
  )
}
