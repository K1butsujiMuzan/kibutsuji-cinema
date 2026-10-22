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
          'bg-pink-50 dark:bg-gray-750 not-disabled:hover:bg-pink-100 not-disabled:dark:hover:bg-gray-600 not-disabled:active:bg-pink-100 not-disabled:dark:active:bg-gray-600':
            variant === 'normal',
          'text-white bg-pink-400 not-disabled:hover:bg-pink-450 not-disabled:active:bg-pink-500':
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
