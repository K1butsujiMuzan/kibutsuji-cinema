import type { InputHTMLAttributes } from 'react'
import { cn } from '../../../lib/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string
  id: string
  className?: string
  isValid?: boolean
}

export default function LoginInput({
  labelText,
  id,
  className,
  isValid,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        'relative w-full text-18 leading-6.5 font-medium pt-6 border-b-2 border-current has-focus:border-pink-400 not-has-placeholder-shown:border-pink-400 transition duration-300',
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
        className={'peer outline-none w-full py-1 px-0.5'}
        id={id}
        placeholder={' '}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute left-0.5 pointer-events-none top-1/2 peer-focus:-translate-y-full peer-focus:scale-65 peer-not-placeholder-shown:-translate-y-full origin-left peer-not-placeholder-shown:scale-65 transition duration-300',
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
