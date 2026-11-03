import { cn } from '@/lib/utils'

type Props = {
  text: string
  disabled?: boolean
}

export default function LoginButton({ text, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      type="submit"
      className={cn(
        'uppercase py-2.25 px-4 text-light border border-transparent rounded-md font-medium bg-accent',
        'disabled:!cursor-default disabled:text-base-text disabled:bg-transparent disabled:border-base-text',
        'not-disabled:hover:bg-accent-dark not-disabled:active:bg-accent-dark not-disabled:active:scale-97 transition duration-300',
      )}
    >
      {text}
    </button>
  )
}
