import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react'
import { KEYCODES } from '@/constants/keycodes'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  text: string
  id: string
  inputValue: boolean
}

export default function LoginCheckbox({
  text,
  id,
  inputValue,
  ...props
}: Props) {
  return (
    <label
      onKeyDown={(event: KeyboardEvent<HTMLLabelElement>) => {
        if (event.key === KEYCODES.ENTER || event.key === KEYCODES.SPACE) {
          event.preventDefault()
          const onChangeEvent = {
            target: {
              checked: !inputValue,
              type: 'checkbox',
            },
          } as ChangeEvent<HTMLInputElement>

          props.onChange?.(onChangeEvent)
        }
      }}
      aria-checked={inputValue}
      role={'checkbox'}
      tabIndex={0}
      htmlFor={id}
      className={'flex items-center gap-2 outline-offset-5'}
    >
      <span
        className={
          'border-2 border-pink-400 w-5 aspect-square shrink-0 relative'
        }
      >
        <input
          checked={inputValue}
          {...props}
          className={'absolute inset-0 opacity-0 peer'}
          type={'checkbox'}
          id={id}
          tabIndex={-1}
        />
        <svg
          role={'img'}
          aria-hidden={true}
          className={
            'hidden peer-checked:block text-pink-400 stroke-1 stroke-pink-400'
          }
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9013 5.1215C11.7701 4.9595 11.5569 4.9595 11.4257 5.1215L6.66654 11.0017L4.57407 8.43593C4.44283 8.27393 4.22967 8.27393 4.09843 8.43593C3.96719 8.59793 3.96719 8.86017 4.09843 9.02176L6.4297 11.8801C6.55961 12.04 6.77576 12.04 6.90567 11.8801L11.9013 5.70733C12.0329 5.54575 12.0329 5.28308 11.9013 5.1215C12.0329 5.28308 11.7701 4.9595 11.9013 5.1215Z"
            fill="white"
          />
        </svg>
      </span>
      <span className={'text-sm leading-4.5 font-medium'}>{text}</span>
    </label>
  )
}
