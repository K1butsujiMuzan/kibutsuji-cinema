'use client'

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export default function useSlider(children: React.ReactNode) {
  const sliderRef = useRef<HTMLUListElement>(null)
  const sliderId = useId()
  const sliderListId = useId()
  const [sliderSizes, setSliderSizes] = useState<{
    sliderWidth: number
    sliderScreenWidth: number
    slideWidth: number
    sliderGap: number
  }>({
    sliderWidth: 0,
    sliderScreenWidth: 0,
    slideWidth: 0,
    sliderGap: 0,
  })
  const [scrollLeft, setScrollLeft] = useState<number>(0)

  useEffect(() => {
    const onWindowResize = () => {
      setSliderSizes((prevState) => {
        if (!sliderRef.current) {
          return prevState
        }
        return {
          sliderWidth: sliderRef.current.scrollWidth,
          sliderScreenWidth: sliderRef.current.clientWidth,
          slideWidth:
            sliderRef.current.children.length > 0
              ? (sliderRef.current.firstElementChild?.clientWidth ?? 0)
              : prevState.slideWidth,
          sliderGap:
            parseInt(window.getComputedStyle(sliderRef.current).gap) || 0,
        }
      })
    }
    onWindowResize()

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [children])

  useLayoutEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0
      setScrollLeft(0)
    }
  }, [children])

  const scrollSlider = (direction: 'left' | 'right') => {
    const step = sliderSizes.slideWidth + sliderSizes.sliderGap
    const left = direction === 'left' ? -step : step

    sliderRef.current?.scrollBy({
      left,
      behavior: 'smooth',
    })
  }

  const onScroll = useCallback(() => {
    setScrollLeft(sliderRef.current?.scrollLeft ?? 0)
  }, [])

  const isSliderScrollable: boolean = useMemo((): boolean => {
    return sliderSizes.sliderWidth > sliderSizes.sliderScreenWidth
  }, [sliderSizes])

  return {
    sliderRef,
    sliderId,
    sliderListId,
    scrollSlider,
    isLeftButtonShown: isSliderScrollable && scrollLeft > 0,
    isRightButtonShown:
      isSliderScrollable &&
      sliderSizes.sliderScreenWidth + scrollLeft < sliderSizes.sliderWidth - 2,
    onScroll,
  }
}
