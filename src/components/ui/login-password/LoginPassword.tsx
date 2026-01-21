'use client'

import { type InputHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string
  id: string
  className?: string
  isValid?: boolean
  isDirty?: boolean
}

export default function LoginPassword({
  labelText,
  id,
  className,
  isValid,
  isDirty = true,
  ...props
}: Props) {
  const [isShown, setIsShown] = useState<boolean>(false)

  return (
    <div
      className={cn(
        'relative overflow-x-hidden flex gap-2 w-full text-18 leading-6.5 font-medium pt-6 border-b-2 border-current has-focus:border-pink-400 not-has-placeholder-shown:border-pink-400 transition duration-300',
        className,
        {
          'border-pink-400': isValid,
          '': !isValid,
        },
      )}
    >
      <input
        aria-invalid={isValid}
        {...props}
        type={isShown ? 'text' : 'password'}
        className={'peer outline-none w-full py-1 px-0.5'}
        id={id}
        placeholder={' '}
      />
      {isDirty && (
        <button
          aria-label={isShown ? 'hide password' : 'show password'}
          className={'text-xs leading-4 uppercase font-semibold shrink-0'}
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
            'text-pink-400': isValid,
          },
        )}
      >
        {labelText}
      </label>
    </div>
  )
}
