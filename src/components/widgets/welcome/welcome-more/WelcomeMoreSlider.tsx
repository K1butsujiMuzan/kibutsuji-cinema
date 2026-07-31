'use client'
import Slider from '@/components/ui/slider/Slider'
import { sliderIcons } from '@/components/widgets/welcome/welcome-more/welcome-more.data'

export default function WelcomeMoreSlider() {
  return (
    <Slider
      className={
        'grid grid-cols-[9rem] auto-cols-[9rem] lg:grid-cols-[15rem] lg:auto-cols-[15rem] grid-flow-col gap-2'
      }
      sliderAriaLabel={'Premium benefits'}
    >
      {sliderIcons.map(({ text, icon: Icon }, index) => (
        <li
          aria-label={`${index + 1} of ${sliderIcons.length}`}
          key={text}
          className={
            'flex flex-col items-center gap-3 shrink-0 snap-start px-2 py-1.5'
          }
        >
          <Icon />
          <p className={'text-sm leading-4.5 font-medium text-center'}>
            {text}
          </p>
        </li>
      ))}
    </Slider>
  )
}
