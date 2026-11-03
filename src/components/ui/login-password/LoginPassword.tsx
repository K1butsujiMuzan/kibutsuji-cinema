'use client'

import { type InputHTMLAttributes, useId, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  labelText: string
  isValid?: boolean
  isDirty?: boolean
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'aria-invalid' | 'type' | 'placeholder'
>

export default function LoginPassword({
  labelText,
  className,
  isValid,
  isDirty = true,
  ...props
}: Props) {
  const [isShown, setIsShown] = useState<boolean>(false)
  const id = useId()

  return (
    <div
      className={cn(
        'relative overflow-x-hidden flex gap-2 w-full text-18 font-medium pt-6 border-b-2 border-current has-focus:border-accent not-has-placeholder-shown:border-accent transition duration-300',
        className,
        {
          'border-accent': !isValid,
        },
      )}
    >
      <input
        aria-invalid={!isValid}
        type={isShown ? 'text' : 'password'}
        className={'peer outline-none w-full py-1 px-0.5'}
        id={id}
        placeholder={' '}
        {...props}
      />
      {isDirty && (
        <button
          aria-label={isShown ? 'hide password' : 'show password'}
          className={'text-xs uppercase font-semibold shrink-0'}
          type="button"
          onClick={() => {
            setIsShown((prevState) => !prevState)
          }}
        >
          {isShown ? 'hide' : 'show'}
        </button>
      )}
      <label
        htmlFor={id}
        className={cn(
          'text-nowrap absolute left-0.5 pointer-events-none top-1/2 peer-focus:-translate-y-full peer-focus:scale-65 peer-not-placeholder-shown:-translate-y-full origin-left peer-not-placeholder-shown:scale-65 transition duration-300',
          {
            'text-accent': !isValid,
          },
        )}
      >
        {labelText}
      </label>
    </div>
  )
}
