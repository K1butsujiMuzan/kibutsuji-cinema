'use client'

import Button from '@/components/ui/button/Button'
import PageChangerIcon from '@/components/icons/PageChangerIcon'
import useSlider from '@/hooks/useSlider'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className: string
  sliderAriaLabel: string
}

export default function Slider({
  children,
  className,
  sliderAriaLabel,
}: Props) {
  const {
    sliderId,
    sliderRef,
    sliderListId,
    scrollSlider,
    isLeftButtonShown,
    onScroll,
    isRightButtonShown,
  } = useSlider(children)

  return (
    <div
      className={'relative w-full max-w-full'}
      role={'region'}
      aria-roledescription={'carousel'}
      aria-label={sliderAriaLabel}
      id={sliderId}
    >
      <Button
        onClick={() => scrollSlider('left')}
        aria-label={'Previous slide'}
        aria-controls={sliderListId}
        className={cn('absolute left-0 top-1/2 z-10 -translate-y-1/2 p-2.5', {
          hidden: !isLeftButtonShown,
        })}
      >
        <PageChangerIcon className={'rotate-180'} />
      </Button>
      <ul
        tabIndex={0}
        onScroll={onScroll}
        ref={sliderRef}
        className={cn(
          'overflow-x-auto snap-x snap-mandatory snap-always no-scrollbar w-full py-2',
          className,
        )}
        id={sliderListId}
      >
        {children}
      </ul>
      <Button
        onClick={() => {
          scrollSlider('right')
        }}
        aria-label={'Next slide'}
        aria-controls={sliderListId}
        className={cn('absolute right-0 top-1/2 z-10 -translate-y-1/2 p-2.5', {
          hidden: !isRightButtonShown,
        })}
      >
        <PageChangerIcon />
      </Button>
    </div>
  )
}
