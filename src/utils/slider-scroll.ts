import { type RefObject } from 'react'

type TSliderRef = RefObject<HTMLUListElement | null>
type TDirection = 'left' | 'right'

export default function onSliderScroll(
  sliderRef: TSliderRef,
  direction: TDirection,
) {
  const slideWidth = sliderRef.current?.clientWidth ?? 0
  sliderRef.current?.scrollTo({
    left:
      direction === 'left'
        ? sliderRef.current?.scrollLeft - slideWidth
        : sliderRef.current?.scrollLeft + slideWidth,
    behavior: 'smooth',
  })
}
