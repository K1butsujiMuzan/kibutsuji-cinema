'use client'
import { sliderIcons } from '@/app/(guest)/welcome/(components)/welcome.data'
import { useRef, useState } from 'react'
import WelcomeSliderButton from '@/app/(guest)/welcome/(components)/WelcomeSliderButton'
import onSliderScroll from '@/utils/slider-scroll'
import useSliderResize from '@/hooks/useSliderResize'

export default function WelcomeMoreSlider() {
  const sliderRef = useRef<HTMLUListElement>(null)
  const [positionLeft, setPositionLeft] = useState(0)
  const [maxScrollWidth, setMaxScrollWidth] = useState(0)

  useSliderResize(sliderRef, setMaxScrollWidth)

  return (
    <div
      className={'sm:px-5 w-full'}
      role={'region'}
      aria-roledescription={'carousel'}
      aria-label={'premium benefits'}
    >
      <div className={'max-w-270 relative w-full mx-auto'}>
        {positionLeft > 0 && (
          <WelcomeSliderButton
            ariaLabel={'back'}
            className={'hidden lg:block '}
            isLeft={true}
            onClick={() => onSliderScroll(sliderRef, 'left')}
          />
        )}
        <ul
          onScroll={() => {
            setPositionLeft(sliderRef.current?.scrollLeft ?? 0)
          }}
          ref={sliderRef}
          className={
            'grid grid-cols-2 gap-2 md:grid-cols-3 lg:flex lg:overflow-x-auto lg:snap-x lg:snap-mandatory no-scrollbar text-center lg:py-1.5 lg:gap-0'
          }
        >
          {sliderIcons.map(({ text, icon: Icon }, index) => (
            <li
              aria-roledescription={'slide'}
              role={'group'}
              aria-label={`${index + 1} of ${sliderIcons.length}`}
              key={text}
              className={
                'flex flex-col items-center gap-3 lg:w-1/6 shrink-0 lg:snap-start lg:px-3.75 lg:py-1.5'
              }
            >
              <Icon />
              <p className={'text-sm leading-4.5 font-medium'}>{text}</p>
            </li>
          ))}
        </ul>
        {positionLeft < maxScrollWidth && (
          <WelcomeSliderButton
            ariaLabel={'forward'}
            className={'hidden lg:block '}
            isLeft={false}
            onClick={() => onSliderScroll(sliderRef, 'right')}
          />
        )}
      </div>
    </div>
  )
}
