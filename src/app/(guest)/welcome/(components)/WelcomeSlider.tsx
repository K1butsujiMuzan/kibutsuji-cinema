'use client'
import {sliderImages} from "@/app/(guest)/welcome/(components)/welcome.data";
import Image from "next/image";
import {useRef, useState, useEffect} from "react";
import WelcomeSliderButton
  from "@/app/(guest)/welcome/(components)/WelcomeSliderButton";
import WelcomeSlide from "@/app/(guest)/welcome/(components)/WelcomeSlide";

export default function WelcomeSlider() {
  const sliderRef = useRef<HTMLUListElement>(null)
  const [positionLeft, setPositionLeft] = useState(0)
  const [maxScrollWidth, setMaxScrollWidth] = useState(0)

  useEffect(() => {
    setMaxScrollWidth((sliderRef.current?.scrollWidth ?? 0) - (sliderRef.current?.clientWidth ?? 0))

    const onResize = () => {
      setMaxScrollWidth((sliderRef.current?.scrollWidth ?? 0) - (sliderRef.current?.clientWidth ?? 0))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollSlider = (direction: 'left' | 'right') : void => {
    const slideWidth = sliderRef.current?.clientWidth ?? 0
    sliderRef.current?.scrollTo({
      left: direction === "left" ? sliderRef.current?.scrollLeft - slideWidth : sliderRef.current?.scrollLeft + slideWidth,
      behavior: 'smooth'
    })
  }

  return (
    <div className={'px-3 sm:px-10 w-full'}>
      <div className={'max-w-270 relative w-full mx-auto'}>
        {positionLeft > 0 && (
          <WelcomeSliderButton isLeft={true} onClick={() => scrollSlider('left')}/>
        )}
        <ul
          onScroll={() => {
            setPositionLeft(sliderRef.current?.scrollLeft ?? 0)
          }}
          ref={sliderRef}
          className={'flex overflow-x-auto snap-x snap-mandatory no-scrollbar'}
        >
          {sliderImages.map(slide => <WelcomeSlide slide={slide} key={slide.title} />)}
        </ul>
        {positionLeft < maxScrollWidth && (
          <WelcomeSliderButton isLeft={false} onClick={() => scrollSlider('right')}/>
        )}
      </div>
    </div>
  )
}