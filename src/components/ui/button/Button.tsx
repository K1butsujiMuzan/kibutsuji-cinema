'use client'

import React, { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: Readonly<React.ReactNode>
  onClick: () => void
  className?: string
}

export default function Button({
  children,
  onClick,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        'disabled:cursor-not-allowed! text-nowrap disabled:opacity-75 rounded-md p-2 flex justify-center items-center gap-2 bg-pink-50 dark:bg-gray-750 not-disabled:hover:bg-pink-100 not-disabled:dark:hover:bg-gray-600 not-disabled:active:bg-pink-100 not-disabled:dark:active:bg-gray-600 not-disabled:active:scale-97 transition duration-300',
        className,
      )}
      {...rest}
      onClick={onClick}
      type={'button'}
    >
      {children}
    </button>
  )
}
