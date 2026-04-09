import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { type RefObject } from 'react'

export default function useSliderResize(
  sliderRef: RefObject<HTMLUListElement | null>,
  setMaxScrollWidth: Dispatch<SetStateAction<number>>,
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
