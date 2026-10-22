'use client'

import { onScrollToPremium } from '@/utils/scroll-to-premium'
import Button from '@/components/ui/button/Button'

export default function WelcomeHeroButton() {
  return (
    <Button
      onClick={onScrollToPremium}
      variant={'accent'}
      className={
        'w-[min(100%,15rem)] md:w-auto md:px-8 md:py-4 order-2 md:order-3 uppercase font-semibold md:text-xl'
      }
    >
      Start a free trial
    </Button>
  )
}
