import { type InputHTMLAttributes, useId } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  labelText: string
  isValid?: boolean
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'aria-invalid' | 'placeholder'
>

export default function LoginInput({
  labelText,
  isValid,
  className,
  ...props
}: Props) {
  const id = useId()

  return (
    <div
      className={cn(
        'relative w-full text-18 font-medium pt-6 border-b-2 border-current has-focus:border-accent not-has-placeholder-shown:border-accent transition duration-300',
        className,
        {
          'border-accent': !isValid,
        },
      )}
    >
      <input
        aria-invalid={!isValid}
        className={'peer outline-none w-full py-1 px-0.5'}
        id={id}
        placeholder={' '}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute left-0.5 pointer-events-none top-1/2 peer-focus:-translate-y-full peer-focus:scale-65 peer-not-placeholder-shown:-translate-y-full origin-left peer-not-placeholder-shown:scale-65 transition duration-300',
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
