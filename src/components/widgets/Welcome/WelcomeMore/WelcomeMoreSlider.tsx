'use client'

import Slider from '@/components/ui/slider/Slider'
import { sliderIcons } from '@/components/widgets/Welcome/WelcomeMore/welcome-more.data'
import WelcomeMoreSlide from '@/components/widgets/Welcome/WelcomeMore/WelcomeMoreSlide'

export default function WelcomeMoreSlider() {
  return (
    <Slider
      className={
        'grid grid-cols-[9rem] auto-cols-[9rem] lg:grid-cols-[15rem] lg:auto-cols-[15rem] grid-flow-col gap-2'
      }
      sliderAriaLabel={'Premium benefits'}
    >
      {sliderIcons.map(({ text, icon }, index) => (
        <WelcomeMoreSlide
          key={text}
          ariaLabel={`${index + 1} of ${sliderIcons.length}`}
          icon={icon}
          text={text}
        />
      ))}
    </Slider>
  )
}
