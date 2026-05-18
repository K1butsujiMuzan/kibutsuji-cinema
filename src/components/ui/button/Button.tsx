'use client'

import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  onClick: () => void
}

export default function Button({ text, onClick, ...rest }: Props) {
  return (
    <button
      className={
        'disabled:cursor-not-allowed! text-nowrap disabled:opacity-75 px-2.5 rounded-md py-1.5 flex justify-center items-center gap-2 bg-pink-50 dark:bg-gray-750 not-disabled:hover:bg-pink-100 not-disabled:dark:hover:bg-gray-600 not-disabled:active:bg-pink-100 not-disabled:dark:active:bg-gray-600 not-disabled:active:scale-97 transition duration-300'
      }
      {...rest}
      onClick={onClick}
      type={'button'}
    >
      {text}
    </button>
  )
}
