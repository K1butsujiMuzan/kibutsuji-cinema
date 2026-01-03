interface Props {
  text: string
  disabled?: boolean
}

export default function LoginButton({ text, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      type="submit"
      className={
        'uppercase py-2 text-white disabled:!cursor-default disabled:text-gray-200 border border-transparent disabled:bg-transparent disabled:border-gray-200 rounded-md font-medium bg-pink-400 hover:bg-pink-450 active:bg-pink-500 not-disabled:active:scale-97 transition duration-300'
      }
    >
      {text}
    </button>
  )
}
