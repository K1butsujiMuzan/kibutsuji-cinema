'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'
import { premium } from '@/components/ui/premium/premium.data'
import PremiumTab from '@/components/ui/premium/PremiumTab'
import { KEYCODES } from '@/constants/keycodes'

interface Props {
  titleId: string
}

export default function Premium({ titleId }: Props) {
  const [isMonthly, setIsMonthly] = useState(true)
  const monthlyRef = useRef<HTMLButtonElement>(null)
  const annuallyRef = useRef<HTMLButtonElement>(null)

  const onHandleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (
      event.key === KEYCODES.ARROW_LEFT ||
      event.key === KEYCODES.ARROW_RIGHT
    ) {
      event.preventDefault()
      isMonthly ? annuallyRef.current?.focus() : monthlyRef.current?.focus()
      setIsMonthly((prevState) => !prevState)
    }
    if (event.key === KEYCODES.HOME) {
      event.preventDefault()
      monthlyRef.current?.focus()
      setIsMonthly(true)
    }
    if (event.key === KEYCODES.END) {
      event.preventDefault()
      annuallyRef.current?.focus()
      setIsMonthly(false)
    }
  }

  return (
    <div className={'flex flex-col gap-6 md:gap-8 items-center w-full'}>
      <div
        aria-labelledby={titleId}
        role={'tablist'}
        onKeyDown={onHandleKeyDown}
        className={
          'grid grid-cols-2 p-3 border border-pink-400 rounded-100 font-semibold'
        }
      >
        <button
          id={'tab-monthly'}
          role={'tab'}
          aria-selected={isMonthly}
          tabIndex={isMonthly ? 0 : -1}
          ref={monthlyRef}
          onClick={() => setIsMonthly(true)}
          className={cn('px-6.5 py-1 transition duration-300 rounded-100', {
            'text-white bg-pink-400 hover:bg-pink-450 active:bg-pink-500':
              isMonthly,
          })}
          type="button"
        >
          <span className={'text-sm'}>Monthly</span>
        </button>
        <button
          id={'tab-annually'}
          role={'tab'}
          aria-selected={!isMonthly}
          tabIndex={!isMonthly ? 0 : -1}
          ref={annuallyRef}
          onClick={() => setIsMonthly(false)}
          className={cn(
            'px-6.5 py-1 transition duration-300 rounded-100 flex flex-col',
            {
              'text-white bg-pink-400 hover:bg-pink-450 active:bg-pink-500':
                !isMonthly,
            },
          )}
          type="button"
        >
          <span className={'text-sm leading-4.5'}>Annually</span>
          <span className={'text-10 text-nowrap'}>Save 25%</span>
        </button>
      </div>
      <div
        aria-labelledby={isMonthly ? 'tab-monthly' : 'tab-annually'}
        role={'region'}
        className={
          'flex justify-center flex-col md:flex-row mx-auto gap-5 text-center w-full overflow-auto'
        }
      >
        {premium.map((container) => (
          <PremiumTab
            container={container}
            isMonthly={isMonthly}
            key={container.title}
          />
        ))}
      </div>
      <small className={'text-center text-xs max-w-167.5 mx-2.5 font-semibold'}>
        This offer is valid for new subscribers only. Your subscription
        automatically renews after the trial period at the price you selected
        when comparing plans. You can cancel at any time. Restrictions and other
        terms apply, including changes to price, content, and features.
      </small>
    </div>
  )
}
