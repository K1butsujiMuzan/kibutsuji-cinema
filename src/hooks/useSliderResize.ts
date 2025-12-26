import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { type RefObject } from 'react'

type TSliderRef = RefObject<HTMLUListElement | null>
type TSetMaxScrollWidth = Dispatch<SetStateAction<number>>

export default function useSliderResize(
  sliderRef: TSliderRef,
  setMaxScrollWidth: TSetMaxScrollWidth,
) {
  useEffect(() => {
    const onResize = () => {
      setMaxScrollWidth(
        (sliderRef.current?.scrollWidth ?? 0) -
          (sliderRef.current?.clientWidth ?? 0),
      )
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [sliderRef, setMaxScrollWidth])
}
