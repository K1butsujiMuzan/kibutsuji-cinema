import type { InputHTMLAttributes } from 'react'
import { cn } from '../../../lib/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string
  id: string
  className: string
}

export default function AuthInput({
  labelText,
  id,
  className,
  ...props
}: Props) {
  return (
    <div className={cn('relative text-sm md:text-18 flex-1 w-full', className)}>
      <input
        {...props}
        className={
          'py-2 px-1.5 md:py-5 md:px-3 border border-gray-300/85 rounded-xl peer outline-none caret-gray-700 dark:caret-gray-100 w-full'
        }
        id={id}
        placeholder={' '}
      />
      <label
        htmlFor={id}
        className={
          'absolute left-3 bottom-1/2 pointer-events-none top-2 md:top-5 focus:-translate-y-2.5 md:focus:-translate-y-4 transition duration-300 peer-focus:-translate-y-2.5 md:peer-focus:-translate-y-4 peer-focus:scale-70 peer-focus:-translate-x-2.5 md:peer-focus:-translate-x-2 peer-not-placeholder-shown:-translate-y-2.5 md:peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-70 peer-not-placeholder-shown:-translate-x-2.5 md:peer-not-placeholder-shown:-translate-x-2'
        }
      >
        {labelText}
      </label>
    </div>
  )
}
