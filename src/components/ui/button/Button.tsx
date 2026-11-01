'use client'

import React, { type ButtonHTMLAttributes, type Ref } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: Readonly<React.ReactNode>
  className?: string
  variant?: 'normal' | 'accent'
  ref?: Ref<HTMLButtonElement>
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  children,
  onClick,
  className,
  variant = 'normal',
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={cn(
        'disabled:cursor-not-allowed! py-2.5 px-4 font-medium disabled:opacity-75 rounded-md flex justify-center items-center gap-2 not-disabled:active:scale-97 transition duration-300',
        className,
        {
          'bg-base-button not-disabled:hover:bg-base-button-hover not-disabled:active:bg-base-button-hover':
            variant === 'normal',
          'text-light bg-accent not-disabled:hover:bg-accent-dark not-disabled:active:bg-accent-dark':
            variant === 'accent',
        },
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
