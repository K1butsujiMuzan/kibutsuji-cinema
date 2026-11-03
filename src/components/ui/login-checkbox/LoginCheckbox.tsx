import { type InputHTMLAttributes, useId } from 'react'
import LoginCheckboxIcon from '@/components/ui/login-checkbox/LoginCheckboxIcon'

type Props = {
  children: React.ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>

export default function LoginCheckbox({ children, className, ...rest }: Props) {
  const id = useId()
  return (
    <label htmlFor={id} className={'flex items-center gap-2'}>
      <input {...rest} className={'sr-only peer'} type={'checkbox'} id={id} />
      <span
        className={
          'border-2 border-accent bg-transparent w-5 aspect-square shrink-0 peer-focus-visible:outline peer-checked:[&_svg]:block peer-focus-visible:outline-base-text outline-offset-2'
        }
      >
        <LoginCheckboxIcon />
      </span>
      <span className={'text-sm font-medium'}>{children}</span>
    </label>
  )
}
