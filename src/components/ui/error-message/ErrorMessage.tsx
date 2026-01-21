interface Props {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  return (
    <small
      className={'text-xs leading-4 font-semibold py-1 text-red-400'}
      role={'alert'}
    >
      {message}
    </small>
  )
}
